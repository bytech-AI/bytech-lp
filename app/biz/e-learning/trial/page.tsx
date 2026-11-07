import Link from "next/link";
import { BizFooter, BizHeader } from "../../_chrome/BizChrome";
import { COURSES } from "../../_course/courses";
import { buildCourseMetadata } from "../../_course/courseMetadata";
import "../../_course/course.css";
import "../e-learning.css";
import "./trial.css";

// eラーニング無料トライアルの申込ページ。
// フォームは formrun SDK の自前フォーム（/doc-a・/counseling と同方式。class/action/method は formrun 指定のため変更不可）。
// React管理外(dangerouslySetInnerHTML)にして SDK とハイドレーションの競合を避ける。
// ※ formrun 管理画面でトライアル用フォームを作り、TRIAL_FORM_ACTION を差し替えること。
//   完了後のリダイレクト先は /e-learning/trial/thanks に設定する。
const TRIAL_FORM_ACTION = "https://form.run/api/v1/r/REPLACE_WITH_TRIAL_FORM_ID";

export const metadata = {
  ...buildCourseMetadata({
    title: "eラーニング 無料トライアルのお申し込み｜バイテック法人AI研修",
    description:
      "法人向けAI研修eラーニングの無料トライアルお申し込みページです。ChatGPT・Gemini・Copilot・Claudeなど全プログラムのレッスン動画と学習管理画面をお試しいただけます。",
    socialDescription: "法人向けAI研修eラーニングの無料トライアルお申し込みページです。",
    path: "/e-learning/trial",
  }),
  // 申込フォームのため検索結果には出さない
  robots: "noindex",
};

const PROGRAM_OPTIONS = COURSES.map((c) => c.name.replace(/研修$/, ""));

const POINTS = [
  { h: "全プログラムを体験", d: "ChatGPT・Gemini・Copilot・Claudeなど、すべてのプログラムのレッスン動画をご覧いただけます。" },
  { h: "管理画面も確認できる", d: "受講者の進捗を確認する学習管理画面の使い勝手も、導入前にお確かめいただけます。" },
  { h: "担当者がご案内", d: "お申し込み後、担当者からトライアルの開始方法をメールでご案内します。" },
];

const FORM_HTML = `
<form class="formrun tr-form" action="${TRIAL_FORM_ACTION}" method="post">
  <input type="hidden" name="申込種別" value="eラーニング無料トライアル">
  <div class="tr-field">
    <label class="tr-label">企業名<span class="tr-req">必須</span></label>
    <input class="tr-input" type="text" name="企業名" placeholder="株式会社バイテック" data-formrun-required>
    <div class="tr-error" data-formrun-show-if-error="企業名">企業名を入力してください</div>
  </div>
  <div class="tr-row">
    <div class="tr-field">
      <label class="tr-label">お名前<span class="tr-req">必須</span></label>
      <input class="tr-input" type="text" name="お名前" placeholder="山田 太郎" data-formrun-required>
      <div class="tr-error" data-formrun-show-if-error="お名前">お名前を入力してください</div>
    </div>
    <div class="tr-field">
      <label class="tr-label">部署名<span class="tr-opt">任意</span></label>
      <input class="tr-input" type="text" name="部署名" placeholder="人事部">
    </div>
  </div>
  <div class="tr-field">
    <label class="tr-label">役職<span class="tr-req">必須</span></label>
    <select class="tr-input" name="役職" data-formrun-required>
      <option value="" disabled selected>選択してください</option>
      <option>経営者・役員</option>
      <option>部長・課長／マネージャー</option>
      <option>一般社員／スタッフ</option>
      <option>契約・嘱託・派遣</option>
    </select>
    <div class="tr-error" data-formrun-show-if-error="役職">役職を選択してください</div>
  </div>
  <div class="tr-row">
    <div class="tr-field">
      <label class="tr-label">メールアドレス<span class="tr-req">必須</span></label>
      <input class="tr-input" type="text" name="メールアドレス" placeholder="mail@example.com" data-formrun-type="email" data-formrun-required>
      <div class="tr-error" data-formrun-show-if-error="メールアドレス">メールアドレスを正しく入力してください</div>
      <div class="tr-error tr-error--free" style="display:none;">フリーメールはご利用いただけません。会社のメールアドレスをご入力ください。</div>
    </div>
    <div class="tr-field">
      <label class="tr-label">電話番号<span class="tr-req">必須</span></label>
      <input class="tr-input" type="tel" name="電話番号" placeholder="0312345678" data-formrun-required>
      <div class="tr-error" data-formrun-show-if-error="電話番号">電話番号を入力してください</div>
    </div>
  </div>
  <div class="tr-field">
    <label class="tr-label">導入を検討しているID数<span class="tr-req">必須</span></label>
    <div class="tr-chips">
      ${["10〜29ID", "30〜49ID", "50〜99ID", "100ID以上", "未定"]
        .map((v, i) => `<label class="tr-chip"><input type="radio" name="検討ID数" value="${v}"${i === 0 ? " data-formrun-required" : ""}><span>${v}</span></label>`)
        .join("")}
    </div>
    <div class="tr-error" data-formrun-show-if-error="検討ID数">選択してください</div>
  </div>
  <div class="tr-field">
    <label class="tr-label">特に試したいプログラム<span class="tr-opt">任意・複数選択可</span></label>
    <div class="tr-chips">
      ${PROGRAM_OPTIONS.map((v) => `<label class="tr-chip"><input type="checkbox" name="試したいプログラム" value="${v}"><span>${v}</span></label>`).join("")}
    </div>
  </div>
  <div class="tr-field">
    <label class="tr-label">ご質問・ご要望<span class="tr-opt">任意</span></label>
    <textarea class="tr-input tr-textarea" name="ご質問・ご要望" rows="4" placeholder="導入時期や受講対象者など、気になる点があればご記入ください"></textarea>
  </div>
  <div class="_formrun_gotcha" aria-hidden="true" style="position:absolute;height:1px;width:1px;overflow:hidden;">
    <input type="text" name="_formrun_gotcha" tabindex="-1" autocomplete="off">
  </div>
  <button class="tr-submit" type="submit" data-formrun-error-text="未入力の項目があります" data-formrun-submitting-text="送信中...">無料トライアルを申し込む<span class="tr-submit__ico" aria-hidden="true"></span></button>
  <p class="tr-consent">フォームの送信をもって<a href="/privacy-policy/" target="_blank" rel="noopener">プライバシーポリシー</a>に同意したものとします。</p>
</form>
`;

