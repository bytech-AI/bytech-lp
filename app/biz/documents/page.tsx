import { BizHeader, BizFooter } from "../_chrome/BizChrome";
import { LIB_CSS } from "../_chrome/libStyles";
import { CarouselInit } from "../_chrome/CarouselInit";
import {
  getDocuments,
  docCategory,
  docCategoryEn,
  docLines,
  docThumbnail,
  type MicroCmsDocument,
} from "@/lib/microcms";

// お役立ち資料一覧（資料ライブラリ型）。共通スタイルは _chrome/libStyles.ts（archive と共有）。
// データソースは microCMS「documents」（スキーマ: docs/microcms-documents-schema.md）に加え、
// リポジトリ内の静的ebook（STATIC_DOCS: /documents/ebook-01〜03）を常時表示する。
// ヒーローは CMS の isHero を優先し、無ければ3点セットDL訴求（SET_PROMO → /doc-a）を出す。

type DocItem = {
  title: string;
  points: string[];
  thumbLabel: string;
  thumb?: string;
  href: string;
  btnLabel?: string;
};

type Promo = {
  eyebrow: string;
  heading: string;
  btnLabel: string;
  href: string;
  thumbLabel: string;
  thumb?: string;
  trio?: string[]; // 3点セット用：カバー3枚を並べて表示（thumb より優先）
  recos: string[];
};

type Category = { name: string; en: string; docs: DocItem[] };

// カテゴリ別のデフォルトサムネ。資料側で画像未設定のとき、このカテゴリの共通サムネを使う。
const CATEGORY_THUMB: Record<string, string> = {
  サービス概要: "/biz/assets/img/documents/category-service.webp",
};

// リポジトリ内で持つ静的な資料。カードのリンク先はフォーム付きDLページ（/doc-b〜f）。
// 閲覧ページ /documents/ebook-0X は直リンクしない（DL導線はフォーム経由に統一）。
// カバーは public/biz/assets/img/documents/ のwebp。
const EBOOK_COVERS = [
  "/biz/assets/img/documents/ebook-01-cover.webp",
  "/biz/assets/img/documents/ebook-02-cover.webp",
  "/biz/assets/img/documents/ebook-03-cover.webp",
];

