/******************************************************************
 * メインスクリプト完全統合版
 ******************************************************************/
jQuery(function ($) {

  // ======================================================
  // 共通DOM参照
  // ======================================================
  const $window = $(window);
  const $header = $('.header');
  const $cta = $('.btn__cta');
  const $footer = $('footer');
  let lastScroll = 0;
  let isScrollingByAnchor = false; // ← anchorスクロール時の干渉停止フラグ

  // ======================================================
  // Fade-in
  // ======================================================
  // 位置をまとめて読んでからクラスを付ける（読み書きを交互にすると要素ごとに強制レイアウトが走る）
  function revealOnScroll(selector, offset = 0, className = 'is-show') {
    const winH = window.innerHeight;
    const hits = [];
    document.querySelectorAll(selector).forEach((el) => {
      if (el.classList.contains(className)) return;
      if (el.getBoundingClientRect().top + offset < winH) hits.push(el);
    });
    hits.forEach((el) => el.classList.add(className));
  }

  // ======================================================
  // RevealFx
  // ======================================================
  function initRevealFxNow(selector, delay = 0) {
    const el = $(selector).get(0);
    if (!el) return;

    if (typeof window.RevealFx !== 'function') {
      console.warn('RevealFx が見つかりません。代替演出実行');
      el.style.opacity = 0;
      setTimeout(() => {
        if (window.anime) {
          anime({
            targets: el,
            duration: 800,
            easing: 'easeOutExpo',
            translateY: [20, 0],
            opacity: [0, 1]
          });
        }
      }, delay);
      return;
    }

    const fx = new RevealFx(el, {
      revealSettings: {
        bgcolor: '#000080',
        duration: 800,
        delay,
        direction: 'lr',
        easing: 'easeOutExpo',
        coverArea: 100,
        onStart(contentEl) {
          contentEl.style.opacity = 0;
        },
        onCover(contentEl) {
          contentEl.style.opacity = 1;
          anime({
            targets: contentEl,
            duration: 800,
            easing: 'easeOutExpo',
            translateY: [20, 0],
            opacity: [0, 1]
          });
        }
      }
    });

    fx.reveal();
  }

  // ======================================================
  // CTA hide on footer overlap
  // ======================================================
  function checkFooterOverlap() {
    const bottom = $window.scrollTop() + $window.height();
    if (bottom >= $footer.offset().top) {
      $cta.addClass('is-hidden');
    } else {
      $cta.removeClass('is-hidden');
    }
  }

  // ======================================================
  // Header shrink
  // ======================================================
  function headerShrink() {
    const hh = $header.outerHeight();
    if ($window.scrollTop() > hh) $header.addClass('header-sm');
    else $header.removeClass('header-sm');
  }

  // ======================================================
  // Header show/hide
  // ======================================================
  function headerShowHide() {
    const currentScroll = $window.scrollTop();
    const isPC = $window.width() >= 1081;

    if (currentScroll <= 0) {
      $header.removeClass('is-hide').addClass('is-show');
    } else if (isPC) {
      if (currentScroll < lastScroll) {
        $header.removeClass('is-hide').addClass('is-show');
      } else {
        $header.removeClass('is-show').addClass('is-hide');
      }
    } else {
      $header.removeClass('is-hide').addClass('is-show');
    }

    lastScroll = currentScroll;
  }

  // ======================================================
  // Global Navigation
  // ======================================================
  function setupGlobalNav() {
    const ww = $window.width();
    $('.header__nav, .header__toggle, .gnav_overlay, .gnav a[href^="#"]').off('click');

    if (ww < 1081) {
      $('.header__nav, .header__toggle, .gnav_overlay, .gnav a[href^="#"]').on('click', () => {
        $('.header__nav, .header__toggle, .gnav_overlay, .gnav, .gnav--cta_sp')
          .toggleClass('active');
        $('html').toggleClass('stop');
      });
    } else {
      $('.gnav--menu_pc .menu-item-has-children.menu-item-object-custom').hover(
        () => $('.header_bg').addClass('active'),
        () => $('.header_bg').removeClass('active')
      );
    }
  }

  // ======================================================
  // Smooth Scroll 完全版（ここだけ使用）
  // ======================================================
  const getHeaderHeight = () => $header.outerHeight() || 100;

  function smoothScrollTo(hash) {
    const $target = $(hash);
    if (!$target.length) return;

    isScrollingByAnchor = true;
    const offset = $target.offset().top - getHeaderHeight();

    $('html, body').animate({ scrollTop: offset }, 500, 'swing', () => {
      isScrollingByAnchor = false;
      document.documentElement.style.scrollBehavior = '';
    });
  }

  $('a[href*="#"]').on('click', function (e) {
    const url = new URL(this.href, location.href);
    const same =
      url.origin === location.origin &&
      url.pathname.replace(/\/+$/, '') === location.pathname.replace(/\/+$/, '');

    if (same && url.hash) {
      e.preventDefault();
      document.documentElement.style.scrollBehavior = 'auto';
      smoothScrollTo(url.hash);
      history.pushState(null, '', url.hash);
    }
  });

  if (location.hash) {
    setTimeout(() => smoothScrollTo(location.hash), 0);
  }

  // ======================================================
  // unify scroll event
  // ======================================================
  // 1フレーム1回に間引く
  let scrollTicking = false;
  $window.on('scroll', () => {
    if (isScrollingByAnchor || scrollTicking) return; // ← anchor中は一切処理しない
    scrollTicking = true;
    requestAnimationFrame(() => {
      scrollTicking = false;
      if (isScrollingByAnchor) return;
      headerShowHide();
      headerShrink();
      checkFooterOverlap();
    });
  });

  // ======================================================
  // 初期実行
  // ======================================================
  setupGlobalNav();
  revealOnScroll('.fadein', 100);
  headerShrink();
  checkFooterOverlap();
  initRevealFxNow('#effect_01');
  initRevealFxNow('#effect_02', 400);

});

