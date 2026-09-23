// 資料DLフォーム送信の後処理ブリッジ。フロントが formrun 送信成功後に sendBeacon で
// ここへ投げ、サーバーが (1) Discord通知 (2) 資料リンク入り自動返信メール(Resend) を行う。
// formrun は Discord 通知も資料別の返信文面も出せないため自前で行う。
// biz ホストでは proxy が /api/doc-dl-notify を /biz/api/doc-dl-notify へリライトする。
// env（いずれも未設定ならその処理だけスキップ。リポジトリには含めない）:
//   DISCORD_DOC_DL_WEBHOOK … Discord webhook URL
//   RESEND_API_KEY         … Resend のAPIキー（bytech.jp のドメイン認証済みであること）
//   DOC_DL_MAIL_FROM       … 差出人（既定: バイテック法人AI研修 <noreply@bytech.jp>）
import { NextRequest } from "next/server";
import { resolveMx, resolve4 } from "node:dns/promises";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";

export const runtime = "nodejs";
// AI審査がweb検索を数回行うため余裕を持たせる（Vercel Functions・実測で2分近くかかることがある）
export const maxDuration = 300;

const SITE = "https://biz.bytech.jp";

// 資料名 → 案内する資料。閲覧ページとPDFの両方を載せる。
// intro はメール本文に入る資料別の紹介文（1〜2文）。
const DOCS: Record<string, { intro: string; items: { title: string; view: string; pdf: string }[] }> = {
  サービス概要資料: {
    intro:
      "研修プラン・6つのコース・料金と助成金活用・導入事例・研修開始までの流れまで、ご検討に必要な情報をこの1冊にまとめています。",
    items: [
      { title: "サービス概要資料", view: `${SITE}/documents/ebook-01`, pdf: `${SITE}/assets/docs/ebook-01.pdf` },
    ],
  },
  助成金活用ガイド: {
    intro:
      "人材開発支援助成金を使って研修費用を最大75%抑える方法を、要件の確認から試算例・申請の流れまでまとめています。自社で使えるかの事前チェックリスト（13項目）もぜひご活用ください。",
    items: [
      { title: "助成金活用ガイド", view: `${SITE}/documents/ebook-02`, pdf: `${SITE}/assets/docs/ebook-02.pdf` },
    ],
  },
  AI導入50チェックシート: {
    intro:
      "「導入したのに使われない」を防ぐための50項目のチェックシートです。5カテゴリで現状を可視化し、スコアからフェーズ別の次の一手が分かります。まずはチームでの自己診断にお使いください。",
    items: [
      { title: "AI導入を成功させる50のチェックシート", view: `${SITE}/documents/ebook-03`, pdf: `${SITE}/assets/docs/ebook-03.pdf` },
    ],
  },
  AI研修タイプ比較ガイド: {
    intro:
      "eラーニング・セミナー・ハンズオン・ワークショップ、4つの研修タイプの違いを、概要・料金目安・見込める効果・導入事例・FAQでまとめています。比較表と目的別の選び方から、貴社に合う研修タイプの検討にお使いください。",
    items: [
      { title: "AI研修タイプ 比較ガイド", view: `${SITE}/documents/ebook-04`, pdf: `${SITE}/assets/docs/ebook-04.pdf` },
    ],
  },
};
DOCS["お役立ち資料3点セット"] = {
  intro:
    "人気の3冊をセットでお届けします。まずは「サービス概要資料」で全体像をご覧いただき、費用面は「助成金活用ガイド」、社内推進には「50のチェックシート」をあわせてご活用ください。",
  items: [
    ...DOCS["サービス概要資料"].items,
    ...DOCS["助成金活用ガイド"].items,
    ...DOCS["AI導入50チェックシート"].items,
  ],
};

const NOTIFY_FIELDS = [
  ["資料名", "📄 資料名"],
  ["お名前", "お名前"],
  ["企業名", "企業名"],
  ["役職", "役職"],
  ["研修導入予定", "3ヶ月以内の導入予定"],
  ["メールアドレス", "メール"],
  ["電話番号", "電話"],
  ["ページ", "ページ"],
] as const;