const STATIC_DOCS: { category: string; doc: DocItem }[] = [
  {
    category: "サービス概要",
    doc: {
      title: "サービス概要資料",
      points: ["研修プラン・6つのコースと料金", "助成金活用・導入事例", "研修開始までの流れ"],
      thumbLabel: "DOCUMENT",
      thumb: EBOOK_COVERS[0],
      href: "/doc-b",
    },
  },
  {
    category: "AI活用ノウハウ",
    doc: {
      title: "助成金活用ガイド",
      points: ["研修費用を最大75%抑える制度の使い方", "対象要件・助成額の試算例", "申請スケジュールとつまずきポイント"],
      thumbLabel: "DOCUMENT",
      thumb: EBOOK_COVERS[1],
      href: "/doc-c",
    },
  },
  {
    category: "AI活用ノウハウ",
    doc: {
      title: "AI導入を成功させる50のチェックシート",
      points: ["「導入したのに使われない」を防ぐ50項目", "目的設定・体制・ルール・教育・定着の5カテゴリ", "スコアからフェーズ別の次の一手がわかる"],
      thumbLabel: "DOCUMENT",
      thumb: EBOOK_COVERS[2],
      href: "/doc-d",
    },
  },
  {
    category: "サービス概要",
    doc: {
      title: "AI研修タイプ 比較ガイド",
      points: ["eラーニング・セミナー・ハンズオン・ワークショップの違い", "タイプ別の料金目安・見込める効果・導入事例・FAQ", "比較表と目的別の選び方"],
      thumbLabel: "DOCUMENT",
      thumb: "/biz/assets/img/documents/ebook-04-cover.webp",
      href: "/doc-e",
    },
  },
  {
    category: "研修コース紹介",
    doc: {
      title: "ChatGPT研修 コース紹介資料",
      points: ["カリキュラム全8ユニット・45レッスンの詳細", "3つの研修プランと料金・助成金活用", "サポート体制・研修開始までの流れ・FAQ"],
      thumbLabel: "DOCUMENT",
      thumb: "/biz/assets/img/documents/ebook-05-cover.webp",
      href: "/doc-f",
    },
  },
  {
    category: "研修コース紹介",
    doc: {
      title: "Gemini研修 コース紹介資料",
      points: ["カリキュラム全11ユニット・67レッスンの詳細", "3つの研修プランと料金・助成金活用", "研修開始までの流れ・FAQ"],
      thumbLabel: "DOCUMENT",
      thumb: "/biz/assets/img/documents/ebook-06-cover.webp",
      href: "/doc-g",
    },
  },
  {
    category: "研修コース紹介",
    doc: {
      title: "Claude研修 コース紹介資料",
      points: ["カリキュラム全14ユニット・81レッスンの詳細", "3つの研修プランと料金・助成金活用", "研修開始までの流れ・FAQ"],
      thumbLabel: "DOCUMENT",
      thumb: "/biz/assets/img/documents/ebook-07-cover.webp",
      href: "/doc-h",
    },
  },
  {
    category: "研修コース紹介",
    doc: {
      title: "Claude Code研修 コース紹介資料",
      points: ["カリキュラム全5ユニットの詳細", "3つの研修プランと料金・サポート体制", "研修開始までの流れ・FAQ"],
      thumbLabel: "DOCUMENT",
      thumb: "/biz/assets/img/documents/ebook-08-cover.webp",
      href: "/doc-i",
    },
  },
  {
    category: "研修コース紹介",
    doc: {
      title: "Copilot研修 コース紹介資料",
      points: ["カリキュラム全6ユニット・48レッスンの詳細", "3つの研修プランと料金・助成金活用", "研修開始までの流れ・FAQ"],
      thumbLabel: "DOCUMENT",
      thumb: "/biz/assets/img/documents/ebook-09-cover.webp",
      href: "/doc-j",
    },
  },
  {
    category: "研修コース紹介",
    doc: {
      title: "Copilot Studio研修 コース紹介資料",
      points: ["カリキュラム全11ユニット・70レッスンの詳細", "3つの研修プランと料金・助成金活用", "研修開始までの流れ・FAQ"],
      thumbLabel: "DOCUMENT",
      thumb: "/biz/assets/img/documents/ebook-10-cover.webp",
      href: "/doc-k",
    },
  },
  {
    category: "研修コース紹介",
    doc: {
      title: "AIクリエイティブ研修 コース紹介資料",
      points: ["カリキュラム全12ユニット・108レッスンの詳細", "3つの研修プランと料金・助成金活用", "研修開始までの流れ・FAQ"],
      thumbLabel: "DOCUMENT",
      thumb: "/biz/assets/img/documents/ebook-11-cover.webp",
      href: "/doc-l",
    },
  },
  {
    category: "研修コース紹介",
    doc: {
      title: "Dify研修 コース紹介資料",
      points: ["カリキュラム全14ユニット・85レッスンの詳細", "3つの研修プランと料金・助成金活用", "研修開始までの流れ・FAQ"],
      thumbLabel: "DOCUMENT",
      thumb: "/biz/assets/img/documents/ebook-12-cover.webp",
      href: "/doc-m",
    },
  },
];

// CMSにヒーローが無いときのフォールバック：3点セットDL訴求（/doc-a）。
const SET_PROMO: Promo = {
  eyebrow: "無料でダウンロードいただけます",
  heading: "お役立ち資料 3点セット",
  btnLabel: "無料で資料を受け取る",
  href: "/doc-a",
  thumbLabel: "DOCUMENT",
  trio: EBOOK_COVERS,
  recos: [],
};

// ---- CMS → 表示モデル変換 ----
function toDocItem(doc: MicroCmsDocument, defaultThumb?: string): DocItem {
  return {
    title: doc.title,
    points: docLines(doc.points),
    thumbLabel: doc.thumbLabel || "DOCUMENT",
    thumb: docThumbnail(doc) || defaultThumb || undefined,
    href: doc.formUrl || "/doc-a",
  };
}

