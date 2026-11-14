import { createPublicKey, verify } from "node:crypto";

// Discord のボタン操作（Interactions）を受けるための道具。lms_bytech の lib/discord-interactions.ts と同じ方式。
// ボタン付きのメッセージは Webhook では送れないため Bot（DISCORD_BOT_TOKEN）から送り、
// 押されると Discord が Interactions Endpoint URL（/api/discord/interactions）へ送ってくる。
// 本当に Discord から来たかは、アプリの公開鍵（DISCORD_PUBLIC_KEY）で署名を確かめる。

const DISCORD_API = "https://discord.com/api/v10";
// これより古い署名は受け付けない（秒。盗み見た送信の使い回しを防ぐ）
const MAX_SIGNATURE_AGE_SECONDS = 5 * 60;

export const InteractionType = { PING: 1, MESSAGE_COMPONENT: 3 } as const;
export const ResponseType = { PONG: 1, CHANNEL_MESSAGE: 4, DEFERRED_UPDATE_MESSAGE: 6 } as const;
// 押した本人にだけ見えるメッセージ
const EPHEMERAL = 64;

export type DiscordEmbed = {
  title?: string;
  color?: number;
  fields?: { name: string; value: string; inline?: boolean }[];
  timestamp?: string;
};

export type DiscordInteraction = {
  type: number;
  application_id: string;
  token: string;
  data?: { custom_id?: string };
  member?: { roles?: string[]; nick?: string | null; user?: { id: string; username?: string; global_name?: string | null } };
  message?: { embeds?: DiscordEmbed[] };
};

export function verifyDiscordSignature(body: string, signature: string | null, timestamp: string | null): boolean {
  // 貼り付けたときに前後の空白・改行や引用符が入っても読めるようにする
  const key = (process.env.DISCORD_PUBLIC_KEY ?? "").trim().replace(/^["']|["']$/g, "");
  // 断った理由を Vercel のログに残す（鍵そのものは出さない）
  const reject = (reason: string) => {
    console.warn("DISCORD_SIGNATURE_REJECTED", reason);
    return false;
  };
  if (!/^[0-9a-f]{64}$/i.test(key)) return reject("DISCORD_PUBLIC_KEY が未設定か形が違う");
  if (!signature || !timestamp || !/^[0-9a-f]{128}$/i.test(signature)) return reject("署名が付いていない");
  const sentAt = Number(timestamp);
  if (!Number.isFinite(sentAt) || Math.abs(Date.now() / 1000 - sentAt) > MAX_SIGNATURE_AGE_SECONDS) return reject("署名の時刻が古い");
  try {
    const publicKey = createPublicKey({
      key: { kty: "OKP", crv: "Ed25519", x: Buffer.from(key, "hex").toString("base64url") },
      format: "jwk",
    });
    return verify(null, Buffer.from(timestamp + body), publicKey, Buffer.from(signature, "hex")) || reject("署名が合わない");
  } catch {
    return reject("公開鍵を読めない");
  }
}

// 押した人のサーバーでの表示名（ニックネーム → 表示名 → ユーザー名）
export const memberDisplayName = (interaction: DiscordInteraction) =>
  interaction.member?.nick || interaction.member?.user?.global_name || interaction.member?.user?.username || "不明";

// 押した人が、指定したロールのどれかを持っているか
export const memberHasRole = (interaction: DiscordInteraction, roleIds: string[]) =>
  (interaction.member?.roles ?? []).some((role) => roleIds.includes(role));

export const ephemeralReply = (content: string) => ({
  type: ResponseType.CHANNEL_MESSAGE,
  data: { content, flags: EPHEMERAL, allowed_mentions: { parse: [] } },
});

// Bot としてチャンネルへ送る（ボタンを付けられるのはこちらだけ）
export async function postChannelMessage(channelId: string, payload: { embeds: DiscordEmbed[]; components?: unknown[] }) {
  const res = await fetch(`${DISCORD_API}/channels/${channelId}/messages`, {
    method: "POST",
    headers: { authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`, "content-type": "application/json" },
    body: JSON.stringify({ ...payload, allowed_mentions: { parse: [] } }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) console.log("DISCORD_BOT_POST_ERROR", res.status, (await res.text()).slice(0, 300));
  return res.ok;
}

// ボタンが付いていたメッセージを書き換える（受け付けてから15分のあいだ使える）
export async function editInteractionMessage(interaction: DiscordInteraction, payload: { embeds: DiscordEmbed[]; components: unknown[] }) {
  const res = await fetch(`${DISCORD_API}/webhooks/${interaction.application_id}/${interaction.token}/messages/@original`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...payload, allowed_mentions: { parse: [] } }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) console.log("DISCORD_EDIT_ERROR", res.status, (await res.text()).slice(0, 300));
  return res.ok;
}
