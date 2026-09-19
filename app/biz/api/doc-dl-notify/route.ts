// 資料DLフォーム送信のDiscord通知ブリッジ。
// formrun は Discord へ直接通知できない（webhookのJSON形式が合わない）ため、
// フロントが formrun 送信成功後に sendBeacon でここへ投げ、サーバーから Discord へ転送する。
// biz ホストでは proxy が /api/doc-dl-notify を /biz/api/doc-dl-notify へリライトする。
// Webhook URL は env（DISCORD_DOC_DL_WEBHOOK）。未設定なら何もしない（開発環境で誤爆しない）。
import { NextRequest } from "next/server";

export const runtime = "nodejs";

const FIELDS = [
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

export async function POST(req: NextRequest) {
  const webhook = process.env.DISCORD_DOC_DL_WEBHOOK;
  const data = await req.json().catch(() => null);
  // 資料名のない/空のPOSTは無視（公開エンドポイントのため最低限のガード）
  if (!webhook || !data || !clip(data["資料名"])) {
    return new Response(null, { status: 204 });
  }

  const fields = FIELDS.filter(([key]) => clip(data[key])).map(([key, name]) => ({
    name,
    value: clip(data[key]),
    inline: key !== "資料名" && key !== "ページ",
  }));

  await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: "📥 資料ダウンロードがありました",
          color: 0x2c5c9c,
          fields,
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  }).catch(() => {});

  return new Response(null, { status: 204 });
}