/******************************************************************
 * コースタブ切り替え
 ******************************************************************/
jQuery(function ($) {
  $('.index_course__grid-item[data-accordion]').on('click', function () {
    var $acc = $(this).closest('.index_course__accordion');
    $acc.toggleClass('active');
  });

  $('.index_course__tab').on('click', function () {
    var tab = $(this).data('tab');
    $('.index_course__tab').removeClass('active');
    $(this).addClass('active');
    $('.index_course__panel').removeClass('active');
    $('#panel-' + tab).addClass('active');
  });
});

/******************************************************************
 * ハンバーガーメニュー（SP）
 ******************************************************************/
jQuery(function ($) {
  // index.html 側で先に委譲bind済みなら二重bindしない（トグルが打ち消し合うため）。
  if (window.__bizHamburgerBound) return;

  var $hamburger = $('.top-header__hamburger');
  var $nav = $('.top-header__nav');
  var $overlay = $('.top-header__overlay');

  function closeMenu() {
    $hamburger.removeClass('active');
    $nav.removeClass('active');
    $overlay.removeClass('active');
    $('html').css('overflow', '');
  }

  $hamburger.on('click', function () {
    var isOpen = $nav.hasClass('active');
    if (isOpen) {
      closeMenu();
    } else {
      $hamburger.addClass('active');
      $nav.addClass('active');
      $overlay.addClass('active');
      $('html').css('overflow', 'hidden');
    }
  });

  $overlay.on('click', closeMenu);

  $nav.find('a').on('click', function () {
    if ($(window).width() <= 768) {
      closeMenu();
    }
  });
});

/******************************************************************
 * 研修プランタブ切り替え（SP）
 ******************************************************************/
jQuery(function ($) {
  $('.index_plan__tab-sp').on('click', function () {
    var tab = $(this).data('plan-tab');
    $('.index_plan__tab-sp').removeClass('active');
    $(this).addClass('active');
    $('.index_plan__card').removeClass('sp-active');
    $('.index_plan__card[data-plan-card="' + tab + '"]').addClass('sp-active');
  });
});

/******************************************************************
 * FAQアコーディオン
 ******************************************************************/
jQuery(function ($) {
  $('.index_faq__question').on('click', function () {
    const $item = $(this).closest('.index_faq__item');

    if ($item.hasClass('active')) {
      $item.removeClass('active');
    } else {
      $('.index_faq__item.active').removeClass('active');
      $item.addClass('active');
    }
  });
});

/******************************************************************
 * Slick sliders
 ******************************************************************/
$(function () {
  $('.voice__slider__list').slick({
    autoplay: true,
    dots: false,
    centerPadding: '100px',
    centerMode: true,
    slidesToShow: 3,
    responsive: [
      { breakpoint: 768, settings: { arrows: false, centerPadding: '20px', slidesToShow: 1 } },
      { breakpoint: 480, settings: { arrows: false, centerPadding: '20px', slidesToShow: 1 } }
    ]
  });
});

$(function () {
  $('.index_compare__slider__list').slick({
    autoplay: true,
    dots: true,
    centerPadding: '100px',
    centerMode: true,
    slidesToShow: 3,
    responsive: [
      { breakpoint: 768, settings: { arrows: false, centerPadding: '20px', slidesToShow: 1 } },
      { breakpoint: 480, settings: { arrows: false, centerPadding: '20px', slidesToShow: 1 } }
    ]
  });
});

