import type { MicroCmsNews } from "@/lib/microcms";
import { newsBody, newsCategory, newsPath } from "@/lib/microcms";

// bytech.jp/news のHTML組み立て。ホームや各コースLPと同じく React を使わない静的HTMLで返し、
// 共通ヘッダー/フッターは <!--SHARED_HEADER--> / <!--SHARED_FOOTER--> を renderedHtmlResponse が差し込む。

const SITE = "https://bytech.jp";
const SITE_NAME = "バイテックAIスクール";

// microCMS（bytech-blog サービスの news API）の「種別」セレクトと同じ並び・表記にする
export const SCHOOL_NEWS_CATEGORIES = ["お知らせ", "メディア掲載"];

export const LIST_DESCRIPTION = "バイテックAIスクールからのお知らせ、メディア掲載情報をご案内します。";

function esc(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export function formatNewsDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 10);
  // 表示は日本時間で揃える（サーバーはUTCで動くため、深夜公開の記事が前日にずれる）
  return new Intl.DateTimeFormat("ja-JP", { timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit" })
    .format(date)
    .replace(/\//g, ".");
}

function thumbnailUrl(news: MicroCmsNews) {
  const image = news.thumbnail || news.eyecatch;
  return (typeof image === "string" ? image : image?.url) || "";
}

// サムネ未設定の記事はロゴの枠で埋める（bytech.jp には共通のOGP画像が無いため）
function thumb(news: MicroCmsNews, className: string, eager = false) {
  const url = thumbnailUrl(news);
  if (!url) {
    return `<span class="${className} sn-thumb--blank"><img src="/bytech/assets/images/logo-black.svg" alt="" width="160" height="40"></span>`;
  }
  return `<span class="${className}"><img src="${esc(url)}" alt=""${eager ? "" : ' loading="lazy"'}></span>`;
}

const STYLE = `<style id="sn-style">
.sn-page{--sn-primary:#533afc;--sn-primary-dark:#3b25d4;--sn-dark:#191722;--sn-line:#e3e1ee;--sn-mute:#6b6880;--sn-bg:#f7f6fb;
  background:var(--sn-bg);color:var(--sn-dark);padding:0 0 120px;font-family:var(--font-jost),"Futura","Century Gothic","Hiragino Sans","Hiragino Kaku Gothic ProN","Noto Sans JP",Meiryo,sans-serif;line-height:1.7}
.sn-page *{box-sizing:border-box}
.sn-page a{color:inherit;text-decoration:none}
.sn-hero{padding:150px 20px 56px;text-align:center;background:#fff;border-bottom:1px solid var(--sn-line);
  background-image:linear-gradient(var(--sn-line) 1px,transparent 1px),linear-gradient(90deg,var(--sn-line) 1px,transparent 1px);background-size:32px 32px;background-position:center top}
.sn-hero__en{margin:0 0 8px;color:var(--sn-primary);font-size:14px;font-weight:700;letter-spacing:.3em}
.sn-hero__ttl{margin:0;font-size:clamp(28px,4vw,40px);font-weight:900;letter-spacing:.08em}
.sn-inner{max-width:1040px;margin:0 auto;padding:0 24px}
.sn-inner--narrow{max-width:860px}
.sn-breadcrumb{display:flex;flex-wrap:wrap;gap:8px;padding:20px 0 32px;color:var(--sn-mute);font-size:13px;font-weight:700}
.sn-breadcrumb a{color:var(--sn-primary)}
.sn-breadcrumb span:last-child{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sn-tabs{display:flex;border:1px solid var(--sn-line);border-bottom:0;background:#fff}
.sn-tab{flex:1;min-width:0;padding:16px 8px;border:0;border-bottom:3px solid transparent;background:none;color:var(--sn-mute);font:inherit;font-size:15px;font-weight:700;letter-spacing:.04em;cursor:pointer}
.sn-tab+.sn-tab{border-left:1px solid var(--sn-line)}
.sn-tab:hover{color:var(--sn-dark)}
.sn-tab[aria-selected="true"]{color:var(--sn-primary);border-bottom-color:var(--sn-primary)}
.sn-list{list-style:none;margin:0;padding:0 28px;background:#fff;border:1px solid var(--sn-line)}
.sn-list li+li{border-top:1px solid var(--sn-line)}
.sn-list li[hidden]{display:none}
.sn-item{display:grid;grid-template-columns:200px 1fr 20px;gap:28px;align-items:center;padding:24px 0}
.sn-item__thumb{display:block;aspect-ratio:16/9;overflow:hidden;border:1px solid var(--sn-line);background:#fff}
.sn-item__thumb img{display:block;width:100%;height:100%;object-fit:cover}
.sn-thumb--blank{display:flex;align-items:center;justify-content:center;background:var(--sn-bg)}
.sn-thumb--blank img{width:56%!important;height:auto!important;object-fit:contain!important;opacity:.55}
.sn-item__meta{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-bottom:6px;color:var(--sn-mute);font-size:13px;font-weight:700}
.sn-cat{display:inline-block;padding:2px 10px;border:1px solid var(--sn-primary);color:var(--sn-primary);font-size:12px;line-height:1.6}
.sn-item__title{display:block;font-size:16px;font-weight:700;line-height:1.6}
.sn-item:hover .sn-item__title{color:var(--sn-primary)}
.sn-item__arrow{width:10px;height:10px;border-top:2px solid var(--sn-primary);border-right:2px solid var(--sn-primary);transform:rotate(45deg)}
.sn-empty{margin:0;padding:64px 20px;background:#fff;border:1px solid var(--sn-line);color:var(--sn-mute);text-align:center}
.sn-article{background:#fff;border:1px solid var(--sn-line);border-top:3px solid var(--sn-primary);padding:clamp(28px,5vw,56px)}
.sn-article__ttl{margin:14px 0 28px;font-size:clamp(22px,3vw,30px);font-weight:900;line-height:1.5}
.sn-article__thumb{display:block;margin:0 0 36px;aspect-ratio:16/9;overflow:hidden;border:1px solid var(--sn-line)}
.sn-article__thumb img{display:block;width:100%;height:100%;object-fit:cover}
.sn-article__body{font-size:16px;line-height:2;overflow-wrap:anywhere}
.sn-article__body h2{margin:48px 0 16px;padding:0 0 10px 14px;border-left:4px solid var(--sn-primary);border-bottom:1px solid var(--sn-line);font-size:21px;line-height:1.5}
.sn-article__body h3{margin:32px 0 10px;font-size:18px}
.sn-article__body p{margin:0 0 1.4em}
.sn-article__body ul,.sn-article__body ol{margin:0 0 1.4em;padding-left:1.4em}
.sn-article__body img{max-width:100%;height:auto}
.sn-article__body a{color:var(--sn-primary);text-decoration:underline}
.sn-article__body table{width:100%;border-collapse:collapse;margin:0 0 1.4em;font-size:15px}
.sn-article__body th,.sn-article__body td{padding:10px 12px;border:1px solid var(--sn-line);text-align:left}
.sn-article__body th{background:var(--sn-bg)}
.sn-back{display:flex;justify-content:center;margin-top:48px}
.sn-back a{display:inline-block;min-width:260px;padding:16px 32px;border:1px solid var(--sn-primary);background:#fff;color:var(--sn-primary);font-weight:700;text-align:center}
.sn-back a:hover{background:var(--sn-primary);color:#fff}
@media (max-width:767px){
  .sn-hero{padding:110px 16px 40px}
  .sn-inner{padding:0 16px}
  .sn-tab{padding:14px 4px;font-size:14px}
  .sn-list{padding:0 16px}
  .sn-item{grid-template-columns:112px 1fr;gap:14px;padding:18px 0}
  .sn-item__arrow{display:none}
  .sn-item__title{font-size:14px}
  .sn-item__meta{gap:8px;font-size:12px}
}
</style>`;

const TAB_SCRIPT = `<script>(function(){
var tabs=document.querySelectorAll('.sn-tab');var items=document.querySelectorAll('.sn-list li');var empty=document.getElementById('sn-empty-filter');
tabs.forEach(function(t){t.addEventListener('click',function(){
var c=t.getAttribute('data-cat');var n=0;
tabs.forEach(function(x){x.setAttribute('aria-selected',x===t?'true':'false');});
items.forEach(function(li){var show=c==='all'||li.getAttribute('data-cat')===c;li.hidden=!show;if(show)n++;});
if(empty)empty.hidden=n>0;
});});
})();</script>`;

function shell(opts: { title: string; description: string; canonical: string; type: string; image?: string; jsonLd: object; body: string; noindex?: boolean }) {
  const url = `${SITE}${opts.canonical}`;
  const image = opts.image ? `<meta property="og:image" content="${esc(opts.image)}">` : "";
  return `<!DOCTYPE html>
<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(opts.title)}</title>
<meta name="description" content="${esc(opts.description)}">
${opts.noindex ? '<meta name="robots" content="noindex">' : ""}
<link rel="canonical" href="${url}">
<link rel="icon" href="/icon.png" type="image/png">
<meta property="og:locale" content="ja_JP"><meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:type" content="${opts.type}"><meta property="og:title" content="${esc(opts.title)}">
<meta property="og:description" content="${esc(opts.description)}"><meta property="og:url" content="${url}">${image}
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify(opts.jsonLd).replace(/</g, "\\u003c")}</script>
<style>body{margin:0;background:#f7f6fb}</style>
${STYLE}
</head><body>
<!--SHARED_HEADER-->
${opts.body}
<!--SHARED_FOOTER-->
</body></html>`;
}

function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: `${SITE}${item.path}` })),
  };
}

