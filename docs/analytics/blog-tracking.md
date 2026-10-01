# ブログ（bytech.jp/blog）の計測を本校LPと同じセッションに繋ぐ

目的: 検索 → 自社ブログ → 無料カウンセリング予約 を「ref=google, landing=/blog/記事名」のように1行で読めるようにし、
オーガニック流入の予約数を GA4 と CRM の両方で出せるようにする。

## 仕組み

```
Google検索 ─▶ bytech.jp/blog/記事 ─▶ bytech.jp/counseling (or /diagnosis, トップのカレンダー)
              │ GTM-K6HH9C2F で page_view      │ 予約フォーム送信時に GAS へ
              │ btRefInfo が ref / landing を保存 │   ref / lp_query / landing を付与
              ▼                                 ▼
          GA4 [All] G-PR1BB3X47K   GAS(acuity-appointment-pipeline) ─▶ スプシ AB/AC/AD 列
                                                                   └▶ CRM(Sales-Management-System) leads.acuity_ref / acuity_lp_query / acuity_landing
```

- `btRefInfo`（LP各所と同じ関数）は、外部サイトから到着した時の `document.referrer`（ref）、到着時のクエリ（q）、
  そのセッションで最初に開いたパス（landing）を `sessionStorage` に保持する。
- ブログの CTA（`/diagnosis?utm_source=blog…` や `/biz`）は **別タブ** で開く。WordPress が付ける `rel="noopener"` だと
  `sessionStorage` は新しいタブへ引き継がれないので、`localStorage` にも 30 分だけ写しを置き、
  LP 側が「内部遷移 or 直接到着で、タブ内に記録が無い」時はそれを引き継ぐ（2026-10-01 の変更）。
- 既にブログには **GTM-TCRNZFW6**（送信先 GA4 `G-11BXMJCE8N`、本校 [All] とは別プロパティ）が入っている。
  本校と同じセッションで見るには `GTM-K6HH9C2F` も必要。TCRNZFW6 は別プロパティへの送信なので残しても二重計上にはならない。
  不要なら SWELL 側で外す（判断はユーザー）。

## 1. ブログに入れるコード

`docs/analytics/blog-head-snippet.html` の内容をそのまま入れる。入れ方は2通り。

### A. WordPress（SWELL）の head 設定に貼る（おすすめ・1分）

WP管理画面 → 外観 → カスタマイズ → 高度な設定 → 「headタグ終了直前に出力するコード」に貼り付けて公開。
`bytech.jp/blog` と `biz.bytech.jp/blog` が別インストールなら、本校分（bytech.jp/blog）だけでよい
（biz は GTM-KK696RSD で別運用）。

### B. Cloudflare Worker `blog-router` で差し込む

Worker のコードはリポジトリ管理されていない（Cloudflare ダッシュボード上）。`.env.local` の `CLOUDFLARE_API_TOKEN` は
ゾーン読み取りのみで Workers の取得・更新権限が無いため、API からは触れない。
ダッシュボードで編集するか、`Workers Scripts: Edit` 権限付きのトークンを用意すれば API で更新できる。

```js
// blog-router（Cloudflare Worker）に足す場合の例。
// 既存: return fetch(request, { cf: { resolveOverride: 'wp.bytech.jp' } });
// → HTML のときだけ HTMLRewriter で <head> の末尾にスニペットを差し込む。
const SNIPPET = `…docs/analytics/blog-head-snippet.html の中身…`;

export default {
  async fetch(request) {
    const res = await fetch(request, { cf: { resolveOverride: 'wp.bytech.jp' } });
    const type = res.headers.get('content-type') || '';
    if (!type.includes('text/html')) return res;
    return new HTMLRewriter()
      .on('head', { element(el) { el.append(SNIPPET, { html: true }); } })
      .transform(res);
  },
};
```

## 2. LP側（このリポジトリ・反映済み）

- `btRefInfo` に `landing` と localStorage の30分写しを追加（`public/bytech/assets/js/bytech-lp.js`、
  `public/counseling-static/index.html`、`app/biz/counseling/page.tsx`）。`bytech-lp.js` は immutable 配信なので参照側の `?v=` を `20261001b` に更新。
- 予約リクエスト（`action=book`）とトラッキング（`action=track`）に `landing` を追加。
- 診断LP（別リポ `shindan`、bytech.jp/diagnosis）にも同じ `btRefInfo` を入れ、予約時に `ref / lp_query / landing` を送るようにした。

## 3. GAS / CRM 側

- GAS（`acuity-appointment-pipeline`）: `landing` を受け取り、説明会予約者DB の AD 列（Biz は X 列）に記録。
  CRM Webhook のペイロードに `ref / lp_query / landing` を追加。
- CRM（`Sales-Management-System`）: `scripts/migration/08_add_referrer_columns_to_leads.sql` で
  `leads.acuity_ref / acuity_lp_query / acuity_landing` を追加し、Webhook で保存。

## 4. 集計

### CRM（正データ）

```
node scripts/crm-inflow-report.mjs            # 直近28日
node scripts/crm-inflow-report.mjs --days 90  # 期間指定
```

`ref` の分類（google / yahoo / bing / SNS / ASP / 自社内 / なし）× `landing` の分類（/blog/記事、トップ、/counseling、/diagnosis…）で
予約数（リスケ・再面談を除く）を出す。CRM に3列が入るまでは「列が無い」と案内して終了する。

### GA4

```
node scripts/ga4-blog-sessions.mjs            # 直近28日
node scripts/ga4-blog-sessions.mjs --days 90
```

ランディングページが `/blog/` で始まるセッションを流入元別・記事別に集計し、`cv_setsumeikai` の件数と並べる
（Data API。ブログに GTM-K6HH9C2F が入ってからのデータだけ入る）。

GA4 の画面で見る場合は「探索」→ 空白 → セグメント追加 → **セッションセグメント** →
条件「ページパス 含む `/blog/`」→ 指標に セッション / キーイベント（cv_setsumeikai）を置く。
