/* eslint-disable @next/next/no-html-link-for-pages -- geek のトップ(/)は静的HTMLへのリライトなので Link にしない */
import type { Metadata } from "next";
import { GEEK_CHROME_SCRIPT, GeekFooter, GeekHeader, GeekStyles } from "../geek-course/GeekChrome";
import { GEEK_NEWS_ENDPOINT, getNews } from "@/lib/microcms";
import { NewsList } from "./NewsList";
import "./geek-news.css";

// geek.bytech.jp/news（proxy.ts で /geek-news へリライト）。
// 記事は microCMS（bytech-biz）の geek-news API。種別は「お知らせ」「メディア掲載」。

const description = "バイテックGEEKからのお知らせ、メディア掲載情報をご案内します。";

export const metadata: Metadata = {
  metadataBase: new URL("https://geek.bytech.jp"),
  title: "お知らせ｜バイテックGEEK【公式】",
  description,
  alternates: { canonical: "/news" },
  openGraph: {
    type: "website",
    url: "https://geek.bytech.jp/news",
    siteName: "バイテックGEEK",
    title: "お知らせ｜バイテックGEEK【公式】",
    description,
    images: ["/geek-static/files/ogp.jpg"],
    locale: "ja_JP",
  },
  twitter: { card: "summary_large_image" },
};

export default async function GeekNewsPage() {
  const news = await getNews(100, GEEK_NEWS_ENDPOINT);
  return (
    <>
      <GeekStyles />
      <GeekHeader />
      <main className="gn-page">
        <div className="gn-hero">
          <p className="gn-hero__en">NEWS</p>
          <h1 className="gn-hero__ttl">お知らせ</h1>
        </div>
        <div className="gn-inner">
          <nav className="gn-breadcrumb" aria-label="パンくず">
            <a href="/">TOP</a>
            <span aria-hidden="true">›</span>
            <span>お知らせ</span>
          </nav>
          <NewsList news={news} />
        </div>
      </main>
      <script dangerouslySetInnerHTML={{ __html: GEEK_CHROME_SCRIPT }} />
      <GeekFooter />
    </>
  );
}
