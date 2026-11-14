// eラーニング無料トライアル申込みの Discord 通知ブリッジ。
// フロント（/e-learning/trial）が formrun 送信成功後に sendBeacon でここへ投げ、サーバーが Discord へ転送する。
// biz ホストでは proxy が /api/trial-notify を /biz/api/trial-notify へリライトする（/api/doc-dl-notify と同じ）。
// 審査制のため、Bot から「承認」「非承認」ボタン付きで送る。押した結果は /api/discord/interactions が受ける。
// env（リポジトリには含めない）:
//   DISCORD_BOT_TOKEN        … Discord Bot のトークン。DISCORD_TRIAL_CHANNEL_ID とそろえばボタン付きで送る
//   DISCORD_TRIAL_CHANNEL_ID … 通知先チャンネルのID
//   DISCORD_TRIAL_WEBHOOK    … Bot が未設定のときの送り先（ボタンなし）。どれも未設定なら何もしない
import { NextRequest } from "next/server";
import { postChannelMessage } from "@/lib/discord-interactions";
import { TRIAL_APPROVE, TRIAL_REJECT } from "../discord/interactions/trial-review";

export const runtime = "nodejs";

// 送られてきた項目 → Discord の表示名。この順で並べる
const NOTIFY_FIELDS = [
  ["企業名", "企業名"],
  ["お名前", "お名前"],
  ["部署名", "部署名"],
  ["役職", "役職"],
  ["メールアドレス", "メール"],
  ["電話番号", "電話"],
  ["会社URL", "会社URL"],
  ["従業員数", "従業員数"],
  ["導入検討時期", "導入検討時期"],
  ["検討ID数", "検討ID数"],
  ["試したいプログラム", "試したいプログラム"],
  ["ご質問・ご要望", "ご質問・ご要望"],
  ["ページ", "ページ"],
  ["流入元", "🔎 流入元"],
  ["着地ページ", "着地ページ"],
] as const;

// 長文になりうる項目は1行に並べない
const WIDE = ["会社URL", "試したいプログラム", "ご質問・ご要望", "ページ", "流入元", "着地ページ"];

const clip = (v: unknown, n = 200) => String(v ?? "").slice(0, n).trim();

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => null);
  // 企業名・メールのない/空のPOSTは無視（公開エンドポイントのため最低限のガード）
  if (!data || !clip(data["企業名"]) || !clip(data["メールアドレス"])) {
    return new Response(null, { status: 204 });
  }
  const fields: { name: string; value: string; inline: boolean }[] = NOTIFY_FIELDS.filter(([key]) => clip(data[key])).map(([key, name]) => ({
    name,
    value: clip(data[key], key === "ご質問・ご要望" ? 1000 : 200),
    inline: !WIDE.includes(key),
  }));
  const embed = {
    title: "🎓 eラーニング無料トライアルの申込みがありました",
    color: 0x1c45a3,
    fields,
    timestamp: new Date().toISOString(),
  };

  const channelId = process.env.DISCORD_TRIAL_CHANNEL_ID;
  if (process.env.DISCORD_BOT_TOKEN && channelId) {
    fields.push({ name: "審査", value: "⏳ 審査待ち（承認すると申込者へ案内メールが届きます）", inline: false });
    const buttons = [
      { type: 2, style: 3, label: "承認", custom_id: TRIAL_APPROVE },
      { type: 2, style: 4, label: "非承認", custom_id: TRIAL_REJECT },
    ];
    await postChannelMessage(channelId, { embeds: [embed], components: [{ type: 1, components: buttons }] }).catch(() => false);
    return new Response(null, { status: 204 });
  }

  const webhook = process.env.DISCORD_TRIAL_WEBHOOK;
  if (!webhook) return new Response(null, { status: 204 });
  await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ embeds: [embed] }),
  }).catch(() => {});
  return new Response(null, { status: 204 });
}
