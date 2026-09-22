#!/usr/bin/env node
/**
 * リブランディング用の現状値（ベースライン）を GSC / GA4 / Clarity から取得する。
 *
 * 使い方:
 *   node scripts/analytics-baseline.mjs            # 直近90日
 *   node scripts/analytics-baseline.mjs --days 28  # 期間指定
 *   node scripts/analytics-baseline.mjs --json     # 生JSONも保存
 *
 * 必要な環境変数（.env.local）:
 *   GOOGLE_SERVICE_ACCOUNT_KEY_FILE  … サービスアカウントの鍵JSONのパス（GSC・GA4共通）
 *   GSC_SITE_URLS                    … 例 "sc-domain:bytech.jp"（カンマ区切りで複数可）
 *   GA4_PROPERTY_IDS                 … 例 "123456789,987654321"（カンマ区切りで複数可）
 *   GA4_PROPERTY_LABELS              … 上と同順の表示名（任意）
 *   CLARITY_API_TOKEN                … Clarity の Data Export API トークン（任意）
 *   CLARITY_PROJECT_LABELS           … トークンが複数ある場合の表示名（任意）
 *
 * 出力: docs/analytics/baseline-YYYY-MM-DD.md（--json で同名 .json も）
 */
import { createSign } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

// ---------- 引数 ----------
const args = process.argv.slice(2);
const argVal = (name, def) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
};
const DAYS = Number(argVal("--days", "90"));
const SAVE_JSON = args.includes("--json");

// ---------- .env.local を読む（dotenv 不使用） ----------
async function loadEnv() {
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
await loadEnv();

const env = (k) => process.env[k]?.trim() || "";
const list = (k) =>
  env(k)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

// ---------- 期間 ----------
const fmt = (d) => d.toISOString().slice(0, 10);
const today = new Date();
const end = new Date(today);
end.setUTCDate(end.getUTCDate() - 2); // GSC は直近2日が未確定
const start = new Date(end);
start.setUTCDate(start.getUTCDate() - (DAYS - 1));
const START = fmt(start);
const END = fmt(end);

// ---------- Google 認証（サービスアカウント JWT → access token） ----------
async function googleAccessToken(scopes) {
  const keyFile = env("GOOGLE_SERVICE_ACCOUNT_KEY_FILE");
  if (!keyFile) throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY_FILE が未設定");
  const key = JSON.parse(await readFile(path.resolve(keyFile), "utf8"));
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
  const assertion = `${header}.${claim}.${sig}`;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!res.ok) throw new Error(`token 取得失敗: ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}

async function gPost(token, url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${url} → ${res.status} ${await res.text()}`);
  return res.json();
}

// ---------- GSC ----------
const BRAND_RE = /バイテック|bytech|ばいてっく|バイテク/i;

async function fetchGsc(token, siteUrl) {
  const base = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
  const q = (dimensions, extra = {}) =>
    gPost(token, base, { startDate: START, endDate: END, dimensions, rowLimit: 500, ...extra });

  const [total, byQuery, byPage, byDate] = await Promise.all([
    q([]),
    q(["query"]),
    q(["page"]),
    q(["date"]),
  ]);

  const rows = byQuery.rows ?? [];
  const brand = rows.filter((r) => BRAND_RE.test(r.keys[0]));
  const sum = (arr, k) => arr.reduce((a, r) => a + (r[k] ?? 0), 0);
  const totalRow = total.rows?.[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };

  return {
    siteUrl,
    total: totalRow,
    brand: {
      clicks: sum(brand, "clicks"),
      impressions: sum(brand, "impressions"),
      queries: brand.length,
      topQueries: brand.slice(0, 15),
    },
    nonBrandClicks: totalRow.clicks - sum(brand, "clicks"),
    topQueries: rows.slice(0, 25),
    topPages: (byPage.rows ?? []).slice(0, 25),
    daily: (byDate.rows ?? []).map((r) => ({ date: r.keys[0], clicks: r.clicks, impressions: r.impressions })),
  };
}

