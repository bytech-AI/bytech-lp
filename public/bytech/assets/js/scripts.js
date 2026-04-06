jQuery(function ($) {
  const $window = $(window);
  const $header = $('.header');
  const $cta = $('.btn__cta');
  const $footer = $('footer');
  let lastScroll = 0;
  const wid = $window.width();

  // 要素が可視範囲に入ったらクラス追加（.fadein 専用）
  function revealOnScroll(selector, offset = 0, className = 'is-show') {
    $(selector).each(function () {
      const $elem = $(this);
      if ($elem.hasClass(className)) return;

      const elemTop = $elem.offset().top;
      const elemBottom = elemTop + $elem.outerHeight();
      const scroll = $window.scrollTop();
      const windowHeight = $window.height();
      const windowBottom = scroll + windowHeight;

      if (windowBottom > elemTop + offset && scroll < elemBottom) {
        $elem.addClass(className);
      }
    });
  }

  function initRevealFxNow(selector, delay = 0) {
  const el = $(selector).get(0);
  if (!el) return;

  if (typeof window.RevealFx !== 'function') {
    // フォールバック：最低限テキストは出す（発火確認用ログも）
    console.warn('RevealFx が見つかりません。ライブラリを読み込んでください。');
    el.style.opacity = 0;
    setTimeout(() => {
      anime && anime({
        targets: el,
        duration: 800,
        easing: 'easeOutExpo',
        translateY: [20, 0],
        opacity: [0, 1]
      });
    }, delay);
    return;
  }

  const fx = new RevealFx(el, {
    revealSettings: {
      bgcolor: '#fff',
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

  // フッターとの重なりでCTAを非表示
  function checkFooterOverlap() {
    const windowBottom = $window.scrollTop() + $window.height();
    if (windowBottom >= $footer.offset().top) {
      $cta.addClass('is-hidden');
    } else {
      $cta.removeClass('is-hidden');
    }
  }

  // ヘッダー縮小
  function headerShrink() {
    const headerHeight = $header.outerHeight();
    if ($window.scrollTop() > headerHeight) {
      $header.addClass('header-sm');
    } else {
      $header.removeClass('header-sm');
    }
  }

  // ヘッダーの表示非表示制御（スクロール方向によって変化）
  function headerShowHide() {
    const currentScroll = $window.scrollTop();
    const isPC = wid >= 1081;

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

  // グローバルナビの挙動（SP/PC切り替え）
  function setupGlobalNav() {
    const windowWidth = $window.width();
    $('.header__nav, .header__toggle, .gnav_overlay, .gnav a[href^="#"]').off('click');

    if (windowWidth < 1081) {
      $('.header__nav, .header__toggle, .gnav_overlay, .gnav a[href^="#"]').on('click', () => {
        $('.header__nav, .header__toggle, .gnav_overlay, .gnav, .gnav--cta_sp').toggleClass('active');
        $('html').toggleClass('stop');
      });
    } else {
      $('.gnav--menu_pc .menu-item-has-children.menu-item-object-custom').hover(
        () => $('.header_bg').addClass('active'),
        () => $('.header_bg').removeClass('active')
      );
    }
  }

  // スムーススクロール
  function smoothScroll() {
    const headerOffset = 80;
    $('a[href^="#"]:not(.ez-toc-link)').on('click', function () {
      const href = $(this).attr('href');
      const target = $(href === '#' || href === '' ? 'html' : href);
      if (target.length) {
        const position = target.offset().top - headerOffset;
        $('html, body').animate({ scrollTop: position }, 400, 'swing');
      }
      return false;
    });
  }

  jQuery(function($) {
    const getHeaderHeight = () => $('.header').outerHeight() || 100;

    function smoothScrollTo(hash) {
      const $target = $(hash);
      if (!$target.length) return;
      const offset = $target.offset().top - getHeaderHeight();
      $('html, body').animate({ scrollTop: offset }, 500, 'swing');
    }

    // クリック時（同一ページ内のハッシュだけを補足）
    $('a[href*="#"]').on('click', function(e) {
      const url = new URL(this.href, location.href);
      // 同じページ（パス/ホスト一致）かつハッシュあり
      const samePage =
        url.origin === location.origin &&
        url.pathname.replace(/\/+$/, '') === location.pathname.replace(/\/+$/, '');

      if (samePage && url.hash) {
        e.preventDefault();
        smoothScrollTo(url.hash);
        history.pushState(null, '', url.hash); // アドレスバーのハッシュ更新
      }
    });

    // ページ読み込み時にハッシュがあれば補正してスクロール
    if (location.hash) {
      // レイアウトが落ち着いてから
      setTimeout(() => smoothScrollTo(location.hash), 0);
    }
  });

  // マスクテキスト画像調整（使っているなら）
  function blendImageEffect() {
    $('.maskTxt img').css({
      'mix-blend-mode': 'difference',
      'display': 'block'
    });
  }

  // =====================
  // イベント登録
  // =====================
  $window.on('scroll', () => {
      revealOnScroll('.fadein', 100); // 可視範囲で発火
      headerShowHide();
      headerShrink();
      checkFooterOverlap();
    });

  $window.on('resize', setupGlobalNav);

  // =====================
  // 初期化処理
  // =====================
  setupGlobalNav();
  smoothScroll();
  blendImageEffect();
  headerShrink();
  checkFooterOverlap();
  revealOnScroll('.fadein', 100); // 初期表示分にも対応

  // RevealFx 発火（FV帯アニメーション）
  initRevealFxNow('#effect_01');
  initRevealFxNow('#effect_02', 400);
});

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".courses__tab");
  const panels = document.querySelectorAll(".courses__card__panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      // タブの切り替え
      tabs.forEach(t => t.classList.remove("is-active"));
      tab.classList.add("is-active");

      // パネルの切り替え
      panels.forEach(panel => {
        panel.classList.toggle("is-active", panel.dataset.content === target);
      });
    });
  });
});

