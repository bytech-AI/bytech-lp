import type { Metadata } from "next";
import { Fragment, type CSSProperties } from "react";
import Link from "next/link";
import { BizFooter, BizHeader } from "../_chrome/BizChrome";
import { COURSES } from "../_course/courses";
import { buildCourseMetadata } from "../_course/courseMetadata";
import "../_course/course.css";
import "./e-learning.css";

// ── eラーニング研修の個別ページ（schoo.jp/biz・manebi.co.jp の構成を参考に、研修LPと同じ ct- のトンマナで組む）。
//    構成：とは？→お悩み→特長→AI機能→受講者の声→CTA→料金→プログラム→CTA→受講開始までの3ステップ→FAQ→資料DL
//    料金・含まれるもの・事例・FAQは資料04「AI研修タイプ 比較ガイド」（/doc-e）の記載に合わせている。
//    研修LPと同じく biz 配下はハイドレーション不使用のため、開閉/stuck はネイティブ<script>で動かす。

export const metadata: Metadata = {
  ...buildCourseMetadata({
  title: "法人向けAI研修のeラーニング｜バイテック法人AI研修",
  description:
    "ChatGPT・Gemini・Copilot・Claudeなどに対応した1,000本以上のAI講座で全社員のAIスキルを底上げする法人向けeラーニング。専用LMSで受講状況を管理でき、導入費用100,000円・月額2,980円／IDで始められます。",
  socialDescription:
    "1,000本以上のAI講座で、全社員のAIスキルを均一に底上げする法人向けeラーニング。",
  path: "/e-learning",
}),
  // 公開前の調整中はインデックスさせない（解除時はこの行とサイトマップを戻す）
  robots: "noindex",
};

// eラーニング専用のサービス概要資料（ebook-39）。中身はこのページに合わせて作っている
const DOC_HREF = "/doc-an";
const DOC_TITLE = "法人向けAIeラーニング サービス概要資料";
const DOC_COVER = "/biz/assets/img/documents/ebook-39-cover.webp";
// CTA帯の資料ビジュアルは横長スライドを重ねて見せる（縦の表紙だと上の写真しか見えないため）
const DOC_SLIDES = ["p14", "p03", "p01"].map((n) => `/biz/assets/img/documents/preview/ebook-39-${n}.webp`);
const TRIAL_HREF = "/e-learning/trial";
const APPLY_HREF = "/e-learning/apply";

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
// 追加予定のプログラム（教材量産_制作リストのBIZ行＋Biz向けに最適化するCodex/Antigravity。レッスン数はスプシの行数＝1動画1レッスン。2026-11-12時点）
const UPCOMING = [
  {
    key: "codex",
    name: "Codex活用",
    mark: "Cx",
    logo: "/biz/assets/img/e-learning/logo-codex.webp",
    color: "#10a37f",
    desc: "ChatGPTのCodexに、資料作り・データ集計・Webページ作りまで任せたい組織・チームにおすすめ。",
    tags: ["Office・Google編", "ブラウザ操作", "メール・予定連携"],
    lessons: 44,
  },
  {
    key: "antigravity",
    name: "Antigravity活用",
    mark: "Ag",
    logo: "/biz/assets/img/e-learning/logo-antigravity.webp",
    color: "#4a86e8",
    desc: "Google Workspace上でGASの自動化や社内ツール作りを進めたい組織・チームにおすすめ。",
    tags: ["GAS自動化", "Gmail・Drive連携", "社内ツール"],
    lessons: 49,
  },
  {
    key: "governance",
    name: "AIガバナンス・セキュリティ",
    mark: "Sec",
    color: "#1f3a6e",
    desc: "AI利用の方針・ルール作りから環境設定、事故への備えまで整えたい組織におすすめ。",
    tags: ["方針・ルール", "環境設定", "エージェント管理"],
    lessons: 50,
  },
  {
    key: "seo",
    name: "SEO・AI検索マーケティング",
    mark: "SEO",
    color: "#e0861a",
    desc: "検索とAI検索（LLMO・GEO）からの集客を社内で強化したいマーケティング・広報部門におすすめ。",
    tags: ["キーワード設計", "LLMO・GEO", "計測と改善"],
    lessons: 35,
  },
  {
    key: "content",
    name: "AIコンテンツディレクション",
    mark: "Dir",
    color: "#c2417a",
    desc: "AIで記事・コンテンツ制作を内製し、品質を保ったまま量産したい広報・制作チームにおすすめ。",
    tags: ["企画・指示書", "AI下書きの編集", "品質管理"],
    lessons: 30,
  },
  {
    key: "agent",
    name: "AIエージェント構築",
    mark: "Agt",
    color: "#204aa8",
    desc: "部署の定型業務を任せるAIエージェントを、自分たちで作って運用したい組織・チームにおすすめ。",
    tags: ["指示の設計", "ツール連携", "定期実行"],
    lessons: 35,
  },
  {
    key: "security",
    name: "サイバーセキュリティ実践",
    mark: "Cyb",
    color: "#0f2350",
    desc: "脆弱性診断・インシデント対応・セキュア開発まで、攻撃者の視点で守りを固めたい情シス・開発部門におすすめ。",
    tags: ["脆弱性診断", "インシデント対応", "セキュア開発"],
    lessons: 74,
  },
] as const;
// 講座数の表記はユーザー指定で「1000本以上」に統一（2026-11-12。PROGRAM_STATS の合計とは別の数え方）
const lessonsFloor = 1000;

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

// FV下段の実績バッジ（bytech.jp トップ「数字でみるバイテック」と同じ数値・同じ注釈）
// FVの実績バッジ（月桂樹はデザイナー支給の award-laurel.svg。文字はHTML）
// TODO: 継続率96% は出典（調査期間・算出方法）未確認。確認できたら note を正式な表記に差し替える。本番公開前に必須
const AWARDS = [
  { label: "受講継続率", num: "96", unit: "%以上", foot: "続けやすい短尺動画", mark: "※1", note: "継続率（調査期間・算出方法を確認中）" },
  { label: "AI講座・課題数", num: "1,000", unit: "本以上", foot: "全講座見放題", mark: "※2", note: "レッスン動画・課題の合計" },
  { label: "月額料金", num: "2,980", unit: "円〜", foot: "1IDあたり・税抜", mark: "※3", note: "別途導入費用100,000円（税抜）" },
];

const PAGENAV_LINKS = [
  { href: "#about", label: "概要" },
  { href: "#features", label: "特長" },
  { href: "#case", label: "受講者の声" },
  { href: "#fee", label: "料金" },
  { href: "#programs", label: "プログラム" },
  { href: "#flow", label: "受講開始まで" },
  { href: "#faq", label: "よくあるご質問" },
];

const ISSUES = [
  {
    h: "動画を配っても\n<em>見られずに終わる</em>",
    d: "IDを配っただけで、誰がどこまで進んだか分からない。忙しい社員ほど後回しにして期限を迎えてしまう。",
    img: "/biz/assets/img/e-learning/issue-01.webp",
    key: "チーム内ランキングとリマインドで\n継続率を高める",
    a: "チーム内のメンバー同士の学習ランキングと、受講が止まったときのリマインドで、忙しい社員も後回しにせず続けられます。学習を毎日の習慣にできます。",
  },
  {
    h: "<em>何を学ばせればいいか</em>\n決められない",
    d: "AIツールが多すぎて、自社の社員にどれを、どの順番で学ばせればよいか判断がつかない。",
    img: "/biz/assets/img/e-learning/issue-02.webp",
    key: "業種・目的に合わせた\n学習マイルストーンを設計",
    a: "業種や学ぶ目的に合わせて、ゴールまでのマイルストーンと期日を設定。何から・どの順番で学べばよいかが明確になります。",
  },
  {
    h: "<em>研修の日程調整と</em>\nコストが重い",
    d: "拠点や部署が分かれていて、全員を集めた研修は日程調整だけで数か月かかる。講師や会場の費用も大きい。",
    img: "/biz/assets/img/e-learning/issue-03.webp",
    key: "eラーニングだから\n場所と時間を選ばず学習できる",
    a: "PC・スマホから各自の空き時間に受講できるため、講師の手配や会場、全員の日程調整は必要ありません。5IDから始められます。",
  },
];

// 5つの特長は、研修担当者がサービスを選ぶ決め手（KBF）に沿って並べる：
// 続くか／自社に合うか／古くならないか／運用の手間と報告／費用対効果。
// ビジュアルは FeatureVisual（実写＋カードと図解を特長ごとに出し分け）。alt はその説明。
// TODO: 03 の毎週点検、04 の自動レポート・ID自動発行・メンバー管理・部署別の管理者権限と組織図、01 のチーム内ランキング・リマインドは実装・運用の開始を確認してから公開
// ハンズオン付きプランとの比較（.el-step）を表示するか。一旦非表示（2026-11-13）
const SHOW_STEP_COMPARE = false;

