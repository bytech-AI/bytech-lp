import Link from "next/link";
import { BizFooter, BizHeader } from "../_chrome/BizChrome";
import { COURSES } from "../_course/courses";
import { buildCourseMetadata } from "../_course/courseMetadata";
import "../_course/course.css";
import "./e-learning.css";

// ── eラーニング研修の個別ページ（schoo.jp/biz の構成を参考に、研修LPと同じ ct- のトンマナで組む）。
//    料金・含まれるもの・事例・FAQは資料04「AI研修タイプ 比較ガイド」（/doc-e）の記載に合わせている。
//    研修LPと同じく biz 配下はハイドレーション不使用のため、開閉/stuck はネイティブ<script>で動かす。

export const metadata = buildCourseMetadata({
  title: "法人向けAI研修のeラーニング｜バイテック法人AI研修",
  description:
    "ChatGPT・Gemini・Copilot・Claudeなど9プログラム、580本以上のレッスン動画で全社員のAIスキルを底上げする法人向けeラーニング。専用LMSで受講状況を管理でき、導入費用100,000円・月額2,980円／IDで始められます。",
  socialDescription:
    "9プログラム・580本以上のレッスン動画で、全社員のAIスキルを均一に底上げする法人向けeラーニング。",
  path: "/e-learning",
});

const DOC_HREF = "/doc-e";
const TRIAL_HREF = "/e-learning/trial";

// 各プログラムのレッスン数・視聴時間（各研修ページのスペック欄と揃える。更新時は両方直す）
const PROGRAM_STATS: Record<string, { lessons: number; hours: string }> = {
  "chat-gpt-training": { lessons: 45, hours: "6" },
  "gemini-training": { lessons: 67, hours: "5" },
  "claude-training": { lessons: 81, hours: "6.4" },
  "claude-code-training": { lessons: 44, hours: "12" },
  "copilot-training": { lessons: 48, hours: "7" },
  "copilot-studio-training": { lessons: 70, hours: "9" },
  "creative-ai-training": { lessons: 108, hours: "12" },
  "dify-training": { lessons: 85, hours: "10" },
  "leader-manager-training": { lessons: 35, hours: "5" },
};

const programs = COURSES.filter((c) => PROGRAM_STATS[c.slug]);
const totalLessons = programs.reduce((sum, c) => sum + PROGRAM_STATS[c.slug].lessons, 0);
// 「580本以上」のように10の位で切り捨てて表記する
const lessonsFloor = Math.floor(totalLessons / 10) * 10;

// 導入企業ロゴ（bizトップの logo-marquee と同じ顔ぶれ・同じ素材）
const CLIENT_LOGOS = [
  { src: "ntt-data", alt: "株式会社NTTデータ ビジネスシステムズ" },
  { src: "royce", alt: "ROYCE'" },
  { src: "revamp", alt: "REVAMP" },
  { src: "daiichi-life", alt: "第一生命グループ" },
  { src: "nitten", alt: "NITTEN" },
  { src: "nihonbashi-marutamaya", alt: "日本橋丸玉屋" },
  { src: "wako-holdings", alt: "WAKO HOLDINGS" },
  { src: "win", alt: "株式会社ウイン" },
  { src: "ota-kenzai", alt: "OTA KENZAI" },
];

const PAGENAV_LINKS = [
  { href: "#issues", label: "お悩み" },
  { href: "#features", label: "特長" },
  { href: "#programs", label: "プログラム" },
  { href: "#flow", label: "導入の流れ" },
  { href: "#fee", label: "料金" },
  { href: "#case", label: "導入事例" },
  { href: "#faq", label: "よくあるご質問" },
];

const ISSUES = [
  {
    h: "動画を配っても\n見られずに終わる",
    d: "IDを配っただけで、誰がどこまで進んだか分からない。忙しい社員ほど後回しにして期限を迎えてしまう。",
    a: "専用LMSで受講状況を一覧で確認。停滞している受講者に声をかけ、修了まで追いかけられます。",
  },
  {
    h: "何を学ばせればいいか\n決められない",
    d: "AIツールが多すぎて、自社の社員にどれを、どの順番で学ばせればよいか判断がつかない。",
    a: "1IDで全プログラムが見放題。社内で使えるツールと業務内容から、優先して学ぶプログラムと順番を一緒に決めます。",
  },
  {
    h: "研修の日程調整と\nコストが重い",
    d: "拠点や部署が分かれていて、全員を集めた研修は日程調整だけで数か月かかる。講師や会場の費用も大きい。",
    a: "動画で各自のペースで学べるため、講師・会場・日程調整が不要。10IDから始められます。",
  },
];