function buildView(cms: MicroCmsDocument[]): {
  promo: Promo;
  pickups: DocItem[];
  categories: Category[];
} {
  const hero = cms.find((d) => d.isHero) || cms[0];
  const promo: Promo = hero
    ? {
        eyebrow: hero.eyebrow || "無料でダウンロードいただけます",
        heading: hero.title,
        btnLabel: "無料で資料を受け取る",
        href: hero.formUrl || "/doc-a",
        thumbLabel: hero.thumbLabel || "DOCUMENT",
        thumb: docThumbnail(hero) || undefined,
        recos: docLines(hero.recos),
      }
    : SET_PROMO;

  const pickups = cms.filter((d) => d.isPickup).map((d) => toDocItem(d));

  // カテゴリ別にグルーピング（出現順を維持）
  const categories: Category[] = [];
  const push = (name: string, item: DocItem) => {
    let cat = categories.find((c) => c.name === name);
    if (!cat) {
      cat = { name, en: docCategoryEn(name), docs: [] };
      categories.push(cat);
    }
    cat.docs.push(item);
  };
  for (const doc of cms) {
    const name = docCategory(doc);
    push(name, toDocItem(doc, CATEGORY_THUMB[name]));
  }
  // 静的ebookを追加（CMSに同名資料が登録されたらCMS側を正としてスキップ）
  for (const { category, doc } of STATIC_DOCS) {
    const exists = categories.some((c) => c.docs.some((d) => d.title === doc.title));
    if (!exists) push(category, doc);
  }

  return { promo, pickups, categories };
}

function DlIcon() {
  return <span className="dl-ico" aria-hidden="true" />;
}
function Caret() {
  return <span className="dl-caret" aria-hidden="true" />;
}

function Thumb({ label, thumb, title }: { label: string; thumb?: string; title: string }) {
  return thumb ? <img src={thumb} alt={title} /> : <span className="dl-thumb-label">{label}</span>;
}