// ---------- GA4 ----------
async function fetchGa4(token, propertyId, label) {
  const url = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;
  const range = { dateRanges: [{ startDate: START, endDate: END }] };
  const run = (body) => gPost(token, url, { ...range, ...body });

  const [totals, bySource, events, landing, byHost, meta] = await Promise.all([
    run({ metrics: [{ name: "sessions" }, { name: "totalUsers" }, { name: "newUsers" }, { name: "engagementRate" }, { name: "conversions" }] }),
    run({
      dimensions: [{ name: "sessionSourceMedium" }],
      metrics: [{ name: "sessions" }, { name: "conversions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 25,
    }),
    run({
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
      limit: 50,
    }),
    run({
      dimensions: [{ name: "landingPage" }],
      metrics: [{ name: "sessions" }, { name: "conversions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 25,
    }),
    // ホスト名別（広告ドメインを1プロパティに集約している構成のため必須）
    run({
      dimensions: [{ name: "hostName" }],
      metrics: [{ name: "sessions" }, { name: "keyEvents" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 40,
    }),
    fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}/metadata`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => (r.ok ? r.json() : null)),
  ]);

  const toRows = (rep) =>
    (rep.rows ?? []).map((r) => ({
      ...Object.fromEntries((r.dimensionValues ?? []).map((d, i) => [rep.dimensionHeaders[i].name, d.value])),
      ...Object.fromEntries((r.metricValues ?? []).map((m, i) => [rep.metricHeaders[i].name, Number(m.value)])),
    }));

  // 設定済みキーイベント（conversion）名
  const keyEvents = (meta?.metrics ?? [])
    .filter((m) => m.apiName?.startsWith("keyEvents:") || m.apiName?.startsWith("conversions:"))
    .map((m) => m.apiName.split(":")[1]);

  return {
    propertyId,
    label,
    totals: toRows(totals)[0] ?? {},
    bySource: toRows(bySource),
    events: toRows(events),
    landing: toRows(landing),
    byHost: toRows(byHost),
    keyEvents,
  };
}

// ---------- Clarity ----------
async function fetchClarity(token, label) {
  // Data Export API: 直近1〜3日のみ、1日10回まで
  const res = await fetch("https://www.clarity.ms/export-data/api/v1/project-live-insights?numOfDays=3", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Clarity → ${res.status} ${await res.text()}`);
  return { label, data: await res.json() };
}

// ---------- 実行 ----------
const out = { generatedAt: new Date().toISOString(), range: { start: START, end: END, days: DAYS }, gsc: [], ga4: [], clarity: [], errors: [] };

const gscSites = list("GSC_SITE_URLS");
const ga4Props = list("GA4_PROPERTY_IDS");
const ga4Labels = list("GA4_PROPERTY_LABELS");
if (gscSites.length || ga4Props.length) {
  let token;
  try {
    token = await googleAccessToken([
      "https://www.googleapis.com/auth/webmasters.readonly",
      "https://www.googleapis.com/auth/analytics.readonly",
    ]);
  } catch (e) {
    out.errors.push(`Google認証: ${e.message}`);
  }
  if (token) {
    for (const s of gscSites) {
      try {
        out.gsc.push(await fetchGsc(token, s));
      } catch (e) {
        out.errors.push(`GSC ${s}: ${e.message}`);
      }
    }
    for (const [i, p] of ga4Props.entries()) {
      try {
        out.ga4.push(await fetchGa4(token, p, ga4Labels[i] ?? p));
      } catch (e) {
        out.errors.push(`GA4 ${p}: ${e.message}`);
      }
    }
  }
} else {
  out.errors.push("GSC_SITE_URLS / GA4_PROPERTY_IDS が未設定");
}

const clarityTokens = list("CLARITY_API_TOKEN");
const clarityLabels = list("CLARITY_PROJECT_LABELS");
for (const [i, t] of clarityTokens.entries()) {
  try {
    out.clarity.push(await fetchClarity(t, clarityLabels[i] ?? `project-${i + 1}`));
  } catch (e) {
    out.errors.push(`Clarity: ${e.message}`);
  }
}

// ---------- Markdown ----------
const pct = (n) => `${(n * 100).toFixed(1)}%`;
const num = (n) => Number(n ?? 0).toLocaleString("ja-JP");
const md = [];
md.push(`# ベースライン ${START} 〜 ${END}（${DAYS}日）`, "", `取得: ${out.generatedAt}`, "");

for (const g of out.gsc) {
  md.push(`## GSC: ${g.siteUrl}`, "");
  md.push(`| 指標 | 値 |`, `|---|---|`);
  md.push(`| クリック | ${num(g.total.clicks)} |`);
  md.push(`| 表示回数 | ${num(g.total.impressions)} |`);
  md.push(`| CTR | ${pct(g.total.ctr)} |`);
  md.push(`| 平均掲載順位 | ${Number(g.total.position).toFixed(1)} |`);
  md.push(`| 指名クリック（バイテック系） | ${num(g.brand.clicks)}（${g.brand.queries}クエリ） |`);
  md.push(`| 非指名クリック | ${num(g.nonBrandClicks)} |`);
  md.push(`| 指名比率 | ${g.total.clicks ? pct(g.brand.clicks / g.total.clicks) : "-"} |`, "");
  md.push(`### 上位クエリ`, "", `| クエリ | クリック | 表示 | 順位 |`, `|---|---|---|---|`);
  for (const r of g.topQueries) md.push(`| ${r.keys[0]} | ${num(r.clicks)} | ${num(r.impressions)} | ${r.position.toFixed(1)} |`);
  md.push("", `### 上位ページ`, "", `| ページ | クリック | 表示 |`, `|---|---|---|`);
  for (const r of g.topPages) md.push(`| ${r.keys[0].replace("https://bytech.jp", "")} | ${num(r.clicks)} | ${num(r.impressions)} |`);
  md.push("");
}

for (const a of out.ga4) {
  md.push(`## GA4: ${a.label}（${a.propertyId}）`, "");
  md.push(`| 指標 | 値 |`, `|---|---|`);
  for (const [k, v] of Object.entries(a.totals)) md.push(`| ${k} | ${k === "engagementRate" ? pct(v) : num(v)} |`);
  md.push(`| キーイベント設定 | ${a.keyEvents.join(", ") || "（未設定）"} |`, "");
  md.push(`### 流入元（source / medium）`, "", `| 流入元 | セッション | CV |`, `|---|---|---|`);
  for (const r of a.bySource) md.push(`| ${r.sessionSourceMedium} | ${num(r.sessions)} | ${num(r.conversions)} |`);
  md.push("", `### ホスト名別`, "", `| ホスト | セッション | キーイベント |`, `|---|---|---|`);
  for (const r of a.byHost) md.push(`| ${r.hostName} | ${num(r.sessions)} | ${num(r.keyEvents)} |`);
  md.push("", `### ランディングページ`, "", `| LP | セッション | CV |`, `|---|---|---|`);
  for (const r of a.landing) md.push(`| ${r.landingPage} | ${num(r.sessions)} | ${num(r.conversions)} |`);
  md.push("", `### イベント`, "", `| イベント | 回数 |`, `|---|---|`);
  for (const r of a.events) md.push(`| ${r.eventName} | ${num(r.eventCount)} |`);
  md.push("");
}

for (const c of out.clarity) {
  md.push(`## Clarity: ${c.label}（直近3日）`, "");
  for (const block of c.data ?? []) {
    md.push(`### ${block.metricName}`, "");
    for (const info of block.information ?? []) {
      md.push(`- ${Object.entries(info).map(([k, v]) => `${k}: ${v}`).join(" / ")}`);
    }
    md.push("");
  }
}

if (out.errors.length) {
  md.push(`## エラー`, "");
  for (const e of out.errors) md.push(`- ${e}`);
  md.push("");
}

const outDir = path.resolve("docs/analytics");
await mkdir(outDir, { recursive: true });
const stamp = fmt(today);
const mdPath = path.join(outDir, `baseline-${stamp}.md`);
await writeFile(mdPath, md.join("\n"), "utf8");
if (SAVE_JSON) await writeFile(path.join(outDir, `baseline-${stamp}.json`), JSON.stringify(out, null, 2), "utf8");

console.log(md.join("\n"));
console.log(`\n→ 保存: ${path.relative(process.cwd(), mdPath)}`);
if (out.errors.length) process.exitCode = 1;
