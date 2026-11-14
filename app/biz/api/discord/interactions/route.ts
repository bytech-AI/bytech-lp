// Discord のボタン操作の受け口（ログインではなく Discord の署名で守る）。
// biz ホストでは proxy が /api/discord/interactions を /biz/api/discord/interactions へリライトする。
// Discord 開発者ページの Interactions Endpoint URL に https://biz.bytech.jp/api/discord/interactions を登録する。
// env（リポジトリには含めない）:
//   DISCORD_PUBLIC_KEY      … アプリの公開鍵（開発者ページの General Information）
//   DISCORD_TRIAL_ROLE_IDS  … 審査ボタンを押せるロールID（カンマ区切り）。未設定ならチャンネルに入れる人は誰でも押せる
import { NextResponse, after } from "next/server";
import {
  InteractionType,
  ResponseType,
  ephemeralReply,
  memberHasRole,
  verifyDiscordSignature,
  type DiscordInteraction,
} from "@/lib/discord-interactions";
import { TRIAL_APPROVE, TRIAL_REJECT, handleTrialReview } from "./trial-review";

export const runtime = "nodejs";
// メール送信と通知の書き換えを、Discord へ返事をしたあとに続けるための余裕（秒）
export const maxDuration = 60;

export async function POST(request: Request) {
  const body = await request.text();
  if (!verifyDiscordSignature(body, request.headers.get("x-signature-ed25519"), request.headers.get("x-signature-timestamp"))) {
    return new NextResponse("invalid request signature", { status: 401 });
  }

  const interaction = JSON.parse(body) as DiscordInteraction;
  // 受け口の URL を登録するとき、Discord が届くかを確かめに来る
  if (interaction.type === InteractionType.PING) return NextResponse.json({ type: ResponseType.PONG });

  const customId = interaction.data?.custom_id ?? "";
  if (interaction.type === InteractionType.MESSAGE_COMPONENT && (customId === TRIAL_APPROVE || customId === TRIAL_REJECT)) {
    const roleIds = (process.env.DISCORD_TRIAL_ROLE_IDS ?? "").split(",").map((s) => s.trim()).filter(Boolean);
    if (roleIds.length && !memberHasRole(interaction, roleIds)) {
      return NextResponse.json(ephemeralReply("このボタンを押せる権限がありません。"));
    }
    // Discord は3秒以内の返事を求めるので、メール送信と書き換えは返事のあとに回す
    after(() => handleTrialReview(interaction, customId === TRIAL_APPROVE));
    return NextResponse.json({ type: ResponseType.DEFERRED_UPDATE_MESSAGE });
  }

  return NextResponse.json(ephemeralReply("この操作には対応していません。"));
}
