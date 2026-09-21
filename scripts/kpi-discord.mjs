#!/usr/bin/env node
/**
 * KPI（CV数・CVR）を GA4 から商材別に集計して Discord に投稿する。
 * リブランディングの主指標 = CV数と CVR（CV ÷ セッション）。
 *
 * 使い方:
 *   node scripts/kpi-discord.mjs              # 直近7日 vs その前7日
 *   node scripts/kpi-discord.mjs --days 28    # 期間指定
 *   node scripts/kpi-discord.mjs --dry-run    # 投稿せず内容を表示
 *
 * 必要な環境変数（.env.local / CI secrets）:
 *   GOOGLE_SERVICE_ACCOUNT_KEY_FILE または GOOGLE_SERVICE_ACCOUNT_JSON
 *   DISCORD_KPI_WEBHOOK_URL
 *
 * 商材の切り分け（ドメイン構成メモ）:
 *   - 広告LP(bytech-ad.com 配下)は共通GTMで「バイテック[All]」(539358185) に集約されている
 *   - GEEK の広告LPは g1 / g-re / g-ab / g-ft。それ以外のサブドメインは本校扱い
 *   - GEEK 本体は geek.bytech.jp（プロパティ 544228208）。広告LPも同プロパティへ二重タグ化したが、
 *     二重計上を避けるため GEEK = [All] の g-* ホスト + 544228208 の geek.bytech.jp のみ、で数える
 */
import process from "node:process";
import { loadEnv, googleAccessToken, googlePost } from "./lib/google-auth.mjs";

await loadEnv();

const args = process.argv.slice(2);
const argVal = (name, def) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
};
const DAYS = Number(argVal("--days", "7"));
const DRY = args.includes("--dry-run");

// ---------- 期間（GA4 は昨日まで） ----------
const fmt = (d) => d.toISOString().slice(0, 10);
const addDays = (d, n) => {
  const x = new Date(d);
  x.setUTCDate(x.getUTCDate() + n);
  return x;
};
const curEnd = addDays(new Date(), -1);
const curStart = addDays(curEnd, -(DAYS - 1));
const prevEnd = addDays(curStart, -1);
const prevStart = addDays(prevEnd, -(DAYS - 1));
const RANGES = [
  { name: "current", startDate: fmt(curStart), endDate: fmt(curEnd) },
  { name: "previous", startDate: fmt(prevStart), endDate: fmt(prevEnd) },
];

// ---------- 商材定義 ----------
const CV_EVENTS = ["cv_setsumeikai", "cv_seminar", "form_submit"];
const GEEK_AD_HOST = /^(g1|g-re|g-ab|g-ft)\./;
const IGNORE_HOST = /localhost|127\.0\.0\.1|^\(not set\)$|tagassistant/;

const BRANDS = [
  {
    key: "school",
    label: "本校（バイテックAIスクール＋広告LP）",
    sources: [{ property: "539358185", host: (h) => !GEEK_AD_HOST.test(h) }],
    cv: ["cv_setsumeikai", "cv_seminar"],
  },
  {
    key: "geek",
    label: "GEEK（geek.bytech.jp＋広告LP）",
    sources: [
      { property: "539358185", host: (h) => GEEK_AD_HOST.test(h) },
      { property: "544228208", host: (h) => h === "geek.bytech.jp" },
    ],
    cv: ["cv_setsumeikai"],
  },
  {
    key: "degit",
    label: "デジット（degit.jp）",
    sources: [{ property: "552478358", host: () => true }],
    cv: ["cv_setsumeikai"],
  },
  {
    key: "biz",
    label: "法人（biz.bytech.jp）",
    sources: [{ property: "501001877", host: (h) => h === "biz.bytech.jp" }],
    cv: ["form_submit"],
  },
];

// ---------- GA4 取得 ----------
const token = await googleAccessToken(["https://www.googleapis.com/auth/analytics.readonly"]);
const propertyIds = [...new Set(BRANDS.flatMap((b) => b.sources.map((s) => s.property)))];