const clip = (v: unknown) => String(v ?? "").slice(0, 200).trim();

/* ===== リード審査（自動返信して良いか） =====
   1) 決定的チェック: 捨てアドドメイン・メールドメインのDNS実在
   2) AI審査: Claudeがweb検索で会社をリサーチ（実在・HP有無・競合・ドメイン整合）
   auto=自動返信OK / review=返信保留してDiscordで要確認 / skipped=審査せず従来どおり返信 */
type Screening = {
  verdict: "auto" | "review" | "skipped";
  reasons: string[];
  summary?: string;
};

const DISPOSABLE_DOMAINS = [
  "mailinator.com", "guerrillamail.com", "10minutemail.com", "temp-mail.org",
  "tempmail.com", "throwaway.email", "sharklasers.com", "yopmail.com", "getnada.com",
];

const ScreeningSchema = z.object({
  company_exists: z.boolean().describe("会社が実在すると確認できたか"),
  has_website: z.boolean().describe("公式Webサイトが見つかったか"),
  website_url: z.string().describe("公式サイトURL。見つからなければ空文字"),
  is_competitor: z.boolean().describe("競合（法人向けAI研修・生成AI研修・AI人材育成等を自社サービスとして提供する事業者）か"),
  email_domain_consistent: z.boolean().describe("メールドメインが会社の実在ドメインと整合するか（会社HPが無い場合はfalseにせず総合判断）"),
  verdict: z.enum(["auto", "review"]).describe("auto=自動返信してよい / review=人の確認が必要"),
  reasons: z.array(z.string()).describe("判定理由（日本語で簡潔に。reviewの場合は必ず記載）"),
  summary: z.string().describe("会社について分かったことの1〜2文の要約（日本語）"),
});

async function screenLead(data: Record<string, unknown>): Promise<Screening> {
  const email = clip(data["メールアドレス"]);
  const company = clip(data["企業名"]);
  const emailDomain = (email.split("@")[1] || "").toLowerCase();

  // --- 決定的チェック ---
  if (emailDomain && DISPOSABLE_DOMAINS.includes(emailDomain)) {
    return { verdict: "review", reasons: ["捨てアド（使い捨てメールドメイン）の可能性"] };
  }
  if (emailDomain) {
    const [mx, a] = await Promise.all([
      resolveMx(emailDomain).catch(() => []),
      resolve4(emailDomain).catch(() => []),
    ]);
    if (mx.length === 0 && a.length === 0) {
      return { verdict: "review", reasons: [`メールドメイン ${emailDomain} がDNSに存在しない（実在しないアドレスの可能性）`] };
    }
  }

  // --- AI審査 ---
  if (!process.env.ANTHROPIC_API_KEY) return { verdict: "skipped", reasons: [] };
  try {
    // 組織設定によりワークスペース未スコープのキーは anthropic-workspace-id ヘッダが必須
    const client = new Anthropic({
      defaultHeaders: process.env.ANTHROPIC_WORKSPACE_ID
        ? { "anthropic-workspace-id": process.env.ANTHROPIC_WORKSPACE_ID }
        : undefined,
    });
    const response = await client.messages.parse({
      model: "claude-opus-5",
      max_tokens: 8000,
      system:
        "あなたは「バイテック法人AI研修」（株式会社AI棒が運営する法人向け生成AI研修サービス）の資料ダウンロードリードの審査担当です。" +
        "web検索で入力された会社を調べ、自動返信メールを送ってよいリードか判定してください。\n" +
        "判定基準:\n" +
        "- 会社が実在し公式HPがあり、競合でなければ verdict=auto\n" +
        "- 次のいずれかに該当・疑いがあれば verdict=review: " +
        "①競合（法人向けAI研修/生成AI研修/AI人材育成/DX研修等を自社の商品として提供する研修会社・スクール・コンサル。一般企業の社内DX部門やAI活用企業は競合ではない） " +
        "②会社が実在すると確認できない ③公式HPが見つからない ④メールドメインが会社と明らかに無関係（大企業の関連会社ドメイン等は無関係と断定しない）\n" +
        "- 確信が持てない場合は review に倒す。検索は最小限（2〜4回）で判定する。",
      messages: [
        {
          role: "user",
          content:
            `以下のリードを審査してください。\n会社名: ${company}\n氏名: ${clip(data["お名前"])}\n役職: ${clip(data["役職"])}\nメールアドレス: ${email}\n電話番号: ${clip(data["電話番号"])}\n請求資料: ${clip(data["資料名"])}`,
        },
      ],
      tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 5 }],
      output_config: { format: zodOutputFormat(ScreeningSchema) },
    });
    const out = response.parsed_output;
    if (!out) return { verdict: "review", reasons: ["AI審査の結果を解釈できず（要確認に倒す）"] };
    return { verdict: out.verdict, reasons: out.reasons, summary: out.summary };
  } catch (e) {
    // 審査自体の失敗で返信を止めない（従来どおり返信し、Discordに審査失敗と出す）
    return { verdict: "skipped", reasons: [`AI審査エラー: ${e instanceof Error ? e.message.slice(0, 120) : "unknown"}`] };
  }
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