const FEATURES = [
  {
    no: "01",
    en: "Practical",
    h: "業務ですぐ使える\n実践的なレッスン動画",
    d: "生成AIの基本から、資料作成・データ分析・業務の自動化まで。実際の画面操作を見ながら、明日の業務で使える手順を学べます。",
  },
  {
    no: "02",
    en: "Flexible",
    h: "時間と場所を選ばず\n自分のペースで学べる",
    d: "1レッスン数分の動画で、空き時間に少しずつ進められます。拠点や部署、入社時期が違っても、全員が同じ教材で同じ基礎を学べます。",
  },
  {
    no: "03",
    en: "Management",
    h: "専用LMSで\n受講状況をひと目で把握",
    d: "受講者ごとの進捗を管理画面で確認できます。どの部署の誰が進んでいるかが分かるため、次に実践研修へ進める対象も絞り込めます。",
  },
  {
    no: "04",
    en: "Support",
    h: "プログラム選びと\n学習の始め方をサポート",
    d: "導入時にプログラムの選定と学習範囲の設計をお手伝いします。初回オリエンテーションで進め方をご案内するので、受講者も迷わず始められます。",
  },
];

const FLOW = [
  { no: "01", h: "学ぶ順番を決める", d: "社内で使えるAIツールと業務内容をうかがい、優先して学ぶプログラムと順番を決めます。" },
  { no: "02", h: "アカウントを発行", d: "受講者ごとに専用LMSのアカウントを発行。初回オリエンテーションで学習の進め方をご案内します。" },
  { no: "03", h: "各自のペースで学ぶ", d: "受講期間中はレッスン動画が見放題。空き時間に少しずつ進め、業務で試しながら身につけます。" },
  { no: "04", h: "進捗を確認する", d: "管理画面で受講状況を確認し、停滞している受講者へ声かけ。全員の修了を目指します。" },
];

const INCLUDED = [
  { icon: "play", h: "全プログラムが見放題", d: `全${programs.length}プログラム・${lessonsFloor}本以上のレッスンを、契約期間中は何度でも視聴できます。` },
  { icon: "user", h: "専用LMSのアカウント", d: "受講者ごとに学習管理システムのアカウントを発行します。" },
  { icon: "chart", h: "受講状況・進捗の確認", d: "誰がどこまで進んだかを、管理画面でひと目で把握できます。" },
  { icon: "chat", h: "初回オリエンテーション", d: "学習の進め方をご案内し、受講者が迷わず始められます。" },
];

const FAQS = [
  {
    q: "AI未経験の社員でも受講できますか？",
    a: "はい。多くの受講者が生成AI未経験からのスタートです。基礎から順に学べる構成のため、業務で活用できるレベルまで無理なくスキルアップできます。",
  },
  {
    q: "受講できるプログラムに制限はありますか？",
    a: "ありません。1IDで全プログラムを見放題で受講できます。最初に学ぶものに迷ったら、まだ使うAIを決めていなければ定番のChatGPT、Microsoft 365環境ならCopilot、Google Workspace環境ならGemini・NotebookLM、文章・資料作成の質を重視するならClaudeがおすすめです。無料個別相談でもご提案します。",
  },
  {
    q: "学習中に質問はできますか？",
    a: "eラーニング単体は教材内で完結する自習型です。チャットでの質問や講師との面談が必要な場合は、ハンズオン（1on1）を組み合わせたAI業務効率化研修／AI業務自動化研修をご検討ください。",
  },
  {
    q: "何IDから契約できますか？上限はありますか？",
    a: "ご契約は10IDからです。上限はなく、チーム・組織単位での受講や全社展開にも対応しています。人数や体制に応じて最適なプランをご提案します。",
  },
  {
    q: "助成金は使えますか？",
    a: "eラーニング単体は助成金の対象外です。ハンズオン（1on1）を組み合わせたAI業務効率化研修は人材開発支援助成金の対象となり、1名200,000円の研修を実質50,000円で受講できます（中小企業の場合の概算）。",
  },
  {
    q: "契約期間の決まりはありますか？",
    a: "最低契約期間は6ヶ月です。ご契約は10IDから承ります。",
  },
  {
    q: "料金はどのように決まりますか？",
    a: "導入費用100,000円（税抜）と、受講者1名（1ID）あたり月額2,980円（税抜）です。ご契約は10ID・6ヶ月から承ります。ID数と期間に応じた総額は、お見積りにてご提示します。",
  },
];