const FEATURES = [
  {
    no: "01",
    en: "Keep Going",
    title: "最後まで続く仕組み",
    checks: ["1レッスン数分の動画を、スマホで空き時間に", "チーム内ランキングとリマインドで後回しを防ぐ"],
    tags: ["1レッスン数分", "スマホ対応", "チーム内ランキング"],
    alt: "PCで学習する受講者と、マイルストーン・チーム内ランキングの画面",
    h: "配って終わりにしない、\n最後まで続く仕組み",
    d: "目的に合わせたマイルストーンと期日で、今やることが明確に。チーム内のメンバー同士のランキングと、受講が止まったときのリマインドで、忙しい社員も後回しにせず学び続けられます。",
  },
  {
    no: "02",
    en: "Custom Fit",
    title: "自社のAIツールに合う講座",
    checks: ["主要なAIツールごとに専用の講座がそろう", "入門から業務の自動化まで、1,000本以上が見放題"],
    tags: ["ChatGPT", "Copilot", "Gemini", "Claude"],
    alt: "AIツール別に講座が並ぶコース一覧の画面",
    h: "社内で使うAIに合わせて、\n講座をカスタマイズできる。",
    d: "ChatGPT・Copilot・Gemini・Claudeなど、主要なAIツールごとに講座を用意。社内で導入しているツールや部署の業務に合わせて、1,000本以上の講座から必要なものを選んで学べます。",
  },
  {
    no: "03",
    en: "Up to Date",
    title: "毎週点検で常に最新",
    checks: ["週に1回、すべての講座の内容を点検", "ツールの画面変更や新機能に合わせて更新"],
    tags: ["毎週点検", "最新のAIに対応"],
    alt: "講座の更新履歴の画面",
    h: "AIの変化に合わせて、\n講座を毎週アップデート",
    d: "AIツールは画面や機能がすぐに変わります。週に1回すべての講座を点検し、仕様変更や新機能に合わせて内容を更新するため、古い手順を学んでしまう心配がありません。",
  },
  {
    no: "04",
    en: "Auto Report",
    title: "進捗・レポートを自動化",
    checks: ["メンバー登録で、ID・パスワードを自動送付", "部署ごとに管理者を置き、担当範囲だけを管理", "部署・個人ごとの受講状況をひと目で確認", "受講レポートを自動で作成"],
    tags: ["ID自動発行", "部署別の管理", "自動レポート"],
    alt: "部署別の受講状況と自動レポートの通知が表示された管理画面",
    h: "進捗の集計もレポートも自動、\n担当者の手間をかけない",
    d: "メンバーを登録すると、ID・パスワードは本人のメールアドレスへ自動で届きます。メンバーの追加やメールの管理も管理画面で完結し、部署ごとに管理者を置けば、それぞれが担当するメンバーの学習状況だけを確認できます。受講者ごとの進捗や受講時間は自動で記録・集計され、受講レポートも自動で作成されるため、担当者が配布や集計に時間を取られません。",
  },
  {
    no: "05",
    en: "Low Cost",
    title: "1ID月額2,980円〜",
    checks: ["5IDから導入して、必要に応じてIDを追加", "助成金（定額制訓練）でさらに費用を抑えられる"],
    tags: ["5IDから", "助成金対応", "無料トライアル"],
    alt: "1ID月額2,980円で、5IDから部署・全社へ広げられることを示す図",
    h: "1ID月額2,980円、\n低コストで小さく試せる。",
    d: "1IDあたり月額2,980円（税抜）で全講座が見放題。5IDから始めて、効果を確かめながら全社へ広げられます。人材開発支援助成金（定額制訓練）を活用すれば、さらに費用を抑えられます。",
  },
];

// 受講開始までの流れ（管理者登録 → メンバー追加のオンボーディング → ID・パスワード自動送付で受講開始）。LMS側は実装予定の仕様を前提に書いている
// 「とは？」の独学サイクル（時計回り：左上→右上→右下→左下）。機能は lms_bytech の実装に合わせる
const CYCLE = [
  {
    no: "1",
    en: "ONBOARDING",
    h: "目的を登録する",
    d: "学ぶ目的・担当業務・AIの経験・使える学習時間などの質問に答えるだけで、一人ひとりの出発点が決まります。",
    img: "/biz/assets/img/e-learning/cycle-01.webp",
    tags: ["学ぶ目的", "担当業務", "学習時間"],
  },
  {
    no: "2",
    en: "MILESTONE",
    h: "道のりを設計する",
    d: "「自分の仕事を速く」から「チームの業務を自動化」まで、目的に合ったマイルストーンを段階的に置きます。",
    img: "/biz/assets/img/e-learning/cycle-02.webp",
    tags: ["目的別のゴール", "職種別テンプレート", "段階的な目標"],
  },
  {
    no: "3",
    en: "ROADMAP",
    h: "期日を決めて進める",
    d: "達成したい日から逆算して、マイルストーンごとに期限を設定。月ごとのロードマップで、今やることが分かります。",
    img: "/biz/assets/img/e-learning/cycle-03.webp",
    tags: ["達成日から逆算", "月ごとのロードマップ", "予定と実績"],
  },
  {
    no: "4",
    en: "PRACTICE",
    h: "AIと積み上げて達成",
    d: "分からないことはAIバディに壁打ち。実践課題とトレーニングを重ねて自分のゴールを達成し、次の目標へ進みます。",
    img: "/biz/assets/img/e-learning/cycle-04.webp",
    tags: ["AIバディと壁打ち", "実践課題", "トレーニング"],
  },
];

// 数値はbizトップ「導入効果」と同じ当社調べの値（業務活用コース）
const RESULTS = [
  {
    label: "ルーティン業務・雑務",
    num: "90",
    unit: "削減",
    kind: "down",
    before: 100,
    after: 10,
    text: "申請チェックやデータ突合、定型メール作成をテンプレ化して自動処理。担当は<em>確認と承認だけ</em>になります。",
  },
  {
    label: "チーム・組織の生産性",
    num: "70",
    unit: "向上",
    kind: "up",
    before: 59,
    after: 100,
    text: "定型の入力・転記・確認を自動化し、差分レビューに一本化。<em>ボトルネックを解消</em>して生産性を高めます。",
  },
  {
    label: "個人ごとの業務",
    num: "60",
    unit: "自動化",
    kind: "donut",
    before: 0,
    after: 60,
    text: "単純な効率化にとどまらず、<em>個人の業務の60%を自動化</em>。AIを使ったワークフロー化まで進めます。",
  },
];

// AI機能（追加予定）。カード内の絵は文字化けを避けるため画像ではなくCSSのUIモック
const AI_FEATURES = [
  {
    key: "chat",
    en: "AI Chat Support",
    h: "つまずいたら、<br />AIにすぐ質問できる",
    d: "レッスン内容に沿って、AIがチャットで質の高い回答を返します。疑問をその場で解消して、学習を止めません。",
  },
  {
    key: "plan",
    en: "AI Milestone",
    h: "目的に合わせて、<br />AIが学習計画を設計",
    d: "身につけたいスキルや業務内容をもとに、AIがマイルストーンを設計。何から学ぶかで迷わなくなります。",
  },
  {
    key: "practice",
    en: "AI Practice",
    h: "学んだ内容を、<br />AIで実務トレーニング",
    d: "実際の業務に近いお題にAIと取り組み、フィードバックを受けながら「知っている」を「できる」に変えます。",
  },
  {
    key: "advice",
    en: "AI Advice",
    h: "AIがスキル習得に<br />アドバイス",
    d: "受講状況やトレーニング結果から、伸ばしたいポイントと次に学ぶレッスンをAIが提案します。",
  },
] as const;

// 研修管理者向けAI機能（週次レポートの下に並べる3つ）
const ADMIN_AI_FEATURES = [
  {
    key: "alert",
    en: "AI Alert",
    h: "<span>止まりそうな人を、</span><br /><span>AIが早めにお知らせ</span>",
    d: "ログインの間隔や進み具合の変化から、学習が止まりそうなメンバーをAIが見つけてお知らせ。本人に送る声かけ文の案もAIが作るので、すぐにフォローできます。",
  },
  {
    key: "skill",
    en: "AI Skill Map",
    h: "<span>メンバーのAIスキルを、</span><br /><span>AIが見える化</span>",
    d: "学習の進み具合や実務トレーニングの結果から、部署のメンバー一人ひとりのAIスキルを表示。得意・苦手がひと目で分かり、苦手なスキルに合う講座もメンバーごとにAIが提案します。",
  },
  {
    key: "assign",
    en: "AI Member Milestone",
    h: "<span>メンバー別の</span><br /><span>マイルストーンを、</span><br /><span>AIが作成</span>",
    d: "部署のメンバー一人ひとりの担当業務やAIの習熟度、社内で使うAIツールをもとに、何をどの順番で学ぶかのマイルストーンをAIが作成。内容を確認して承認するだけで、各メンバーに届きます。",
  },
] as const;

const FLOW = [
  { no: "01", imgW: 267, en: "Sign up", h: "管理者を登録", d: "Webから申し込み、研修管理者としてアカウントを登録します。入力は1ページだけ。" },
  { no: "02", imgW: 348, en: "Members", h: "メンバーを追加", d: "画面の案内に沿って、メンバーの名前・メールアドレス・部署を入力するだけ。部署ごとの組織図が自動でできあがります。あとから追加もできます。" },
  { no: "03", imgW: 379, en: "Start", h: "受講スタート", d: "ライセンスの付与が完了すると、登録したメールアドレスにID・パスワードが自動で届きます。受講者はその日から学習を始められます。" },
];

const INCLUDED = [
  { icon: "play", h: "全プログラムが見放題", d: `全${programs.length}プログラム・${lessonsFloor}本以上のレッスンを、契約期間中は何度でも視聴できます。` },
  { icon: "user", h: "専用LMSのアカウント", d: "メンバーを登録すると、ID・パスワードを本人のメールへ自動でお送りします。" },
  { icon: "chart", h: "受講状況・進捗の確認", d: "誰がどこまで進んだかを、管理画面でひと目で把握できます。" },
  { icon: "device", h: "PC・スマホで受講", d: "オンラインで、時間や場所を選ばず自分のペースで学べます。" },
];

// FAQはテーマ別に3グループで見せる（FAQ_GROUPS の順）。構造化データは FAQS をそのまま使う
const FAQ_GROUPS = [
  { id: "service", en: "SERVICE", label: "サービス・受講について" },
  { id: "price", en: "PRICE", label: "料金・助成金・社内稟議" },
  { id: "contract", en: "CONTRACT", label: "契約・IDの管理" },
];