async function notifyDiscord(data: Record<string, unknown>, screening: Screening) {
  const webhook = process.env.DISCORD_DOC_DL_WEBHOOK;
  if (!webhook) return;
  const fields: { name: string; value: string; inline: boolean }[] = NOTIFY_FIELDS.filter(
    ([key]) => clip(data[key]),
  ).map(([key, name]) => ({
    name,
    value: clip(data[key]),
    inline: key !== "資料名" && key !== "ページ",
  }));
  const judge =
    screening.verdict === "auto"
      ? "✅ 問題なし → 自動返信済み"
      : screening.verdict === "review"
        ? "⚠️ **要確認 → 自動返信は保留中**（問題なければ手動で資料をご案内ください）"
        : `➖ AI審査スキップ → 自動返信済み${screening.reasons[0] ? `（${screening.reasons[0]}）` : ""}`;
  const parts = [judge];
  if (screening.verdict === "review" && screening.reasons.length) {
    parts.push(...screening.reasons.map((r) => `・${r.slice(0, 180)}`));
  }
  if (screening.summary) parts.push(`📝 ${screening.summary.slice(0, 300)}`);
  fields.push({ name: "AI審査", value: parts.join("\n").slice(0, 1000), inline: false });
  await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title:
            screening.verdict === "review"
              ? "⚠️ 資料ダウンロード（要確認・返信保留）"
              : "📥 資料ダウンロードがありました",
          color: screening.verdict === "review" ? 0xe6a817 : 0x2c5c9c,
          fields,
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  }).catch(() => {});
}