// ── ネイティブ<script>（研修LPと同じ挙動。ヘッダーロゴの白/紺切替・ページ内ナビのstuck・FAQ開閉） ──
const HEADER_LOGO_SCRIPT = `(function(){
  var img=document.querySelector('.top-header__logo img');
  var hero=document.querySelector('.ct-hero');
  if(!img||!hero)return;
  var DARK='/biz/assets/img/common/hd-logo-dark.svg', WHITE='/biz/assets/img/common/hd-logo.svg';
  function upd(){ img.src = window.pageYOffset > (hero.offsetHeight - 88) ? DARK : WHITE; }
  upd();
  window.addEventListener('scroll',upd,{passive:true});
  window.addEventListener('resize',upd,{passive:true});
})();`;

const PAGENAV_STUCK_SCRIPT = `(function(){
  var nav=document.querySelector('.ct-pagenav');
  if(!nav)return;
  function upd(){ nav.classList.toggle('is-stuck', nav.getBoundingClientRect().top<=0.5); }
  upd();
  window.addEventListener('scroll',upd,{passive:true});
  window.addEventListener('resize',upd,{passive:true});
})();`;

const FAQ_SCRIPT = `(function(){document.querySelectorAll('.index_faq__question').forEach(function(q){q.addEventListener('click',function(){var it=q.closest('.index_faq__item');if(it)it.classList.toggle('active');});});})();`;

const URL = "https://biz.bytech.jp/e-learning";
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      name: "法人向けAI研修 eラーニング",
      description:
        "ChatGPT・Gemini・Copilot・Claudeなどの生成AIを、レッスン動画と専用LMSで学ぶ法人向けeラーニング。",
      url: URL,
      inLanguage: "ja",
      provider: {
        "@type": "Organization",
        "@id": "https://biz.bytech.jp/#organization",
        name: "バイテック法人AI研修",
        url: "https://biz.bytech.jp/",
      },
      offers: [
        { "@type": "Offer", name: "eラーニング 導入費用", price: "100000", priceCurrency: "JPY" },
        { "@type": "Offer", name: "eラーニング 月額費用", price: "2980", priceCurrency: "JPY", category: "円／ID・月" },
      ],
      hasCourseInstance: [
        { "@type": "CourseInstance", name: "法人向けAI研修 eラーニング", courseMode: ["Online"], inLanguage: "ja" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "トップ", item: "https://biz.bytech.jp/" },
        { "@type": "ListItem", position: 2, name: "eラーニング", item: URL },
      ],
    },
  ],
};

function Cta({ light = false }: { light?: boolean }) {
  return (
    <div className={`el-cta${light ? " el-cta--light" : ""}`}>
      <a className="el-cta__btn el-cta__btn--doc" href={DOC_HREF}>
        資料をダウンロード
        <span className="ct-hero__cta-arrow" aria-hidden="true" />
      </a>
      <a className="el-cta__btn el-cta__btn--talk" href={TRIAL_HREF}>
        無料トライアル
      </a>
    </div>
  );
}

