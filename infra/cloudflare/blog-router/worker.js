// Cloudflare Worker `blog-router`
// ルート: bytech.jp/blog* と biz.bytech.jp/blog*（zone bytech.jp）。WP サーバー（wp.bytech.jp = 160.251.148.16）へプロキシする。
//
// 2026-10-01: bytech.jp/blog の HTML だけ、<head> 末尾に GTM-K6HH9C2F と btRefInfo を差し込む。
//   - ブログ閲覧と予約完了(/thanks の cv_setsumeikai)を同じ GA4 プロパティ・同じセッションで扱う
//   - 検索→ブログ着地時の紹介元(ref)と最初のパス(landing)を保持し、予約時に GAS→CRM へ渡す
//   biz.bytech.jp/blog は GTM-KK696RSD で別運用なので触らない。HTML 以外（画像・CSS・JS・feed）も触らない。
//
// __SNIPPET__ は scripts/deploy-blog-router.mjs が docs/analytics/blog-head-snippet.html の内容で置き換える。
// ダッシュボードから直接編集せず、このファイルを直して deploy スクリプトで上げること。

const HEAD_SNIPPET = __SNIPPET__;

const NOSCRIPT =
    '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K6HH9C2F" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>';

export default {
    async fetch(request) {
        const res = await fetch(request, { cf: { resolveOverride: 'wp.bytech.jp' } });

        const host = new URL(request.url).hostname;
        const type = res.headers.get('content-type') || '';
        if (host !== 'bytech.jp' || !type.includes('text/html')) return res;

        return new HTMLRewriter()
            .on('head', {
                element(el) {
                    el.append(HEAD_SNIPPET, { html: true });
                },
            })
            .on('body', {
                element(el) {
                    el.prepend(NOSCRIPT, { html: true });
                },
            })
            .transform(res);
    },
};
