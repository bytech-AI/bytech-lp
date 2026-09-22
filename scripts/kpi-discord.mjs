#!/usr/bin/env node
/**
 * KPI週報を Discord に投稿する。
 * リブランディングの主指標 = CV数（予約）と CVR（予約 ÷ アクティブユーザー数）。加えて商談実施・契約まで追う。
 *
 * データソース:
 *   - CV・商談・契約: CRM（Supabase byTech_Sales-Management-System）= 正データ
 *       leads.created_at（予約）→ meetings.actual_date（商談実施）→ contracts.applied_at（契約）
 *   - アクティブユーザー数（CVRの分母）: GA4 activeUsers（GA4画面の「ユーザー」と同じ。新規＋再訪）。広告LPはホスト名で商材に振り分け
 *       ※ 予約は「人」が1回する行為なので分母は人数。新規ユーザーだと再訪して予約した人が分母から欠ける
 *       ※ 本校・GEEKは GTM 遅延読込のため直帰の一部が数えられず、ユーザー数は実態より少なめ
 *
 * 使い方:
 *   node scripts/kpi-discord.mjs              # 週報: 直近7日（昨日まで） vs その前7日
 *   node scripts/kpi-discord.mjs --days 28
 *   node scripts/kpi-discord.mjs --daily      # 日報: 本日（JST） vs 前日、直近7日累計つき
 *   node scripts/kpi-discord.mjs --dry-run    # 投稿せず内容を表示
 *
 * 環境変数（.env.local / CI secrets）:
 *   GOOGLE_SERVICE_ACCOUNT_KEY_FILE または GOOGLE_SERVICE_ACCOUNT_JSON
 *   SUPABASE_CRM_URL / SUPABASE_CRM_SECRET_KEY
 *   DISCORD_KPI_WEBHOOK_URL
 */
import process from "node:process";
import { loadEnv, googleAccessToken, googlePost } from "./lib/google-auth.mjs";

await loadEnv();

const args = process.argv.slice(2);
const argVal = (name, def) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
};
const DAILY = args.includes("--daily");
const DAYS = DAILY ? 1 : Number(argVal("--days", "7"));
const DRY = args.includes("--dry-run");

// ---------- 期間（JST、昨日まで） ----------
const JST = 9 * 60 * 60 * 1000;
const todayJst = new Date(Date.now() + JST);
const dateStr = (d) => d.toISOString().slice(0, 10);
const shift = (d, n) => new Date(d.getTime() + n * 86400000);
const todayUtc0 = new Date(Date.UTC(todayJst.getUTCFullYear(), todayJst.getUTCMonth(), todayJst.getUTCDate()));
const curEnd = DAILY ? todayUtc0 : shift(todayUtc0, -1); // 日報は本日、週報は昨日まで
const curStart = shift(curEnd, -(DAYS - 1));
const prevEnd = shift(curStart, -1);
const prevStart = shift(prevEnd, -(DAYS - 1));
const RANGES = {
  current: { startDate: dateStr(curStart), endDate: dateStr(curEnd) },
  previous: { startDate: dateStr(prevStart), endDate: dateStr(prevEnd) },
  // 日報の文脈用: 本日を含む直近7日
  week: { startDate: dateStr(shift(curEnd, -6)), endDate: dateStr(curEnd) },
};
const PERIODS = DAILY ? ["current", "previous", "week"] : ["current", "previous"];
const earliest = [RANGES.previous.startDate, RANGES.week.startDate].sort()[0];
const inRange = (iso, r) => {
  if (!iso) return false;
  const d = dateStr(new Date(new Date(iso).getTime() + JST)); // JST の日付
  return d >= r.startDate && d <= r.endDate;
};

// ---------- 商材定義 ----------
const GEEK_AD_HOST = /^(g1|g-re|g-ab|g-ft)\./;
const IGNORE_HOST = /localhost|127\.0\.0\.1|^\(not set\)$|tagassistant/;
const BRANDS = [
  { key: "GEN", label: "本校（バイテックAIスクール）", ga4: [{ property: "539358185", host: (h) => !GEEK_AD_HOST.test(h) }] },
  { key: "GEEK", label: "GEEK", ga4: [{ property: "539358185", host: (h) => GEEK_AD_HOST.test(h) }, { property: "544228208", host: (h) => h === "geek.bytech.jp" }] },
  { key: "DEGIT", label: "デジット", ga4: [{ property: "552478358", host: () => true }] },
  { key: "BIZ", label: "法人（biz）", ga4: [{ property: "501001877", host: (h) => h === "biz.bytech.jp" }] },
];

