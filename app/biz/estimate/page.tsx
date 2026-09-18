import { COURSES } from "../_course/courses";

// 見積もりシミュレーター（SmartHR pricing/form 風のステップ式フォーム）。
// 1画面1設問で進み、最後にformrunへ送信するリード獲得フォーム。
// counseling / doc-a と同方式：サーバーコンポーネント＋インラインstyle、
// フォームHTMLは dangerouslySetInnerHTML（React管理外）、JSはネイティブ<script>
// （next/scriptはNext16でinline評価が壊れ未実行になるため不使用）。

// POST先はformrun（doc-aと同方式の直接POST）。class / action / method はformrun指定のため変更不可。
// バリデーションは自前ウィザードで完結するため formrun.js SDK は読み込まない。
// 送信後はformrun側の完了画面へ遷移する（管理画面のリダイレクト先を /estimate/thanks に設定すること）。
const ESTIMATE_ACTION = "https://form.run/api/v1/r/x4332ymk27jj5z0fd8z7fu4t";

// 研修形式と単価。eラーニングは受講者1名あたり、他形式は1回あたりの価格。
// AI効率化研修・AI自動化研修以外は助成金対象外。
const PLANS = [
  { name: "eラーニング", unit: 100000, billingUnit: "名", subsidized: null, subsidyEligible: false },
  { name: "セミナー", unit: 200000, billingUnit: "回", subsidized: null, subsidyEligible: false },
  { name: "ハンズオン", unit: 300000, billingUnit: "回", subsidized: null, subsidyEligible: false },
  { name: "ワークショップ", unit: 500000, billingUnit: "回", subsidized: null, subsidyEligible: false },
  { name: "AI効率化研修", unit: 200000, billingUnit: "名", subsidized: 50000, subsidyEligible: true },
  { name: "AI自動化研修", unit: 300000, billingUnit: "名", subsidized: 150000, subsidyEligible: true },
] as const;

const fmt = (n: number) => n.toLocaleString("ja-JP");
// ステップ定義（1問1画面）。result はプログレス100%の結果画面。
const STEP_COUNT = 8;

const courseCards = [
  ...COURSES.map(
    (c) => `
    <button type="button" class="es-opt es-opt--course" data-group="course" data-value="${c.name}" onclick="esPick(this)">
      <span class="es-opt__logo"><img src="${c.logo}" alt="" loading="lazy"></span>
      <span class="es-opt__name">${c.name}</span>
      <span class="es-opt__check" aria-hidden="true"></span>
    </button>`,
  ),
  `
    <button type="button" class="es-opt es-opt--course es-opt--undecided" data-group="course" data-value="未定・相談して決めたい" onclick="esPick(this)">
      <span class="es-opt__name">未定・相談して決めたい</span>
      <span class="es-opt__check" aria-hidden="true"></span>
    </button>`,
].join("");

const planCards = [
  ...PLANS.map(
    (p) => `
    <button type="button" class="es-opt es-opt--plan" data-group="plan" data-value="${p.name}" onclick="esPick(this)">
      <span class="es-opt__name"><span>${p.name}</span>${p.subsidyEligible ? '<span class="es-subsidy-tag">助成金対応</span>' : ""}</span>
      <span class="es-opt__price">${fmt(p.unit)}<small>円〜／${p.billingUnit}</small></span>
      <span class="es-opt__check" aria-hidden="true"></span>
    </button>`,
  ),
  `
    <button type="button" class="es-opt es-opt--plan es-opt--undecided" data-group="plan" data-value="未定・相談して決めたい" onclick="esPick(this)">
      <span class="es-opt__name">未定・相談して決めたい</span>
      <span class="es-opt__check" aria-hidden="true"></span>
    </button>`,
].join("");

const radioCards = (group: string, values: string[]) =>
  values
    .map(
      (v) => `
    <button type="button" class="es-opt" data-group="${group}" data-value="${v}" onclick="esPick(this)">
      <span class="es-opt__name">${v}</span>
      <span class="es-opt__check" aria-hidden="true"></span>
    </button>`,
    )
    .join("");

// 吹き出し付きの設問パネル（SmartHRのオペレーター吹き出しを踏襲）
// アバターはインラインSVGだと .biz-root *{all:revert} のリセットで描画が壊れるため、
// CSSの影響を受けない data URI の <img> にする。
const AVATAR_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Ccircle cx='24' cy='24' r='24' fill='%231a6fb5'/%3E%3Ccircle cx='24' cy='19' r='7.5' fill='%23fff'/%3E%3Cpath d='M10 40c1.8-7.2 7.5-10.5 14-10.5S36.2 32.8 38 40' stroke='%23fff' stroke-width='4' stroke-linecap='round' fill='none'/%3E%3C/svg%3E";