const FAQS = [
  {
    cat: "service",
    q: "無料の動画や社内の勉強会でも十分では？",
    a: "教材を「用意する」ことと、社員が学び「続ける」ことは別の課題です。本eラーニングは業務での使い方を実際の画面操作で学べるAI特化のレッスンに加え、専用LMSでの進捗管理までご用意しています。教材探しや進捗の確認にかかる担当者の手間を減らせます。",
  },
  {
    cat: "service",
    q: "一般的なeラーニングサービスとの違いは？",
    a: "ビジネススキル全般ではなく、ChatGPT・Gemini・Copilot・Claudeなど生成AIの業務活用に絞ったプログラムです。ツールごとに基本操作から資料作成・業務の自動化まで体系立てて学べ、修了後はハンズオン（1on1）やワークショップで実践まで段階的に進められます。",
  },
  {
    cat: "service",
    q: "AI未経験の社員でも受講できますか？",
    a: "はい。多くの受講者が生成AI未経験からのスタートです。基礎から順に学べる構成のため、業務で活用できるレベルまで無理なくスキルアップできます。",
  },
  {
    cat: "service",
    q: "受講できるプログラムに制限はありますか？",
    a: "ありません。1IDで全プログラムを見放題で受講できます。最初に学ぶものに迷ったら、まだ使うAIを決めていなければ定番のChatGPT、Microsoft 365環境ならCopilot、Google Workspace環境ならGemini・NotebookLM、文章・資料作成の質を重視するならClaudeがおすすめです。無料個別相談でもご提案します。",
  },
  {
    cat: "service",
    q: "学習中に質問はできますか？",
    a: "eラーニング単体は教材内で完結する自習型です。チャットでの質問や講師との面談が必要な場合は、ハンズオン（1on1）を組み合わせたAI業務効率化研修／AI業務自動化研修をご検討ください。",
  },
  {
    cat: "price",
    q: "料金はどのように決まりますか？",
    a: "導入費用100,000円（税抜）と、受講者1名（1ID）あたり月額2,980円（税抜）です。ご契約は5ID・6ヶ月から承ります。ID数と期間に応じた総額は、お見積りにてご提示します。",
  },
  {
    cat: "price",
    q: "何IDから契約できますか？上限はありますか？",
    a: "ご契約は5IDからです。上限はなく、チーム・組織単位での受講や全社展開にも対応しています。人数や体制に応じて最適なプランをご提案します。",
  },
  {
    cat: "price",
    q: "助成金は使えますか？",
    a: "はい。eラーニングは人材開発支援助成金（人への投資促進コース）の「定額制訓練」の対象で、要件を満たすと経費の60%（中小企業・賃金要件などを満たすと75%）が助成されます。受講者1人あたり10時間以上の受講などの要件があります。ハンズオン（1on1）を組み合わせたAI業務効率化研修も助成金の対象です。",
  },
  {
    cat: "price",
    q: "社内の決裁者にどう説明すればいいですか？",
    a: "「法人向けAIeラーニング サービス概要資料」に、特長・AI機能・プログラム一覧・料金・助成金の試算までまとめています。稟議資料としてご活用ください。人数と期間に応じたお見積りもご用意します。",
  },
  {
    cat: "contract",
    q: "契約期間の決まりはありますか？",
    a: "最低契約期間は6ヶ月で、ご契約は5IDから承ります。契約満了日の1か月前までにお申し出がない場合は、同じID数で6ヶ月ごとに自動更新となります。詳しくは利用規約をご確認ください。",
  },
  {
    cat: "contract",
    q: "契約期間の途中でIDを追加できますか？",
    a: "はい、管理画面からいつでも追加できます。追加したIDは追加した月から月額料金（日割りなし）がかかり、ご利用期間は本契約の満了日までとなるため、更新日は全IDでそろいます。請求は毎月末時点のID数で締め、翌月にご請求します。",
  },
  {
    cat: "contract",
    q: "研修管理者は複数人置けますか？管理者にも料金はかかりますか？",
    a: "はい。最初にご登録いただいた方が主管理者となり、部署・チームごとに部署管理者を任命できます。部署管理者が確認できるのは担当する部署・チームのメンバーの学習状況だけで、部署管理者の任命・解除は主管理者のみが行えます。受講せず管理だけを行う管理者には、料金はかかりません（ご自身も受講する場合は1IDとして数えます）。",
  },
  {
    cat: "contract",
    q: "退職・異動したメンバーのIDを、別の社員に使えますか？",
    a: "できません。1IDは受講者お一人専用で、IDの共有や、退職・異動に伴う別の方への付け替えはお受けしていません。新しく受講する方は、IDを追加してご登録ください。",
  },
  {
    cat: "contract",
    q: "IDを減らしたり、解約したりできますか？",
    a: "契約期間中のID数の削減・中途解約はお受けしておらず、ご返金もいたしかねます。ID数の削減や更新しない場合は、契約満了日の1か月前までにお申し出ください。助成金（定額制訓練）をご利用の場合は、計画届の準備があるため満了日の2か月前を目安に更新内容をお決めいただくと安心です。",
  },
];

// ── ネイティブ<script>（ページ内ナビのstuck・FAQ開閉） ──

// FV（青背景）の上ではヘッダーロゴを白に、FVを過ぎたら紺に戻す。
// img の src を書き換えると React の hydration 不一致になるため、head に足した専用 <style> で filter を切り替える
const HEADER_LOGO_SCRIPT = `(function(){
  var hero=document.querySelector('.el-hero');
  if(!hero)return;
  var st=document.createElement('style');
  document.head.appendChild(st);
  var WHITE='.top-header__logo img{filter:brightness(0) invert(1)!important}';
  function upd(){ var css = window.pageYOffset > (hero.offsetHeight - 88) ? '' : WHITE; if(st.textContent!==css) st.textContent=css; }
  upd();
  window.addEventListener('scroll',upd,{passive:true});
  window.addEventListener('resize',upd,{passive:true});
})();`;


// 右端の縦型CTAは、FVのCTAボタンが画面外に出たら表示する。
// className を書き換えると hydration 不一致になりうるため、head に足した専用 <style> で切り替える
const SIDE_CTA_SCRIPT = `(function(){
  var cta=document.querySelector('.el-hero .el-cta');
  if(!cta)return;
  var st=document.createElement('style');
  document.head.appendChild(st);
  var SHOW='.el-side{opacity:1;visibility:visible;transform:translate(0,-50%);transition:opacity .3s ease,transform .3s ease,visibility 0s}';
  function upd(){ var css = cta.getBoundingClientRect().bottom < 0 ? SHOW : ''; if(st.textContent!==css) st.textContent=css; }
  upd();
  window.addEventListener('scroll',upd,{passive:true});
  window.addEventListener('resize',upd,{passive:true});
})();`;

// ページ内ナビはFVを過ぎたら上からスライドで出す（このページ限定。CSSは e-learning.css の .el-page .ct-pagenav）
const PAGENAV_STUCK_SCRIPT = `(function(){
  var nav=document.querySelector('.ct-pagenav'), hero=document.querySelector('.el-hero');
  if(!nav||!hero)return;
  function upd(){ nav.classList.toggle('is-shown', hero.getBoundingClientRect().bottom<=0); }
  upd();
  window.addEventListener('scroll',upd,{passive:true});
  window.addEventListener('resize',upd,{passive:true});
})();`;

// 受講者の声（ダミー。掲載許可のある声が集まったら差し替え。w は画像の幅＝高さ560px時）。eラーニングの機能に沿った内容。text は「|」の位置でだけ改行する
const VOICES = [
  { tag: "スキマ時間で続く！", text: "1本数分の動画と|リマインドで、|忙しくても|後回しにせず|続けられました。", who: "営業職", w: 241 },
  { tag: "報告がラクに！", text: "AIの週次レポートで、|一人ひとりの|学習状況が|すぐ分かります。", who: "人事・研修担当", w: 155 },
  { tag: "つまずいてもすぐ解決！", text: "分からない所は|AIにすぐ質問。|Excelの課題も|その場で|解けました。", who: "経理職", w: 222 },
  { tag: "チームで続く！", text: "チーム内ランキングで|声をかけ合い、|部署の受講が|止まらなく|なりました。", who: "管理職", w: 266 },
  { tag: "いつも最新の内容！", text: "講座が毎週|アップデートされるので、|Claude Codeの|新機能も|すぐ学べます。", who: "エンジニア", w: 246 },
] as const;

// 業種・部門別実践講座（仮。2026-11-13ユーザー指示で枠だけ先に作成。講座名・内容は確定したら差し替える）
const PRACTICE_TABS = [
  {
    key: "dept",
    label: "部門別",
    items: [
      { name: "営業", lessons: ["商談準備・提案書の作成", "議事録から次アクションを整理", "顧客リストの分析"] },
      { name: "マーケティング・広報", lessons: ["広告コピー・SNS投稿の作成", "競合・市場リサーチ", "プレスリリースの下書き"] },
      { name: "人事・採用", lessons: ["求人票・スカウト文の作成", "面接評価シートの整理", "研修資料・社内FAQの作成"] },
      { name: "経理・財務", lessons: ["請求書・仕訳データの照合", "Excel関数・集計の自動化", "月次レポートの作成"] },
      { name: "総務・法務", lessons: ["契約書のチェックポイント整理", "社内規程・通知文の作成", "問い合わせ対応の効率化"] },
      { name: "カスタマーサポート", lessons: ["問い合わせ返信文の作成", "FAQ・マニュアルの整備", "VOCの分類と分析"] },
      { name: "経営企画", lessons: ["事業計画・数値シミュレーション", "会議資料の要約", "新規事業のアイデア出し"] },
      { name: "情報システム", lessons: ["社内AI利用ルールの整備", "業務の自動化ツール作成", "ヘルプデスク対応の効率化"] },
      { name: "エンジニア・開発", lessons: ["Claude Code・Codexでの開発", "コードレビュー・テスト作成", "仕様書・設計書の作成"] },
      { name: "デザイン・クリエイティブ", lessons: ["画像・バナーの生成と修正", "動画制作の効率化", "デザイン案のたたき台作成"] },
      { name: "企画・商品開発", lessons: ["市場調査・ペルソナ設計", "企画書・コンセプト案の作成", "アンケート結果の分析"] },
      { name: "購買・物流", lessons: ["仕入先の比較・選定", "発注・在庫データの集計", "配送・物流トラブル対応の整理"] },
    ],
  },
  {
    key: "industry",
    label: "業種別",
    items: [
      { name: "建設・不動産", lessons: ["工事日報・報告書の作成", "物件紹介文・図面説明の作成", "安全書類のチェック"] },
      { name: "製造", lessons: ["作業手順書・マニュアル作成", "品質データの集計・分析", "多言語での技術文書対応"] },
      { name: "医療・介護", lessons: ["記録・申し送りの要約", "利用者向け案内文の作成", "シフト・業務の整理"] },
      { name: "小売・EC", lessons: ["商品説明文・LPの作成", "レビュー・売上データの分析", "販促企画のアイデア出し"] },
      { name: "金融・保険", lessons: ["提案資料・説明文の作成", "規程・マニュアルの検索", "顧客対応記録の要約"] },
      { name: "士業", lessons: ["顧問先への案内文作成", "法令・通達の要点整理", "申請書類の下書き"] },
      { name: "人材・教育", lessons: ["求人原稿・面談記録の作成", "教材・テスト問題の作成", "保護者・求職者への連絡文"] },
      { name: "卸売・商社", lessons: ["見積書・発注書の作成", "取引先との英文メール", "在庫・販売データの分析"] },
    ],
  },
  {
    key: "level",
    label: "階層別",
    items: [
      { name: "新入社員・内定者", lessons: ["生成AIの基本と安全な使い方", "報告・メール文の作成", "調べ物と情報の整理"] },
      { name: "若手・中堅社員", lessons: ["日常業務の時短テクニック", "資料作成・データ集計", "自分の業務の自動化"] },
      { name: "リーダー・管理職", lessons: ["チームの業務をAIで見直す", "部下への指導・フィードバック", "数値分析と意思決定"] },
      { name: "経営層・役員", lessons: ["AI活用の全体像と投資判断", "全社展開とガバナンス", "経営資料の読み解き・要約"] },
    ],
  },
] as const;