export default function ELearningPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BizHeader docHref={DOC_HREF} />

      <main className="ct-page el-page">
        {/* ============ FV ============ */}
        <section className="ct-hero el-hero">
          <div className="el-hero__inner">
            <div className="el-hero__body">
              <nav className="ct-breadcrumb ct-breadcrumb--hero" aria-label="パンくず">
                <Link href="/" prefetch={false}>トップ</Link>
                <span>›</span>
                <span>eラーニング</span>
              </nav>
              <p className="el-hero__eyebrow">法人向けAI研修 eラーニング</p>
              <h1 className="el-hero__title">
                <span>全社員のAIスキルを、</span>
                <span><em>動画で均一に</em>底上げ。</span>
              </h1>
              <p className="el-hero__lead">
                ChatGPT・Gemini・Copilot・Claudeなど{programs.length}プログラムが、1IDで全部見放題。
                <br className="el-pc" />
                時間や場所を選ばず、各自のペースで実務に使えるAIスキルを学べます。
              </p>
              <ul className="el-hero__stats">
                <li><b>{programs.length}</b>プログラム見放題</li>
                <li><b>{lessonsFloor}</b>本以上のレッスン</li>
                <li>月額<b>2,980</b>円／ID</li>
              </ul>
              <Cta />
            </div>

            {/* LMS画面のモック（HTML製）。動画サムネはChatGPT研修のレッスン画面を流用 */}
            <div className="el-hero__visual" aria-hidden="true">
              <div className="el-mock">
                <div className="el-mock__bar">
                  <span /><span /><span />
                  <p>バイテック法人AI研修 LMS</p>
                </div>
                <div className="el-mock__body">
                  <div className="el-mock__player">
                    <img
                      src="/biz/assets/img/course/curriculum/chatgpt/ui-01.webp"
                      alt=""
                      width={1280}
                      height={800}
                      fetchPriority="high"
                    />
                    <span className="el-mock__play" />
                    <span className="el-mock__seek"><i /></span>
                  </div>
                  <div className="el-mock__side">
                    <p className="el-mock__course">ChatGPT研修</p>
                    <p className="el-mock__ch">Chapter 3　画像生成</p>
                    <ul>
                      <li className="is-done">画像生成の基本</li>
                      <li className="is-done">指示の出し方</li>
                      <li className="is-now">文字を入れて仕上げる</li>
                      <li>資料用の図解を作る</li>
                    </ul>
                    <div className="el-mock__progress">
                      <span>受講進捗</span>
                      <b>62%</b>
                      <i><em /></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="el-mock__card">
                <p>今月の修了者</p>
                <b>18<small>/ 20名</small></b>
                <i><em /></i>
              </div>
            </div>
          </div>
        </section>

        {/* 導入企業ロゴのスライダー。2周分並べて -50% 送りで継ぎ目なくループさせる */}
        <section className="el-logos" aria-label="導入企業ロゴ">
          <div className="el-logos__viewport">
            <div className="el-logos__track">
              {[0, 1].map((loop) =>
                CLIENT_LOGOS.map((l) => (
                  <div className="el-logos__item" key={`${loop}-${l.src}`} aria-hidden={loop === 1 ? true : undefined}>
                    <img src={`/biz/assets/img/logos/${l.src}.webp`} alt={loop === 0 ? l.alt : ""} width={966} height={402} loading="lazy" />
                  </div>
                )),
              )}
            </div>
          </div>
        </section>

        {/* ページ内ナビ（研修LPと共通スタイル） */}
        <nav className="ct-pagenav" aria-label="ページ内ナビゲーション">
          <div className="ct-pagenav__inner">
            <Link className="ct-pagenav__brand" href="/" prefetch={false} aria-label="バイテック法人AI研修 トップ">
              <img src="/biz/assets/img/common/hd-logo.svg" alt="バイテック法人AI研修" />
            </Link>
            <ul className="ct-pagenav__list">
              {PAGENAV_LINKS.map((l) => (
                <li key={l.href}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
            <a className="ct-pagenav__cta" href={DOC_HREF}>
              資料ダウンロード
              <span className="ct-pagenav__cta-ico" aria-hidden="true" />
            </a>
          </div>
        </nav>

        {/* ============ お悩み ============ */}
        <section className="el-sec el-sec--gray" id="issues">
          <div className="ct-about__head">
            <p className="ct-about__eyebrow">AI人材の育成で、こんなお悩みはありませんか？</p>
            <h2 className="ct-about__title">eラーニングで解決できること</h2>
          </div>
          <div className="el-issues">
            {ISSUES.map((it) => (
              <div className="el-issue" key={it.h}>
                <div className="el-issue__q">
                  <p className="el-issue__h">{it.h}</p>
                  <p className="el-issue__d">{it.d}</p>
                </div>
                <div className="el-issue__a">
                  <span className="el-issue__label">解決策</span>
                  <p>{it.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ 特長 ============ */}
        <section className="el-sec" id="features">
          <div className="ct-about__head">
            <p className="ct-about__eyebrow">バイテック法人AI研修の</p>
            <h2 className="ct-about__title">eラーニングの4つの特長</h2>
            <p className="ct-about__sub el-head-sub">
              学ぶ社員も、学ばせる担当者も、<span className="ct-about__mark">続けやすい仕組み</span>をご用意
            </p>
          </div>
          <div className="el-features">
            {FEATURES.map((f) => (
              <div className="el-feature" key={f.no}>
                <div className="el-feature__head">
                  <span className="el-feature__no">{f.no}</span>
                  <span className="el-feature__en">{f.en}</span>
                </div>
                <p className="el-feature__h">{f.h}</p>
                <p className="el-feature__d">{f.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ 数字 ============ */}
        <section className="el-nums" aria-label="eラーニングの概要">
          <div className="el-nums__inner">
            <div className="el-num"><span>プログラム数</span><b>{programs.length}</b><small>種類</small></div>
            <div className="el-num"><span>レッスン数</span><b>{lessonsFloor}</b><small>本以上</small></div>
            <div className="el-num"><span>1レッスン</span><b>数</b><small>分〜</small></div>
            <div className="el-num"><span>ご契約</span><b>10</b><small>IDから</small></div>
          </div>
        </section>

        {/* ============ プログラム一覧 ============ */}
        <section className="el-sec el-sec--gray" id="programs">
          <div className="ct-about__head">
            <p className="ct-about__eyebrow">1IDで全プログラムが見放題</p>
            <h2 className="ct-about__title">eラーニングのプログラム</h2>
            <p className="ct-about__lead el-head-lead">
              使っているAIツールや目的に合わせて、必要なものから自由に学べます。各プログラムの詳しいカリキュラムは研修ページでご確認いただけます。
            </p>
          </div>
          <div className="el-programs">
            {programs.map((c) => {
              const s = PROGRAM_STATS[c.slug];
              return (
                <Link
                  key={c.slug}
                  className="el-program"
                  href={`/${c.slug}`}
                  prefetch={false}
                  style={{ ["--el-accent" as string]: c.color }}
                >
                  <span className="el-program__logo"><img src={c.logo} alt="" loading="lazy" /></span>
                  <span className="el-program__name">{c.name.replace(/研修$/, "")}</span>
                  <span className="el-program__desc">{c.desc}</span>
                  <span className="el-program__meta">
                    <span>全{s.lessons}レッスン</span>
                    <span>約{s.hours}時間</span>
                  </span>
                  <span className="el-program__more">カリキュラムを見る</span>
                </Link>
              );
            })}
          </div>
          <p className="el-note">※レッスン数・視聴時間は各研修ページの記載時点のものです。プログラムは順次更新されます。</p>
        </section>

        {/* ============ 導入の流れ ============ */}
        <section className="el-sec" id="flow">
          <div className="ct-about__head">
            <p className="ct-about__eyebrow">最小限の手間で始められる</p>
            <h2 className="ct-about__title">導入から修了までの流れ</h2>
          </div>
          <ol className="el-flow">
            {FLOW.map((f) => (
              <li className="el-flow__item" key={f.no}>
                <span className="el-flow__no">STEP{f.no}</span>
                <p className="el-flow__h">{f.h}</p>
                <p className="el-flow__d">{f.d}</p>
              </li>
            ))}
          </ol>
          <div className="el-next">
            <p className="el-next__label">修了後は</p>
            <p className="el-next__text">
              受講状況から、実践まで進めたい部署やメンバーが見えてきます。
              <br className="el-pc" />
              ハンズオン（1on1）やワークショップと組み合わせ、業務での定着まで段階的に進められます。
            </p>
          </div>
        </section>

        {/* ============ 料金 ============ */}
        {/* id="price" は course.css 側で max-width:900px が当たるため使わない */}
        <section className="el-sec el-sec--gray" id="fee">
          <div className="ct-about__head">
            <p className="ct-about__eyebrow">ご利用人数に応じた、シンプルな料金</p>
            <h2 className="ct-about__title">eラーニングの料金</h2>
          </div>
          <div className="el-price">
            <div className="el-price__main">
              <div className="el-price__glow" aria-hidden="true" />
              <p className="el-price__name">
                eラーニング<span>PRICE</span>
              </p>
              <div className="el-price__monthly">
                <span className="el-price__label">月額費用</span>
                <p className="el-price__amount">
                  2,980<small>円</small><em>／ID・月（税抜）</em>
                </p>
                {/* 2,980 ÷ 30日 ≒ 99円 */}
                <p className="el-price__daily">1日あたり<b>約99円</b>で学び続けられる</p>
              </div>
              <div className="el-price__init">
                <span className="el-price__label el-price__label--sub">導入費用</span>
                <p>100,000<small>円（税抜）</small></p>
              </div>
              <ul className="el-price__chips">
                <li>10IDからご契約可</li>
                <li>最低契約期間 6ヶ月</li>
                <li>全プログラム見放題</li>
                <li>オンライン（専用LMS）</li>
              </ul>
              <a className="el-price__trial" href={TRIAL_HREF}>
                まずは無料トライアルで試す
                <span className="el-price__trial-arrow" aria-hidden="true" />
              </a>
              <p className="el-price__tax">※価格はすべて税抜です。ご契約は10ID・6ヶ月から承ります。ID数と期間に応じた総額は、お見積りにてご提示します。</p>
            </div>
            <div className="el-price__inc">
              <p className="el-price__inc-h">料金に含まれるもの</p>
              <ul className="el-price__inc-list">
                {INCLUDED.map((t) => (
                  <li key={t.h}>
                    <span className={`el-price__ico el-price__ico--${t.icon}`} aria-hidden="true" />
                    <p className="el-price__inc-t">{t.h}</p>
                    <p className="el-price__inc-d">{t.d}</p>
                  </li>
                ))}
              </ul>
              <a className="el-price__sim" href="/estimate">
                <span>
                  <small>受講人数を入れるだけ</small>
                  見積もりを試算する
                </span>
                <span className="el-price__sim-arrow" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* ステップアップ：伴走付きプラン（助成金対応）との比較 */}
          <div className="el-step">
            <p className="ct-bubble">さらに実践まで進めるなら</p>
            <h3 className="el-step__title">ハンズオン付きプランなら、助成金で実質負担を抑えられます</h3>
            <div className="el-compare" role="table" aria-label="eラーニングとハンズオン付きプランの比較">
              <div className="el-compare__row el-compare__row--head" role="row">
                <span role="columnheader" />
                <span role="columnheader">eラーニング</span>
                <span role="columnheader" className="is-feature">AI業務効率化研修<small>eラーニング＋ハンズオン（1on1）</small></span>
              </div>
              <div className="el-compare__row" role="row">
                <span role="rowheader">料金</span>
                <span role="cell">導入100,000円＋月額2,980円／ID（税抜）</span>
                <span role="cell" className="is-feature">200,000円〜／名</span>
              </div>
              <div className="el-compare__row" role="row">
                <span role="rowheader">助成金</span>
                <span role="cell">対象外</span>
                <span role="cell" className="is-feature"><b>実質50,000円／名</b>（中小企業の場合）</span>
              </div>
              <div className="el-compare__row" role="row">
                <span role="rowheader">学び方</span>
                <span role="cell">動画で自習</span>
                <span role="cell" className="is-feature">動画＋専任コンサルタントの1on1</span>
              </div>
              <div className="el-compare__row" role="row">
                <span role="rowheader">質問・相談</span>
                <span role="cell">—</span>
                <span role="cell" className="is-feature">チャット・面談で相談できる</span>
              </div>
              <div className="el-compare__row" role="row">
                <span role="rowheader">向いている目的</span>
                <span role="cell">全社員の基礎の底上げ</span>
                <span role="cell" className="is-feature">自分の業務での活用・定着</span>
              </div>
            </div>
            <p className="el-step__links">
              <a href="/grant">助成金の対象か診断する →</a>
              <Link href="/#course" prefetch={false}>AI業務効率化研修・自動化研修を見る →</Link>
            </p>
          </div>
        </section>

        {/* ============ 導入事例 ============ */}
        <section className="el-sec" id="case">
          <div className="ct-about__head">
            <p className="ct-about__eyebrow">eラーニングのみで受講した</p>
            <h2 className="ct-about__title">導入事例</h2>
          </div>
          <article className="el-case">
            <header className="el-case__head">
              <p className="el-case__company">株式会社NTTデータ ビジネスシステムズ 様</p>
              <ul className="el-case__tags">
                <li>プラン：eラーニング</li>
                <li>受講者：10名</li>
                <li>プログラム：Copilot</li>
              </ul>
            </header>
            <div className="el-case__grid">
              <div className="el-case__col">
                <p className="el-case__label">受講前の課題</p>
                <p>Copilotは検索や文章作成に使う程度で、活用が進んでいなかった。社内のAIに関するセキュリティ要件も整っておらず、一歩踏み出せずにいた。</p>
              </div>
              <div className="el-case__col">
                <p className="el-case__label">ご支援内容</p>
                <p>社内で導入しているCopilotをeラーニングで体系的に学習。管理画面で進捗を確認し、停滞している受講者へ声をかけて全員が修了できる状態をつくった。</p>
              </div>
              <div className="el-case__col el-case__col--result">
                <p className="el-case__label">研修結果</p>
                <p>Officeツールを横断した連携機能を使いこなし、業務課題を自己完結できるレベルへ。部署内で相談役として頼られる人材が増え、プロンプトやテンプレートを共有する動きが生まれた。</p>
              </div>
            </div>
          </article>
        </section>

        {/* ============ 中間CTA ============ */}
        <section className="el-band">
          <div className="el-band__inner">
            <p className="el-band__title">まずは資料と無料トライアルで、使い心地をご確認ください</p>
            <p className="el-band__desc">eラーニング・セミナー・ハンズオン・ワークショップの違いと料金目安を、1冊にまとめています。</p>
            <Cta light />
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="index_faq" id="faq">
          <div className="index_faq__inner">
            <div className="index_faq__head">
              <p className="index_faq__eyebrow">FAQ_</p>
              <h2 className="index_faq__heading">よくあるご質問</h2>
              <a className="index_faq__all index_faq__all--pc" href="/faq">
                <span className="index_faq__all-ico" aria-hidden="true" />
                よくある質問一覧を見る
              </a>
            </div>
            <div className="index_faq__list">
              {FAQS.map((f) => (
                <div className="index_faq__item" key={f.q}>
                  <button className="index_faq__question" type="button">
                    {f.q}
                    <span className="index_faq__arrow" />
                  </button>
                  <div className="index_faq__answer">
                    <p>{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
            <a className="index_faq__all index_faq__all--sp" href="/faq">
              <span className="index_faq__all-ico" aria-hidden="true" />
              よくある質問一覧を見る
            </a>
          </div>
        </section>

        {/* ============ 資料DL＋出口導線（研修LPと共通スタイル） ============ */}
        <section className="ct-dl" id="course-doc" style={{ ["--ct-accent" as string]: "#204aa8" }}>
          <div className="ct-dl__inner">
            <div className="ct-dl__main">
              <div className="ct-dl__body">
                <p className="ct-dl__eyebrow">無料ダウンロード</p>
                <h2 className="ct-dl__title">AI研修タイプ 比較ガイド</h2>
                <p className="ct-dl__desc">
                  eラーニングの料金・含まれるもの・導入事例に加え、セミナー・ハンズオン・ワークショップとの比較表と目的別の選び方をまとめています。
                </p>
                <a className="ct-dl__btn" href={DOC_HREF}>
                  ダウンロード
                  <span className="ct-dl__btn-ico" aria-hidden="true" />
                </a>
              </div>
              <div className="ct-dl__visual">
                <img src="/biz/assets/img/documents/ebook-04-cover.webp" alt="AI研修タイプ 比較ガイドの表紙" loading="lazy" />
              </div>
            </div>
            <div className="ct-dl__row">
              <div className="ct-dl__card">
                <div className="ct-dl__card-body">
                  <h3 className="ct-dl__card-title">無料個別相談</h3>
                  <p className="ct-dl__card-desc">プログラム選びや受講人数、組み合わせ方まで、お気軽にご相談ください。</p>
                </div>
                <a className="ct-dl__card-btn" href="/counseling">
                  相談を予約する
                  <span className="ct-dl__card-ico" aria-hidden="true" />
                </a>
              </div>
              <div className="ct-dl__card">
                <div className="ct-dl__card-body">
                  <h3 className="ct-dl__card-title">見積もりシミュレーター</h3>
                  <p className="ct-dl__card-desc">受講人数やプランから、費用の目安をその場で試算できます。</p>
                </div>
                <a className="ct-dl__card-btn" href="/estimate">
                  見積もりをしてみる
                  <span className="ct-dl__card-ico" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <script dangerouslySetInnerHTML={{ __html: HEADER_LOGO_SCRIPT }} />
      <script dangerouslySetInnerHTML={{ __html: PAGENAV_STUCK_SCRIPT }} />
      <script dangerouslySetInnerHTML={{ __html: FAQ_SCRIPT }} />

      <BizFooter />
    </>
  );
}
