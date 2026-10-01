/**
 * GA4 [All]（539358185）で、ランディングページが /blog/ のセッションを流入元別・記事別に集計し、
 * キーイベント cv_setsumeikai の件数と並べる。ブログに GTM-K6HH9C2F を入れた後のデータだけ入る。
 *
 * 認証はサービスアカウント（.env.local の GOOGLE_SERVICE_ACCOUNT_KEY_FILE）。ライブラリ無しで JWT を作る。
 *
 * Usage:
 *   node scripts/ga4-blog-sessions.mjs            # 直近28日
 *   node scripts/ga4-blog-sessions.mjs --days 90
 *   node scripts/ga4-blog-sessions.mjs --property 539358185
 */
import { readFileSync } from 'node:fs';
import { createSign } from 'node:crypto';
import { loadLocalEnv, argNumber } from './lib/local-env.mjs';

const env = loadLocalEnv();
const keyFile = env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE;
if (!keyFile) {
    console.error('GOOGLE_SERVICE_ACCOUNT_KEY_FILE が .env.local にありません');
    process.exit(1);
}
const sa = JSON.parse(readFileSync(keyFile, 'utf8'));
const days = argNumber('--days', 28);
const propIdx = process.argv.indexOf('--property');
const PROPERTY = propIdx !== -1 ? process.argv[propIdx + 1] : '539358185';
const KEY_EVENT = 'cv_setsumeikai';

function b64url(input) {
    return Buffer.from(input).toString('base64').replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function accessToken() {
    const now = Math.floor(Date.now() / 1000);
    const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
    const claims = b64url(
        JSON.stringify({
            iss: sa.client_email,
            scope: 'https://www.googleapis.com/auth/analytics.readonly',
            aud: 'https://oauth2.googleapis.com/token',
            iat: now,
            exp: now + 3600,
        }),
    );
    const signer = createSign('RSA-SHA256');
    signer.update(`${header}.${claims}`);
    const sig = signer.sign(sa.private_key, 'base64').replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
    const res = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            assertion: `${header}.${claims}.${sig}`,
        }),
    });
    const body = await res.json();
    if (!res.ok) throw new Error(`token: ${res.status} ${JSON.stringify(body)}`);
    return body.access_token;
}

async function runReport(token, dimensions, extra = {}) {
    const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY}:runReport`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
            dimensions: dimensions.map((name) => ({ name })),
            metrics: [{ name: 'sessions' }, { name: 'totalUsers' }, { name: `keyEvents:${KEY_EVENT}` }],
            orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
            limit: 50,
            ...extra,
        }),
    });
    const body = await res.json();
    if (!res.ok) throw new Error(`runReport: ${res.status} ${JSON.stringify(body)}`);
    return (body.rows || []).map((r) => ({
        dims: r.dimensionValues.map((d) => d.value),
        sessions: Number(r.metricValues[0].value),
        users: Number(r.metricValues[1].value),
        cv: Number(r.metricValues[2].value),
    }));
}

function printRows(title, rows, limit = 25) {
    console.log(`\n## ${title}`);
    if (rows.length === 0) {
        console.log('（データなし。ブログに GTM-K6HH9C2F が入ってから溜まります）');
        return;
    }
    const w = Math.max(...rows.map((r) => r.dims.join(' | ').length), 10);
    console.log(`${'ディメンション'.padEnd(w)}  セッション  ユーザー  ${KEY_EVENT}`);
    for (const r of rows.slice(0, limit)) {
        console.log(`${r.dims.join(' | ').padEnd(w)}  ${String(r.sessions).padStart(8)}  ${String(r.users).padStart(7)}  ${String(r.cv).padStart(5)}`);
    }
}

const blogLandingFilter = { filter: { fieldName: 'landingPage', stringFilter: { matchType: 'BEGINS_WITH', value: '/blog/' } } };
const notBlogLandingFilter = { notExpression: blogLandingFilter };
const organicFilter = { filter: { fieldName: 'sessionDefaultChannelGroup', stringFilter: { matchType: 'EXACT', value: 'Organic Search' } } };
// utm 付きは source=ai-hack、utm 無しのリンク（旧記事など）は参照元ドメインの ai-hack.jp になるので前方一致で両方拾う
const aiHackFilter = { filter: { fieldName: 'sessionSource', stringFilter: { matchType: 'BEGINS_WITH', value: 'ai-hack' } } };
const blogLanding = { dimensionFilter: blogLandingFilter };

/** 経路の3分類（CRM 側 crm-inflow-report.mjs と同じ定義）をセッション数と cv_setsumeikai で出す */
async function printRouteSummary(token) {
    const routes = [
        ['検索→公式直接（Organic Search & 着地が /blog/ 以外）', { andGroup: { expressions: [organicFilter, notBlogLandingFilter] } }],
        ['バイテックブログ経由（着地が /blog/）', blogLandingFilter],
        ['AI HACK記事経由（utm_source=ai-hack）', aiHackFilter],
    ];
    const rows = [];
    for (const [label, dimensionFilter] of routes) {
        const r = await runReport(token, ['sessionDefaultChannelGroup'], { dimensionFilter });
        rows.push({ dims: [label], sessions: r.reduce((a, x) => a + x.sessions, 0), users: r.reduce((a, x) => a + x.users, 0), cv: r.reduce((a, x) => a + x.cv, 0) });
    }
    printRows('経路の3分類（セッション／ユーザー／予約CV）', rows);
    const byContent = await runReport(token, ['sessionManualAdContent'], { dimensionFilter: aiHackFilter });
    printRows('AI HACK記事経由: どの記事・位置から（utm_content）', byContent, 30);
}
const token = await accessToken();
console.log(`GA4 property ${PROPERTY} / 直近${days}日 / ランディングページが /blog/ のセッション`);
await printRouteSummary(token);
const total = await runReport(token, ['sessionDefaultChannelGroup']);
printRows('全体: チャネル別（比較用）', total, 10);
const bySource = await runReport(token, ['sessionSource', 'sessionMedium'], blogLanding);
printRows('ブログ着地: 参照元/メディア別', bySource);
const byPage = await runReport(token, ['landingPage'], blogLanding);
printRows('ブログ着地: 記事別', byPage);
