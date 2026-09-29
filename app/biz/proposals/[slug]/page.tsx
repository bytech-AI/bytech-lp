import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BizHeader, BizFooter } from "../../_chrome/BizChrome";

// お客様ごとの個別提案書の閲覧ページ。/documents/[slug]（お役立ち資料）と同じ仕組みで
// docs/ebooks/<deck>/deck.html → scripts/build-ebook.mjs → public/biz/ebooks/<deck>/index.html
// を iframe で表示するが、こちらは「表に出さない」前提:
//   ・DLフォーム・PDFボタン・お役立ち資料一覧への掲載・sitemap 掲載はしない
//   ・全ページ noindex。URLを知っている先方担当者だけが開く想定
//   ・パンくずも「お役立ち資料」へは繋がず、トップ › ご提案書 のみ
// 新しい提案書を足すときは PROPOSALS に1件追加し、deck を build してから PR。

type Proposal = {
  slug: string; // URL: /proposals/<slug>
  deck: string; // docs/ebooks/<deck> ＝ public/biz/ebooks/<deck>
  title: string;
  client: string;
  description: string;
  contact: string;
};

const PROPOSALS: Proposal[] = [
  {
    slug: "bell-2610",
    deck: "proposal-bell-2610",
    title: "AI推進担当 マンツーマン研修のご提案",
    client: "ベル様",
    description:
      "推進担当3名（大阪営業2名・内勤1名）のマンツーマン研修のご提案書です。貴社の現状と目的、研修の中身と進め方、学習時間のイメージ、セキュリティ、助成金を使わない理由、料金（特別価格）、費用対効果、導入の流れまでを1冊にまとめています。",
    contact: "担当：安原",
  },
];

const getProposal = (slug: string) => PROPOSALS.find((p) => p.slug === slug);

// 未登録slugは404（動的生成しない）。既存ページ同様、静的HTML配信を維持する。
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return PROPOSALS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const proposal = getProposal(slug);
  if (!proposal) return { robots: { index: false, follow: false } };
  return {
    title: `${proposal.client} ${proposal.title}｜バイテック法人AI研修`,
    description: proposal.description,
    // ルートレイアウトの canonical("/") を継承させない
    alternates: { canonical: `/proposals/${proposal.slug}` },
    robots: { index: false, follow: false, nocache: true },
    openGraph: undefined,
  };
}

const PAGE_CSS = `
        .top-header-wrap { position: absolute !important; }
        body { font-family: var(--font-noto-jp), sans-serif; color: #2a2f3a; background: #f4f6f8; margin: 0; padding: 0; }

        .eb-topbar { background: #fff; padding-top: 88px; }
        .eb-breadcrumb { max-width: 1240px; margin: 0 auto; padding: 16px 40px; font-size: 12px; font-weight: 700; color: #8a93a3; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .eb-breadcrumb a { color: #2a5a9b; text-decoration: none; }
        .eb-breadcrumb a:hover { text-decoration: underline; }
        .eb-breadcrumb__sep { color: #c3cad6; }
        .eb-breadcrumb__home { width: 13px; height: 13px; flex: 0 0 auto; background: center/contain no-repeat url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232a5a9b'%3E%3Cpath d='M12 3 2 12h3v9h6v-6h2v6h6v-9h3z'/%3E%3C/svg%3E"); }

        .eb-wrap { max-width: 1240px; margin: 0 auto; padding: 40px 40px 90px; }
        .eb-card { background: #fff; border-radius: 14px; padding: 76px 96px 90px; }
        .eb-head { max-width: 860px; }
        .eb-client { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 800; color: #2c5c9c; letter-spacing: .08em; margin: 0 0 14px; }
        .eb-client::before { content: ""; width: 22px; height: 3px; background: #2c5c9c; }
        .eb-title { font-family: "Noto Sans JP", "Hiragino Sans", var(--font-noto-jp), sans-serif; font-size: 38px; font-weight: 800; line-height: 1.45; letter-spacing: .01em; margin: 0 0 26px; color: #1a2330; }
        .eb-desc { font-size: 15px; line-height: 2; margin: 0; color: #465060; }
        .eb-meta { font-size: 13px; font-weight: 700; color: #8a93a3; margin: 18px 0 0; }
        .eb-conf { margin: 28px 0 0; padding: 12px 16px; border: 1px solid #e3e8ef; background: #f9fafc; font-size: 12.5px; line-height: 1.8; color: #5a6578; }

        .eb-deck { position: relative; margin-top: 56px; width: 100%; overflow: hidden; border: 1px solid #e3e8ef; border-radius: 0; background: #e9edf3; }
        .eb-deck iframe { display: block; width: 1280px; height: 720px; border: 0; transform-origin: top left; }

        .eb-foot { margin-top: 72px; padding-top: 46px; border-top: 1px solid #e6eaf0; text-align: center; }
        .eb-foot__lead { font-size: 18px; font-weight: 800; color: #1a2330; margin: 0 0 10px; }
        .eb-foot__desc { font-size: 14px; line-height: 1.9; color: #465060; margin: 0; }

        @media (max-width: 900px) {
          .eb-topbar { padding-top: 72px; }
          .eb-breadcrumb { padding: 12px 20px; }
          .eb-wrap { padding: 20px 16px 64px; }
          .eb-card { border-radius: 10px; padding: 40px 20px 52px; }
          .eb-title { font-size: 25px; margin-bottom: 18px; }
          .eb-desc { font-size: 14px; line-height: 1.95; }
          .eb-deck { margin-top: 36px; }
          .eb-foot { margin-top: 48px; padding-top: 32px; }
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

export default async function ProposalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proposal = getProposal(slug);
  if (!proposal) {
    notFound();
  }

  // biz ホストはクリーンURLで参照。proxy の汎用リライトで内部の /biz/ebooks/... に解決される。
  const embedSrc = `/ebooks/${proposal.deck}/index.html`;

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
          <span>ご提案書</span>
        </nav>
      </div>

      <main className="eb-wrap">
        <article className="eb-card">
          <div className="eb-head">
            <p className="eb-client">{proposal.client} 御中</p>
            <h1 className="eb-title">{proposal.title}</h1>
            <p className="eb-desc">{proposal.description}</p>
            <p className="eb-meta">バイテック法人AI研修（株式会社AI棒）　{proposal.contact}</p>
            <p className="eb-conf">
              本ページは {proposal.client} 向けの個別のご提案書です。社外への共有・転載はご遠慮ください。
              内容についてのご質問は、担当までお気軽にお問い合わせください。
            </p>
          </div>

          <div className="eb-deck">
            <iframe src={embedSrc} title={`${proposal.title} スライド`} scrolling="no" />
          </div>
          <script dangerouslySetInnerHTML={{ __html: DECK_FIT_JS }} />

          <div className="eb-foot">
            <p className="eb-foot__lead">ご不明点は、15分ほどで直接ご説明します</p>
            <p className="eb-foot__desc">
              お電話・オンラインどちらでも結構です。{proposal.contact}（バイテック法人AI研修）
            </p>
          </div>
        </article>
      </main>

      <BizFooter />
    </>
  );
}