// フリーメール拒否（会社メール限定・/doc-a と同じリスト）
const FREE_MAIL_SCRIPT = `(function(){
  function init(){
    var form=document.querySelector('form.formrun'); if(!form) return setTimeout(init,120);
    var FREE=['gmail.com','googlemail.com','yahoo.co.jp','yahoo.com','ymail.com','hotmail.com','hotmail.co.jp','outlook.com','outlook.jp','outlook.co.jp','live.jp','live.com','msn.com','icloud.com','me.com','mac.com','aol.com','excite.co.jp','nifty.com','so-net.ne.jp','ocn.ne.jp','docomo.ne.jp','ezweb.ne.jp','au.com','softbank.ne.jp','i.softbank.jp','ybb.ne.jp','goo.jp','biglobe.ne.jp','plala.or.jp','dion.ne.jp','hi-ho.ne.jp','infoseek.jp','protonmail.com','proton.me','zoho.com','gmx.com','mail.com','fastmail.com'];
    var email=form.querySelector('[name="メールアドレス"]'), err=form.querySelector('.tr-error--free');
    function isFree(v){ var m=/@([^@\\s]+)$/.exec((v||'').trim().toLowerCase()); return !!m && FREE.indexOf(m[1])!==-1; }
    function check(){ var bad=email.value.indexOf('@')>0 && isFree(email.value); err.style.display=bad?'block':'none'; return bad; }
    email.addEventListener('blur',check);
    email.addEventListener('input',function(){ if(err.style.display==='block') check(); });
    form.addEventListener('submit',function(e){ if(isFree(email.value)){ e.preventDefault(); e.stopImmediatePropagation(); check(); email.focus(); } }, true);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();`;

// formrun.js が広告ブロッカー等で読めない時だけネイティブの required を付ける（/doc-a と同じフォールバック）
const REQUIRED_FALLBACK_SCRIPT = `(function(){
  function alive(){return !!(window.Formrun&&window.Formrun._formViews&&window.Formrun._formViews.length);}
  function apply(){
    if(alive())return;
    var els=document.querySelectorAll('form.formrun [data-formrun-required]');
    for(var i=0;i<els.length;i++){var el=els[i]; el.required=true;
      if(el.tagName==='INPUT'&&el.type==='text'&&(el.getAttribute('data-formrun-type')||'').indexOf('email')>-1)el.type='email';}
  }
  window.addEventListener('error',function(e){var t=e.target;if(t&&t.tagName==='SCRIPT'&&/sdk\\.form\\.run/.test(t.src||''))apply();},true);
  if(document.readyState==='complete')apply();else window.addEventListener('load',apply);
})();`;

export default function ELearningTrialPage() {
  return (
    <>
      <BizHeader docHref="/doc-e" />

      <main className="ct-page tr-page">
        <div className="tr-inner">
          <nav className="ct-breadcrumb tr-breadcrumb" aria-label="パンくず">
            <Link href="/" prefetch={false}>トップ</Link>
            <span>›</span>
            <Link href="/e-learning" prefetch={false}>eラーニング</Link>
            <span>›</span>
            <span>無料トライアル</span>
          </nav>

          <div className="tr-grid">
            <div className="tr-intro">
              <p className="tr-eyebrow">FREE TRIAL</p>
              <h1 className="tr-title">
                eラーニング<br />
                無料トライアル
              </h1>
              <p className="tr-lead">
                導入前に、レッスン動画の内容と学習管理画面の使い勝手をお確かめいただけます。フォームにご入力のうえ、お申し込みください。
              </p>
              <ul className="tr-points">
                {POINTS.map((p, i) => (
                  <li key={p.h}>
                    <span className="tr-points__no">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="tr-points__h">{p.h}</p>
                      <p className="tr-points__d">{p.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="tr-price">
                <p className="tr-price__h">ご契約時の料金</p>
                <p className="tr-price__v">
                  月額<b>2,980</b>円／ID<span>＋ 導入費用 100,000円</span>
                </p>
                <p className="tr-price__note">※税抜。ご契約は10ID・6ヶ月から承ります。</p>
              </div>
            </div>

            <div className="tr-card">
              <p className="tr-card__title">お申し込みフォーム</p>
              <div dangerouslySetInnerHTML={{ __html: FORM_HTML }} />
            </div>
          </div>
        </div>
      </main>

      <script dangerouslySetInnerHTML={{ __html: FREE_MAIL_SCRIPT }} />
      <script dangerouslySetInnerHTML={{ __html: REQUIRED_FALLBACK_SCRIPT }} />
      <script src="https://sdk.form.run/js/v2/formrun.js" defer />

      <BizFooter />
    </>
  );
}
