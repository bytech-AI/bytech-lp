import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BizHeader, BizFooter } from "../../_chrome/BizChrome";

// 資料の閲覧ページ（SmartHR の web-ebook 型）。1資料＝1URL で、ページ上でスライドを
// 縦に読めて、そのまま PDF も落とせる。
//
// ★スライドは画像ではなく HTML。原稿 docs/ebooks/<slug>/deck.html から
//   scripts/build-ebook.mjs が public/biz/ebooks/<slug>/index.html（埋め込み版）を生成し、
//   ここでは iframe で表示して幅に合わせて縮小する。iframe 分離なので、スライド側の
//   CSS（Webフォント・1280px固定レイアウト）がサイト側と衝突しない。
// ★PDF (/biz/assets/docs/<slug>.pdf) は「配布物の更新指示があったときだけ」
//   `node scripts/build-ebook.mjs <slug> --pdf` で書き出す運用。
// ★検索には出さない: フォーム送信後の自動返信メールから来てもらう非公開ページのため、
//   全ページ noindex。sitemap にも意図的に載せていない。

type Ebook = {
  slug: string;
  title: string;
  description: string;
};

const EBOOKS: Ebook[] = [
  {
    slug: "ebook-01",
    title: "サービス概要資料",
    description:
      "バイテック法人AI研修のサービス全体像をまとめた資料です。研修プラン・6つのコース・料金と助成金活用・導入事例・研修開始までの流れまで、検討に必要な情報を1冊にまとめています。",
  },
  {
    slug: "ebook-02",
    title: "助成金活用ガイド",
    description:
      "人材開発支援助成金「事業展開等リスキリング支援コース」を使って、AI研修の費用負担を抑える方法をまとめた資料です。対象要件・助成額の試算・申請スケジュール・つまずきやすい点まで解説します。",
  },
  {
    slug: "ebook-03",
    title: "AI導入を成功させるチェックシート",
    description:
      "社内のAI活用が「導入したのに使われない」状態に陥らないための50項目のチェックシートです。目的設定・推進体制・ルール整備・教育・定着の5カテゴリで現状を可視化し、スコアからフェーズ別の次の一手がわかります。",
  },
  {
    slug: "ebook-04",
    title: "AI研修タイプ 比較ガイド",
    description:
      "eラーニング・セミナー・ハンズオン・ワークショップ、4つの研修タイプの違いをまとめた資料です。実施方法・料金目安・向いている目的を比較表で整理し、目的別の選び方・組み合わせ例・助成金対応プランまで解説します。",
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
        /* タイトルは Noto Sans JP 800（上のGoogle Fontsリンクで読み込み）。
           フォールバックはW8を持つ Hiragino Sans（ProNはW6止まりで800が潰れるため不可） */
        .eb-title { font-family: "Noto Sans JP", "Hiragino Sans", var(--font-noto-jp), sans-serif; font-size: 38px; font-weight: 800; line-height: 1.45; letter-spacing: .01em; margin: 0 0 26px; color: #1a2330; }
        .eb-desc { font-size: 15px; line-height: 2; margin: 0; color: #465060; }

        .eb-dl { display: flex; justify-content: center; margin: 46px 0 0; }
        .eb-dl a { display: inline-flex; align-items: center; gap: 14px; background: #fff; border: 1px solid #d7dde6; border-radius: 9999px; padding: 18px 40px; font-size: 16px; font-weight: 800; color: #1a2330; text-decoration: none; box-shadow: 0 1px 2px rgba(26,35,48,.05); transition: border-color .2s ease; }
        .eb-dl a:hover { border-color: #2c5c9c; }
        .eb-dl a:hover .eb-dl__ico { transform: translateY(3px); }
        .eb-dl__ico { width: 20px; height: 20px; flex: 0 0 auto; transition: transform .2s ease; background: center/contain no-repeat url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232c5c9c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 3v12'/%3E%3Cpath d='m7 11 5 5 5-5'/%3E%3Cpath d='M4 20h16'/%3E%3C/svg%3E"); }

        /* スライド（1280px固定の埋め込みHTMLを、コンテナ幅に合わせて縮小表示） */
        .eb-deck { position: relative; margin-top: 64px; width: 100%; overflow: hidden; border: 1px solid #e3e8ef; border-radius: 0; background: #e9edf3; }
        .eb-deck iframe { display: block; width: 1280px; height: 720px; border: 0; transform-origin: top left; }

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
          .eb-deck { margin-top: 40px; }
          .eb-foot { margin-top: 48px; padding-top: 32px; }
          .eb-foot__btn { width: 100%; }
        }
`;

// iframe内のスライド(幅1280px固定)をコンテナ幅にスケールし、高さを実コンテンツに合わせる。
// next/scriptはNext16でinline評価が壊れるためネイティブ<script>（既存ページと同じ回避策）。
const DECK_FIT_JS = `
(function(){
  function fit(){
    var w=document.querySelector('.eb-deck');if(!w)return;
    var f=w.querySelector('iframe');if(!f)return;
    var s=w.clientWidth/1280;
    f.style.transform='scale('+s+')';
    try{
      var d=f.contentDocument;
      var h=d&&d.body?d.body.scrollHeight:0;
      // iframe自体も実コンテンツ高に伸ばす（720px固定のままだと1枚目以降が描画されない）
      if(h>0){f.style.height=h+'px';w.style.height=(h*s)+'px';}
    }catch(e){}
  }
  var tries=0;
  var t=setInterval(function(){fit();if(++tries>40)clearInterval(t);},250);
  window.addEventListener('resize',fit);
  document.addEventListener('DOMContentLoaded',fit);
  var fr=document.querySelector('.eb-deck iframe');
  if(fr)fr.addEventListener('load',function(){fit();setTimeout(fit,300);setTimeout(fit,1200);});
})();
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
  // biz ホストはクリーンURLで参照（/biz付きだと301を挟む）。proxy の汎用リライトで
  // 内部の /biz/ebooks/... に解決される。
  const embedSrc = `/ebooks/${ebook.slug}/index.html`;

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@800&display=swap"
        rel="stylesheet"
      />
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

          <div className="eb-deck">
            <iframe src={embedSrc} title={`${ebook.title} スライド`} scrolling="no" />
          </div>
          <script dangerouslySetInnerHTML={{ __html: DECK_FIT_JS }} />

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
