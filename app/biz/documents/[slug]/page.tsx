import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BizHeader, BizFooter } from "../../_chrome/BizChrome";

// 資料の閲覧ページ（SmartHR の web-ebook 型）。1資料＝1URL で、ページ上でスライドを
// 縦に読めて、そのまま PDF も落とせる。
//
// ★検索には出さない: フォーム送信後の自動返信メールから来てもらう非公開ページのため、
//   全ページ noindex。sitemap(app/biz/sitemap.xml/route.ts)にも意図的に載せていない。
// ★スライドは現状プレースホルダー。実データ投入時に slides を画像パスの配列に差し替える。
// ★PDF は /biz/assets/docs/<slug>.pdf を配置したら有効になる（未配置のうちは404）。

type Ebook = {
  slug: string;
  title: string;
  description: string;
  slideCount: number; // プレースホルダーの枚数。実画像を入れるまでの仮
};

const EBOOKS: Ebook[] = [
  {
    slug: "ebook-01",
    title: "サービス概要資料",
    description:
      "バイテック法人AI研修のサービス全体像をまとめた資料です。カリキュラム・受講形式・料金プラン・導入の流れまで、検討に必要な情報を1冊にまとめています。",
    slideCount: 20,
  },
  {
    slug: "ebook-02",
    title: "助成金活用ガイド",
    description:
      "人材開発支援助成金「事業展開等リスキリング支援コース」を使って、AI研修の費用負担を抑える方法をまとめた資料です。対象要件・助成額の試算・申請スケジュール・つまずきやすい点まで解説します。",
    slideCount: 22,
  },
  {
    slug: "ebook-03",
    title: "AI導入を成功させるチェックシート",
    description:
      "社内のAI活用が「導入したのに使われない」状態に陥らないための50項目のチェックシートです。目的設定・推進体制・ルール整備・教育・定着の5カテゴリで現状を可視化できます。",
    slideCount: 12,
  },
];

const getEbook = (slug: string) => EBOOKS.find((e) => e.slug === slug);

// 未登録slugは404（動的生成しない）。既存ページ同様、静的HTML配信を維持する。
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return EBOOKS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ebook = getEbook(slug);
  if (!ebook) return { robots: { index: false, follow: false } };
  return {
    title: `${ebook.title}｜バイテック法人AI研修`,
    description: ebook.description,
    // 親レイアウト(documents/layout.tsx)の canonical="/documents" を継承させない
    alternates: { canonical: `/documents/${ebook.slug}` },
    robots: { index: false, follow: false },
  };
}

