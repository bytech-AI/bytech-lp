import type { Metadata } from "next";
import Link from "next/link";
import { BizFooter, BizHeader, BIZ_HEADER_OFFSET } from "../_chrome/BizChrome";
import { FaqList } from "./FaqList";
import { FAQ_GROUPS } from "./data";
import "./faq-page.css";

export const metadata: Metadata = {
  title: "よくあるご質問｜バイテック法人AI研修",
  description:
    "バイテック法人AI研修（法人向け生成AI研修）へのよくあるご質問。サービス内容・研修カリキュラム・料金・導入の流れ・サポート体制・セキュリティについてまとめました。",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "よくあるご質問｜バイテック法人AI研修",
    description:
      "バイテック法人AI研修（法人向け生成AI研修）へのよくあるご質問をカテゴリ別にまとめました。",
    url: "/faq",
    siteName: "バイテック法人AI研修",
  },
};

// FVのカテゴリボタンは基本カテゴリ（サービス〜セキュリティ）の6つだけ出す
const HERO_CATS = 6;
const FAQ_COUNT = FAQ_GROUPS.reduce((n, g) => n + g.items.length, 0);

// FAQPage 構造化データ（Google のFAQリッチリザルト用）。data.ts を唯一のソースにする。
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_GROUPS.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  ),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <BizHeader />
      <main className="news-page" style={{ paddingTop: BIZ_HEADER_OFFSET }}>
        <div className="news-page__inner">
          <nav className="news-breadcrumb" aria-label="パンくず">
            <Link href="/">トップ</Link>
            <span>›</span>
            <span>よくあるご質問</span>
          </nav>
          <header className="faq-hero">
            <div className="faq-hero__body">
              <p className="faq-hero__eyebrow">FAQ</p>
              <h1 className="faq-hero__title">よくあるご質問</h1>
              <p className="faq-hero__lead">
                サービス内容・研修カリキュラム・料金・導入の流れまで、
                <br className="faq-hero__pc" />
                お客さまからよくいただくご質問をまとめました。
              </p>
              <p className="faq-hero__count">
                <b>{FAQ_COUNT}</b>件のご質問に回答しています
              </p>
              {/* 主要カテゴリへのショートカット（研修コース別カテゴリは左ナビから） */}
              <ul className="faq-hero__cats">
                {FAQ_GROUPS.slice(0, HERO_CATS).map((group, i) => (
                  <li key={group.category}>
                    <a href={`#faq-cat-${i}`}>{group.category}</a>
                  </li>
                ))}
              </ul>
            </div>
            {/* 右側の装飾：Q と A の吹き出し */}
            <div className="faq-hero__art" aria-hidden="true">
              <p className="faq-hero__bubble faq-hero__bubble--q">
                <span>Q</span>
                <i />
                <i />
              </p>
              <p className="faq-hero__bubble faq-hero__bubble--a">
                <span>A</span>
                <i />
                <i />
                <i />
              </p>
            </div>
          </header>

          <FaqList />

          <section className="faq-cta">
            <p className="faq-cta__title">まずはお気軽にご相談ください</p>
            <p className="faq-cta__text">
              ご不明な点は無料個別相談で。サービス資料のダウンロードもこちらから。
            </p>
            <div className="faq-cta__actions">
              <a className="faq-cta__btn faq-cta__btn--fill" href="/counseling">
                無料個別相談を予約する
              </a>
              <a className="faq-cta__btn faq-cta__btn--outline" href="/doc-a">
                資料をダウンロード
              </a>
            </div>
          </section>
        </div>
      </main>
      <BizFooter />
    </>
  );
}