async function sendAutoReply(data: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY;
  const email = clip(data["メールアドレス"]);
  const docs = DOCS[clip(data["資料名"])];
  if (!apiKey || !docs || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

  const name = clip(data["お名前"]);
  const docName = clip(data["資料名"]);
  // 件名用：お名前の名字（半角/全角スペース区切りの先頭）。例「山田 太郎」→「山田」
  const surname = name.split(/[\s　]+/)[0] || "";
  const subject = surname
    ? `${surname}さま【資料ダウンロードリンクのご案内】バイテック法人AI研修 ${docName}`
    : `【資料ダウンロードリンクのご案内】バイテック法人AI研修 ${docName}`;
  const linksHtml = docs.items
    .map(
      (d) =>
        `<p style="margin:0 0 14px;"><b>${escapeHtml(d.title)}</b><br>` +
        `▶ ブラウザで読む: <a href="${d.view}">${d.view}</a><br>` +
        `▶ PDFダウンロード: <a href="${d.pdf}">${d.pdf}</a></p>`,
    )
    .join("");
  const linksText = docs.items
    .map((d) => `■ ${d.title}\n  ブラウザで読む: ${d.view}\n  PDF: ${d.pdf}`)
    .join("\n\n");

  // メールクライアント互換のためテーブルレイアウト。ロゴPNGは自サイト配信（?v=でキャッシュ管理）
  const LOGO_W = `${SITE}/biz/assets/img/mail/logo-w.png?v=20260920`;
  const LOGO_B = `${SITE}/biz/assets/img/mail/logo-b.png?v=20260920`;
  const html = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f5;">
<tr><td align="center" style="padding:0;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#ffffff;">
  <tr><td align="center" style="background:#2963B4;padding:20px 0;">
    <img src="${LOGO_W}" width="150" alt="byTech BUSINESS" style="display:block;width:150px;height:auto;">
  </td></tr>
  <tr><td style="padding:32px 28px 8px;font-family:sans-serif;font-size:14px;line-height:1.9;color:#1a2330;">
    <p style="margin:0 0 18px;">${escapeHtml(name)} 様</p>
    <p style="margin:0 0 18px;">この度は「バイテック法人AI研修」の資料をダウンロードいただき、誠にありがとうございます。<br>
    ご請求いただいた資料は、以下よりご覧いただけます。</p>
    <p style="margin:0 0 18px;">${escapeHtml(docs.intro)}</p>
    <div style="background:#f4f7fb;border-radius:8px;padding:18px 20px;margin:0 0 18px;">${linksHtml}</div>
    <p style="margin:0 0 18px;">研修内容や助成金の活用について、より詳しくお知りになりたい場合は、<br>
    無料の個別相談も承っております。<br>
    ▶ <a href="${SITE}/counseling" style="color:#2963B4;">無料個別相談を予約する</a></p>
    <p style="margin:0 0 8px;">ご不明な点がございましたら、本メールへの返信にてお気軽にお問い合わせください。</p>
  </td></tr>
  <tr><td style="padding:24px 28px 32px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="border-top:1px solid #e6eaf0;padding-top:24px;font-family:sans-serif;font-size:12px;line-height:1.9;color:#5a6472;text-align:left;">
        ※ このメールは、資料ダウンロードフォームにご入力いただいた方にお送りしています。<br>
        ご不明点などございましたら <a href="mailto:customer-success@bytech.jp" style="color:#2963B4;">customer-success@bytech.jp</a> までご連絡ください。
      </td></tr>
      <tr><td align="center" style="padding:28px 0 14px;">
        <img src="${LOGO_B}" width="140" alt="byTech BUSINESS" style="display:block;width:140px;height:auto;">
      </td></tr>
      <tr><td align="center" style="font-family:sans-serif;font-size:12px;color:#5a6472;">
        <a href="${SITE}/specified_commercial" style="color:#2963B4;">運営会社</a>&nbsp;&nbsp;&nbsp;<a href="${SITE}/privacy-policy" style="color:#2963B4;">プライバシーポリシー</a>
      </td></tr>
    </table>
  </td></tr>
</table>
</td></tr></table>`;

  const text = `${name} 様

この度は「バイテック法人AI研修」の資料をダウンロードいただき、誠にありがとうございます。
ご請求いただいた資料は、以下よりご覧いただけます。

${docs.intro}

${linksText}

研修内容や助成金の活用について、より詳しくお知りになりたい場合は、
無料の個別相談も承っております。
▶ ${SITE}/counseling

ご不明な点がございましたら、本メールへの返信にてお気軽にお問い合わせください。

――――――――――――――――――――
株式会社AI棒　バイテック法人AI研修
${SITE}
※本メールは資料ダウンロードフォームにご入力いただいた方へ自動送信しています。`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({
      // 差出人ドメインは biz.bytech.jp（2026-09-20 Resend認証済み・トラッキング無効）
      from: process.env.DOC_DL_MAIL_FROM || "バイテック法人AI研修 <noreply@biz.bytech.jp>",
      to: [email],
      reply_to: "customer-success@bytech.jp",
      subject,
      html,
      text,
    }),
  }).catch(() => {});
}

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => null);
  // 資料名のない/空のPOSTは無視（公開エンドポイントのため最低限のガード）
  if (!data || !clip(data["資料名"])) {
    return new Response(null, { status: 204 });
  }
  // 審査してから分岐。問題なければ通知せず自動返信のみ、疑わしい(review)ときだけ
  // Discordへ理由付きで通知して返信を保留する（通常DLの記録はformrun管理画面で見る運用）。
  const screening = await screenLead(data);
  if (screening.verdict === "review") {
    await notifyDiscord(data, screening);
  } else {
    await sendAutoReply(data);
  }
  return new Response(null, { status: 204 });
}