const bubble = (text: string) => `
  <div class="es-bubble">
    <img class="es-avatar" src="${AVATAR_SVG}" alt="" aria-hidden="true">
    <p class="es-bubble__text">${text}</p>
  </div>`;

const FORM_HTML = `
<form class="formrun es-form" action="${ESTIMATE_ACTION}" method="post" id="esForm">

  <div class="es-panel active" data-step="1">
    ${bubble("ご検討中の研修コースをお選びください。まだ決まっていない場合は「未定・相談して決めたい」で大丈夫です。")}
    <p class="es-q">ご興味のある研修コース<span class="es-req">必須</span></p>
    <div class="es-grid es-grid--course">${courseCards}</div>
    <div class="es-err" id="esErr1">研修コースを選択してください</div>
  </div>

  <div class="es-panel" data-step="2">
    ${bubble("ご希望の研修形式をお選びください。形式の詳しい違いは、担当より個別にご案内できます。")}
    <p class="es-q">研修形式<span class="es-req">必須</span></p>
    <div class="es-grid es-grid--plan">${planCards}</div>
    <div class="es-err" id="esErr2">研修形式を選択してください</div>
  </div>

  <div class="es-panel" data-step="3">
    ${bubble("受講を想定されている人数を教えてください。だいたいの人数で大丈夫です。")}
    <p class="es-q">受講予定人数<span class="es-req">必須</span></p>
    <div class="es-people">
      <button type="button" class="es-people__btn" onclick="esPeople(-1)" aria-label="人数を減らす">−</button>
      <div class="es-people__box"><input type="text" inputmode="numeric" id="esPeopleInput" value="10" onchange="esPeopleInput()">名</div>
      <button type="button" class="es-people__btn" onclick="esPeople(1)" aria-label="人数を増やす">＋</button>
    </div>
    <div class="es-chips">
      <button type="button" class="es-chip" onclick="esPeopleSet(5)">5名</button>
      <button type="button" class="es-chip" onclick="esPeopleSet(10)">10名</button>
      <button type="button" class="es-chip" onclick="esPeopleSet(20)">20名</button>
      <button type="button" class="es-chip" onclick="esPeopleSet(30)">30名</button>
      <button type="button" class="es-chip" onclick="esPeopleSet(50)">50名</button>
      <button type="button" class="es-chip" onclick="esPeopleSet(100)">100名</button>
    </div>
    <div class="es-err" id="esErr3">1名以上の人数を入力してください</div>
  </div>

  <div class="es-panel" data-step="4">
    ${bubble("助成金を活用すると、研修費用の実質負担を大きく抑えられる場合があります（最大75%OFF）。")}
    <p class="es-q">助成金の活用<span class="es-req">必須</span></p>
    <div class="es-grid es-grid--v">${radioCards("subsidy", ["活用したい", "詳しく知りたい", "活用しない"])}</div>
    <p class="es-subsidy-notice" id="esSubsidyNotice" role="status">この研修形式は助成金の対象外です。見積もりには「対象外」として反映します。</p>
    <div class="es-err" id="esErr4">1つ選択してください</div>
  </div>

  <div class="es-panel" data-step="5">
    ${bubble("研修の導入を検討されている時期を教えてください。")}
    <p class="es-q">導入検討時期<span class="es-req">必須</span></p>
    <div class="es-grid es-grid--v">${radioCards("timing", ["1ヶ月以内", "3ヶ月以内", "半年以内", "時期未定・情報収集中"])}</div>
    <div class="es-err" id="esErr5">1つ選択してください</div>
  </div>

  <div class="es-panel" data-step="6">
    ${bubble("あと少しです。会社名とお名前をご入力ください。")}
    <div class="es-field">
      <label class="es-label" for="esCompany">会社名<span class="es-req">必須</span></label>
      <input class="es-input" type="text" id="esCompany" name="会社名" placeholder="例：株式会社バイテック" autocomplete="organization">
    </div>
    <div class="es-field">
      <label class="es-label" for="esName">お名前<span class="es-req">必須</span></label>
      <input class="es-input" type="text" id="esName" name="お名前" placeholder="例：山田 太郎" autocomplete="name">
    </div>
    <div class="es-err" id="esErr6">会社名・お名前を入力してください</div>
  </div>

  <div class="es-panel" data-step="7">
    ${bubble("お見積り結果のご案内に必要な連絡先をご入力ください。")}
    <div class="es-field">
      <label class="es-label" for="esEmail">メールアドレス<span class="es-req">必須</span></label>
      <input class="es-input" type="text" id="esEmail" name="メールアドレス" placeholder="例：taro@example.com" autocomplete="email" inputmode="email">
    </div>
    <div class="es-field">
      <label class="es-label" for="esPhone">電話番号<span class="es-req">必須</span><span class="es-hint">※ハイフンなしで入力ください</span></label>
      <input class="es-input" type="tel" id="esPhone" name="電話番号" placeholder="例：09012345678" autocomplete="tel" inputmode="tel">
    </div>
    <div class="es-err" id="esErr7">メールアドレス・電話番号を正しく入力してください</div>
    <div class="es-err" id="esErrFree">フリーメールはご利用いただけません。会社のメールアドレスをご入力ください。</div>
  </div>

  <div class="es-panel" data-step="8">
    ${bubble("送信後、選択内容に合わせた正式なお見積もりをメールでご案内します。")}
    <div class="es-result">
      <p class="es-result__label">お見積もりについて</p>
      <p class="es-result__message">内容を確認のうえ、担当よりメールにてご連絡します。</p>
    </div>
    <dl class="es-summary" id="esSummary"></dl>
    <p class="es-note">※研修内容や人数、カリキュラムのカスタマイズにより費用は変動します。助成金の適用可否・金額は企業規模や条件により異なります。</p>
    <!-- 選択内容の隠しフィールド。個別フィールドはformrun管理画面で同名登録が必要（未登録だと通知に載らない・doc-aと同様）。
         「お問い合わせ」はフォーム既定の必須項目のため、未登録でも全内容が届くよう選択内容のまとめを入れる。 -->
    <input type="hidden" name="研修コース" id="esHidCourse">
    <input type="hidden" name="研修形式" id="esHidPlan">
    <input type="hidden" name="受講人数" id="esHidPeople">
    <input type="hidden" name="助成金" id="esHidSubsidy">
    <input type="hidden" name="導入時期" id="esHidTiming">
    <input type="hidden" name="概算見積もり" id="esHidPrice">
    <input type="hidden" name="お問い合わせ" id="esHidInquiry">
    <!-- 同意チェックボックス相当。UI上は「送信をもって同意」の文言で担保（doc-aと同基準） -->
    <input type="hidden" name="個人情報利用同意" value="on">
    <div class="_formrun_gotcha" aria-hidden="true" style="position:absolute;height:1px;width:1px;overflow:hidden;">
      <input type="text" name="_formrun_gotcha" tabindex="-1" autocomplete="off">
    </div>
    <button class="es-submit" type="submit" id="esSubmit"><span id="esSubmitLabel">この内容で正式見積もりを依頼する</span></button>
    <p class="es-consent">フォームの送信をもって<a href="/privacy-policy/" target="_blank" rel="noopener">プライバシーポリシー</a>に同意したものとします。</p>
    <p class="es-alt">じっくり相談しながら決めたい方は<a href="/counseling">無料相談のご予約</a>もご利用いただけます。</p>
  </div>

</form>`;