// ---------- CRM（Supabase） ----------
const SB_URL = process.env.SUPABASE_CRM_URL?.trim();
const SB_KEY = process.env.SUPABASE_CRM_SECRET_KEY?.trim();
if (!SB_URL || !SB_KEY) throw new Error("SUPABASE_CRM_URL / SUPABASE_CRM_SECRET_KEY が未設定");
async function sb(path) {
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } });
  if (!res.ok) throw new Error(`CRM ${path} → ${res.status} ${await res.text()}`);
  return res.json();
}
const sinceIso = `${earliest}T00:00:00+09:00`;
const [sources, leads, meetings, contracts] = await Promise.all([
  sb("inflow_sources?select=id,label,product_line,media_name,category"),
  sb(`leads?select=id,created_at,inflow_source_id,inflow_label,acuity_lp_type,rebooking_type,status&created_at=gte.${encodeURIComponent(sinceIso)}&limit=5000`),
  sb(`meetings?select=id,lead_id,actual_date,course_type&actual_date=gte.${encodeURIComponent(sinceIso)}&limit=5000`),
  sb(`contracts?select=id,lead_id,plan,amount,applied_at&applied_at=gte.${earliest}&limit=5000`),
]);
const srcById = Object.fromEntries(sources.map((s) => [s.id, s]));

/** リードの商材（inflow_sources.product_line → acuity_lp_type → inflow_label 接頭辞） */
function leadBrand(l) {
  const pl = srcById[l.inflow_source_id]?.product_line;
  if (pl) return pl;
  const lp = (l.acuity_lp_type || "").toLowerCase();
  if (lp) return lp.toUpperCase();
  const m = /^(GEN|GEEK|DEGIT|Biz)/i.exec(l.inflow_label || "");
  return m ? m[1].toUpperCase() : "OTHER";
}
/** 媒体表示名（inflow_sources.label を優先、無ければ inflow_label） */
function leadMedia(l) {
  return srcById[l.inflow_source_id]?.label || l.inflow_label || "（媒体不明）";
}
const isRebooking = (l) => !!l.rebooking_type; // 再面談・リスケは新規CVから除く

// リード→商材の対応（商談・契約の商材判定に使う）。期間外の古いリードは別途引く
const leadById = Object.fromEntries(leads.map((l) => [l.id, l]));
const missing = [...new Set([...meetings.map((m) => m.lead_id), ...contracts.map((c) => c.lead_id)])].filter((id) => id && !leadById[id]);
if (missing.length) {
  const chunk = 100;
  for (let i = 0; i < missing.length; i += chunk) {
    const extra = await sb(`leads?select=id,created_at,inflow_source_id,inflow_label,acuity_lp_type,rebooking_type,status&id=in.(${missing.slice(i, i + chunk).join(",")})`);
    for (const l of extra) leadById[l.id] = l;
  }
}

// ---------- GA4 セッション ----------
const token = await googleAccessToken(["https://www.googleapis.com/auth/analytics.readonly"]);
const propertyIds = [...new Set(BRANDS.flatMap((b) => b.ga4.map((s) => s.property)))];
const ga4Users = {}; // property → host → {current, previous}（activeUsers）
for (const p of propertyIds) {
  const rep = await googlePost(token, `https://analyticsdata.googleapis.com/v1beta/properties/${p}:runReport`, {
    dateRanges: PERIODS.map((k) => ({ name: k, ...RANGES[k] })),
    dimensions: [{ name: "hostName" }],
    metrics: [{ name: "activeUsers" }],
    limit: 200,
  });
  const byHost = {};
  for (const r of rep.rows ?? []) {
    const [host, range] = r.dimensionValues.map((d) => d.value);
    (byHost[host] ??= { current: 0, previous: 0, week: 0 })[PERIODS.includes(range) ? range : "current"] += Number(r.metricValues[0].value);
  }
  ga4Users[p] = byHost;
}