$(function () {
  $('.index_feature__section--01 .index_feature__section__slider__list').slick({
    autoplay: true,
    dots: true,
    centerPadding: '100px',
    centerMode: true,
    slidesToShow: 3,
    responsive: [
      { breakpoint: 768, settings: { arrows: false, centerPadding: '20px', slidesToShow: 1 } },
      { breakpoint: 480, settings: { arrows: false, centerPadding: '20px', slidesToShow: 1 } }
    ]
  });
});

$(function () {
  $('.index_feature__section--02 .index_feature__section__slider__list').slick({
    autoplay: true,
    dots: true,
    arrows: true,
    centerPadding: '30px',
    centerMode: true,
    slidesToShow: 3,
    responsive: [
      { breakpoint: 768, settings: { arrows: false, centerPadding: '20px', slidesToShow: 1 } },
      { breakpoint: 480, settings: { arrows: false, centerPadding: '20px', slidesToShow: 1 } }
    ]
  });
});

$(function () {
  $('.index_works__section__slider__list').slick({
    autoplay: true,
    dots: true,
    centerPadding: '100px',
    centerMode: true,
    slidesToShow: 3,
    responsive: [
      { breakpoint: 768, settings: { arrows: false, centerPadding: '20px', slidesToShow: 1 } },
      { breakpoint: 480, settings: { arrows: false, centerPadding: '20px', slidesToShow: 1 } }
    ]
  });

  $('.index_instructor__list').slick({
    autoplay: true,
    dots: true,
    arrows: true,
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    responsive: [
      { breakpoint: 768, settings: { arrows: false, centerPadding: '20px', slidesToShow: 1 } }
    ]
  });
});

/******************************************************************
 * Benefits スライダー（SP）
 ******************************************************************/
$(function () {
  $('.index_benefits__slider').slick({
    autoplay: true,
    dots: true,
    arrows: false,
    centerMode: true,
    centerPadding: '20px',
    slidesToShow: 1,
    mobileFirst: true,
    responsive: [
      { breakpoint: 768, settings: 'unslick' }
    ]
  });
});

/******************************************************************
 * Slick autoplay: 画面外とスクロール中は止める
 * 自動再生のスライド切り替えが画面外でも走り続け、スクロール中に重なると
 * 描画が詰まって引っかかる（PCは複数枚表示で切り替えの描画範囲が広い）
 ******************************************************************/
$(function () {
  const $sliders = $('.slick-initialized');
  if (!$sliders.length) return;
  const visible = new Set();
  let scrolling = false;
  let resumeTimer = 0;
  const play = (el) => { if ($(el).hasClass('slick-initialized')) $(el).slick('slickPlay'); };
  const pause = (el) => { if ($(el).hasClass('slick-initialized')) $(el).slick('slickPause'); };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { visible.add(e.target); if (!scrolling) play(e.target); }
        else { visible.delete(e.target); pause(e.target); }
      });
    });
    $sliders.each(function () { pause(this); io.observe(this); });
  }
  window.addEventListener('scroll', () => {
    if (!scrolling) { scrolling = true; visible.forEach(pause); }
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => { scrolling = false; visible.forEach(play); }, 400);
  }, { passive: true });
});

/******************************************************************
 * fadein delay
 ******************************************************************/
// 縦位置だけで判定（横にはみ出したslickのスライドも対象）。1フレーム1回に間引き、
// 位置をまとめて読んでから付ける（読み書きを交互にすると要素ごとに強制レイアウトが走る）
let fadeinTicking = false;
window.addEventListener('scroll', function () {
  if (fadeinTicking) return;
  fadeinTicking = true;
  requestAnimationFrame(function () {
    fadeinTicking = false;
    const pending = document.querySelectorAll('.fadein:not(.is-show)');
    if (!pending.length) return;
    const limit = window.innerHeight - 50;
    const hits = [];
    pending.forEach(function (el) {
      if (el.getBoundingClientRect().top < limit) hits.push(el);
    });
    hits.forEach(function (el) { el.classList.add('is-show'); });
  });
}, { passive: true });

/******************************************************************
 * Lottie
 ******************************************************************/
document.addEventListener("DOMContentLoaded", function () {
  const containers = document.querySelectorAll('.lottie-cta-robot');
  if (!containers.length) return;

  containers.forEach(c => {
    lottie.loadAnimation({
      container: c,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assets/img/index/robot-working-on-laptop-illustration-2025-10-20-04-38-49-utc.json'
    });
  });
});
