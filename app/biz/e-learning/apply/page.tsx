import Link from "next/link";
import { BizFooter, BizHeader } from "../../_chrome/BizChrome";
import { buildCourseMetadata } from "../../_course/courseMetadata";
import "../../_course/course.css";
import "../e-learning.css";
import "../trial/trial.css";

// eラーニングプランのWeb申込ページ（導入を決めた企業向け。トライアルと同じ formrun SDK の自前フォーム）。
// ※ formrun 管理画面で申込用フォームを作り、APPLY_FORM_ACTION を差し替えること。
//   完了後のリダイレクト先は /e-learning/apply/thanks に設定する。
const APPLY_FORM_ACTION = "https://form.run/api/v1/r/REPLACE_WITH_APPLY_FORM_ID";

export const metadata = {
  ...buildCourseMetadata({
    title: "eラーニングプランのお申し込み｜バイテック法人AI研修",
    description: "法人向けAI研修eラーニングプランのWebお申し込みページです。",
    socialDescription: "法人向けAI研修eラーニングプランのWebお申し込みページです。",
    path: "/e-learning/apply",
  }),
  // 申込フォームのため検索結果には出さない
  robots: "noindex",
};

const STEPS = [
  { h: "フォームから申し込み", d: "会社情報とご利用予定のID数・期間をご入力ください。" },
  { h: "契約内容とお見積もりをご案内", d: "担当者から、ご契約内容とお見積もりをメールでお送りします。" },
  { h: "ご確認後にアカウント発行", d: "内容をご確認いただいたうえでご契約となり、受講用アカウントを発行します。" },
  { h: "IDを配布して受講開始", d: "発行したIDを受講者へ配布すれば、その日から受講を始められます。" },
];

const FORM_HTML = `
<form class="formrun tr-form" action="${APPLY_FORM_ACTION}" method="post">
  <input type="hidden" name="申込種別" value="eラーニングプラン申し込み">
  <div class="tr-field">
    <label class="tr-label">企業名<span class="tr-req">必須</span></label>
    <input class="tr-input" type="text" name="企業名" placeholder="株式会社バイテック" data-formrun-required>
    <div class="tr-error" data-formrun-show-if-error="企業名">企業名を入力してください</div>
  </div>
  <div class="tr-row">
    <div class="tr-field">
      <label class="tr-label">ご担当者名<span class="tr-req">必須</span></label>
      <input class="tr-input" type="text" name="お名前" placeholder="山田 太郎" data-formrun-required>
      <div class="tr-error" data-formrun-show-if-error="お名前">お名前を入力してください</div>
    </div>
    <div class="tr-field">
      <label class="tr-label">部署名<span class="tr-opt">任意</span></label>
      <input class="tr-input" type="text" name="部署名" placeholder="人事部">
    </div>
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
    <label class="tr-label">会社所在地<span class="tr-req">必須</span></label>
    <input class="tr-input" type="text" name="会社所在地" placeholder="東京都渋谷区〇〇 1-2-3" data-formrun-required>
    <div class="tr-error" data-formrun-show-if-error="会社所在地">会社所在地を入力してください</div>
  </div>
  <div class="tr-row">
    <div class="tr-field">
      <label class="tr-label">ご利用ID数<span class="tr-req">必須</span></label>
      <input class="tr-input" type="number" name="利用ID数" min="5" placeholder="5以上で入力" data-formrun-required>
      <div class="tr-error" data-formrun-show-if-error="利用ID数">ID数を入力してください（5IDから）</div>
    </div>
    <div class="tr-field">
      <label class="tr-label">ご利用開始の希望時期<span class="tr-req">必須</span></label>
      <select class="tr-input" name="利用開始希望" data-formrun-required>
        <option value="" disabled selected>選択してください</option>
        <option>できるだけ早く</option>
        <option>1ヶ月以内</option>
        <option>2〜3ヶ月以内</option>
        <option>時期は相談したい</option>
      </select>
      <div class="tr-error" data-formrun-show-if-error="利用開始希望">選択してください</div>
    </div>
  </div>
  <div class="tr-field">
    <label class="tr-label">ご契約期間<span class="tr-req">必須</span></label>
    <div class="tr-chips">
      ${["6ヶ月", "12ヶ月", "相談したい"]
        .map((v, i) => `<label class="tr-chip"><input type="radio" name="契約期間" value="${v}"${i === 0 ? " data-formrun-required" : ""}><span>${v}</span></label>`)
        .join("")}
    </div>
    <div class="tr-error" data-formrun-show-if-error="契約期間">選択してください</div>
  </div>
  <div class="tr-field">
    <label class="tr-label">ご質問・ご要望<span class="tr-opt">任意</span></label>
    <textarea class="tr-input tr-textarea" name="ご質問・ご要望" rows="4" placeholder="請求書の宛名や支払い条件など、気になる点があればご記入ください"></textarea>
  </div>
  <div class="_formrun_gotcha" aria-hidden="true" style="position:absolute;height:1px;width:1px;overflow:hidden;">
    <input type="text" name="_formrun_gotcha" tabindex="-1" autocomplete="off">
  </div>
  <button class="tr-submit" type="submit" data-formrun-error-text="未入力の項目があります" data-formrun-submitting-text="送信中...">この内容で申し込む<span class="tr-submit__ico" aria-hidden="true"></span></button>
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

export default function ELearningApplyPage() {
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
            <span>お申し込み</span>
          </nav>

          <div className="tr-grid">
            <div className="tr-intro">
              <p className="tr-eyebrow">APPLICATION</p>
              <h1 className="tr-title">
                eラーニングプラン<br />
                Webお申し込み
              </h1>
              <p className="tr-lead">
                導入をお決めの方は、こちらからお申し込みください。お申し込み後の流れは次のとおりです。
              </p>
              <ul className="tr-points">
                {STEPS.map((p, i) => (
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
                <p className="tr-price__h">料金</p>
                <p className="tr-price__v">
                  月額<b>2,980</b>円／ID<span>＋ 導入費用 100,000円</span>
                </p>
                <p className="tr-price__note">※税抜。ご契約は5ID・6ヶ月から承ります。</p>
              </div>
            </div>

            <div className="tr-card">
              <p className="tr-card__title">お申し込みフォーム</p>
              <div className="tr-notice">
                <span className="tr-notice__ico" aria-hidden="true">!</span>
                <div>
                  <p className="tr-notice__h">送信しただけでは契約は確定しません</p>
                  <p className="tr-notice__d">
                    担当者からお送りする契約内容とお見積もりをご確認いただいたうえで、正式なご契約となります。
                  </p>
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: FORM_HTML }} />
              <p className="tr-consent">
                まずは試してから決めたい方は<Link href="/e-learning/trial" prefetch={false}>無料トライアル</Link>をご利用ください。
              </p>
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