jQuery(function($) {
  $('.faq__sec__list__item__question').on('click', function () {
    const $item = $(this).closest('.faq__sec__list__item');
    const $answer = $item.find('.faq__sec__list__item__answer');

    if ($item.hasClass('open')) {
      $answer
        .css('height', $answer[0].scrollHeight + 'px')
        .animate({ height: 0 }, 300, function () {
          $item.removeClass('open');
          $answer.css('height', '');
        });
    } else {
      $('.faq__sec__list__item.open').each(function () {
        const $other = $(this);
        const $otherAnswer = $other.find('.faq__sec__list__item__answer');
        $otherAnswer.animate({ height: 0 }, 300, function () {
          $other.removeClass('open');
          $otherAnswer.css('height', '');
        });
      });

      const scrollHeight = $answer[0].scrollHeight;
      $answer
        .css('height', 0)
        .animate({ height: scrollHeight }, 300, function () {
          $answer.css('height', 'auto');
        });

      $item.addClass('open');
    }
  });
});

$(function () {
  $('.voice__slider__list').slick({
    autoplay: true,
    dots: false,
    centerPadding: '100px',
    centerMode: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '20px',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '20px',
          slidesToShow: 1
        }
      }
    ]
  });
});

$(function () {
  $('.about__slider__list').slick({
    autoplay: true,
    dots: false,
    centerPadding: '100px',
    centerMode: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '20px',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '20px',
          slidesToShow: 1
        }
      }
    ]
  });
});

$(function () {
  $('.slider_mentor .slider-wrapper').slick({
    autoplay: true,
    centerMode: true,
    dots: false,
    centerPadding: '100px',
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });
});

$(function () {
  $('.slider_course .slider-wrapper').slick({
    autoplay: true,
    centerMode: true,
    dots: false,
    centerPadding: '60px',
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });
});

$(function () {
  $('.slider_voice .slider-wrapper').slick({
    autoplay: true,
    centerMode: true,
    dots: false,
    centerPadding: '60px',
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });
});

$(function () {
  $('.slider_voice .slider-wrapper').slick({
    autoplay: true,
    centerMode: true,
    dots: false,
    centerPadding: '60px',
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });
});

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.lottie').forEach(el => {
    lottie.loadAnimation({
      container: el,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: el.dataset.json
    });
  });
});