/** property → { sessions: {host: {current, previous}}, events: {host: {event: {current, previous}}} } */
const raw = {};
for (const p of propertyIds) {
  const url = `https://analyticsdata.googleapis.com/v1beta/properties/${p}:runReport`;
  const [sess, ev] = await Promise.all([
    googlePost(token, url, {
      dateRanges: RANGES,
      dimensions: [{ name: "hostName" }],
      metrics: [{ name: "sessions" }],
      limit: 200,
    }),
    googlePost(token, url, {
      dateRanges: RANGES,
      dimensions: [{ name: "hostName" }, { name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: { filter: { fieldName: "eventName", inListFilter: { values: CV_EVENTS } } },
      limit: 500,
    }),
  ]);
  const sessions = {};
  for (const r of sess.rows ?? []) {
    const [host, range] = r.dimensionValues.map((d) => d.value); // 複数 dateRange 時は末尾に dateRange 次元（name を付けたので "current"/"previous"）が付く
    (sessions[host] ??= { current: 0, previous: 0 })[range === "previous" ? "previous" : "current"] += Number(r.metricValues[0].value);
  }
  const events = {};
  for (const r of ev.rows ?? []) {
    const [host, event, range] = r.dimensionValues.map((d) => d.value);
    ((events[host] ??= {})[event] ??= { current: 0, previous: 0 })[range === "previous" ? "previous" : "current"] += Number(r.metricValues[0].value);
  }
  raw[p] = { sessions, events };
}

// ---------- 商材別集計 ----------
function aggregate(brand) {
  const out = { sessions: { current: 0, previous: 0 }, cv: { current: 0, previous: 0 }, byEvent: {}, hosts: [] };
  for (const src of brand.sources) {
    const { sessions, events } = raw[src.property] ?? { sessions: {}, events: {} };
    for (const [host, s] of Object.entries(sessions)) {
      if (IGNORE_HOST.test(host) || !src.host(host)) continue;
      out.sessions.current += s.current;
      out.sessions.previous += s.previous;
      let hostCv = 0;
      for (const e of brand.cv) {
        const c = events[host]?.[e] ?? { current: 0, previous: 0 };
        out.cv.current += c.current;
        out.cv.previous += c.previous;
        hostCv += c.current;
        (out.byEvent[e] ??= { current: 0, previous: 0 }).current += c.current;
        out.byEvent[e].previous += c.previous;
      }
      out.hosts.push({ host, sessions: s.current, cv: hostCv });
    }
  }
  out.hosts.sort((a, b) => b.cv - a.cv || b.sessions - a.sessions);
  return out;
}

const results = BRANDS.map((b) => ({ ...b, ...aggregate(b) }));
const total = results.reduce(
  (t, r) => {
    t.sessions.current += r.sessions.current;
    t.sessions.previous += r.sessions.previous;
    t.cv.current += r.cv.current;
    t.cv.previous += r.cv.previous;
    return t;
  },
  { sessions: { current: 0, previous: 0 }, cv: { current: 0, previous: 0 } },
);

// ---------- 整形 ----------
const cvr = (cv, s) => (s ? (cv / s) * 100 : 0);
const pct = (n) => `${n.toFixed(2)}%`;
const num = (n) => n.toLocaleString("ja-JP");
const delta = (cur, prev, unit = "") => {
  if (prev === 0 && cur === 0) return "±0";
  if (prev === 0) return "前期0";
  const d = cur - prev;
  const sign = d > 0 ? "+" : d < 0 ? "−" : "±";
  const body = unit === "%" ? `${Math.abs(d).toFixed(2)}pt` : `${Math.abs(d)}`;
  return `${sign}${body}`;
};
const EVENT_LABEL = { cv_setsumeikai: "説明会", cv_seminar: "セミナー", form_submit: "フォーム" };

const fields = results.map((r) => {
  const curCvr = cvr(r.cv.current, r.sessions.current);
  const prevCvr = cvr(r.cv.previous, r.sessions.previous);
  const lines = [
    `**CV ${num(r.cv.current)}**（前期 ${num(r.cv.previous)}、${delta(r.cv.current, r.cv.previous)}）`,
    `**CVR ${pct(curCvr)}**（前期 ${pct(prevCvr)}、${delta(curCvr, prevCvr, "%")}）`,
    `セッション ${num(r.sessions.current)}（前期 ${num(r.sessions.previous)}）`,
  ];
  const evParts = Object.entries(r.byEvent)
    .filter(([, v]) => v.current || v.previous)
    .map(([e, v]) => `${EVENT_LABEL[e] ?? e} ${v.current}`);
  if (evParts.length > 1) lines.push(`内訳: ${evParts.join(" / ")}`);
  const top = r.hosts.filter((h) => h.cv > 0).slice(0, 4);
  if (top.length) lines.push(`媒体別CV: ${top.map((h) => `${h.host.replace(/\.bytech-ad\.com$/, "")} ${h.cv}（${pct(cvr(h.cv, h.sessions))}）`).join(" / ")}`);
  return { name: r.label, value: lines.join("\n").slice(0, 1024), inline: false };
});

const totalCvr = cvr(total.cv.current, total.sessions.current);
const prevTotalCvr = cvr(total.cv.previous, total.sessions.previous);
const embed = {
  title: `KPI週報｜CV ${num(total.cv.current)}件 / CVR ${pct(totalCvr)}`,
  description:
    `期間: ${RANGES[0].startDate} 〜 ${RANGES[0].endDate}（${DAYS}日）　前期: ${RANGES[1].startDate} 〜 ${RANGES[1].endDate}\n` +
    `全体CV ${delta(total.cv.current, total.cv.previous)}、全体CVR ${delta(totalCvr, prevTotalCvr, "%")}（前期 ${pct(prevTotalCvr)}）`,
  color: totalCvr >= prevTotalCvr ? 0x2ecc71 : 0xe67e22,
  fields,
  footer: { text: "CV = 説明会予約・セミナー申込・法人フォーム送信 ／ CVR = CV ÷ セッション ／ GA4 商材別集計（広告LPはホスト名で切り分け）" },
  timestamp: new Date().toISOString(),
};

const payload = { username: "バイテック KPI", embeds: [embed] };

if (DRY) {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

const hook = process.env.DISCORD_KPI_WEBHOOK_URL?.trim();
if (!hook) throw new Error("DISCORD_KPI_WEBHOOK_URL が未設定");
const res = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
if (!res.ok) throw new Error(`Discord 投稿失敗: ${res.status} ${await res.text()}`);
console.log(`投稿完了: CV ${total.cv.current} / CVR ${pct(totalCvr)}（${RANGES[0].startDate}〜${RANGES[0].endDate}）`);
