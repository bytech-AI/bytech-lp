// Google API 認証（サービスアカウント JWT → access token）。scripts/*.mjs から共用。
import { createSign } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

/** .env.local / .env を process.env に読み込む（dotenv 不使用、既存の値は上書きしない） */
export async function loadEnv() {
  for (const f of [".env.local", ".env"]) {
    try {
      const txt = await readFile(path.resolve(f), "utf8");
      for (const line of txt.split("\n")) {
        const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
        if (!m) continue;
        const [, k, raw] = m;
        if (process.env[k] !== undefined) continue;
        process.env[k] = raw.replace(/^["']|["']$/g, "");
      }
    } catch {
      /* ファイルが無ければ無視 */
    }
  }
}

/**
 * サービスアカウント鍵を読む。
 * GOOGLE_SERVICE_ACCOUNT_JSON（JSON文字列。CI用）があればそれを、無ければ
 * GOOGLE_SERVICE_ACCOUNT_KEY_FILE（パス。ローカル用）を使う。
 */
export async function loadServiceAccount() {
  const inline = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
  if (inline) return JSON.parse(inline);
  const keyFile = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE?.trim();
  if (!keyFile) throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY_FILE か GOOGLE_SERVICE_ACCOUNT_JSON が未設定");
  return JSON.parse(await readFile(path.resolve(keyFile), "utf8"));
}

export async function googleAccessToken(scopes) {
  const key = await loadServiceAccount();
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const header = b64({ alg: "RS256", typ: "JWT" });
  const claim = b64({
    iss: key.client_email,
    scope: scopes.join(" "),
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  });
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claim}`);
  const sig = signer.sign(key.private_key).toString("base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claim}.${sig}`,
    }),
  });
  if (!res.ok) throw new Error(`token 取得失敗: ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}

export async function googlePost(token, url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${url} → ${res.status} ${await res.text()}`);
  return res.json();
}