export function renderNewsList(news: MicroCmsNews[]) {
  const tabs = [
    `<button type="button" role="tab" class="sn-tab" data-cat="all" aria-selected="true">すべて</button>`,
    ...SCHOOL_NEWS_CATEGORIES.map((c) => `<button type="button" role="tab" class="sn-tab" data-cat="${esc(c)}" aria-selected="false">${esc(c)}</button>`),
  ].join("");

  const list = news.length
    ? `<ul class="sn-list">${news
        .map((item) => {
          const date = item.publishedAt || item.revisedAt;
          const cat = newsCategory(item);
          return `<li data-cat="${esc(cat)}"><a class="sn-item" href="${newsPath(item)}">${thumb(item, "sn-item__thumb")}<span class="sn-item__body"><span class="sn-item__meta"><time datetime="${esc(date || "")}">${formatNewsDate(date)}</time><span class="sn-cat">${esc(cat)}</span></span><span class="sn-item__title">${esc(item.title)}</span></span><span class="sn-item__arrow" aria-hidden="true"></span></a></li>`;
        })
        .join("")}</ul><p class="sn-empty" id="sn-empty-filter" hidden>該当するお知らせはありません。</p>`
    : `<p class="sn-empty">現在公開中のお知らせはありません。</p>`;

  const body = `<main class="sn-page">
<div class="sn-hero"><p class="sn-hero__en">NEWS</p><h1 class="sn-hero__ttl">お知らせ</h1></div>
<div class="sn-inner">
<nav class="sn-breadcrumb" aria-label="パンくず"><a href="/">TOP</a><span aria-hidden="true">›</span><span>お知らせ</span></nav>
<div class="sn-tabs" role="tablist" aria-label="お知らせの種別">${tabs}</div>
${list}
</div>
</main>
${news.length ? TAB_SCRIPT : ""}`;

  return shell({
    title: `お知らせ｜${SITE_NAME}`,
    description: LIST_DESCRIPTION,
    canonical: "/news",
    type: "website",
    jsonLd: breadcrumbLd([
      { name: "TOP", path: "/" },
      { name: "お知らせ", path: "/news" },
    ]),
    body,
  });
}

