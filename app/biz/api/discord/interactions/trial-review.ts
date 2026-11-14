// eラーニング無料トライアルの審査（Discord の「承認」「非承認」ボタン）。
// 承認 → 申込者へ審査完了の案内メール（Resend）を送り、通知を「承認済み」に書き換える。
// 非承認 → メールは送らず、通知を「非承認」に書き換えるだけ。
// 申込者の名前・メールは、ボタンが付いていた通知の項目から読む（DBは持たない）。
import { editInteractionMessage, memberDisplayName, type DiscordEmbed, type DiscordInteraction } from "@/lib/discord-interactions";

export const TRIAL_APPROVE = "trial:approve";
export const TRIAL_REJECT = "trial:reject";

const SITE = "https://biz.bytech.jp";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

const fieldValue = (embed: DiscordEmbed | undefined, name: string) =>
  embed?.fields?.find((f) => f.name === name)?.value.trim() ?? "";

async function sendApprovalMail(name: string, company: string, email: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;

  // 件名用：お名前の名字（半角/全角スペース区切りの先頭）
  const surname = name.split(/[\s　]+/)[0] || "";
  const subject = `${surname ? `${surname}さま` : ""}【審査完了のお知らせ】バイテック法人AI研修 eラーニング無料トライアル`;
  const LOGO_W = `${SITE}/biz/assets/img/mail/logo-w.png?v=20260920`;
  const LOGO_B = `${SITE}/biz/assets/img/mail/logo-b.png?v=20260920`;
  const html = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f5;">
<tr><td align="center" style="padding:0;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#ffffff;">
  <tr><td align="center" style="background:#2963B4;padding:20px 0;">
    <img src="${LOGO_W}" width="150" alt="byTech BUSINESS" style="display:block;width:150px;height:auto;">
  </td></tr>
  <tr><td style="padding:32px 28px 8px;font-family:sans-serif;font-size:14px;line-height:1.9;color:#1a2330;">
    <p style="margin:0 0 18px;">${company ? `${escapeHtml(company)}<br>` : ""}${escapeHtml(name)} 様</p>
    <p style="margin:0 0 18px;">この度は「バイテック法人AI研修」eラーニングの無料トライアルにお申し込みいただき、誠にありがとうございます。<br>
    審査の結果、無料トライアルをご利用いただけることになりました。</p>
    <p style="margin:0 0 18px;">トライアル用のログイン情報（ID・パスワード）と開始方法は、準備が整い次第、担当者よりこのメールアドレス宛にお送りします。今しばらくお待ちください。</p>
    <p style="margin:0 0 18px;">サービスの内容は、こちらの資料でもご確認いただけます。<br>
    ▶ <a href="${SITE}/documents/ebook-39" style="color:#2963B4;">法人向けAIeラーニング サービス概要資料</a></p>
    <p style="margin:0 0 8px;">ご不明な点がございましたら、本メールへの返信にてお気軽にお問い合わせください。</p>
  </td></tr>
  <tr><td style="padding:24px 28px 32px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="border-top:1px solid #e6eaf0;padding-top:24px;font-family:sans-serif;font-size:12px;line-height:1.9;color:#5a6472;text-align:left;">
        ※ このメールは、eラーニング無料トライアルにお申し込みいただいた方にお送りしています。<br>
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

  const text = `${company ? `${company}\n` : ""}${name} 様

この度は「バイテック法人AI研修」eラーニングの無料トライアルにお申し込みいただき、誠にありがとうございます。
審査の結果、無料トライアルをご利用いただけることになりました。

トライアル用のログイン情報（ID・パスワード）と開始方法は、準備が整い次第、担当者よりこのメールアドレス宛にお送りします。今しばらくお待ちください。

サービスの内容は、こちらの資料でもご確認いただけます。
▶ ${SITE}/documents/ebook-39

ご不明な点がございましたら、本メールへの返信にてお気軽にお問い合わせください。

――――――――――――――――――――
株式会社AI棒　バイテック法人AI研修
${SITE}
※本メールはeラーニング無料トライアルにお申し込みいただいた方へお送りしています。`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: process.env.DOC_DL_MAIL_FROM || "バイテック法人AI研修 <noreply@biz.bytech.jp>",
        to: [email],
        reply_to: "customer-success@bytech.jp",
        subject,
        html,
        text,
      }),
      signal: AbortSignal.timeout(15_000),
    });
    console.log("TRIAL_APPROVAL_RESEND", JSON.stringify({ status: res.status, domain: email.split("@")[1] || "", ...(res.ok ? {} : { body: (await res.text()).slice(0, 300) }) }));
    return res.ok;
  } catch (e) {
    console.log("TRIAL_APPROVAL_RESEND_ERROR", e instanceof Error ? e.message.slice(0, 200) : String(e));
    return false;
  }
}

// ボタンを押した後の処理。Discord へは先に「受け付けた」と返し、この関数は after() で動かす
export async function handleTrialReview(interaction: DiscordInteraction, approved: boolean) {
  const embed = interaction.message?.embeds?.[0] ?? {};
  const by = memberDisplayName(interaction);
  const at = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });

  let result: string;
  if (approved) {
    const sent = await sendApprovalMail(fieldValue(embed, "お名前"), fieldValue(embed, "企業名"), fieldValue(embed, "メール"));
    result = sent
      ? `✅ 承認（${by}・${at}）→ 審査完了の案内メールを送信しました`
      : `✅ 承認（${by}・${at}）→ ⚠️ 案内メールを送れませんでした。手動でご連絡ください`;
  } else {
    result = `❌ 非承認（${by}・${at}）→ 申込者へのメールは送っていません`;
  }

  const fields = (embed.fields ?? []).filter((f) => f.name !== "審査");
  fields.push({ name: "審査", value: result, inline: false });
  await editInteractionMessage(interaction, {
    embeds: [{ ...embed, color: approved ? 0x2e9d5b : 0x8a94a3, fields }],
    components: [],
  });
}
