/* eslint-disable @next/next/no-html-link-for-pages -- geek のトップ(/)は静的HTMLへのリライトなので Link にしない */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GEEK_CHROME_SCRIPT, GeekFooter, GeekHeader, GeekStyles } from "../../geek-course/GeekChrome";
import { GEEK_NEWS, getNewsById, newsBody, newsCategory } from "@/lib/microcms";
import { formatNewsDate, geekNewsThumbnail } from "../news-utils";
import "../geek-news.css";

type Props = { params: Promise<{ id: string }> };

const SITE = "https://geek.bytech.jp";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getNewsById((await params).id, GEEK_NEWS);
  if (!item) return { title: "お知らせ｜バイテックGEEK【公式】" };
  const description = item.description || item.title;
  const image = geekNewsThumbnail(item);
  return {
    metadataBase: new URL(SITE),
    title: `${item.title}｜バイテックGEEK`,
    description,
    alternates: { canonical: `/news/${item.id}` },
    openGraph: {
      type: "article",
      siteName: "バイテックGEEK",
      title: item.title,
      description,
      url: `/news/${item.id}`,
      images: [image],
      publishedTime: item.publishedAt,
      modifiedTime: item.revisedAt || item.publishedAt,
      locale: "ja_JP",
    },
    twitter: { card: "summary_large_image", title: item.title, description, images: [image] },
  };
}

export default async function GeekNewsDetailPage({ params }: Props) {
  const item = await getNewsById((await params).id, GEEK_NEWS);
  if (!item) notFound();
  const body = newsBody(item);
  const image = geekNewsThumbnail(item);
  const url = `${SITE}/news/${item.id}`;
  const date = item.publishedAt || item.revisedAt;

  // 構造化データ。運営者は geek の他ページと同じ @id（#organization）を参照する
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "@id": `${url}#article`,
        headline: item.title,
        description: item.description || item.title,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: image.startsWith("http") ? image : `${SITE}${image}`,
        datePublished: item.publishedAt,
        dateModified: item.revisedAt || item.publishedAt,
        articleSection: newsCategory(item),
        inLanguage: "ja",
        author: { "@id": `${SITE}/#organization` },
        publisher: { "@id": `${SITE}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "TOP", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "お知らせ", item: `${SITE}/news` },
          { "@type": "ListItem", position: 3, name: item.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GeekStyles />
      <GeekHeader />
      <main className="gn-page gn-page--detail">
        <div className="gn-inner gn-inner--narrow">
          <nav className="gn-breadcrumb" aria-label="パンくず">
            <a href="/">TOP</a>
            <span aria-hidden="true">›</span>
            <a href="/news">お知らせ</a>
            <span aria-hidden="true">›</span>
            <span>{item.title}</span>
          </nav>
          <article className="gn-article">
            <div className="gn-item__meta">
              <time dateTime={date}>{formatNewsDate(date)}</time>
              <span className="gn-cat">{newsCategory(item)}</span>
            </div>
            <h1 className="gn-article__ttl">{item.title}</h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="gn-article__thumb" src={image} alt="" />
            {body ? (
              <div className="gn-article__body" dangerouslySetInnerHTML={{ __html: body }} />
            ) : (
              <p className="gn-empty">本文は準備中です。</p>
            )}
          </article>
          <p className="gn-back"><a href="/news">お知らせ一覧へ戻る</a></p>
        </div>
      </main>
      <script dangerouslySetInnerHTML={{ __html: GEEK_CHROME_SCRIPT }} />
      <GeekFooter />
    </>
  );
}
