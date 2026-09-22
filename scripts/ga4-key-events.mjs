#!/usr/bin/env node
/**
 * GA4 のキーイベントを整理する（Admin API）。
 *   - 実際に発火している CV イベントをキーイベントに登録
 *   - 発火ゼロの close_convert_lead / qualify_lead / purchase を外す
 *
 * 使い方: node scripts/ga4-key-events.mjs [--dry-run]
 * 必要: GOOGLE_SERVICE_ACCOUNT_KEY_FILE（.env.local）、サービスアカウントが各プロパティの「編集者」
 */
import { createSign } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DRY = process.argv.includes("--dry-run");

for (const f of [".env.local", ".env"]) {
  try {
    for (const line of (await readFile(path.resolve(f), "utf8")).split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {}
}

const key = JSON.parse(await readFile(path.resolve(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE), "utf8"));
async function token(scopes) {
  const now = Math.floor(Date.now() / 1000);
  const b = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const h = b({ alg: "RS256", typ: "JWT" });
  const c = b({ iss: key.client_email, scope: scopes.join(" "), aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 });
  const s = createSign("RSA-SHA256");
  s.update(`${h}.${c}`);
  const sig = s.sign(key.private_key).toString("base64url");
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${h}.${c}.${sig}` }),
  });
  return (await r.json()).access_token;
}

const t = await token(["https://www.googleapis.com/auth/analytics.edit"]);
const H = { Authorization: `Bearer ${t}`, "Content-Type": "application/json" };
const BASE = "https://analyticsadmin.googleapis.com/v1beta";

// プロパティごとに「キーイベントにしたい実イベント」
const PLAN = {
  539358185: { label: "バイテック[All]", add: ["cv_seminar", "cv_setsumeikai"] },
  501001877: { label: "オーガニック", add: ["form_submit"] },
  501985542: { label: "AI HACK経由(lp)", add: ["form_submit"] },
  544228208: { label: "geek", add: ["cv_setsumeikai"] },
  552478358: { label: "デジット", add: ["cv_setsumeikai"] },
};
// 90日間発火ゼロだったもの（purchase は GA4 既定のキーイベントで削除不可のため除外）
const DEAD = new Set(["close_convert_lead", "qualify_lead"]);

for (const [p, cfg] of Object.entries(PLAN)) {
  const list = await (await fetch(`${BASE}/properties/${p}/keyEvents`, { headers: H })).json();
  const existing = list.keyEvents ?? [];
  const have = new Set(existing.map((k) => k.eventName));

  for (const ev of cfg.add) {
    if (have.has(ev)) {
      console.log(`[${cfg.label}] ${ev} は登録済み`);
      continue;
    }
    if (DRY) {
      console.log(`[${cfg.label}] (dry) 追加 ${ev}`);
      continue;
    }
    const r = await fetch(`${BASE}/properties/${p}/keyEvents`, {
      method: "POST",
      headers: H,
      body: JSON.stringify({ eventName: ev, countingMethod: "ONCE_PER_EVENT" }),
    });
    console.log(`[${cfg.label}] 追加 ${ev} → ${r.status}${r.ok ? "" : " " + (await r.text()).slice(0, 200)}`);
  }

  for (const k of existing) {
    if (!DEAD.has(k.eventName)) continue;
    if (DRY) {
      console.log(`[${cfg.label}] (dry) 削除 ${k.eventName}`);
      continue;
    }
    const r = await fetch(`${BASE}/${k.name}`, { method: "DELETE", headers: H });
    console.log(`[${cfg.label}] 削除 ${k.eventName} → ${r.status}${r.ok ? "" : " " + (await r.text()).slice(0, 200)}`);
  }

  const after = await (await fetch(`${BASE}/properties/${p}/keyEvents`, { headers: H })).json();
  console.log(`[${cfg.label}] 現在のキーイベント: ${(after.keyEvents ?? []).map((k) => k.eventName).join(", ") || "(なし)"}`);
}
