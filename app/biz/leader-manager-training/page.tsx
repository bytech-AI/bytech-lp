import { CourseLp, type CourseData } from "../_course/CourseLp";
import { COURSE_FAQS } from "../_course/courseFaqs";
import { buildCourseMetadata } from "../_course/courseMetadata";

// 料金・助成金・研修後サポートが未確定のため noindex。courses.ts と sitemap にも未登録。
export const metadata = {
  ...buildCourseMetadata({
    title: "リーダー・マネージャー向けAI研修｜バイテック法人AI研修",
    description:
      "計画立案から部下の育成まで、実案件でAIを使ってチームを前に進める力を身につける管理職向けの法人研修。Gemini、Microsoft Copilot、ChatGPT、Claudeに対応。",
    socialDescription:
      "計画立案から部下の育成まで、実案件でAIを使ってチームを前に進める力を身につける管理職向けの法人研修。",
    path: "/leader-manager-training",
  }),
  robots: "noindex",
};

const course: CourseData = {
  slug: "leader-manager-training",
  courseName: "リーダー・マネージャー向けAI研修",
  hero: {
    background:
      "radial-gradient(120% 90% at 88% 108%, rgba(150, 190, 245, .45) 0%, rgba(150, 190, 245, 0) 55%), linear-gradient(118deg, #10295f 0%, #204aa8 42%, #3a70cf 62%, #173a8a 100%)",
    eyebrow: "管理職がAIを使いこなし、部下の育成まで進めたい組織・チームにおすすめ。",
    title: <>リーダー・マネージャー<br />向けAI研修</>,
    tag: "オンライン",
    toolLabel: "研修内使用ツール",
    toolLogo: "/biz/assets/img/index/plan/logo/gemini-icon.webp",
    toolLogoW: 108,
    toolLogoH: 108,
    toolAlt: "Gemini",
    extraTools: [
      { logo: "/biz/assets/img/index/plan/logo/copilot.webp", alt: "Microsoft Copilot", w: 160, h: 160 },
      { logo: "/biz/assets/img/index/plan/logo/chatgpt-icon.webp", alt: "ChatGPT", w: 160, h: 160 },
      { logo: "/biz/assets/img/index/plan/logo/claude-icon.svg", alt: "Claude", w: 319, h: 319 },
    ],
    visual: "/biz/assets/img/index/plan/graphic/leader-manager.webp",
    visualW: 1032,
    visualH: 585,
    visualAlt: "計画立案からチームの育成までAIを活用するイメージ",
    longTitle: true,
  },
  docHref: "/doc-a",
  about: {
    title: <span style={{ wordBreak: "keep-all" }}>リーダー・マネージャー<wbr />向けAI研修とは？</span>,
    subLead: (
      <>
        AIを計画立案と人材育成に活かし、<br />
        <span className="ct-about__mark">チームを前に進める力</span>を身につける
      </>
    ),
    lead: "中期計画の数値分析、戦略立案、施策検討などの実案件でAIを使い、複数回のやり取りからエージェント作成まで段階的に習得。部下の育成やマネジメントにも活かせる状態を目指す、管理職向けの法人研修です。",
    cards: [
      {
        no: "01",
        h: "AI活用の全体像を\n5段階でつかむ",
        thumb: "/biz/assets/img/course/about/leader-manager-01.webp",
        d: "1回の指示から複数回のやり取り、エージェント、業務の自動化まで、できることを実演で確認。自部署の業務をどこまでAIに任せるか、判断軸が身につきます。",
      },
      {
        no: "02",
        h: "計画と戦略を\n実案件で仕上げる",
        thumb: "/biz/assets/img/course/about/leader-manager-02.webp",
        d: "自部門の数値分析、中期計画のシナリオ比較、市場調査、施策の優先順位付けを実案件で実践。AIの出力を検証し、経営に説明できる形まで仕上げます。",
      },
      {
        no: "03",
        h: "エージェント作成から\n部下の育成までつなげる",
        thumb: "/biz/assets/img/course/about/leader-manager-03.webp",
        d: "部署の定型業務を任せるエージェントを作成。AI成果物の見方やAI依存への対応も学び、自分だけでなくチーム全体の活用を広げられます。",
      },
    ],
  },
  spec: [
    { ja: "視聴時間", value: <>約<b>5</b>時間</> },
    { ja: "レッスン数", value: <>全<b>35</b>レッスン</> },
    { ja: "受講形式", value: <>オンライン（ワークショップ全<b>3</b>回）</> },
    { ja: "使用ツール", value: <>自社のAIツールに合わせて選択</> },
  ],
  recommend: {
    sub: "管理職のAI活用を実案件で進め、チームと組織の成果につなげられる状態へ",
    nowrapSub: true,
    cards: [
      {
        h: "AI活用が簡単な作業で止まっている組織",
        d: "メール作成や要約には使えていても、複数回のやり取りや自動化が進まない組織に。何ができるかを整理し、次の段階へ進む道筋を示します。",
      },
      {
        h: "計画や戦略の検討にAIを活かしたい管理職",
        d: "中期計画、数値分析、施策検討など、管理職の判断業務で使いたい組織に。AIの出力を検証しながら検討を深める方法を習得します。",
      },
      {
        h: "部下のAI活用を指導できる管理職を育てたい組織",
        d: "成果物の確認やAI依存への対応に不安がある組織に。AI成果物の見方、1on1、目標設定への反映まで学べます。",
      },
      {
        h: "自社の環境に合わせて研修したい組織",
        d: "Google Workspace、Microsoft 365など、使えるツールが決まっている組織に。契約や管理者設定に合わせて、手順や課題を調整します。",
      },
    ],
  },
  curriculum: {
    sub: (
      <>
        管理職のAI活用を成果につなげるための<br />
        <em>『3つのステップ』</em>
      </>
    ),
    steps: [
      {
        no: "STEP01",
        label: "AI活用の全体理解",
        cards: [
          {
            no: "01",
            cat: "現在地・全体像",
            thumb: "/biz/assets/img/course/curriculum/leader-manager/ui-01.webp",
            h: "AI活用の5段階と自部署の現在地",
            tags: ["#現在地の診断", "#5段階", "#エージェント"],
            d: "自分とチームの活用状況を診断し、AI活用の5段階を実演で理解。エージェントと自動化の違いや、任せる仕事と任せない仕事の判断軸を身につけます。",
          },
          {
            no: "02",
            cat: "多往復の進め方",
            thumb: "/biz/assets/img/course/curriculum/leader-manager/ui-02.webp",
            h: "複数回のやり取りで仕事を進める方法",
            tags: ["#指示の出し方", "#作業の分解", "#反論"],
            d: "目的・前提・制約の渡し方、作業の分解、反論のさせ方を習得。資料を持たせた専用の相談役も作り、実案件を多往復で仕上げます。",
          },
        ],
      },
      {
        no: "STEP02",
        label: "管理職業務での活用",
        cards: [
          {
            no: "03",
            cat: "数値分析・中期計画",
            thumb: "/biz/assets/img/course/curriculum/leader-manager/ui-03.webp",
            h: "実績分析から3シナリオの計画作成まで",
            tags: ["#要因分解", "#シナリオ比較", "#感度分析"],
            d: "実績の要因分解、前提の整理、3シナリオの比較、感度分析、検算までを実践。前提を明示し、人が判断できる計画案を作ります。",
          },
          {
            no: "04",
            cat: "戦略立案・施策検討",
            thumb: "/biz/assets/img/course/curriculum/leader-manager/ui-04.webp",
            h: "調査から経営への提案まで",
            tags: ["#市場調査", "#仮説検証", "#優先順位"],
            d: "市場・競合調査、仮説の検証、反対意見の洗い出し、優先順位付けを通して実践。数字の根拠を説明できる提案に仕上げます。",
          },
          {
            no: "05",
            cat: "業務設計・エージェント",
            thumb: "/biz/assets/img/course/curriculum/leader-manager/ui-05.webp",
            h: "業務の見直しとエージェント作成",
            tags: ["#業務棚卸し", "#ノーコード", "#定期実行"],
            d: "業務を棚卸しし、自動化の対象と人が確認する点を決定。ノーコードで部署のエージェントを作り、週次レポートなどの定期実行まで進めます。",
          },
        ],
      },
      {
        no: "STEP03",
        label: "組織への定着",
        cards: [
          {
            no: "06",
            cat: "部下の育成",
            thumb: "/biz/assets/img/course/curriculum/leader-manager/ui-06.webp",
            h: "AI成果物の見方と育成の進め方",
            tags: ["#AI成果物の確認", "#AI依存対策", "#1on1"],
            d: "AI成果物の見方、依存やスキル格差への対応、リーダー育成、1on1への活かし方を習得。部下の考える力を落とさずに活用を広げます。",
          },
          {
            no: "07",
            cat: "ルール・効果測定",
            thumb: "/biz/assets/img/course/curriculum/leader-manager/ui-07.webp",
            h: "利用ルール、効果測定、経営への報告",
            tags: ["#利用ルール", "#効果測定", "#90日計画"],
            d: "入力してよい情報、承認の流れ、効果の測り方を整理。研修後の行動を90日の計画に落とし、一過性で終わらせません。",
          },
        ],
      },
    ],
  },
  lessons: {
    learnHours: "5",
    timeLabel: "視聴時間",
    chapterCount: 8,
    lessonCount: 35,
    items: [
      {
        no: 1,
        title: "管理職の役割と研修ゴール設定",
        ch: 3,
        time: null,
        body: [
          "なぜ今、管理職がAIを学ぶのか – 使う側から判断する側へ",
          "自社の現状を読み解く – 活用が進む業務と止まる業務",
          "現在地を診断する – 自分とチーム、5段階のどこにいるか",
        ],
      },
      {
        no: 2,
        title: "何ができるかを知る｜AI活用の5段階",
        ch: 4,
        time: null,
        body: [
          "AI活用の5段階 – 1回の指示から自動化まで",
          "実演：1つの案件を5段階で進める",
          "エージェントと自動化の違い – チャット、相談役、定期実行の見分け方",
          "任せる仕事と任せない仕事 – 誤りの影響と機密から判断する",
        ],
      },
      {
        no: 3,
        title: "多往復で仕事を進める｜壁打ちと専用の相談役",
        ch: 4,
        time: null,
        body: [
          "目的・前提・制約の渡し方",
          "作業を分解して進める – 論点整理、たたき台、修正",
          "AIに反論させる – 見落としの洗い出しと当初案との比較",
          "資料を持たせる – 部署専用の相談役を作る",
        ],
      },
      {
        no: 4,
        title: "数値分析と中期計画｜前提を決めて人が判断する",
        ch: 5,
        time: null,
        body: [
          "実績の要因分解 – 売上・利益の増減を切り分ける",
          "前提の置き方 – 根拠と確度の整理",
          "3つのシナリオを作る – 標準・強気・弱気の比較",
          "感度分析 – 結果を最も動かす前提を見つける",
          "数字を検算する – 元データとの照合、相関と因果の区別",
        ],
      },
      {
        no: 5,
        title: "戦略立案と施策検討｜調査から経営への提案まで",
        ch: 5,
        time: null,
        body: [
          "市場・競合調査 – 出典と情報の新しさを確認する",
          "仮説の検証 – 裏付けと反証を集める",
          "反対意見の洗い出し – 経営、現場、顧客の立場から",
          "実行順の決定 – 効果、費用、難易度の比較",
          "経営への提案 – 構成、想定問答、数字の根拠",
        ],
      },
      {
        no: 6,
        title: "業務を設計し直す｜部署のエージェントを作る",
        ch: 5,
        time: null,
        body: [
          "業務の棚卸し – 頻度と手間の把握",
          "自動化の判断基準 – 定型度、誤りの影響、効果",
          "人が確認する点の設計 – 承認と責任の所在",
          "実践：ノーコードでエージェントを作る",
          "実践：週次レポートを定期実行で動かす",
        ],
      },
      {
        no: 7,
        title: "部下の育成｜AI時代のマネジメント",
        ch: 5,
        time: null,
        body: [
          "AI成果物の見方 – 根拠、数字、前提の確認と指摘の仕方",
          "AI依存への対応 – 自分で考える工程の残し方",
          "スキル格差への対応 – メンバーの段階の把握",
          "リーダーを育てる – 任せる範囲と教え方",
          "1on1と目標設定 – AI活用の目標への反映",
        ],
      },
      {
        no: 8,
        title: "組織に定着させる｜ルールと効果測定",
        ch: 4,
        time: null,
        body: [
          "利用ルール – 入力してよい情報、著作権、禁止事項",
          "承認の流れ – 外部公開や送信前の確認",
          "効果測定 – 削減時間、品質、活用率の測り方",
          "経営への報告 – 成果の示し方と90日計画の作成",
        ],
      },
    ],
  },
  environment: {
    title: "使えるAIツールに合わせて、研修内容を最適化",
    sub: "研修のテーマは共通のまま、手順と課題を貴社の契約や管理者設定に合わせて調整します。",
    cards: [
      {
        h: "Google Workspace中心の組織",
        d: "Geminiを中心に、DriveやGmailの資料を使った活用を学びます。共有設定の注意点や、Workspace Studioでのエージェント作成も扱います。",
      },
      {
        h: "Microsoft 365中心の組織",
        d: "Copilot Chatのみと、Microsoft 365 Copilot契約ありでできることが異なります。契約に合わせて、手順と課題を差し替えます。",
      },
      {
        h: "ChatGPT・Claudeを導入している組織",
        d: "社内資料との接続先や実行場所を確認したうえで、導入済みのプランで使える機能を中心に学びます。",
      },
      {
        h: "複数のツールを使える組織",
        d: "主に使うツールを決めて学び、調査や検討の課題では2つのツールを比較します。機密情報のルールと使い分けも整理します。",
      },
    ],
  },
  addon: {
    title: "エージェントを作り込みたい方向けの追加コース",
    sub: "チャプター6の修了後に、部署のエージェントを設計から運用まで通して作ります。",
    learnHours: "3",
    timeLabel: "視聴時間",
    items: [
      {
        no: 1,
        title: "何を作るかを決める",
        ch: 2,
        time: null,
        body: ["候補業務の選び方", "作る業務を決める – 効果と失敗時の影響"],
      },
      {
        no: 2,
        title: "指示を設計する",
        ch: 3,
        time: null,
        body: ["目的と入出力を決める", "手順と判断基準を書く", "やらないことを決める – 人へ戻す条件"],
      },
      {
        no: 3,
        title: "資料を持たせる",
        ch: 3,
        time: null,
        body: ["資料の選び方と整理", "更新と閲覧権限", "出典を示させる"],
      },
      {
        no: 4,
        title: "ツールとつなぐ",
        ch: 3,
        time: null,
        body: ["連携先を決める – メール、予定表、ファイル、チャット", "読み取りと書き込みを分ける", "送信前の承認を入れる"],
      },
      {
        no: 5,
        title: "定期実行で動かす",
        ch: 3,
        time: null,
        body: ["起動条件を決める", "複数の手順を組み立てる", "失敗に気づける形にする"],
      },
      {
        no: 6,
        title: "試して直す",
        ch: 3,
        time: null,
        body: ["テスト例を作る", "良否の基準を決める", "誤りを記録して直す"],
      },
      {
        no: 7,
        title: "部署で運用する",
        ch: 3,
        time: null,
        body: ["共有範囲と担当者", "説明書と停止手順", "費用と効果を測る"],
      },
    ],
  },
  noPlans: true,
  noSubsidy: true,
  courseModes: ["Online"],
  faqs: COURSE_FAQS["leader-manager-training"],
};

export default function LeaderManagerTrainingPage() {
  return <CourseLp data={course} />;
}
