/*
 * 予約フォームの「送信中」表示（全LP共通）。
 *
 * 各フォームは送信中に送信ボタンへ loading クラスを付けるので、それを見て
 * 画面全体を覆う「ご予約を送信しています」を出す。予約が完了するとサンクスへ移るまで出たまま、
 * エラーで loading が外れると消える。送信処理そのものには手を入れない。
 * あわせて、ボタン内のスピナーを中央に重ねる（文字の高さが残って下にずれていたため）。
 *
 *   <script src="/_shared/booking-sending.js?v=20261119" data-accent="#00ac9b" defer></script>
 *   data-accent … スピナーの色（省略時はバイテックの紫）
 */
(function () {
  var script = document.currentScript;
  var accent = (script && script.getAttribute('data-accent')) || '#7b6cff';
  var SUBMIT = '.cs-btn-submit,.fc-btn-submit,.bc-btn-submit';

  var css = ''
    + '.cs-btn-submit.loading,.fc-btn-submit.loading,.bc-btn-submit.loading{position:relative}'
    + '.cs-btn-submit.loading .cs-spinner,.fc-btn-submit.loading .fc-spinner,.bc-btn-submit.loading .bc-spinner'
    + '{display:block!important;position:absolute!important;top:50%!important;left:50%!important;width:22px!important;height:22px!important;margin:-11px 0 0 -11px!important;border-width:3px!important}'
    + '.bt-sending{position:fixed;inset:0;z-index:2147483000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:24px;'
    + 'background:rgba(7,26,58,.86);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);color:#fff;text-align:center;'
    + 'opacity:0;visibility:hidden;transition:opacity .2s,visibility .2s;font-family:inherit}'
    + '.bt-sending.is-on{opacity:1;visibility:visible}'
    + '.bt-sending__spin{width:64px;height:64px;border:5px solid rgba(255,255,255,.18);border-top-color:' + accent + ';border-radius:50%;animation:btSendingSpin .8s linear infinite}'
    + '.bt-sending__title{margin:0;font-size:20px;font-weight:900;letter-spacing:.04em;color:#fff}'
    + '.bt-sending__sub{margin:0;font-size:13px;line-height:1.7;color:rgba(255,255,255,.75)}'
    + '@keyframes btSendingSpin{to{transform:rotate(360deg)}}';

  function init() {
    var style = document.createElement('style');
    style.id = 'bt-sending-style';
    style.textContent = css;
    document.head.appendChild(style);

    var overlay = document.createElement('div');
    overlay.className = 'bt-sending';
    overlay.setAttribute('role', 'status');
    overlay.setAttribute('aria-live', 'polite');
    overlay.innerHTML = '<div class="bt-sending__spin"></div>'
      + '<p class="bt-sending__title">ご予約を送信しています</p>'
      + '<p class="bt-sending__sub">数秒かかることがあります。<br>画面を閉じずに、そのままお待ちください。</p>';
    document.body.appendChild(overlay);

    var buttons = document.querySelectorAll(SUBMIT);
    var update = function () {
      var on = false;
      for (var i = 0; i < buttons.length; i++) if (buttons[i].classList.contains('loading')) on = true;
      overlay.classList.toggle('is-on', on);
    };
    for (var i = 0; i < buttons.length; i++) {
      new MutationObserver(update).observe(buttons[i], { attributes: true, attributeFilter: ['class'] });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