export default function EstimatePage() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        body {
          margin: 0;
          padding: 0;
          background: #f4f6f9;
          color: #333;
          font-family: var(--font-noto-jp), "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif;
        }
        .es-header {
          background: #fff;
          border-bottom: 1px solid #e8ecf1;
        }
        .es-header__inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 14px 24px;
        }
        /* ロゴSVGは白色のためdoc-aと同じフィルターでネイビーに落とす */
        .es-header__inner img {
          height: 26px;
          display: block;
          filter: brightness(0) saturate(100%) invert(15%) sepia(30%) saturate(1500%) hue-rotate(190deg) brightness(90%);
        }
        .es-main {
          max-width: 760px;
          margin: 0 auto;
          /* 下部固定バーに隠れないよう余白を確保 */
          padding: 40px 20px 140px;
        }
        .es-card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 16px rgba(22, 32, 46, .06);
          padding: 40px 48px 48px;
        }
        .es-title {
          margin: 0 0 28px;
          font-size: 26px;
          font-weight: 800;
          letter-spacing: .02em;
          color: #16202e;
        }
        .es-bubble {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 28px;
        }
        .es-avatar { flex: 0 0 48px; width: 48px; height: 48px; display: block; }
        .es-bubble__text {
          position: relative;
          margin: 0;
          padding: 14px 18px;
          background: #fff;
          border: 1px solid #dde4ec;
          border-radius: 8px;
          font-size: 14px;
          line-height: 1.8;
          font-weight: 600;
          color: #333;
        }
        .es-bubble__text:before {
          content: "";
          position: absolute;
          left: -7px;
          top: 18px;
          width: 12px;
          height: 12px;
          background: #fff;
          border-left: 1px solid #dde4ec;
          border-bottom: 1px solid #dde4ec;
          transform: rotate(45deg);
        }
        .es-panel { display: none; }
        .es-panel.active { display: block; animation: esIn .3s ease; }
        @keyframes esIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .es-q {
          margin: 0 0 14px;
          font-size: 15px;
          font-weight: 700;
          color: #4a5568;
        }
        .es-req {
          display: inline-block;
          margin-left: 8px;
          padding: 2px 7px;
          background: #d7443e;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          border-radius: 3px;
          vertical-align: 1px;
        }
        .es-hint { margin-left: 10px; font-size: 12px; font-weight: 500; color: #8a93a3; }
        .es-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .es-grid--v { grid-template-columns: 1fr; max-width: 420px; }
        .es-opt {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px 44px 15px 16px;
          background: #f8fafc;
          border: 2px solid #e3e9f0;
          border-radius: 8px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          color: #26364a;
          text-align: left;
          cursor: pointer;
          transition: border-color .15s ease, background .15s ease;
        }
        .es-opt:hover { border-color: #9ec7e8; background: #fff; }
        .es-opt.selected { border-color: #1a6fb5; background: #eef5fc; }
        .es-opt__logo { display: flex; align-items: center; justify-content: center; flex: 0 0 34px; height: 26px; }
        .es-opt__logo img { max-width: 34px; max-height: 26px; width: auto; height: auto; }
        .es-opt__name { flex: 1; line-height: 1.5; }
        .es-opt--plan { flex-direction: column; align-items: flex-start; gap: 6px; }
        .es-opt--plan .es-opt__name { display: flex; align-items: center; flex-wrap: wrap; gap: 7px; }
        .es-subsidy-tag { display: inline-flex; align-items: center; padding: 2px 6px; border-radius: 3px; background: #e5f3e9; color: #19733a; font-size: 10px; font-weight: 800; line-height: 1.4; }
        .es-opt__price { color: #1a6fb5; font-size: 20px; font-weight: 800; }
        .es-opt__price small { margin-left: 2px; font-size: 12px; font-weight: 700; color: #687386; }
        .es-opt--undecided { justify-content: center; text-align: center; color: #687386; }
        .es-opt--undecided .es-opt__name { flex: none; }
        .es-opt__check {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          border: 2px solid #cbd6e2;
          border-radius: 50%;
          background: #fff;
        }
        .es-opt.selected .es-opt__check {
          border-color: #1a6fb5;
          background: #1a6fb5 center/60% no-repeat url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 10'%3E%3Cpath d='M1 5l3.5 3.5L11 1' stroke='%23fff' stroke-width='2.2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        }
        .es-people { display: flex; align-items: center; justify-content: center; gap: 18px; margin: 8px 0 18px; }
        .es-people__btn {
          width: 48px;
          height: 48px;
          border: 2px solid #dde4ec;
          border-radius: 50%;
          background: #fff;
          font-size: 22px;
          font-weight: 700;
          color: #1a6fb5;
          cursor: pointer;
          transition: border-color .15s ease;
        }
        .es-people__btn:hover { border-color: #1a6fb5; }
        .es-people__box { display: flex; align-items: baseline; gap: 6px; font-size: 18px; font-weight: 700; color: #4a5568; }
        .es-people__box input {
          width: 110px;
          padding: 10px 0;
          border: 2px solid #e3e9f0;
          border-radius: 8px;
          background: #f8fafc;
          font-family: inherit;
          font-size: 28px;
          font-weight: 800;
          color: #16202e;
          text-align: center;
        }
        .es-people__box input:focus { outline: none; border-color: #1a6fb5; background: #fff; }
        .es-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
        .es-chip {
          padding: 8px 16px;
          border: 1px solid #dde4ec;
          border-radius: 30px;
          background: #fff;
          font-family: inherit;
          font-size: 13px;
          font-weight: 700;
          color: #4a5568;
          cursor: pointer;
          transition: border-color .15s ease, color .15s ease;
        }
        .es-chip:hover { border-color: #1a6fb5; color: #1a6fb5; }
        .es-field { margin-bottom: 20px; }
        .es-label { display: block; margin-bottom: 8px; font-size: 14px; font-weight: 700; color: #4a5568; }
        .es-input {
          width: 100%;
          box-sizing: border-box;
          padding: 13px 14px;
          border: 2px solid #e3e9f0;
          border-radius: 8px;
          background: #f8fafc;
          font-family: inherit;
          font-size: 15px;
          color: #16202e;
        }
        .es-input:focus { outline: none; border-color: #1a6fb5; background: #fff; }
        .es-input.es-input--ng { border-color: #d7443e; background: #fdf3f2; }
        .es-err { display: none; margin-top: 12px; color: #d7443e; font-size: 13px; font-weight: 700; }
        .es-err.show { display: block; }
        .es-result {
          margin-bottom: 22px;
          padding: 26px 24px;
          background: linear-gradient(135deg, #eef5fc, #f6fafd);
          border: 1px solid #cfe2f2;
          border-radius: 10px;
          text-align: center;
        }
        .es-result__label { margin: 0 0 6px; font-size: 13px; font-weight: 700; letter-spacing: .08em; color: #2e599b; }
        .es-result__price { margin: 0; font-size: 34px; font-weight: 800; color: #16202e; }
        .es-result__price small { font-size: 16px; font-weight: 700; margin-left: 2px; }
        .es-result__subsidy { margin: 10px 0 0; font-size: 14px; font-weight: 700; color: #d7443e; }
        .es-result__subsidy:empty { display: none; }
        .es-result__message { margin: 12px auto 0; max-width: 520px; color: #314b68; font-size: 17px; font-weight: 700; line-height: 1.8; }
        .es-subsidy-notice { display: none; margin: 16px 0 0; padding: 12px 14px; border-radius: 6px; background: #fff7e8; color: #8a5600; font-size: 13px; font-weight: 700; line-height: 1.7; }
        .es-subsidy-notice.show { display: block; }
        .es-panel--subsidy-unavailable .es-grid { display: none; }
        .es-summary {
          margin: 0 0 18px;
          padding: 4px 0;
          border-top: 1px solid #e8ecf1;
        }
        .es-summary > div {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding: 11px 4px;
          border-bottom: 1px solid #e8ecf1;
          font-size: 14px;
        }
        .es-summary dt { margin: 0; color: #687386; font-weight: 600; }
        .es-summary dd { margin: 0; color: #16202e; font-weight: 700; text-align: right; }
        .es-note { margin: 0 0 26px; font-size: 12px; line-height: 1.9; color: #8a93a3; }
        .es-submit {
          display: block;
          width: 100%;
          padding: 17px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #1a6fb5, #2a9fd6);
          color: #fff;
          font-family: inherit;
          font-size: 16px;
          font-weight: 800;
          letter-spacing: .04em;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(26, 111, 181, .3);
          transition: opacity .15s ease;
        }
        .es-submit:hover { opacity: .9; }
        .es-submit:disabled { opacity: .6; cursor: default; }
        .es-consent { margin: 14px 0 0; font-size: 12px; color: #8a93a3; text-align: center; }
        .es-consent a { color: #1a6fb5; }
        .es-alt { margin: 20px 0 0; font-size: 13px; font-weight: 600; color: #4a5568; text-align: center; }
        .es-alt a { color: #1a6fb5; font-weight: 700; }
        .es-bar {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 10;
          background: #fff;
          border-top: 1px solid #e8ecf1;
          box-shadow: 0 -4px 16px rgba(22, 32, 46, .05);
        }
        .es-bar__inner {
          display: flex;
          align-items: center;
          gap: 20px;
          max-width: 860px;
          margin: 0 auto;
          padding: 16px 24px;
        }
        .es-bar__back {
          flex: 0 0 auto;
          padding: 13px 22px;
          border: 2px solid #dde4ec;
          border-radius: 8px;
          background: #fff;
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          color: #687386;
          cursor: pointer;
          visibility: hidden;
        }
        .es-bar__back.show { visibility: visible; }
        .es-bar__back:hover { border-color: #9ec7e8; }
        .es-progress { flex: 1; display: flex; align-items: center; gap: 14px; }
        .es-progress__track { flex: 1; height: 8px; background: #e8ecf1; border-radius: 8px; overflow: hidden; }
        .es-progress__fill { height: 100%; width: 0; background: linear-gradient(90deg, #1a6fb5, #2a9fd6); border-radius: 8px; transition: width .3s ease; }
        .es-progress__pct { flex: 0 0 auto; min-width: 42px; font-size: 14px; font-weight: 800; color: #4a5568; font-variant-numeric: tabular-nums; }
        .es-bar__next {
          flex: 0 0 auto;
          padding: 13px 34px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #1a6fb5, #2a9fd6);
          color: #fff;
          font-family: inherit;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: .04em;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(26, 111, 181, .3);
          transition: opacity .15s ease;
        }
        .es-bar__next:hover { opacity: .9; }
        .es-bar__next:disabled { background: #b7c2cf; box-shadow: none; cursor: not-allowed; opacity: 1; }
        .es-bar__next:disabled:hover { opacity: 1; }
        .es-bar__next.hide { display: none; }
        @media (max-width: 640px) {
          .es-main { padding: 20px 14px 130px; }
          .es-card { padding: 24px 18px 32px; border-radius: 8px; }
          .es-title { font-size: 20px; margin-bottom: 20px; }
          .es-grid { grid-template-columns: 1fr; }
          .es-bubble { gap: 10px; margin-bottom: 20px; }
          .es-avatar { flex-basis: 40px; width: 40px; height: 40px; }
          .es-bubble__text { font-size: 13px; padding: 12px 14px; }
          .es-result__price { font-size: 27px; }
          .es-bar__inner { gap: 12px; padding: 12px 14px; }
          .es-bar__back { padding: 12px 16px; }
          .es-bar__next { padding: 12px 22px; font-size: 14px; }
          .es-progress__pct { min-width: 36px; font-size: 13px; }
        }
      `,
        }}
      />

      <header className="es-header">
        <div className="es-header__inner">
          <a href="/">
            <img src="/biz/assets/img/wp/グループ-16110.svg" alt="バイテック法人AI研修" />
          </a>
        </div>
      </header>

      <main className="es-main">
        <div className="es-card">
          <h1 className="es-title">AI研修 見積もりシミュレーター</h1>
          {/* フォーム本体はReact管理外（doc-a / counseling と同方式でハイドレーション競合を回避） */}
          <div dangerouslySetInnerHTML={{ __html: FORM_HTML }} />
        </div>
      </main>

      {/* 下部固定バー。インラインJSが書き換えるためReact管理外にして
          ハイドレーション不一致（dev警告・ノード差し替えによるリスナー消失）を防ぐ */}
      <div
        dangerouslySetInnerHTML={{
          __html: `
      <div class="es-bar">
        <div class="es-bar__inner">
          <button type="button" class="es-bar__back" id="esBack">戻る</button>
          <div class="es-progress">
            <div class="es-progress__track"><div class="es-progress__fill" id="esFill"></div></div>
            <span class="es-progress__pct" id="esPct">0%</span>
          </div>
          <button type="button" class="es-bar__next" id="esNext" disabled>次へ進む</button>
        </div>
      </div>`,
        }}
      />

      {/* ウィザード制御・概算計算 — ネイティブ<script>（next/script不使用） */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            `(function(){
  var PLAN_CONF=` +
            JSON.stringify(
              Object.fromEntries(
                PLANS.map((p) => [
                  p.name,
                  {
                    unit: p.unit,
                    billingUnit: p.billingUnit,
                    subsidized: p.subsidized,
                    subsidyEligible: p.subsidyEligible,
                  },
                ]),
              ),
            ) +
            `;
  var TOTAL=${STEP_COUNT};
  var step=1;
  var state={course:'',plan:'',subsidy:'',timing:''};

  function $(id){return document.getElementById(id);}
  function panels(){return [].slice.call(document.querySelectorAll('.es-panel'));}
  function fmt(n){return n.toLocaleString('ja-JP');}

  function hideErr(n){var e=$('esErr'+n);if(e)e.classList.remove('show');}
  function showErr(n){var e=$('esErr'+n);if(e)e.classList.add('show');}

  function isStepComplete(n){
    if(n===1)return !!state.course;
    if(n===2)return !!state.plan;
    if(n===3)return peopleVal()>=1;
    if(n===4)return !!state.subsidy;
    if(n===5)return !!state.timing;
    if(n===6)return !!$('esCompany').value.trim()&&!!$('esName').value.trim();
    if(n===7){
      var em=$('esEmail').value.trim(),ph=$('esPhone').value.replace(/-/g,'').trim();
      return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(em)&&!isFree(em)&&/^0\\d{9,10}$/.test(ph);
    }
    return true;
  }
  function updateNextState(){
    var next=$('esNext');
    if(next)next.disabled=!isStepComplete(step);
  }

  function syncSubsidyEligibility(){
    var conf=PLAN_CONF[state.plan];
    var unavailable=!!conf&&!conf.subsidyEligible;
    var panel=document.querySelector('.es-panel[data-step="4"]');
    var notice=$('esSubsidyNotice');
    if(panel)panel.classList[unavailable?'add':'remove']('es-panel--subsidy-unavailable');
    if(notice)notice.classList[unavailable?'add':'remove']('show');
    if(unavailable){
      state.subsidy='対象外（選択した研修形式は助成金対象外）';
      [].slice.call(document.querySelectorAll('.es-opt[data-group="subsidy"]')).forEach(function(o){o.classList.remove('selected');});
      hideErr(4);
    }else if(state.subsidy.indexOf('対象外')===0){
      state.subsidy='';
    }
  }

  window.esPick=function(el){
    var group=el.getAttribute('data-group');
    state[group]=el.getAttribute('data-value');
    [].slice.call(document.querySelectorAll('.es-opt[data-group="'+group+'"]')).forEach(function(o){o.classList.remove('selected');});
    el.classList.add('selected');
    if(group==='plan')syncSubsidyEligibility();
    hideErr(step);
    updateNextState();
  };

  function peopleVal(){
    var v=parseInt(($('esPeopleInput').value||'').replace(/[^0-9]/g,''),10);
    return isNaN(v)?0:v;
  }
  window.esPeople=function(d){
    var v=Math.max(1,peopleVal()+d);
    $('esPeopleInput').value=v;
    hideErr(3);
    updateNextState();
  };
  window.esPeopleSet=function(v){
    $('esPeopleInput').value=v;
    hideErr(3);
    updateNextState();
  };
  window.esPeopleInput=function(){
    var v=peopleVal();
    if(v>0){$('esPeopleInput').value=v;hideErr(3);}
    updateNextState();
  };

  /* doc-a と同基準のフリーメール拒否（会社メール限定） */
  var FREE=['gmail.com','googlemail.com','yahoo.co.jp','yahoo.com','ymail.com','hotmail.com','hotmail.co.jp','outlook.com','outlook.jp','outlook.co.jp','live.jp','live.com','msn.com','icloud.com','me.com','mac.com','aol.com','excite.co.jp','nifty.com','so-net.ne.jp','ocn.ne.jp','docomo.ne.jp','ezweb.ne.jp','au.com','softbank.ne.jp','i.softbank.jp','ybb.ne.jp','goo.jp','biglobe.ne.jp','plala.or.jp','dion.ne.jp','hi-ho.ne.jp','infoseek.jp','protonmail.com','proton.me','zoho.com','gmx.com','mail.com','fastmail.com'];
  function isFree(v){var m=/@([^@\\s]+)$/.exec((v||'').trim().toLowerCase());return !!m&&FREE.indexOf(m[1])!==-1;}
  function mark(el,ng){el.classList[ng?'add':'remove']('es-input--ng');}

  function validate(n){
    if(n===1){if(!state.course){showErr(1);return false;}return true;}
    if(n===2){if(!state.plan){showErr(2);return false;}return true;}
    if(n===3){if(peopleVal()<1){showErr(3);return false;}return true;}
    if(n===4){if(!state.subsidy){showErr(4);return false;}return true;}
    if(n===5){if(!state.timing){showErr(5);return false;}return true;}
    if(n===6){
      var c=$('esCompany'),nm=$('esName');
      var okC=!!c.value.trim(),okN=!!nm.value.trim();
      mark(c,!okC);mark(nm,!okN);
      if(!okC||!okN){showErr(6);return false;}
      return true;
    }
    if(n===7){
      var em=$('esEmail'),ph=$('esPhone');
      var okE=/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(em.value.trim());
      var okP=/^0\\d{9,10}$/.test(ph.value.replace(/-/g,'').trim());
      var free=okE&&isFree(em.value);
      mark(em,!okE||free);mark(ph,!okP);
      $('esErrFree').classList[free?'add':'remove']('show');
      if(!okE||!okP){showErr(7);return false;}
      if(free)return false;
      hideErr(7);
      return true;
    }
    return true;
  }

  function calc(){
    var p=peopleVal();
    var conf=PLAN_CONF[state.plan];
    var priceText='',priceHtml='',subsidyText='';
    if(conf){
      var total=conf.unit*(conf.billingUnit==='名'?p:1);
      priceHtml=fmt(total)+'<small>円〜</small>';
      priceText=fmt(total)+'円〜';
      if(!conf.subsidyEligible){
        subsidyText='この研修形式は助成金の対象外です';
      }else if(state.subsidy!=='活用しない'){
        if(conf.subsidized){
          subsidyText='助成金活用時の実質負担額：'+fmt(conf.subsidized*p)+'円〜';
        }else{
          subsidyText='助成金適用後の金額は条件により異なるため、個別にご案内します';
        }
      }
    }else{
      priceHtml='個別お見積もり';
      priceText='個別お見積もり（研修形式未定）';
      subsidyText='助成金の適用可否・金額は研修形式により異なります';
    }
    var rows=[
      ['研修コース',state.course],
      ['研修形式',state.plan],
      ['受講予定人数',p+'名'],
      ['助成金の活用',state.subsidy],
      ['導入検討時期',state.timing]
    ];
    $('esSummary').innerHTML=rows.map(function(r){
      return '<div><dt>'+r[0]+'</dt><dd>'+r[1]+'</dd></div>';
    }).join('');
    $('esHidCourse').value=state.course;
    $('esHidPlan').value=state.plan;
    $('esHidPeople').value=p+'名';
    $('esHidSubsidy').value=state.subsidy;
    $('esHidTiming').value=state.timing;
    $('esHidPrice').value=priceText+(subsidyText?'／'+subsidyText:'');
    /* 会社名・電話番号はformrun側に未登録の可能性があるため、登録済みの「お問い合わせ」にも全項目をまとめて入れる */
    $('esHidInquiry').value='【見積もりシミュレーター】\\n会社名：'+$('esCompany').value.trim()+'\\n電話番号：'+$('esPhone').value.trim()+'\\n'+rows.map(function(r){return r[0]+'：'+r[1];}).join('\\n')+'\\n概算見積もり：'+priceText+(subsidyText?'（'+subsidyText+'）':'');
  }

  function render(){
    panels().forEach(function(pn){
      pn.classList[parseInt(pn.getAttribute('data-step'),10)===step?'add':'remove']('active');
    });
    var pct=Math.round((step-1)/(TOTAL-1)*100);
    $('esFill').style.width=pct+'%';
    $('esPct').textContent=pct+'%';
    $('esBack').classList[step>1?'add':'remove']('show');
    var next=$('esNext');
    next.classList[step>=TOTAL?'add':'remove']('hide');
    next.textContent=(step===TOTAL-1)?'見積もり結果を見る':'次へ進む';
    updateNextState();
    window.scrollTo({top:0,behavior:'smooth'});
  }

  ['esPeopleInput','esCompany','esName','esEmail','esPhone'].forEach(function(id){
    $(id).addEventListener('input',updateNextState);
  });

  $('esNext').addEventListener('click',function(){
    if(!validate(step))return;
    if(step<TOTAL){
      step++;
      if(step===TOTAL)calc();
      render();
    }
  });
  $('esBack').addEventListener('click',function(){
    if(step>1){step--;render();}
  });

  /* Enterで次へ（IME変換確定は無視）。送信ステップ以外はEnter送信を抑止 */
  $('esForm').addEventListener('keydown',function(e){
    if(e.key==='Enter'&&!e.isComposing&&e.keyCode!==229){
      var t=e.target;
      if(t.tagName==='INPUT'&&step<TOTAL){
        e.preventDefault();
        $('esNext').click();
      }
    }
  });

  /* 送信時の最終ガード＋二重送信防止 */
  $('esForm').addEventListener('submit',function(e){
    for(var i=1;i<TOTAL;i++){
      if(!validate(i)){e.preventDefault();step=i;render();return;}
    }
    var b=$('esSubmit');
    b.disabled=true;
    $('esSubmitLabel').textContent='送信中...';
  });

  /* 初期表示はサーバーHTMLがstep1の状態そのものなので初回render()は呼ばない
     （hydration前のDOM書き換えはReactの不一致警告になる） */
})();`,
        }}
      />
    </>
  );
}
