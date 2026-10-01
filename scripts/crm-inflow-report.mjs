/**
 * CRM（Sales-Management-System の Supabase）の leads から、流入元(ref)×最初のページ(landing)別の予約数を出す。
 *
 * 「acuity_ref=google かつ acuity_landing=/blog/記事名」= 検索→自社ブログ→予約。
 * 予約CVの定義は KPI 週報と同じ（leads からリスケ・再面談を除く）。
 *
 * 前提: CRM 側で scripts/migration/08_add_referrer_columns_to_leads.sql が適用済みで、
 *       GAS が ref / lp_query / landing を Webhook に載せていること。列が無い間は案内して終了する。
 *
 * Usage:
 *   node scripts/crm-inflow-report.mjs              # 直近28日
 *   node scripts/crm-inflow-report.mjs --days 90
 *   node scripts/crm-inflow-report.mjs --line gen   # 商材で絞る（acuity_lp_type: gen / geek / degit / biz）
 */
import { loadLocalEnv, argNumber } from './lib/local-env.mjs';

const env = loadLocalEnv();
const CRM_URL = (env.SUPABASE_CRM_URL || '').replace(/\/$/, '');
const CRM_KEY = env.SUPABASE_CRM_SECRET_KEY || '';
if (!CRM_URL || !CRM_KEY) {
    console.error('SUPABASE_CRM_URL / SUPABASE_CRM_SECRET_KEY が .env.local にありません');
    process.exit(1);
}

const days = argNumber('--days', 28);
const lineIdx = process.argv.indexOf('--line');
const lineFilter = lineIdx !== -1 ? String(process.argv[lineIdx + 1] || '').toLowerCase() : '';

const EXCLUDED_REBOOKING = new Set(['リスケ', '再面談']);
const SEARCH_HOSTS = [
    ['google.', 'google'],
    ['yahoo.', 'yahoo'],
    ['bing.com', 'bing'],
    ['duckduckgo', 'duckduckgo'],
];
const SNS_HOSTS = [
    ['t.co', 'X'],
    ['twitter.com', 'X'],
    ['x.com', 'X'],
    ['instagram', 'Instagram'],
    ['facebook', 'Facebook'],
    ['youtube', 'YouTube'],
    ['youtu.be', 'YouTube'],
    ['line.me', 'LINE'],
    ['tiktok', 'TikTok'],
];

/** LP到着時のクエリから utm_source 等を取り出す（AI HACK は noreferrer なので ref ではなくここで判別する） */
function parseQuery(q) {
    try {
        return new URLSearchParams(q || '');
    } catch {
        return new URLSearchParams();
    }
}

/** 紹介元URLを「検索:google / SNS:X / 自社内 / AI HACK / 外部:ホスト名 / なし」に分類する。ref が空なら lp_query の utm_source で補う */
function classifyRef(ref, lpQuery) {
    if (!ref) {
        const src = (parseQuery(lpQuery).get('utm_source') || '').toLowerCase();
        if (['ai-hack', 'aihack', 'ai_hack'].includes(src)) return 'AI HACK';
        if (src === 'blog') return '自社ブログ(utm)';
        if (src) return `utm:${src}`;
        return 'なし(直接)';
    }
    let host = '';
    try {
        host = new URL(ref).host.toLowerCase();
    } catch {
        return 'その他';
    }
    for (const [needle, label] of SEARCH_HOSTS) if (host.includes(needle)) return `検索:${label}`;
    for (const [needle, label] of SNS_HOSTS) if (host.includes(needle)) return `SNS:${label}`;
    if (host.endsWith('bytech.jp')) return '自社内';
    if (host.endsWith('ai-hack.jp')) return 'AI HACK';
    return `外部:${host}`;
}

/** 最初に開いたパスを「ブログ記事 / トップ / LP種別」に分類する */
function classifyLanding(landing) {
    if (!landing) return 'なし';
    const path = landing.split('?')[0];
    if (path.startsWith('/blog/')) return `ブログ ${path}`;
    if (path === '/' || path === '') return 'トップ';
    if (path.startsWith('/diagnosis')) return '診断LP';
    if (path.startsWith('/counseling')) return '/counseling';
    return path;
}

function fmtDate(d) {
    return d.toISOString().slice(0, 10);
}

async function fetchLeads() {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    const select = 'created_at,acuity_lp_type,acuity_route_id,inflow_label,rebooking_type,acuity_ref,acuity_lp_query,acuity_landing';
    const url = `${CRM_URL}/rest/v1/leads?select=${select}&created_at=gte.${encodeURIComponent(since)}&order=created_at.asc&limit=5000`;
    const res = await fetch(url, { headers: { apikey: CRM_KEY, Authorization: `Bearer ${CRM_KEY}` } });
    const body = await res.json();
    if (!res.ok) {
        const msg = body?.message || JSON.stringify(body);
        if (/acuity_(ref|lp_query|landing)/.test(msg)) {
            console.error('CRM の leads にまだ acuity_ref / acuity_lp_query / acuity_landing 列がありません。');
            console.error('Sales-Management-System の scripts/migration/08_add_referrer_columns_to_leads.sql を適用してください。');
            process.exit(2);
        }
        throw new Error(`${res.status} ${msg}`);
    }
    return body;
}

function tally(map, key) {
    map.set(key, (map.get(key) || 0) + 1);
}

function printTable(title, map, limit = 30) {
    console.log(`\n## ${title}`);
    const rows = [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
    if (rows.length === 0) {
        console.log('（該当なし）');
        return;
    }
    const w = Math.max(...rows.map(([k]) => k.length));
    for (const [k, n] of rows) console.log(`${k.padEnd(w)}  ${String(n).padStart(4)}`);
}

const leads = (await fetchLeads()).filter((l) => !EXCLUDED_REBOOKING.has(l.rebooking_type || ''));
const target = lineFilter ? leads.filter((l) => (l.acuity_lp_type || '').toLowerCase() === lineFilter) : leads;
const withRef = target.filter((l) => l.acuity_ref || l.acuity_landing || l.acuity_lp_query);

console.log(`期間: 直近${days}日（${fmtDate(new Date(Date.now() - days * 86400000))}〜${fmtDate(new Date())}）${lineFilter ? ` / 商材: ${lineFilter}` : ''}`);
console.log(`予約CV: ${target.length}件（うち流入元データあり ${withRef.length}件）`);

const byRef = new Map();
const byLanding = new Map();
const byPair = new Map();
const byWeekBlog = new Map();
const byAiHackPage = new Map();
for (const l of target) {
    const r = classifyRef(l.acuity_ref, l.acuity_lp_query);
    if (r === 'AI HACK') tally(byAiHackPage, parseQuery(l.acuity_lp_query).get('utm_content') || '(utm_content なし)');
    const g = classifyLanding(l.acuity_landing);
    tally(byRef, r);
    tally(byLanding, g);
    tally(byPair, `${r} → ${g}`);
    if (g.startsWith('ブログ')) {
        const d = new Date(l.created_at);
        const monday = new Date(d);
        monday.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
        tally(byWeekBlog, `${fmtDate(monday)}週`);
    }
}
printTable('流入元(ref)別', byRef);
printTable('最初のページ(landing)別', byLanding);
printTable('ref × landing（検索→ブログ→予約 はここで読む）', byPair, 40);
printTable('ブログ着地の予約数（週別）', byWeekBlog);
printTable('AI HACK 経由: どのページ・位置から（utm_content）', byAiHackPage);
