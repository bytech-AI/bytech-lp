// 資料DLフォーム送信の後処理ブリッジ。フロントが formrun 送信成功後に sendBeacon で
// ここへ投げ、サーバーが (1) Discord通知 (2) 資料リンク入り自動返信メール(Resend) を行う。
// formrun は Discord 通知も資料別の返信文面も出せないため自前で行う。
// biz ホストでは proxy が /api/doc-dl-notify を /biz/api/doc-dl-notify へリライトする。
// env（いずれも未設定ならその処理だけスキップ。リポジトリには含めない）:
//   DISCORD_DOC_DL_WEBHOOK … Discord webhook URL
//   RESEND_API_KEY         … Resend のAPIキー（bytech.jp のドメイン認証済みであること）
//   DOC_DL_MAIL_FROM       … 差出人（既定: バイテック法人AI研修 <noreply@bytech.jp>）
import { NextRequest } from "next/server";

export const runtime = "nodejs";

const SITE = "https://biz.bytech.jp";

// 資料名 → 案内する資料。閲覧ページとPDFの両方を載せる。
const DOCS: Record<string, { title: string; view: string; pdf: string }[]> = {
  サービス概要資料: [
    { title: "サービス概要資料", view: `${SITE}/documents/ebook-01`, pdf: `${SITE}/assets/docs/ebook-01.pdf` },
  ],
  助成金活用ガイド: [
    { title: "助成金活用ガイド", view: `${SITE}/documents/ebook-02`, pdf: `${SITE}/assets/docs/ebook-02.pdf` },
  ],
  AI導入50チェックシート: [
    { title: "AI導入を成功させる50のチェックシート", view: `${SITE}/documents/ebook-03`, pdf: `${SITE}/assets/docs/ebook-03.pdf` },
  ],
};
DOCS["お役立ち資料3点セット"] = [
  ...DOCS["サービス概要資料"],
  ...DOCS["助成金活用ガイド"],
  ...DOCS["AI導入50チェックシート"],
];

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
const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

async function notifyDiscord(data: Record<string, unknown>) {
  const webhook = process.env.DISCORD_DOC_DL_WEBHOOK;
  if (!webhook) return;
  const fields = NOTIFY_FIELDS.filter(([key]) => clip(data[key])).map(([key, name]) => ({
    name,
    value: clip(data[key]),
    inline: key !== "資料名" && key !== "ページ",
  }));
  await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      embeds: [{ title: "📥 資料ダウンロードがありました", color: 0x2c5c9c, fields, timestamp: new Date().toISOString() }],
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
  const linksHtml = docs
    .map(
      (d) =>
        `<p style="margin:0 0 14px;"><b>${escapeHtml(d.title)}</b><br>` +
        `▶ ブラウザで読む: <a href="${d.view}">${d.view}</a><br>` +
        `▶ PDFダウンロード: <a href="${d.pdf}">${d.pdf}</a></p>`,
    )
    .join("");
  const linksText = docs.map((d) => `■ ${d.title}\n  ブラウザで読む: ${d.view}\n  PDF: ${d.pdf}`).join("\n\n");

  const html = `<div style="font-family:sans-serif;font-size:14px;line-height:1.9;color:#1a2330;">
<p>${escapeHtml(name)} 様</p>
<p>この度は「バイテック法人AI研修」の資料をダウンロードいただき、誠にありがとうございます。<br>
ご請求いただいた資料は、以下よりご覧いただけます。</p>
<div style="background:#f4f7fb;border-radius:8px;padding:18px 20px;margin:18px 0;">${linksHtml}</div>
<p>研修内容や助成金の活用について、より詳しくお知りになりたい場合は、<br>
無料の個別相談も承っております。<br>
▶ <a href="${SITE}/counseling">無料個別相談を予約する</a></p>
<p>ご不明な点がございましたら、本メールへの返信にてお気軽にお問い合わせください。</p>
<p style="margin-top:26px;color:#5a6472;font-size:12px;">――――――――――――――――――――<br>
株式会社AI棒　バイテック法人AI研修<br>
<a href="${SITE}">${SITE}</a><br>
※本メールは資料ダウンロードフォームにご入力いただいた方へ自動送信しています。</p>
</div>`;

  const text = `${name} 様

この度は「バイテック法人AI研修」の資料をダウンロードいただき、誠にありがとうございます。
ご請求いただいた資料は、以下よりご覧いただけます。

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
      from: process.env.DOC_DL_MAIL_FROM || "バイテック法人AI研修 <noreply@bytech.jp>",
      to: [email],
      reply_to: "customer-success@bytech.jp",
      subject: `【バイテック法人AI研修】資料のご案内（${docName}）`,
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
  await Promise.all([notifyDiscord(data), sendAutoReply(data)]);
  return new Response(null, { status: 204 });
}