function DocCard({ doc }: { doc: DocItem }) {
  return (
    <article className="dl-card">
      <div className="dl-card__thumb">
        <Thumb label={doc.thumbLabel} thumb={doc.thumb} title={doc.title} />
      </div>
      <div className="dl-card__body">
        <h3 className="dl-card__title">{doc.title}</h3>
        <ul className="dl-points dl-points--sm">
          {doc.points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
        <a className="dl-btn dl-btn--block" href={doc.href}>{doc.btnLabel || "資料を受け取る"}<DlIcon /></a>
      </div>
    </article>
  );
}

export default async function DocumentsPage() {
  const cms = await getDocuments();
  const { promo, pickups, categories } = buildView(cms);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LIB_CSS }} />
      {/* 3点セット用：ヒーロー右にカバー3枚を横並び（SmartHRの資料集セクション風）。中央を少し大きく前面に */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* カバー画像は角丸を焼き込んだ透過webpなので、影はbox-shadowではなく
           アルファ形状に追従するdrop-shadowで付ける（box-shadowだと四角い影が出る） */
        .dl-promo__trio { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 6px 0; }
        .dl-promo__trio img { width: 31%; height: auto; filter: drop-shadow(0 6px 14px rgba(20, 40, 80, .28)); }
        .dl-promo__trio img:nth-child(2) { width: 34%; transform: translateY(-4px); filter: drop-shadow(0 9px 18px rgba(20, 40, 80, .34)); }
        /* 縦長カバーは16:9サムネ枠に余白を付けて収める（archive側の16:9画像には影響させない） */
        .dl-card__thumb img { padding: 12px; box-sizing: border-box; filter: drop-shadow(0 4px 10px rgba(20, 40, 80, .22)); }
      ` }} />
      <BizHeader />

      <div className="dl-topbar">
        <nav className="dl-breadcrumb">
          <a href="/">トップ</a> &nbsp;&gt;&nbsp; お役立ち資料
        </nav>
      </div>

      {/* ヒーロー帯 */}
      <section className="dl-hero">
        <div className="dl-hero__inner">
          <div>
            <h1 className="dl-hero__title">お役立ち資料</h1>
            <p className="dl-hero__desc">
              科学的なAI人材育成を実現するための資料を<br />
              無料で配布しています。<br />
              フォームにご入力いただいたメールアドレスに<br />
              資料を送付いたします。
            </p>
          </div>
          {promo && (
            <div className="dl-promo">
              <div className="dl-promo__top">
                <div>
                  <p className="dl-promo__eyebrow">{promo.eyebrow}</p>
                  <p className="dl-promo__heading">{promo.heading}</p>
                  <a className="dl-promo__btn" href={promo.href}>{promo.btnLabel}<DlIcon /></a>
                </div>
                {promo.trio ? (
                  <div className="dl-promo__trio">
                    {promo.trio.map((src, i) => (
                      <img src={src} alt="" key={i} loading="lazy" />
                    ))}
                  </div>
                ) : (
                  <div className="dl-promo__img">
                    <Thumb label={promo.thumbLabel} thumb={promo.thumb} title={promo.heading} />
                  </div>
                )}
              </div>
              {promo.recos.length > 0 && (
                <div className="dl-promo__reco">
                  <span className="dl-promo__reco-label">こんな方におすすめです</span>
                  {promo.recos.map((r, i) => (
                    <span className="dl-promo__reco-item" key={i}><span className="dl-check" />{r}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* カテゴリナビ（資料が無いときは非表示） */}
      {(pickups.length > 0 || categories.length > 0) && (
        <nav className="dl-nav">
          <div className="dl-nav__inner">
            {pickups.length > 0 && <a href="#pickup">ピックアップ<Caret /></a>}
            {categories.map((cat, i) => (
              <a href={`#cat-${i}`} key={cat.name}>{cat.name}<Caret /></a>
            ))}
          </div>
        </nav>
      )}

      {/* ピックアップ（カルーセル） */}
      {pickups.length > 0 && (
        <section className="dl-wrap dl-sec" id="pickup">
          <h2 className="dl-sec-title">ピックアップ</h2>
          <span className="dl-sec-title__en">Pick Up</span>
          <div className="dl-car" data-dl-carousel>
            <button className="dl-car__arrow dl-car__arrow--prev" aria-label="前へ">‹</button>
            <div className="dl-car__vp">
              <div className="dl-car__track">
                {pickups.map((doc, i) => (
                  <div className="dl-car__slide" key={i}>
                    <div className="dl-pickup">
                      <div className="dl-pickup__thumb">
                        <Thumb label={doc.thumbLabel} thumb={doc.thumb} title={doc.title} />
                      </div>
                      <div>
                        <span className="dl-pickup__badge">おすすめ</span>
                        <h3 className="dl-pickup__title">{doc.title}</h3>
                        <ul className="dl-points">
                          {doc.points.map((p, j) => (
                            <li key={j}>{p}</li>
                          ))}
                        </ul>
                        <a className="dl-btn" href={doc.href}>資料を受け取る<DlIcon /></a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="dl-car__arrow dl-car__arrow--next" aria-label="次へ">›</button>
            <div className="dl-car__dots">
              {pickups.map((_, i) => (
                <button className={`dl-car__dot${i === 0 ? " is-active" : ""}`} key={i} aria-label={`${i + 1}枚目`} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* カテゴリ別グリッド */}
      {categories.map((cat, i) => (
        <section className="dl-wrap dl-sec" id={`cat-${i}`} key={cat.name}>
          <h2 className="dl-sec-title">{cat.name}</h2>
          <span className="dl-sec-title__en">{cat.en}</span>
          <div className="dl-grid">
            {cat.docs.map((doc, j) => (
              <DocCard doc={doc} key={j} />
            ))}
          </div>
        </section>
      ))}

      {/* 下部CTA */}
      <section className="dl-cta">
        <div className="dl-cta__inner">
          <p className="dl-cta__title">まずは無料個別相談から</p>
          <p className="dl-cta__desc">貴社の課題に合わせた研修プランや資料のご案内をいたします。お気軽にご相談ください。</p>
          <a className="dl-cta__btn" href="/counseling">無料個別相談を予約する</a>
        </div>
      </section>

      <div className="dl-foot-space" />
      <BizFooter />

      <CarouselInit />
    </>
  );
}