const PAGE_CSS = `
        /* 資料ページはヘッダーを固定しない（fixed→absoluteでスクロール時に流す）。
           BizHeaderのstyleが後に来るため !important で上書き。 */
        .top-header-wrap { position: absolute !important; }
        body { font-family: var(--font-noto-jp), sans-serif; color: #2a2f3a; background: #f4f6f8; margin: 0; padding: 0; }

        .eb-topbar { background: #fff; padding-top: 88px; }
        .eb-breadcrumb { max-width: 1240px; margin: 0 auto; padding: 16px 40px; font-size: 12px; font-weight: 700; color: #8a93a3; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .eb-breadcrumb a { color: #2a5a9b; text-decoration: none; }
        .eb-breadcrumb a:hover { text-decoration: underline; }
        .eb-breadcrumb__sep { color: #c3cad6; }
        .eb-breadcrumb__home { width: 13px; height: 13px; flex: 0 0 auto; background: center/contain no-repeat url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232a5a9b'%3E%3Cpath d='M12 3 2 12h3v9h6v-6h2v6h6v-9h3z'/%3E%3C/svg%3E"); }

        /* 白いカード1枚の上に、資料情報とスライドを縦に積む */
        .eb-wrap { max-width: 1240px; margin: 0 auto; padding: 40px 40px 90px; }
        .eb-card { background: #fff; border-radius: 14px; padding: 76px 96px 90px; }
        .eb-head { max-width: 860px; }
        .eb-title { font-size: 38px; font-weight: 800; line-height: 1.45; letter-spacing: .01em; margin: 0 0 26px; color: #1a2330; }
        .eb-desc { font-size: 15px; line-height: 2; margin: 0; color: #465060; }

        .eb-dl { display: flex; justify-content: center; margin: 46px 0 0; }
        .eb-dl a { display: inline-flex; align-items: center; gap: 14px; background: #fff; border: 1px solid #d7dde6; border-radius: 9999px; padding: 18px 40px; font-size: 16px; font-weight: 800; color: #1a2330; text-decoration: none; box-shadow: 0 1px 2px rgba(26,35,48,.05); transition: border-color .2s ease, box-shadow .2s ease, transform .2s ease; }
        .eb-dl a:hover { border-color: #2c5c9c; box-shadow: 0 6px 16px rgba(26,35,48,.10); transform: translateY(-1px); }
        .eb-dl__ico { width: 20px; height: 20px; flex: 0 0 auto; background: center/contain no-repeat url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232c5c9c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 3v12'/%3E%3Cpath d='m7 11 5 5 5-5'/%3E%3Cpath d='M4 20h16'/%3E%3C/svg%3E"); }

        /* スライド（実データ投入までは番号入りのプレースホルダー） */
        .eb-slides { margin-top: 64px; display: flex; flex-direction: column; gap: 28px; }
        .eb-slide { position: relative; aspect-ratio: 16/9; border: 1px solid #e3e8ef; border-radius: 10px; overflow: hidden; background: linear-gradient(135deg, #f7f9fc, #eaeff6); display: flex; align-items: center; justify-content: center; }
        .eb-slide img { width: 100%; height: 100%; object-fit: contain; }
        .eb-slide__ph { display: flex; flex-direction: column; align-items: center; gap: 10px; color: #a9b6c8; }
        .eb-slide__no { font-family: "Futura","Futura Medium",sans-serif; font-size: 34px; font-weight: 700; letter-spacing: .12em; }
        .eb-slide__label { font-size: 12px; font-weight: 700; letter-spacing: .14em; }

        /* 末尾のCTA */
        .eb-foot { margin-top: 72px; padding-top: 46px; border-top: 1px solid #e6eaf0; text-align: center; }
        .eb-foot__lead { font-size: 18px; font-weight: 800; color: #1a2330; margin: 0 0 22px; }
        .eb-foot__row { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }
        .eb-foot__btn { display: inline-flex; align-items: center; justify-content: center; border-radius: 9999px; padding: 16px 34px; font-size: 15px; font-weight: 800; text-decoration: none; }
        .eb-foot__btn--primary { background: #2c5c9c; color: #fff; }
        .eb-foot__btn--primary:hover { opacity: .92; }
        .eb-foot__btn--ghost { background: #fff; color: #1a2330; border: 1px solid #d7dde6; }
        .eb-foot__btn--ghost:hover { border-color: #2c5c9c; }

        @media (max-width: 900px) {
          .eb-topbar { padding-top: 72px; }
          .eb-breadcrumb { padding: 12px 20px; }
          .eb-wrap { padding: 20px 16px 64px; }
          .eb-card { border-radius: 10px; padding: 40px 20px 52px; }
          .eb-title { font-size: 25px; margin-bottom: 18px; }
          .eb-desc { font-size: 14px; line-height: 1.95; }
          .eb-dl { margin-top: 32px; }
          .eb-dl a { width: 100%; justify-content: center; padding: 16px 20px; font-size: 15px; }
          .eb-slides { margin-top: 40px; gap: 16px; }
          .eb-slide__no { font-size: 24px; }
          .eb-foot { margin-top: 48px; padding-top: 32px; }
          .eb-foot__btn { width: 100%; }
        }
`;

export default async function EbookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ebook = getEbook(slug);
  if (!ebook) {
    notFound();
  }

  const pdfHref = `/biz/assets/docs/${ebook.slug}.pdf`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />
      <BizHeader />

      <div className="eb-topbar">
        <nav className="eb-breadcrumb" aria-label="パンくず">
          <span className="eb-breadcrumb__home" aria-hidden="true" />
          <a href="/">トップ</a>
          <span className="eb-breadcrumb__sep">&rsaquo;</span>
          <a href="/documents">お役立ち資料</a>
          <span className="eb-breadcrumb__sep">&rsaquo;</span>
          <span>{ebook.title}</span>
        </nav>
      </div>

      <main className="eb-wrap">
        <article className="eb-card">
          <div className="eb-head">
            <h1 className="eb-title">{ebook.title}</h1>
            <p className="eb-desc">{ebook.description}</p>
          </div>

          <div className="eb-dl">
            <a href={pdfHref} download>
              ダウンロードする(PDF形式)
              <span className="eb-dl__ico" aria-hidden="true" />
            </a>
          </div>

          <div className="eb-slides">
            {Array.from({ length: ebook.slideCount }, (_, i) => (
              <div className="eb-slide" key={i}>
                <div className="eb-slide__ph">
                  <span className="eb-slide__no">{String(i + 1).padStart(2, "0")}</span>
                  <span className="eb-slide__label">SLIDE PLACEHOLDER</span>
                </div>
              </div>
            ))}
          </div>

          <div className="eb-foot">
            <p className="eb-foot__lead">資料は下記からダウンロードいただけます</p>
            <div className="eb-foot__row">
              <a className="eb-foot__btn eb-foot__btn--primary" href={pdfHref} download>
                ダウンロードする(PDF形式)
              </a>
              <a className="eb-foot__btn eb-foot__btn--ghost" href="/counseling">
                無料個別相談を予約する
              </a>
            </div>
          </div>
        </article>
      </main>

      <BizFooter />
    </>
  );
}