// ---------- 集計 ----------
function brandStats(b) {
  const z = () => ({ current: 0, previous: 0, week: 0 });
  const s = { users: z(), cv: z(), rebook: z(), meet: z(), contract: z(), amount: z(), media: {} };
  for (const src of b.ga4) {
    for (const [host, v] of Object.entries(ga4Users[src.property] ?? {})) {
      if (IGNORE_HOST.test(host) || !src.host(host)) continue;
      for (const k of PERIODS) s.users[k] += v[k] ?? 0;
    }
  }
  for (const l of leads) {
    if (leadBrand(l) !== b.key) continue;
    for (const k of PERIODS) {
      if (!inRange(l.created_at, RANGES[k])) continue;
      if (isRebooking(l)) s.rebook[k] += 1;
      else {
        s.cv[k] += 1;
        if (k === "current") s.media[leadMedia(l)] = (s.media[leadMedia(l)] || 0) + 1;
      }
    }
  }
  for (const m of meetings) {
    const l = leadById[m.lead_id];
    if (!l || leadBrand(l) !== b.key) continue;
    for (const k of PERIODS) if (inRange(m.actual_date, RANGES[k])) s.meet[k] += 1;
  }
  for (const c of contracts) {
    const l = leadById[c.lead_id];
    if (!l || leadBrand(l) !== b.key) continue;
    for (const k of PERIODS) {
      if (c.applied_at >= RANGES[k].startDate && c.applied_at <= RANGES[k].endDate) {
        s.contract[k] += 1;
        s.amount[k] += c.amount || 0;
      }
    }
  }
  return s;
}
const results = BRANDS.map((b) => ({ ...b, ...brandStats(b) }));
const sum = (k, sub) => results.reduce((t, r) => t + r[k][sub], 0);

// ---------- 整形 ----------
const cvr = (cv, s) => (s ? (cv / s) * 100 : 0);
const pct = (n) => `${n.toFixed(1)}%`;
const num = (n) => Number(n).toLocaleString("ja-JP");
const yen = (n) => `¥${num(n)}`;
const d = (cur, prev) => {
  const x = cur - prev;
  return x > 0 ? `+${num(x)}` : x < 0 ? `−${num(-x)}` : "±0";
};
const dpt = (cur, prev) => {
  const x = cur - prev;
  return x > 0 ? `+${x.toFixed(1)}pt` : x < 0 ? `−${(-x).toFixed(1)}pt` : "±0";
};

const PREV_LABEL = DAILY ? "前日" : "前期";
const fields = results.map((r) => {
  const cvrCur = cvr(r.cv.current, r.users.current);
  const cvrPrev = cvr(r.cv.previous, r.users.previous);
  if (DAILY) {
    const lines = [
      `**予約CV ${r.cv.current}**（前日 ${r.cv.previous}）　**CVR ${pct(cvrCur)}**（前日 ${pct(cvrPrev)}）　AU ${num(r.users.current)}`,
      `直近7日: 予約CV ${r.cv.week} / CVR ${pct(cvr(r.cv.week, r.users.week))} / 商談 ${r.meet.week} / 契約 ${r.contract.week}件`,
    ];
    if (r.contract.current) lines.push(`本日の契約 ${r.contract.current}件 ${yen(r.amount.current)}`);
    const media = Object.entries(r.media).sort((a, b) => b[1] - a[1]).slice(0, 4);
    if (media.length) lines.push(`媒体別: ${media.map(([m, n]) => `${m.replace(/^(GEN|GEEK|DEGIT|Biz)/, "")} ${n}`).join(" / ")}`);
    return { name: r.label, value: lines.join("\n").slice(0, 1024), inline: false };
  }
  const lines = [
    `**予約CV ${r.cv.current}**（前期 ${r.cv.previous}、${d(r.cv.current, r.cv.previous)}）`,
    `**CVR ${pct(cvrCur)}**（前期 ${pct(cvrPrev)}、${dpt(cvrCur, cvrPrev)}）　アクティブユーザー ${num(r.users.current)}`,
    `商談実施 ${r.meet.current}（前期 ${r.meet.previous}）　契約 ${r.contract.current}件 ${yen(r.amount.current)}（前期 ${r.contract.previous}件）`,
  ];
  if (r.rebook.current || r.rebook.previous) lines.push(`再予約・リスケ ${r.rebook.current}（CVには含めず）`);
  const media = Object.entries(r.media).sort((a, b) => b[1] - a[1]).slice(0, 5);
  if (media.length) lines.push(`媒体別: ${media.map(([m, n]) => `${m.replace(/^(GEN|GEEK|DEGIT|Biz)/, "")} ${n}`).join(" / ")}`);
  return { name: r.label, value: lines.join("\n").slice(0, 1024), inline: false };
});