// 業種・部門別実践講座のタブ切り替え
const PRACTICE_TABS_SCRIPT = `(function(){
  // 要素の差し替え（開発時のHMRなど）でも効くよう document で委譲して拾う
  document.addEventListener('click',function(e){
    var t=e.target.closest&&e.target.closest('.el-prac__tab'); if(!t)return;
    var root=t.closest('.el-prac'); if(!root)return;
    root.querySelectorAll('.el-prac__tab').forEach(function(x){ var on=x===t; x.classList.toggle('is-active',on); x.setAttribute('aria-selected',on?'true':'false'); });
    root.querySelectorAll('.el-prac__panel').forEach(function(p){ p.hidden=p.dataset.tab!==t.dataset.tab; });
  });
})();`;

// 追加予定プログラムの横スライダー（CSS scroll-snap＋前後ボタン）
const UPCOMING_SLIDER_SCRIPT = `(function(){
  var t=document.querySelector('.el-upcoming__track'); if(!t)return;
  var prev=document.querySelector('.el-upcoming__btn--prev'), next=document.querySelector('.el-upcoming__btn--next');
  function step(){ var c=t.querySelector('.el-program'); return c ? c.getBoundingClientRect().width+parseFloat(getComputedStyle(t).columnGap||0) : 300; }
  function upd(){ prev.disabled=t.scrollLeft<=2; next.disabled=t.scrollLeft+t.clientWidth>=t.scrollWidth-2; }
  prev.addEventListener('click',function(){ t.scrollBy({left:-step(),behavior:'smooth'}); });
  next.addEventListener('click',function(){ t.scrollBy({left:step(),behavior:'smooth'}); });
  t.addEventListener('scroll',upd,{passive:true}); window.addEventListener('resize',upd,{passive:true}); upd();
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

// FVのCTA。bizトップFVの .fvcta と同じ「左に画像・上に吹き出し・右にアイコン」のピル型ボタン
function Cta() {
  return (
    <div className="el-cta">
      <a className="el-cta__btn el-cta__btn--light" href={DOC_HREF}>
        <span className="el-cta__badge">いつでも見られる！</span>
        <img className="el-cta__visual el-cta__visual--doc" src={DOC_COVER} alt="" width={240} height={340} />
        <span className="el-cta__text">資料ダウンロード</span>
        <span className="el-cta__ico el-cta__ico--dl" aria-hidden="true" />
      </a>
      <a className="el-cta__btn el-cta__btn--dark" href={TRIAL_HREF}>
        <span className="el-cta__badge">まずは無料でお試し！</span>
        <span className="el-cta__visual el-cta__visual--mock">
          <Devices />
        </span>
        <span className="el-cta__text">無料トライアル</span>
        <span className="el-cta__ico el-cta__ico--arrow" aria-hidden="true" />
      </a>
    </div>
  );
}

// CTA帯。ページ途中は「資料｜トライアル＋下に個別相談」、フッター上(final)は見出し付きの3カラム
function CtaBand({ final = false }: { final?: boolean }) {
  return (
    <section className={`el-band${final ? " el-band--final" : ""}`} id={final ? "contact" : undefined}>
      {final && (
        <div className="el-band__head">
          <p className="el-micro el-micro--light">CONTACT</p>
          <h2 className="el-band__h">お気軽にお問い合わせください</h2>
          <p className="el-band__lead">
            導入のご相談やお見積もり、無料トライアルについてなど、お気軽にお問い合わせください。費用の目安は
            <a href="/estimate">見積もりシミュレーター</a>でもすぐに確認できます。
          </p>
        </div>
      )}
      <div className="el-band__panel">
        <div className="el-band__cols">
          <div className="el-band__col el-band__col--doc">
            <p className="el-band__title">
              バイテックのeラーニングが
              <br />
              <b>資料1つ</b>で分かります！
            </p>
            <a className="el-band__btn el-band__btn--doc" href={DOC_HREF}>
              <span className="el-band__badge">料金・助成金まで掲載</span>
              資料をダウンロードする
            </a>
            <div className="el-band__visual el-band__visual--doc" aria-hidden="true">
              <img className="el-band__slide el-band__slide--back" src={DOC_SLIDES[0]} alt="" width={1280} height={720} loading="lazy" />
              <img className="el-band__slide el-band__slide--mid" src={DOC_SLIDES[1]} alt="" width={1280} height={720} loading="lazy" />
              <img className="el-band__slide" src={DOC_SLIDES[2]} alt="" width={1280} height={720} loading="lazy" />
            </div>
          </div>
          <div className="el-band__col el-band__col--trial">
            <p className="el-band__title">
              まずは<b>無料</b>で
              <br />
              試してみましょう！
            </p>
            <a className="el-band__btn el-band__btn--trial" href={TRIAL_HREF}>
              <span className="el-band__badge">使いやすさを体感！</span>
              無料トライアルはこちら
            </a>
            <div className="el-band__visual el-band__visual--trial">
              <Devices />
            </div>
          </div>
          {final && (
            <div className="el-band__col el-band__col--talk">
              <p className="el-band__title">
                <b>事例</b>や<b>お見積もり</b>のご相談など
                <br />
                お気軽にご連絡ください！
              </p>
              <a className="el-band__btn el-band__btn--talk" href="/counseling">
                無料個別相談を予約する
              </a>
              <div className="el-band__visual el-band__visual--talk" aria-hidden="true">
                <img src="/biz/assets/img/e-learning/contact.webp" alt="" width={1280} height={714} loading="lazy" />
              </div>
            </div>
          )}
        </div>
        {!final && (
          <div className="el-band__talk">
            <p className="el-band__talk-h">オンラインでもご相談いただけます！</p>
            <a className="el-band__talk-link" href="/counseling">
              無料個別相談を予約する
              <span className="el-band__talk-arrow" aria-hidden="true" />
            </a>
            <p className="el-band__talk-note">プログラム選び・受講人数・お見積もりまで、お気軽にご相談ください。</p>
          </div>
        )}
      </div>
      <div className="el-band__apply">
        <span className="el-band__apply-ico" aria-hidden="true" />
        <div className="el-band__apply-txt">
          <p className="el-band__apply-h">すでにご利用をお決めの方へ</p>
          <p className="el-band__apply-d">商談なしで、Webからそのままお申し込みいただけます。<b>入力は1ページだけ。</b></p>
        </div>
        <a className="el-band__apply-btn" href={APPLY_HREF}>
          Webで申し込む
          <span aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

// AI機能カードのUIモック
// 特長のビジュアル。cari_evo の特長と同じく、実写＋LMS画面風のカード（01・04）と図解（02・03・05）を混ぜて単調にしない。
// 数字・名前は画面の例（実績ではない）。.biz-root の all:revert でインラインSVGが崩れるのでアイコンはCSSで描く
const FV = "/biz/assets/img/e-learning";
function FeatureVisual({ no, alt }: { no: string; alt: string }) {
  if (no === "01") {
    return (
      <div className="el-pillar__visual el-fv el-fv--photo el-fv--01" role="img" aria-label={alt}>
        <img className="el-fv__photo" src={`${FV}/feature-photo-01.webp`} alt="" width={1200} height={900} loading="lazy" decoding="async" />
        <p className="el-fv__pill el-fv__pill--remind"><i aria-hidden="true" /><span><small>リマインド</small>今日の5分レッスンを始めましょう</span></p>
        <div className="el-fv__card el-fv__rank">
          <p className="el-fv__head">チーム内ランキング｜今週</p>
          <ol>
            <li><span>1</span>佐藤さん<b>4.2h</b></li>
            <li className="is-me"><span>2</span>あなた<b>3.6h</b></li>
            <li><span>3</span>鈴木さん<b>2.9h</b></li>
          </ol>
        </div>
        <div className="el-fv__ban">
          <div className="el-fv__ban-top">
            <img className="el-fv__avatar" src={`${FV}/feature-avatar-01.webp`} alt="" width={160} height={160} loading="lazy" decoding="async" />
            <p className="el-fv__ban-h">あなたのマイルストーン</p>
            <span>達成 <b>3</b>/7</span>
          </div>
          <ol className="el-fv__nodes">
            <li className="is-done"><i>✓</i>ChatGPT入門</li>
            <li className="is-now"><i>4</i>資料作成をAIで</li>
            <li><i>5</i>業務の自動化</li>
          </ol>
        </div>
      </div>
    );
  }
  if (no === "02") {
    return (
      <div className="el-pillar__visual el-fv el-fv--diagram el-fv--02" role="img" aria-label={alt}>
        <p className="el-fv__q">社内で使っているAIは？</p>
        <ul className="el-fv__tools">
          <li className="is-on" style={{ ["--c" as string]: "#10a37f" }}>ChatGPT</li>
          <li className="is-on" style={{ ["--c" as string]: "#2f7cc0" }}>Copilot</li>
          <li style={{ ["--c" as string]: "#6f5bd6" }}>Gemini</li>
          <li style={{ ["--c" as string]: "#d97745" }}>Claude</li>
        </ul>
        <p className="el-fv__flow"><span>自社に合わせてカスタマイズ</span></p>
        <div className="el-fv__card el-fv__set">
          <p className="el-fv__head">あなたの会社の講座セット</p>
          <ul>
            <li><i style={{ background: "#2f7cc0" }} />Copilot マスターコース<em>全部署</em></li>
            <li><i style={{ background: "#10a37f" }} />ChatGPTで提案資料づくり<em>営業部</em></li>
            <li><i style={{ background: "#2f7cc0" }} />Copilot × Excel 集計・分析<em>経理部</em></li>
          </ul>
        </div>
      </div>
    );
  }
  if (no === "03") {
    return (
      <div className="el-pillar__visual el-fv el-fv--diagram el-fv--03" role="img" aria-label={alt}>
        <ol className="el-fv__weeks">
          <li><small>11/3週</small><i />点検</li>
          <li><small>11/10週</small><i />点検</li>
          <li><small>11/17週</small><i />点検</li>
          <li className="is-now"><small>今週</small><i />点検</li>
        </ol>
        <div className="el-fv__card el-fv__log">
          <p className="el-fv__head">講座の更新履歴</p>
          <ul>
            <li><time>11/10</time><span style={{ ["--c" as string]: "#10a37f" }}>ChatGPT</span>画面の変更に合わせて手順を更新</li>
            <li><time>11/10</time><span style={{ ["--c" as string]: "#6f5bd6" }}>Gemini</span>新機能のレッスンを追加</li>
            <li><time>11/3</time><span style={{ ["--c" as string]: "#2f7cc0" }}>Copilot</span>操作動画を最新版に差し替え</li>
          </ul>
        </div>
        <p className="el-fv__stamp"><small>WEEKLY CHECK</small>毎週すべての講座を点検</p>
      </div>
    );
  }
  if (no === "04") {
    return (
      <div className="el-pillar__visual el-fv el-fv--photo el-fv--04" role="img" aria-label={alt}>
        <img className="el-fv__photo" src={`${FV}/feature-photo-04.webp`} alt="" width={1200} height={900} loading="lazy" decoding="async" />
        <div className="el-fv__card el-fv__dept">
          <p className="el-fv__head">受講状況｜部署別</p>
          <ul>
            <li>営業部<span><i style={{ width: "82%" }} /></span><b>82%</b></li>
            <li>人事部<span><i style={{ width: "64%" }} /></span><b>64%</b></li>
            <li>経理部<span><i style={{ width: "45%" }} /></span><b>45%</b></li>
          </ul>
        </div>
        <p className="el-fv__pill el-fv__pill--report"><i aria-hidden="true" /><span><small>11/4〜11/10</small>受講レポートを自動で作成しました</span></p>
        <p className="el-fv__pill el-fv__pill--mail"><i aria-hidden="true" /><span><small>メンバー管理</small>田中さんにID・パスワードを送信しました</span></p>
      </div>
    );
  }
  return (
    <div className="el-pillar__visual el-fv el-fv--05" role="img" aria-label={alt}>
      <div className="el-fv__hero">
        <img className="el-fv__photo" src={`${FV}/feature-photo-05.webp`} alt="" width={1200} height={750} loading="lazy" decoding="async" />
        <p className="el-fv__seal"><small>人材開発支援助成金</small>対象</p>
      </div>
      <div className="el-fv__card el-fv__cost">
        <p className="el-fv__tag"><small>1IDあたり</small><span>月額<b>2,980</b>円</span><em>税抜・全講座見放題</em></p>
        <div className="el-fv__grow">
        <p className="el-fv__head">小さく始めて、全社へ</p>
        <ol>
          {[
            { n: 5, b: "まずは5IDで", s: "効果を試す" },
            { n: 10, b: "部署に", s: "広げる" },
            { n: 15, b: "全社へ", s: "展開" },
          ].map((g, k) => (
            <Fragment key={g.b}>
              {k > 0 && <li className="el-fv__step-arrow" aria-hidden="true" />}
              <li className={k === 0 ? "is-start" : undefined}>
                <span className="el-fv__people">{Array.from({ length: g.n }, (_, m) => <i key={m} />)}</span>
                <b>{g.b}</b>{g.s}
              </li>
            </Fragment>
          ))}
        </ol>
        </div>
      </div>
    </div>
  );
}

function AdminAiMock({ kind }: { kind: (typeof ADMIN_AI_FEATURES)[number]["key"] }) {
  if (kind === "alert") {
    return (
      <div className="el-aim el-aim--alert">
        <p className="el-aim__bar">AI受講アラート</p>
        <p className="el-aim__warn"><span>田</span>田中さん<small>経理部</small><em>要フォロー</em></p>
        <p className="el-aim__why">7日間ログインがなく、先週から進み具合が止まっています。</p>
        <p className="el-aim__draft"><b>声かけ文の案</b>田中さん、お疲れさまです。経費精算のレッスン、あと2本で修了です。10分だけでも進めてみませんか？</p>
      </div>
    );
  }
  if (kind === "skill") {
    return (
      <div className="el-aim el-aim--skill">
        <p className="el-aim__bar">AIスキルマップ｜営業部</p>
        <ul className="el-aim__skills">
          <li><span>佐藤さん<small>得意：資料作成</small></span><i style={{ width: "82%" }} /><b>82</b></li>
          <li><span>鈴木さん<small>得意：文章作成</small></span><i style={{ width: "64%" }} /><b>64</b></li>
          <li className="is-low"><span>田中さん<small>苦手：データ分析</small></span><i style={{ width: "31%" }} /><b>31</b></li>
        </ul>
        <p className="el-aim__rec"><b>田中さんへのおすすめ講座</b>Excel×AIでデータ分析</p>
      </div>
    );
  }
  return (
    <div className="el-aim el-aim--assign">
      <p className="el-aim__bar">メンバー別マイルストーン｜営業部</p>
      <ul className="el-aim__plan el-aim__plan--member">
        <li><span>佐藤さん</span><p><b>提案資料をAIで下書き</b><small>3ステップ・期日 12/20</small></p></li>
        <li><span>鈴木さん</span><p><b>ChatGPTの基本操作</b><small>2ステップ・期日 12/10</small></p></li>
        <li><span>田中さん</span><p><b>商談メモの要約を自動化</b><small>4ステップ・期日 1/31</small></p></li>
      </ul>
      <p className="el-aim__ok">承認してメンバーに届ける</p>
    </div>
  );
}

function AiMock({ kind }: { kind: (typeof AI_FEATURES)[number]["key"] }) {
  if (kind === "chat") {
    return (
      <div className="el-aim el-aim--chat">
        <p className="el-aim__bar">AIチャットサポート</p>
        <p className="el-aim__msg el-aim__msg--me">議事録を要約するとき、どんな指示を出せばいい？</p>
        <p className="el-aim__msg el-aim__msg--ai">
          「目的・読み手・文字数」の3点を伝えるのがコツです。例えば「部長向けに、決定事項を3行で」のように指示すると…
        </p>
        <p className="el-aim__input">質問を入力</p>
      </div>
    );
  }
  if (kind === "plan") {
    return (
      <div className="el-aim el-aim--plan">
        <p className="el-aim__bar">あなたの学習マイルストーン</p>
        <ol className="el-aim__steps">
          <li className="is-done"><b>1週目</b>ChatGPTの基本操作</li>
          <li className="is-done"><b>2週目</b>議事録・メールの効率化</li>
          <li className="is-now"><b>3週目</b>資料作成をAIで時短</li>
          <li><b>4週目</b>チームの業務フローに組み込む</li>
        </ol>
      </div>
    );
  }
  if (kind === "practice") {
    return (
      <div className="el-aim el-aim--practice">
        <p className="el-aim__bar">実務トレーニング</p>
        <p className="el-aim__task"><span>お題</span>取引先への日程調整メールをAIで作成しよう</p>
        <div className="el-aim__score">
          <b>82</b>
          <p>
            要件は満たせています。<br />候補日を箇条書きにすると、より読みやすくなります。
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="el-aim el-aim--advice">
      <p className="el-aim__bar">スキルアドバイス</p>
      <ul className="el-aim__skills">
        {[
          ["文章作成", 80],
          ["情報収集", 65],
          ["データ分析", 35],
        ].map(([n, v]) => (
          <li key={n}>
            <span>{n}</span>
            <i><em style={{ width: `${v}%` }} /></i>
          </li>
        ))}
      </ul>
      <p className="el-aim__tip">次は「Excelのデータ分析」がおすすめです</p>
    </div>
  );
}

// FVの帯とサイクル図の中央で共用するPC・スマホのモック
function Devices() {
  return (
    <div className="el-devices" aria-hidden="true">
      <div className="el-laptop">
        <div className="el-laptop__lid">
          <div className="el-laptop__screen">
            <div className="el-lms">
              <div className="el-lms__list">
                <p className="el-lms__course">Claude研修</p>
                <ul>
                  <li className="is-done">Claudeの基本操作</li>
                  <li className="is-done">指示の出し方</li>
                  <li className="is-now">アイデアを出す</li>
                  <li>企画書にまとめる</li>
                  <li>資料をレビューする</li>
                  <li>業務フローに組み込む</li>
                </ul>
                <div className="el-lms__progress">
                  <span>受講進捗</span>
                  <b>62%</b>
                  <i><em /></i>
                </div>
              </div>
              <div className="el-lms__main">
                <p className="el-lms__title"><span>Chapter 3</span>新規事業のアイデアを出す</p>
                <div className="el-lms__player">
                  <img src="/biz/assets/img/e-learning/lesson.webp" alt="" width={960} height={540} />
                  <span className="el-lms__seek"><i /></span>
                </div>
                <div className="el-lms__actions">
                  <span className="is-primary">次のレッスンへ</span>
                  <span>メモ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="el-laptop__base" />
      </div>

      <div className="el-phone">
        <div className="el-phone__screen">
          <p className="el-phone__brand"><img src="/biz/assets/img/common/hd-logo-dark.svg" alt="" /></p>
          <div className="el-phone__hero">
            <img src="/biz/assets/img/course/about/chat-gpt-01.webp" alt="" />
            <span>ChatGPT研修</span>
          </div>
          <p className="el-phone__head">受講中のプログラム</p>
          {programs.slice(1, 4).map((c, i) => (
            <div className="el-phone__item" key={c.slug} style={{ ["--el-accent" as string]: c.color }}>
              <span className="el-phone__logo"><img src={c.logo} alt="" /></span>
              <span className="el-phone__name">{c.name.replace(/研修$/, "")}</span>
              <span className="el-phone__bar"><i style={{ width: `${[35, 80, 15][i]}%` }} /></span>
            </div>
          ))}
        </div>
      </div>
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
          {/* 上段：bizトップ旧FVと同じ背景SVG＋3人の切り抜きを重ね、左に白文字 */}
          <div className="el-hero__photo">
            <img className="el-hero__bg" src="/biz/assets/img/e-learning/fv-bg.svg" alt="" width={6033} height={1788} aria-hidden="true" />
            <img className="el-hero__people" src="/biz/assets/img/e-learning/fv-people.webp" alt="AI活用を推進するビジネスパーソン" width={1400} height={1123} fetchPriority="high" />
            <div className="el-hero__inner">
              <div className="el-hero__body">
                <nav className="ct-breadcrumb ct-breadcrumb--hero" aria-label="パンくず">
                  <Link href="/" prefetch={false}>トップ</Link>
                  <span>›</span>
                  <span>eラーニング</span>
                </nav>
                <p className="el-hero__eyebrow">
                  <span className="el-hero__eyebrow-ico" aria-hidden="true">
                    <i className="el-hero__eyebrow-screen" />
                    <i className="el-hero__eyebrow-bar" />
                    <i className="el-hero__eyebrow-spark" />
                  </span>
                  <span>
                    法人向けAI研修 <b>eラーニング</b>
                  </span>
                </p>
                <h1 className="el-hero__title">
                  <span><span className="el-hero__ph"><span className="el-hero__price">1,000</span>本以上の</span><span className="el-hero__ph">AI講座が、</span></span>
                  <span><span className="el-hero__ph">月額<span className="el-hero__price">2,980</span>円〜</span><span className="el-hero__ph">見放題。</span></span>
                </h1>
                <p className="el-hero__lead">
                  <span className="el-hero__ph">社内で使うAIツールに合わせて、</span><span className="el-hero__ph">必要な講座を選んで学べます。</span><span className="el-hero__ph">メンバー登録だけで</span><span className="el-hero__ph">その日から受講スタート。</span>
                </p>

                <Cta />
              </div>
            </div>
          </div>

          {/* 下段：単色の帯に実績バッジ＋PC/スマホのモック（モックは写真側へはみ出させる） */}
          <div className="el-hero__band">
            <div className="el-hero__band-inner">
              <div className="el-awards">
                <ul className="el-awards__list">
                  {AWARDS.map((a) => (
                    <li className="el-award" key={a.label}>
                      <span className="el-award__label">{a.label}</span>
                      <span className="el-award__body">
                        <span className="el-award__num">{a.num}<small>{a.unit}</small></span>
                        <span className="el-award__note">{a.foot && <b>{a.foot}</b>}{a.mark}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                {/* 注記は2行に収める（1行目：※1・※2、2行目：※3＋当社調べ） */}
                <ul className="el-awards__notes">
                  <li>
                    {AWARDS[0].mark} {AWARDS[0].note}　{AWARDS[1].mark} {AWARDS[1].note}
                  </li>
                  <li>
                    {AWARDS[2].mark} {AWARDS[2].note}　※1・2 当社調べ
                  </li>
                </ul>
              </div>

              <Devices />
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
            <div className="el-pagenav__ctas">
              <a className="ct-pagenav__cta" href={DOC_HREF}>
                資料ダウンロード
                <span className="ct-pagenav__cta-ico" aria-hidden="true" />
              </a>
              <a className="ct-pagenav__cta el-pagenav__cta--trial" href={TRIAL_HREF}>
                無料トライアル
                <span className="el-pagenav__cta-arrow" aria-hidden="true" />
              </a>
            </div>
          </div>
        </nav>

        {/* ============ eラーニングプランとは？（4ステップが円を描く学習サイクル図） ============ */}
        <section className="el-about" id="about">
          <div className="el-about__head">
            <div>
              <p className="el-micro">ABOUT</p>
              <h2 className="el-about__title">
                <span>バイテック法人AI研修</span>
                <br />
                eラーニングプランとは
              </h2>
            </div>
            <p className="el-about__lead">
              動画を配って終わりの従来型eラーニングではなく、一人ひとりの<b>独学を支える</b>eラーニングです。目的を登録すると、マイルストーンと期日つきのロードマップを設計。AIバディと壁打ちしながら実践課題とトレーニングを積み重ね、自分のゴールまで進みます。進捗管理とレポーティングは自動で行います。
            </p>
          </div>

          <div className="el-cycle">
            {/* 背景のリングと進行方向の矢印（装飾） */}
            <div className="el-cycle__ring" aria-hidden="true">
              <span className="el-cycle__arrow el-cycle__arrow--top">›››</span>
              <span className="el-cycle__arrow el-cycle__arrow--right">›››</span>
              <span className="el-cycle__arrow el-cycle__arrow--bottom">›››</span>
              <span className="el-cycle__arrow el-cycle__arrow--left">›››</span>
            </div>
            <div className="el-cycle__hub">
              <img className="el-cycle__hub-logo" src="/biz/assets/img/common/hd-logo-dark.svg" alt="バイテック法人AI研修" />
              <div className="el-cycle__devices">
                <Devices />
              </div>
            </div>

            {CYCLE.map((c) => (
              <div className={`el-cycle__card el-cycle__card--${c.no}`} key={c.no}>
                <span className="el-cycle__no">{c.no}</span>
                <div className="el-cycle__body">
                  <p className="el-cycle__en">{c.en}</p>
                  <p className="el-cycle__h">{c.h}</p>
                  <p className="el-cycle__d">{c.d}</p>
                </div>
                <img className="el-cycle__img" src={c.img} alt="" width={800} height={600} loading="lazy" />
                <ul className="el-cycle__tags">
                  {c.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}

          </div>

          <div className="el-results">
            <p className="el-results__en">RESULTS</p>
            <h3 className="el-results__title">バイテックを導入した<br />多くの企業が効果を実感</h3>
            <ul className="el-results__list">
              {RESULTS.map((r, i) => (
                <li key={r.label} className="el-result">
                  <span className="el-result__idx" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <p className="el-result__label">{r.label}</p>
                  <p className="el-result__num">
                    <b>{r.num}</b>%<span>{r.unit}</span>
                  </p>
                  {r.kind === "donut" ? (
                    <div className="el-result__donut" style={{ "--v": r.after } as CSSProperties}>
                      <span>導入後</span>
                    </div>
                  ) : (
                    <div className={`el-result__bars el-result__bars--${r.kind}`}>
                      <span className="el-result__col">
                        <span className="el-result__bar el-result__bar--before" style={{ height: `${r.before}%` }} />
                        <span className="el-result__axis">導入前</span>
                      </span>
                      <span className="el-result__col">
                        <span className="el-result__bar el-result__bar--after" style={{ height: `${r.after}%` }} />
                        <span className="el-result__axis el-result__axis--after">導入後</span>
                      </span>
                    </div>
                  )}
                  <p className="el-result__text" dangerouslySetInnerHTML={{ __html: r.text }} />
                </li>
              ))}
            </ul>
            <p className="el-results__note">※ バイテック法人AI研修（業務活用コース）受講者のデータおよびアンケート調査（2024年4月〜2025年7月）を元に当社作成。eラーニングプラン単体の実績ではありません。</p>
          </div>
        </section>

        {/* ============ お悩み ============ */}
        <section className="el-sec el-sec--gray" id="issues">
          <div className="ct-about__head">
            <p className="el-micro">PROBLEM</p>
            <p className="ct-about__eyebrow">AI人材の育成で、こんなお悩みはありませんか？</p>
            <h2 className="ct-about__title">eラーニングで解決できること</h2>
          </div>
          <div className="el-issues">
            {ISSUES.map((it, i) => (
              <div className="el-issue" key={it.h}>
                <div className="el-issue__q">
                  <span className="el-issue__no">
                    お悩み<b>{String(i + 1).padStart(2, "0")}</b>
                  </span>
                  <div className="el-issue__img">
                    <img src={it.img} alt="" width={800} height={597} loading="lazy" />
                  </div>
                  <p className="el-issue__h" dangerouslySetInnerHTML={{ __html: it.h }} />
                  <p className="el-issue__d">{it.d}</p>
                </div>
                <div className="el-issue__a">
                  <p className="el-issue__key">
                    <span className="el-issue__label">解決策</span>
                    {it.key}
                  </p>
                  <p>{it.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ 特長（manebi のように悩み→解決を画像と交互に） ============ */}
        <section className="el-sec el-sec--to-special" id="features">
          <div className="ct-about__head">
            <p className="el-micro">FEATURE</p>
            <p className="ct-about__eyebrow">学ぶ社員も、学ばせる担当者もラクになる</p>
            <h2 className="ct-about__title">eラーニングの5つの特長</h2>
          </div>
          <div className="el-pillars">
            {/* 上に5つの目次カード（上3・下2） → 中央の縦線でつないで各特長の詳細（左右交互） */}
            <ul className="el-pillars__index">
              {FEATURES.map((f) => (
                <li key={f.no}>
                  <a href={`#feature-${f.no}`} className="el-pillars__card">
                    <span className="el-pillars__no" aria-hidden="true">{f.no}</span>
                    <span className="el-pillars__body">
                      <span className="el-pillars__point">POINT {Number(f.no)}<i>{f.en}</i></span>
                      <span className="el-pillars__name">{f.title}</span>
                    </span>
                    <span className="el-pillars__arrow" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            {FEATURES.map((f) => (
              <div className="el-pillar" id={`feature-${f.no}`} key={f.no}>
                <div className="el-pillar__body">
                  <div className="el-pillar__label">
                    <span className="el-pillar__num" aria-hidden="true">{f.no}</span>
                    <span className="el-pillar__label-text">
                      <span className="el-pillar__en">POINT {Number(f.no)} / {f.en}</span>
                      <span className="el-pillar__title">{f.title}</span>
                    </span>
                  </div>
                  <h3 className="el-feature__h">{f.h}</h3>
                  <ul className="el-pillar__checks">
                    {f.checks.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                  <ul className="el-pillar__tags">
                    {f.tags.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                </div>
                <FeatureVisual no={f.no} alt={f.alt} />
              </div>
            ))}
          </div>

        </section>

        {/* ============ AI機能（特長の延長。上端を下向きアローにして特長から続けて見せる。ローンチ時は全機能実装済みの前提なので「追加予定」表記はしない） ============ */}
        <section className="el-special" id="ai">
          <div className="el-special__inner">
            <div className="el-special__head">
              <p className="el-special__plus"><span>PLUS</span>5つの特長に加えて</p>
              <h2 className="el-special__title"><span>AI機能で、</span><span>学習も管理も</span><span>もっとラクに。</span></h2>
              <p className="el-special__lead">受講者には、質問から振り返りまでの学習の伴走を。研修管理者には、レポートから声かけ、メンバーごとの学習計画づくりまでのサポートを。<br className="el-pc" />AIが研修の「続かない」「見えない」を解消します。</p>
            </div>
            {/* 受講者向け／研修管理者向けをタブで切り替え（ラジオ＋CSSだけで切り替え、JSなし） */}
            <input className="el-ai__radio" type="radio" name="el-ai-tab" id="el-ai-tab-learner" defaultChecked />
            <input className="el-ai__radio" type="radio" name="el-ai-tab" id="el-ai-tab-admin" />
            <div className="el-ai__tabs">
              <label className="el-ai__tab el-ai__tab--learner" htmlFor="el-ai-tab-learner">
                <small>FOR LEARNERS</small><span><span>受講者が</span><span>うれしいAI機能</span></span>
              </label>
              <label className="el-ai__tab el-ai__tab--admin" htmlFor="el-ai-tab-admin">
                <small>FOR ADMINS</small><span><span>研修管理者が</span><span>うれしいAI機能</span></span>
              </label>
            </div>
            <div className="el-ai el-ai--learner">
              {AI_FEATURES.map((f) => (
                <div className={`el-ai__card el-ai__card--${f.key}${f.key === "chat" ? " el-ai__card--top" : ""}`} key={f.key}>
                  <p className="el-ai__en">{f.en}</p>
                  <h3 className="el-ai__h" dangerouslySetInnerHTML={{ __html: f.h }} />
                  <p className="el-ai__d">{f.d}</p>
                  <div className="el-ai__visual" aria-hidden="true">
                    <AiMock kind={f.key} />
                  </div>
                </div>
              ))}
            </div>
            <div className="el-ai el-ai--admin">
              {/* 管理者向け：週次レポートを上段に大きく、アラート・スキルマップ・講座提案を下段に（LMSで実装予定） */}
              <div className="el-ai__card el-ai__card--wide el-ai__card--report">
                <div className="el-ai__wide-text">
                  <p className="el-ai__en">AI Weekly Report</p>
                  <h3 className="el-ai__h"><span>受講者一人ひとりの学習を、</span><br /><span>AIが毎週レポート</span></h3>
                  <p className="el-ai__d">週に一度、参加メンバーの受講状況をAIがまとめてお届け。受講者ごとに「今週のサマリー」「改善点」「今後の伸びしろ」をレポートするので、声かけやフォローの判断にそのまま使えます。</p>
                  <ul className="el-ai__chips">
                    <li className="el-ai__chip">今週のサマリー</li>
                    <li className="el-ai__chip">改善点</li>
                    <li className="el-ai__chip">今後の伸びしろ</li>
                  </ul>
                </div>
                <div className="el-ai__visual el-ai__visual--wide" aria-hidden="true">
                  <div className="el-aim el-aim--report">
                    <p className="el-aim__bar">AI週次レポート｜11/4〜11/10</p>
                    <div className="el-aim__kpi">
                      <p><b>8<small>/10名</small></b>受講者</p>
                      <p><b>12.5<small>h</small></b>学習時間</p>
                      <p><b>14<small>本</small></b>修了</p>
                    </div>
                    <div className="el-aim__member">
                      <p className="el-aim__who"><span>佐</span>佐藤さん<small>営業部</small><em>2.4時間</em></p>
                      <dl className="el-aim__rep">
                        <div><dt>サマリー</dt><dd>提案資料のレッスンを3本修了。練習課題は82点で、構成づくりが安定してきました。</dd></div>
                        <div><dt>改善点</dt><dd>指示文が長くなりがち。目的と条件を先に書くと精度が上がります。</dd></div>
                        <div><dt>伸びしろ</dt><dd>Excelのデータ分析に進むと、週次報告の作成を自動化できます。</dd></div>
                      </dl>
                    </div>
                    <p className="el-aim__more"><span>鈴</span>鈴木さん<small>人事部</small><em>1.8時間</em></p>
                  </div>
                </div>
              </div>
              {ADMIN_AI_FEATURES.map((f) => (
                <div className={`el-ai__card el-ai__card--${f.key}`} key={f.key}>
                  <p className="el-ai__en">{f.en}</p>
                  <h3 className="el-ai__h" dangerouslySetInnerHTML={{ __html: f.h }} />
                  <p className="el-ai__d">{f.d}</p>
                  <div className="el-ai__visual" aria-hidden="true">
                    <AdminAiMock kind={f.key} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 受講者の声 ============ */}
        {/* TODO: 掲載許可のある実績がまだ無いため、声の本文はダミー（2026-11-13）。許可が取れたら VOICES を実際の声に差し替える。本番公開前に必須 */}
        <section className="el-sec" id="case">
          <div className="ct-about__head">
            <p className="el-micro">USER'S VOICE</p>
            <p className="ct-about__eyebrow">お客さまの声</p>
            <h2 className="ct-about__title">受講者の声</h2>
          </div>
          <div className="el-voice">
            <p className="el-voice__banner"><b>バイテックの研修</b>は、多くの企業にご好評いただいています！</p>
            <ul className="el-voice__people">
              {VOICES.map((v, i) => (
                <li key={v.tag} className={`el-voice__person el-voice__person--${i + 1}`}>
                  <p className="el-voice__tag">{v.tag}</p>
                  <p className="el-voice__bubble">{v.text.split("|").map((s) => <span key={s} className="el-voice__ph">{s}</span>)}</p>
                  <img className="el-voice__img" src={`/biz/assets/img/e-learning/voice-0${i + 1}.webp`} alt="" loading="lazy" width={v.w} height={560} />
                  <p className="el-voice__who">{v.who}</p>
                </li>
              ))}
            </ul>
            {/* 導入企業ロゴ（ファーストビュー下と同じ素材・逆向きに流す） */}
            <div className="el-voice__logos" aria-label="導入企業ロゴ">
              <p className="el-voice__logos-label">導入企業の一例</p>
              <div className="el-logos__viewport">
                <div className="el-logos__track el-logos__track--rev">
                  {[0, 1].map((loop) =>
                    CLIENT_LOGOS.map((l) => (
                      <div className="el-logos__item" key={`v-${loop}-${l.src}`} aria-hidden={loop === 1 ? true : undefined}>
                        <img src={`/biz/assets/img/logos/${l.src}.webp`} alt={loop === 0 ? l.alt : ""} width={966} height={402} loading="lazy" />
                      </div>
                    )),
                  )}
                </div>
              </div>
            </div>
            <div className="el-voice__score">
              <div className="el-voice__ring" aria-hidden="true">
                <span className="el-voice__ring-in"><small>研修満足度</small><b>96<i>%</i></b></span>
              </div>
              <div className="el-voice__score-txt">
                <p className="el-voice__score-title"><span>受講した方の<mark>96%</mark>が</span><br /><span>「満足」と回答しています</span></p>
                <dl className="el-voice__score-meta">
                  <div><dt>調査対象</dt><dd>バイテック法人AI研修の受講者</dd></div>
                  <div><dt>調査期間</dt><dd>2025年1月20日〜11月20日</dd></div>
                </dl>
              </div>
              <p className="el-voice__note">※ 受講者アンケート（当社調べ）。<br />※ 上記のお客さまの声はイメージです。</p>
            </div>
          </div>
        </section>

        <CtaBand />

        {/* ============ 料金 ============ */}
        {/* id="price" は course.css 側で max-width:900px が当たるため使わない */}
        <section className="el-sec el-sec--gray" id="fee">
          <div className="ct-about__head">
            <p className="el-micro">PRICE</p>
            <p className="ct-about__eyebrow">料金体系</p>
            <h2 className="ct-about__title">バイテックeラーニングの料金</h2>
          </div>
          <div className="el-formula">
            <ul className="el-formula__row">
              <li className="el-formula__box">導入費用</li>
              <li className="el-formula__op" aria-hidden="true" />
              <li className="el-formula__box">月額費用</li>
            </ul>
            <p className="el-formula__note">※全プログラムの見放題・専用LMSのアカウントは、月額費用に含まれます。</p>
          </div>
          <div className="el-price">
            <div className="el-price__main">
              <div className="el-price__glow" aria-hidden="true" />
              <p className="el-price__name">eラーニング</p>
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
                <li>5IDからご契約可</li>
                <li>最低契約期間 6ヶ月</li>
                <li>全プログラム見放題</li>
                <li>オンライン（専用LMS）</li>
              </ul>
              <p className="el-price__tax">※価格はすべて税抜です。ご契約は5ID・6ヶ月から承ります。ID数と期間に応じた総額は、お見積りにてご提示します。</p>
            </div>
            <div className="el-price__inc">
              <p className="el-price__inc-h">料金に含まれるもの</p>
              <ul className="el-price__inc-list">
                {INCLUDED.map((t) => (
                  <li key={t.h}>
                    <img className="el-price__ico" src={`/biz/assets/img/e-learning/inc-${t.icon}.svg`} alt="" width={96} height={96} loading="lazy" />
                    <p className="el-price__inc-t">{t.h}</p>
                    <p className="el-price__inc-d">{t.d}</p>
                  </li>
                ))}
              </ul>
              <div className="el-price__ctas">
                <a className="el-price__sim" href="/estimate">
                  <span>
                    <small>受講人数を入れるだけ</small>
                    見積もりを試算する
                  </span>
                  <span className="el-price__sim-arrow" aria-hidden="true" />
                </a>
                <a className="el-price__sim el-price__sim--trial" href={TRIAL_HREF}>
                  <span>
                    <small>使い心地を確かめる</small>
                    無料トライアルで試す
                  </span>
                  <span className="el-price__sim-arrow" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* 助成金：人材開発支援助成金（人への投資促進コース）定額制訓練。
              数値は令和8年度の労働局案内（大阪労働局 定額制訓練案内・神奈川労働局 令和8年4月8日改正資料）に基づく。
              試算は 10ID×12か月・税抜。制度は令和8年度が最終年度の見込みのため、年度が変わったら必ず見直すこと */}
          <div className="el-grant" id="grant">
            <div className="el-grant__head">
              <p className="el-grant__eyebrow">助成金でさらにおトクに</p>
              <h3 className="el-grant__title">
                サブスク型の研修が対象の<br className="el-pc" />
                <em>「定額制訓練」</em>で、費用の<b>最大75%</b>を助成
              </h3>
              <p className="el-grant__lead">
                バイテックのeラーニングは、人材開発支援助成金（人への投資促進コース）の「定額制訓練」の対象です。導入費用と月額費用の両方が助成の対象になります。
              </p>
            </div>

            <div className="el-grant__grid">
              {/* 助成率 */}
              <div className="el-grant__card">
                <p className="el-grant__card-h">助成率</p>
                <table className="el-grant__rate">
                  <thead>
                    <tr><th /><th>通常</th><th>賃金要件などを満たす場合</th></tr>
                  </thead>
                  <tbody>
                    <tr><th>中小企業</th><td><b>60</b>%</td><td className="is-up"><b>75</b>%</td></tr>
                    <tr><th>大企業</th><td><b>45</b>%</td><td className="is-up"><b>60</b>%</td></tr>
                  </tbody>
                </table>
                <p className="el-grant__small">※賃金要件：訓練終了後1年以内に賃金を5%以上引き上げる等。1事業所あたり年度2,500万円が上限です。</p>
              </div>

              {/* 試算 */}
              <div className="el-grant__card el-grant__card--sim">
                <p className="el-grant__card-h">試算例<small>中小企業・10ID・12か月</small></p>
                <dl className="el-grant__sim">
                  <div><dt>ご利用料金</dt><dd><b>457,600</b>円</dd></div>
                  <div className="is-minus"><dt>助成額（60%）</dt><dd>−<b>274,560</b>円</dd></div>
                  <div className="is-total"><dt>実質負担</dt><dd><b>183,040</b>円</dd></div>
                </dl>
                <p className="el-grant__per">1IDあたり 実質 月<b>約1,525</b>円</p>
                <p className="el-grant__small">※導入費用100,000円＋月額2,980円×10ID×12か月（税抜）で試算。賃金要件などを満たす場合（75%）は実質114,400円（1IDあたり月約953円）。</p>
              </div>

              {/* 主な要件 */}
              <div className="el-grant__card">
                <p className="el-grant__card-h">主な要件</p>
                <ul className="el-grant__reqs">
                  <li>雇用保険に加入している従業員が対象</li>
                  <li>受講者1人あたり<b>10時間以上</b>の受講</li>
                  <li>労働時間内の受講であること</li>
                  <li>計画届は契約開始の<b>1か月前まで</b></li>
                  <li>訓練終了後<b>2か月以内</b>に支給申請</li>
                </ul>
                <p className="el-grant__small">申請に必要な「受講時間が10時間以上の受講者の一覧」は、バイテックが発行します。</p>
              </div>
            </div>

            <div className="el-grant__foot">
              <p className="el-grant__notice">
                <span className="el-grant__notice-tag">ご注意</span>
                人への投資促進コースは、2026年度（令和8年度）が最終年度となる見込みです。計画届は契約開始の1か月前までに提出が必要なため、お早めにご検討ください。
              </p>
            </div>
            <p className="el-grant__src">※令和8年度の制度内容（厚生労働省・都道府県労働局の案内）をもとに作成。支給の可否・金額は労働局の審査によります。最新の要件は厚生労働省の人材開発支援助成金のページでご確認ください。</p>
          </div>

          {/* ステップアップ：伴走付きプラン（助成金対応）との比較。2026-11-13 ユーザー指示で一旦非表示 */}
          {SHOW_STEP_COMPARE && (
          <div className="el-step">
            <p className="ct-bubble">さらに実践まで進めるなら</p>
            <h3 className="el-step__title">ハンズオン付きプランなら、1on1で業務での実践まで進められます</h3>
            <div className="el-compare" role="table" aria-label="eラーニングとハンズオン付きプランの比較">
              <div className="el-compare__row el-compare__row--head" role="row">
                <span role="columnheader" />
                <span role="columnheader"><small className="el-compare__kind">セルフ学習</small>eラーニング</span>
                <span role="columnheader" className="is-feature"><em className="el-compare__badge">助成金対象</em><small className="el-compare__kind">eラーニング＋ハンズオン（1on1）</small>AI業務効率化研修</span>
              </div>
              <div className="el-compare__row el-compare__row--price" role="row">
                <span role="rowheader">料金</span>
                <span role="cell"><small>導入</small><strong>100,000</strong>円＋<small>月額</small><strong>2,980</strong>円／ID<small>（税抜）</small></span>
                <span role="cell" className="is-feature"><strong>200,000</strong>円〜／名</span>
              </div>
              <div className="el-compare__row" role="row">
                <span role="rowheader">助成金</span>
                <span role="cell">定額制訓練の対象<small>（中小企業60〜75%）</small></span>
                <span role="cell" className="is-feature"><b>実質<strong>50,000</strong>円／名</b><small>（中小企業の場合）</small></span>
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
                <span role="cell">自分の業務での活用・定着</span>
                <span role="cell" className="is-feature">AI活用推進者の育成</span>
              </div>
            </div>
            <p className="el-step__links">
              <a href="/grant">助成金の対象か診断する<span aria-hidden="true" /></a>
              <Link href="/#course" prefetch={false}>AI業務効率化研修・自動化研修を見る<span aria-hidden="true" /></Link>
            </p>
          </div>
          )}

          {/* 商談なしで進めたい人向けの直行導線（manebi の「すぐに利用開始したい方へ」を参考に） */}
          <div className="el-direct">
            <div className="el-direct__body">
              <p className="el-direct__label">すぐに試したい方へ</p>
              <p className="el-direct__title">
                商談なし、<em>Webだけで無料トライアル</em>
              </p>
              <ul className="el-direct__chips">
                <li>入力は1ページ</li>
                <li>商談・営業対応なし</li>
                <li>審査後にメールでご案内</li>
              </ul>
              <p className="el-direct__note">
                お見積りやプランのご相談が必要な場合は、<a href="/counseling">無料個別相談</a>から承ります。
              </p>
            </div>
            <div className="el-direct__action">
              <div className="el-direct__visual">
                <Devices />
              </div>
              <a className="el-direct__btn" href={TRIAL_HREF}>
                <span className="el-direct__badge">入力は1ページで完了</span>
                無料トライアルを申し込む
                <span className="el-direct__arrow" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* ============ プログラム一覧 ============ */}
        <section className="el-sec" id="programs">
          <div className="ct-about__head">
            <p className="el-micro">PROGRAM</p>
            <p className="ct-about__eyebrow">1000本以上のAI講座が全て見放題</p>
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
          <div className="el-prac">
            <div className="el-prac__head">
              <p className="el-prac__en">PRACTICE</p>
              <h3 className="el-prac__title">業種・部門・階層別実践講座</h3>
              <p className="el-prac__lead">ツールの使い方を覚えたら、次は自分の仕事で。業種・部門・階層ごとのよくある業務を題材に、そのまま使える活用法を学べます。</p>
            </div>
            <div className="el-prac__tabs" role="tablist">
              {PRACTICE_TABS.map((t, i) => (
                <button key={t.key} type="button" role="tab" className={`el-prac__tab${i === 0 ? " is-active" : ""}`} data-tab={t.key} aria-selected={i === 0 ? "true" : "false"}>
                  {t.label}
                </button>
              ))}
            </div>
            {PRACTICE_TABS.map((t, i) => (
              <ul key={t.key} className="el-prac__panel" data-tab={t.key} role="tabpanel" hidden={i !== 0}>
                {t.items.map((it) => (
                  <li key={it.name} className="el-prac__item">
                    <p className="el-prac__name">{it.name}<span>追加予定</span></p>
                    <ul className="el-prac__lessons">
                      {it.lessons.map((l) => <li key={l}>{l}</li>)}
                    </ul>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div className="el-upcoming">
            <div className="el-upcoming__bar">
              <p className="el-upcoming__head">
                <span className="el-upcoming__badge">COMING SOON</span>
                追加予定のプログラム
              </p>
              <div className="el-upcoming__nav">
                <button type="button" className="el-upcoming__btn el-upcoming__btn--prev" aria-label="前へ" disabled />
                <button type="button" className="el-upcoming__btn el-upcoming__btn--next" aria-label="次へ" />
              </div>
            </div>
            <div className="el-upcoming__track">
              {UPCOMING.map((u) => (
                <div key={u.key} className="el-program el-program--soon" style={{ ["--el-accent" as string]: u.color }}>
                  <span className="el-program__logo">
                    {"logo" in u ? <img src={u.logo} alt="" loading="lazy" /> : <span className="el-program__mark">{u.mark}</span>}
                    <span className="el-program__soon">追加予定</span>
                  </span>
                  <span className="el-program__name">{u.name}</span>
                  <span className="el-program__desc">{u.desc}</span>
                  <span className="el-program__tags">
                    {u.tags.map((t) => <span key={t}>{t}</span>)}
                  </span>
                  <span className="el-program__meta">
                    <span>全{u.lessons}レッスン（予定）</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="el-note">※レッスン数・視聴時間は各研修ページの記載時点のものです。追加予定のプログラムは公開時期・内容が変わる場合があります。</p>
        </section>

        <CtaBand />

        {/* ============ 受講開始までの3ステップ ============ */}
        <section className="el-sec" id="flow">
          <div className="ct-about__head">
            <p className="el-micro">FLOW</p>
            <p className="ct-about__eyebrow">商談なし、Webだけで始められる</p>
            <h2 className="ct-about__title">受講開始までの3ステップ</h2>
          </div>
          <ol className="el-steps">
            {FLOW.map((f, i) => (
              <li className="el-steps__item" key={f.no}>
                <span className="el-steps__bg" aria-hidden="true" />
                <p className="el-steps__top">
                  <span className="el-steps__num">{i + 1}</span>
                  <span className="el-steps__ttl">
                    <span className="el-steps__en">STEP {i + 1} / {f.en}</span>
                    <span className="el-steps__h">{f.h}</span>
                  </span>
                </p>
                <p className="el-steps__d">{f.d}</p>
                {i === 0 && (
                  <a className="el-steps__btn" href={APPLY_HREF}>
                    Webで申し込む
                    <span aria-hidden="true" />
                  </a>
                )}
                <img className="el-steps__img" src={`/biz/assets/img/e-learning/step-${f.no}.webp`} alt="" width={f.imgW} height={360} loading="lazy" />
              </li>
            ))}
          </ol>
          <div className="el-next">
            <p className="el-next__label">まずは無料で</p>
            <p className="el-next__text">
              申し込む前に、無料トライアルで講座の内容や学習画面を確かめられます。
            </p>
            <a className="el-next__btn" href={TRIAL_HREF}>
              無料トライアルを試す
              <span aria-hidden="true" />
            </a>
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
            <div className="el-faq">
              {FAQ_GROUPS.map((g) => (
                <div className="el-faq__group" id={`faq-${g.id}`} key={g.id}>
                  <p className="el-faq__head">
                    <span className="el-faq__en">{g.en}</span>
                    {g.label}
                  </p>
                  <div className="index_faq__list">
                    {FAQS.filter((f) => f.cat === g.id).map((f) => (
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
                </div>
              ))}
            </div>
            <a className="index_faq__all index_faq__all--sp" href="/faq">
              <span className="index_faq__all-ico" aria-hidden="true" />
              よくある質問一覧を見る
            </a>
          </div>
        </section>

        {/* ============ フッター上のCTA ============ */}
        <CtaBand final />
      </main>

      {/* 画面右端に縦書きで固定する資料DL・無料トライアルのタブ（PCのみ） */}
      <nav className="el-side" aria-label="お申し込み">
        <a className="el-side__tab el-side__tab--doc" href={DOC_HREF}>
          <span className="el-side__ico el-side__ico--doc" aria-hidden="true" />
          <span className="el-side__label">資料ダウンロード</span>
        </a>
        <a className="el-side__tab el-side__tab--trial" href={TRIAL_HREF}>
          <span className="el-side__ico el-side__ico--trial" aria-hidden="true" />
          <span className="el-side__label">無料トライアル</span>
        </a>
      </nav>
      <script dangerouslySetInnerHTML={{ __html: HEADER_LOGO_SCRIPT }} />
      <script dangerouslySetInnerHTML={{ __html: SIDE_CTA_SCRIPT }} />
      <script dangerouslySetInnerHTML={{ __html: PAGENAV_STUCK_SCRIPT }} />
      <script dangerouslySetInnerHTML={{ __html: UPCOMING_SLIDER_SCRIPT }} />
      <script dangerouslySetInnerHTML={{ __html: PRACTICE_TABS_SCRIPT }} />
      <script dangerouslySetInnerHTML={{ __html: FAQ_SCRIPT }} />

      <BizFooter />
    </>
  );
}