export function renderNewsDetail(item: MicroCmsNews) {
  const date = item.publishedAt || item.revisedAt;
  const description = item.description || item.title;
  const image = thumbnailUrl(item);
  const path = newsPath(item);

  const body = `<main class="sn-page">
<div class="sn-hero"><p class="sn-hero__en">NEWS</p><p class="sn-hero__ttl">お知らせ</p></div>
<div class="sn-inner sn-inner--narrow">
<nav class="sn-breadcrumb" aria-label="パンくず"><a href="/">TOP</a><span aria-hidden="true">›</span><a href="/news">お知らせ</a><span aria-hidden="true">›</span><span>${esc(item.title)}</span></nav>
<article class="sn-article">
<div class="sn-item__meta"><time datetime="${esc(date || "")}">${formatNewsDate(date)}</time><span class="sn-cat">${esc(newsCategory(item))}</span></div>
<h1 class="sn-article__ttl">${esc(item.title)}</h1>
${image ? thumb(item, "sn-article__thumb", true) : ""}
<div class="sn-article__body">${newsBody(item)}</div>
</article>
<div class="sn-back"><a href="/news">お知らせ一覧へ戻る</a></div>
</div>
</main>`;

  return shell({
    title: `${item.title}｜${SITE_NAME}`,
    description,
    canonical: path,
    type: "article",
    image: image || undefined,
    jsonLd: [
      breadcrumbLd([
        { name: "TOP", path: "/" },
        { name: "お知らせ", path: "/news" },
        { name: item.title, path },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: item.title,
        description,
        datePublished: item.publishedAt,
        dateModified: item.revisedAt || item.publishedAt,
        ...(image ? { image: [image] } : {}),
        mainEntityOfPage: `${SITE}${path}`,
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE },
      },
    ],
    body,
  });
}