const totCv = sum("cv", "current"), totCvPrev = sum("cv", "previous");
const totUsers = sum("users", "current"), totUsersPrev = sum("users", "previous");
const totCvr = cvr(totCv, totUsers), totCvrPrev = cvr(totCvPrev, totUsersPrev);
const totMeet = sum("meet", "current"), totMeetPrev = sum("meet", "previous");
const totCon = sum("contract", "current"), totConPrev = sum("contract", "previous");
const totAmt = sum("amount", "current"), totAmtPrev = sum("amount", "previous");
const other = leads.filter((l) => leadBrand(l) === "OTHER" && !isRebooking(l) && inRange(l.created_at, RANGES.current)).length;
const wkCv = sum("cv", "week"), wkUsers = sum("users", "week"), wkCon = sum("contract", "week"), wkAmt = sum("amount", "week");

const embed = DAILY ? {
  title: `KPI日報 ${RANGES.current.startDate}｜予約CV ${totCv}件 / CVR ${pct(totCvr)}`,
  description: [
    `本日 ${RANGES.current.startDate}（JST、集計時点まで）　前日 ${RANGES.previous.startDate}`,
    `予約CV ${d(totCv, totCvPrev)}（前日 ${totCvPrev}）　CVR ${dpt(totCvr, totCvrPrev)}（前日 ${pct(totCvrPrev)}）　商談実施 ${totMeet}　契約 ${totCon}件 ${yen(totAmt)}`,
    `直近7日（${RANGES.week.startDate}〜）: 予約CV ${wkCv} / CVR ${pct(cvr(wkCv, wkUsers))} / 契約 ${wkCon}件 ${yen(wkAmt)}`,
    other ? `※ 商材を判定できない予約 ${other}件は各商材に含めていません` : "",
  ].filter(Boolean).join("\n"),
  color: totCvr >= totCvrPrev ? 0x2ecc71 : 0xe67e22,
  fields,
  footer: { text: "予約・商談・契約 = CRM（Supabase） ／ AU = GA4アクティブユーザー（当日分は数時間遅れて確定） ／ CVR = 予約CV ÷ AU ／ 再予約・リスケはCVから除外" },
  timestamp: new Date().toISOString(),
} : {
  title: `KPI週報｜予約CV ${totCv}件 / CVR ${pct(totCvr)} / 契約 ${totCon}件 ${yen(totAmt)}`,
  description: [
    `期間 ${RANGES.current.startDate} 〜 ${RANGES.current.endDate}（${DAYS}日）　前期 ${RANGES.previous.startDate} 〜 ${RANGES.previous.endDate}`,
    `予約CV ${d(totCv, totCvPrev)}　CVR ${dpt(totCvr, totCvrPrev)}（前期 ${pct(totCvrPrev)}）　商談実施 ${totMeet}（${d(totMeet, totMeetPrev)}）　契約 ${d(totCon, totConPrev)}件・${yen(totAmt)}（前期 ${yen(totAmtPrev)}）`,
    other ? `※ 商材を判定できない予約 ${other}件は各商材に含めていません` : "",
  ].filter(Boolean).join("\n"),
  color: totCvr >= totCvrPrev ? 0x2ecc71 : 0xe67e22,
  fields,
  footer: { text: "予約・商談・契約 = CRM（Supabase） ／ アクティブユーザー = GA4 activeUsers（本校・GEEKは遅延読込のため少なめ） ／ CVR = 予約CV ÷ アクティブユーザー ／ 再予約・リスケはCVから除外" },
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
console.log(`投稿完了(${DAILY ? "日報" : "週報"}): 予約CV ${totCv} / CVR ${pct(totCvr)} / 契約 ${totCon}件（${RANGES.current.startDate}〜${RANGES.current.endDate}）`);
