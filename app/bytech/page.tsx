'use client'

import Script from 'next/script'

export default function BytechPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet" />

      <style dangerouslySetInnerHTML={{ __html: `
    /* ===== CSS Custom Properties ===== */
    :root {
      --color-primary: #533afc;
      --color-primary-dark: #3b25d4;
      --color-dark: #191722;
      --color-dark2: #1f1f2e;
      --color-accent: #ffd464;
      --color-accent-pink: #D4215F;
      --color-text: #333;
      --color-text-light: #555;
      --color-white: #fff;
      --color-bg-light: #f6f6f6;
      --color-bg-purple-light: #f0eeff;
      --color-green: #217346;
      --font-jp: 'Noto Sans JP', sans-serif;
      --font-en: 'Futura', 'Futura-Medium', 'Century Gothic', sans-serif;
      --max-width: 1200px;
      --radius: 12px;
      --radius-lg: 20px;
      --shadow: 0 4px 24px rgba(0,0,0,0.1);
      --shadow-lg: 0 8px 40px rgba(0,0,0,0.15);
    }

    /* ===== Reset ===== */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: var(--font-jp); color: var(--color-text); background: var(--color-white); line-height: 1.7; font-size: 15px; }
    img { max-width: 100%; height: auto; vertical-align: middle; }
    a { color: inherit; text-decoration: none; }
    ul, ol { list-style: none; }
    button { cursor: pointer; border: none; background: none; font-family: inherit; }

    /* ===== Utility ===== */
    .u-inner { max-width: var(--max-width); margin: 0 auto; padding: 0 24px; }
    .u-section { padding: 80px 0; }
    .u-section-sm { padding: 60px 0; }
    .mark-purple { color: var(--color-primary); }
    .highlight-box { background: var(--color-primary); color: #fff; display: inline-block; padding: 2px 12px; }
    .sp-only { display: none; }
    @media (max-width: 768px) { .pc-only { display: none !important; } .sp-only { display: block !important; } }

    /* ===== Buttons ===== */
    .btn-primary {
      display: inline-flex; align-items: center; justify-content: center;
      background: linear-gradient(135deg, var(--color-accent) 0%, #ffb800 100%);
      color: var(--color-dark); font-weight: 700; font-size: 16px;
      padding: 16px 40px; border-radius: 50px;
      box-shadow: 0 4px 20px rgba(255,212,100,0.5);
      transition: transform 0.2s, box-shadow 0.2s; gap: 8px;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(255,212,100,0.6); }
    .btn-outline {
      display: inline-flex; align-items: center; justify-content: center;
      border: 2px solid var(--color-primary); color: var(--color-primary);
      font-weight: 700; font-size: 15px; padding: 14px 36px; border-radius: 50px;
      transition: all 0.2s; gap: 8px;
    }
    .btn-outline:hover { background: var(--color-primary); color: #fff; }
    .btn-purple {
      display: inline-flex; align-items: center; justify-content: center;
      background: var(--color-primary); color: #fff;
      font-weight: 700; font-size: 16px; padding: 16px 40px; border-radius: 50px;
      transition: all 0.2s; gap: 8px; box-shadow: 0 4px 20px rgba(83,58,252,0.35);
    }
    .btn-purple:hover { background: var(--color-primary-dark); transform: translateY(-2px); }

    /* ===== Sticky CTA ===== */
    .sticky-cta {
      position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
      z-index: 1000; display: flex; gap: 12px; padding: 0 16px;
      opacity: 0; transition: opacity 0.3s; pointer-events: none;
    }
    .sticky-cta.is-visible { opacity: 1; pointer-events: auto; }
    .sticky-cta a {
      display: flex; align-items: center; justify-content: center;
      padding: 14px 28px; border-radius: 50px; font-weight: 700; font-size: 14px;
      box-shadow: var(--shadow-lg); white-space: nowrap;
    }
    .sticky-cta .btn-cta-main {
      background: linear-gradient(135deg, #ffd464 0%, #ffb800 100%);
      color: var(--color-dark);
    }
    .sticky-cta .btn-cta-sub { background: var(--color-dark); color: #fff; }

    /* ===== Header ===== */
    .header {
      position: fixed; top: 0; left: 0; right: 0; z-index: 900;
      background: rgba(255,255,255,0.98); backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(0,0,0,0.06);
      height: 70px; display: flex; align-items: center;
    }
    .header__inner {
      max-width: var(--max-width); margin: 0 auto; padding: 0 24px;
      width: 100%; display: flex; align-items: center; gap: 40px;
    }
    .header__logo img { height: 36px; width: auto; }
    .header__nav { display: flex; align-items: center; gap: 32px; margin-left: auto; }
    .header__nav__list { display: flex; align-items: center; gap: 28px; }
    .header__nav__list li { position: relative; }
    .header__nav__list a { font-size: 13px; font-weight: 500; color: var(--color-text); transition: color 0.2s; white-space: nowrap; }
    .header__nav__list a:hover { color: var(--color-primary); }
    .header__nav__cta { display: flex; gap: 10px; }
    .header__cta-btn {
      padding: 10px 20px; border-radius: 50px; font-size: 13px; font-weight: 700;
      display: inline-flex; align-items: center; white-space: nowrap;
    }
    .header__cta-btn--outline { border: 2px solid var(--color-primary); color: var(--color-primary); }
    .header__cta-btn--fill { background: var(--color-primary); color: #fff; }
    .header__hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; }
    .header__hamburger span { width: 24px; height: 2px; background: var(--color-text); transition: all 0.3s; display: block; }
    /* Dropdown */
    .header__dropdown { display: none; position: absolute; top: 100%; left: -16px; background: #fff; border-radius: var(--radius); box-shadow: var(--shadow-lg); padding: 12px 0; min-width: 240px; z-index: 100; }
    .header__dropdown a { display: block; padding: 8px 20px; font-size: 13px; }
    .header__dropdown a:hover { background: var(--color-bg-purple-light); }
    .header__nav__list li:hover .header__dropdown { display: block; }
    @media (max-width: 1024px) {
      .header__nav__list { display: none; }
    }
    @media (max-width: 768px) {
      .header__hamburger { display: flex; margin-left: auto; }
      .header__nav__cta { display: none; }
    }

    /* ===== Hero ===== */
    .hero {
      padding-top: 70px;
      background: linear-gradient(135deg, #e8e4ff 0%, #d5ccff 40%, #c4b8ff 100%);
      min-height: 100svh; display: flex; flex-direction: column; position: relative; overflow: hidden;
    }
    .hero__inner {
      max-width: var(--max-width); margin: 0 auto; padding: 0 24px;
      display: flex; align-items: center; flex: 1; position: relative;
    }
    .hero__content {
      flex: 1; padding: 80px 0; position: relative; z-index: 2;
      text-align: center; max-width: 800px; margin: 0 auto;
    }
    .hero__ttl {
      font-size: clamp(36px, 5vw, 60px); font-weight: 900; line-height: 1.3;
      color: var(--color-dark); margin-bottom: 20px;
    }
    .hero__ttl .line1 { display: block; }
    .hero__ttl .line1 strong { font-size: 1.4em; }
    .hero__ttl .line2 { display: block; }
    .hero__ttl .hl-box {
      background: var(--color-primary); color: #fff;
      padding: 4px 16px; display: inline-block;
    }
    .hero__ttl .line3 { display: block; }
    .hero__sub {
      font-size: clamp(16px, 1.8vw, 20px); color: var(--color-dark);
      margin-bottom: 28px; font-weight: 700;
    }
    .hero__badges {
      margin-bottom: 24px;
    }
    .hero__badges img { max-width: 500px; }
    .hero__cta { display: inline-block; max-width: 420px; }
    .hero__cta img { width: 100%; display: block; }
    .hero__note {
      font-size: 11px; color: rgba(0,0,0,0.5); margin-top: 16px; line-height: 1.8;
      position: relative; z-index: 2;
    }
    @media (max-width: 768px) {
      .hero { min-height: auto; }
      .hero__inner { flex-direction: column; }
      .hero__content { padding: 32px 0; }
      .hero__ttl { font-size: 32px; }
      .hero__badges img { max-width: 100%; }
    }

    /* ===== Section Header Common ===== */
    .sec-header { text-align: center; margin-bottom: 56px; }
    .sec-header__tag {
      font-family: var(--font-en); font-size: 13px; font-weight: 700;
      color: var(--color-primary); letter-spacing: 0.15em; margin-bottom: 8px; display: block;
    }
    .sec-header__ttl { font-size: clamp(22px, 3.5vw, 34px); font-weight: 900; line-height: 1.4; }
    .sec-header__sub { font-size: 15px; color: var(--color-text-light); margin-top: 12px; line-height: 1.8; }

    /* ===== Student Voices (Carousel) ===== */
    .voices { padding: 60px 0; background: transparent; }
    .voices__carousel {
      overflow-x: auto; display: flex; gap: 16px; padding: 8px 0 16px;
      scroll-snap-type: x mandatory; cursor: grab;
    }
    .voices__carousel::-webkit-scrollbar { height: 4px; }
    .voices__carousel::-webkit-scrollbar-thumb { background: var(--color-primary); border-radius: 2px; }
    .voices__item {
      flex: 0 0 280px; border-radius: var(--radius); overflow: hidden;
      scroll-snap-align: start; box-shadow: var(--shadow);
    }
    .voices__item img { width: 100%; display: block; }

    /* ===== Features / 5 Reasons ===== */
    .features { padding: 80px 0; background: var(--color-white); }
    .features__inner { max-width: var(--max-width); margin: 0 auto; padding: 0 24px; }
    .features__list { display: flex; flex-direction: column; gap: 64px; }
    .feature-item {
      display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start;
      padding: 0;
    }
    .feature-item.reverse { direction: rtl; }
    .feature-item.reverse > * { direction: ltr; }
    .feature-item__badge {
      display: inline-flex; align-items: center; gap: 0;
      margin-bottom: 12px;
    }
    .feature-item__badge span {
      display: none;
    }
    .feature-item__badge strong {
      display: flex; align-items: center; justify-content: center;
      width: 44px; height: 44px;
      background: var(--color-primary); color: #fff;
      font-family: var(--font-en); font-size: 18px; font-weight: 900;
      border-radius: 8px;
    }
    .feature-item__num {
      display: none;
    }
    .feature-item__sub-label {
      display: inline-block; font-size: 16px; font-weight: 700; color: #1a1a1a;
      margin-left: 16px; vertical-align: middle;
      padding-right: 24px;
      border-bottom: none;
      position: relative;
    }
    .feature-item__sub-label::after {
      content: '';
      display: block;
      position: absolute;
      top: 50%; right: -200px;
      width: 200px; height: 2px;
      background: #1a1a1a;
    }
    .feature-item__ttl {
      font-size: clamp(20px, 2.8vw, 28px); font-weight: 900; line-height: 1.5; margin-bottom: 20px;
    }
    .feature-item__txt { font-size: 15px; color: var(--color-text-light); line-height: 1.9; }
    .feature-item__img { border-radius: var(--radius); overflow: hidden; }
    .feature-item__img img { width: 100%; display: block; }
    .feature-item__highlight {
      background: var(--color-dark); color: #fff; padding: 2px 8px; margin-right: 3px; display: inline;
    }
    @media (max-width: 768px) {
      .feature-item { grid-template-columns: 1fr; gap: 24px; }
      .feature-item.reverse { direction: ltr; }
      .feature-item__sub-label::after { display: none; }
    }

    /* ===== Course Carousel (within features) ===== */
    .course-scroll {
      display: flex; gap: 16px; overflow-x: auto; padding: 8px 0 16px;
      scroll-snap-type: x mandatory;
    }
    .course-scroll::-webkit-scrollbar { height: 4px; }
    .course-scroll::-webkit-scrollbar-thumb { background: var(--color-primary); border-radius: 2px; }
    .course-scroll__card {
      flex: 0 0 240px; background: #fff; border-radius: var(--radius);
      overflow: hidden; box-shadow: var(--shadow); scroll-snap-align: start;
    }
    .course-scroll__card img { width: 100%; display: block; }
    .course-scroll__card__body { padding: 14px; }
    .course-scroll__card__name { font-size: 14px; font-weight: 700; margin-bottom: 4px; }
    .course-scroll__card__sub { font-size: 12px; color: var(--color-text-light); margin-bottom: 6px; }
    .course-scroll__card__desc { font-size: 12px; color: var(--color-text-light); line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

    /* ===== Mentor Scroll ===== */
    .mentor-scroll {
      display: flex; gap: 16px; overflow-x: auto; padding: 8px 0 16px;
      scroll-snap-type: x mandatory;
    }
    .mentor-scroll::-webkit-scrollbar { height: 4px; }
    .mentor-scroll::-webkit-scrollbar-thumb { background: var(--color-primary); border-radius: 2px; }
    .mentor-scroll__item {
      flex: 0 0 200px; border-radius: var(--radius); overflow: hidden;
      scroll-snap-align: start; box-shadow: var(--shadow);
    }
    .mentor-scroll__item img { width: 100%; display: block; }

    /* ===== Curriculum ===== */
    .curriculum { padding: 80px 0; background: var(--color-bg-light); }
    .curriculum__inner { max-width: var(--max-width); margin: 0 auto; padding: 0 24px; }
    .curriculum__tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 40px; }
    .curriculum__tab {
      padding: 12px 24px; border-radius: 50px; font-size: 14px; font-weight: 700;
      border: 2px solid rgba(83,58,252,0.2); cursor: pointer; transition: all 0.2s;
      color: var(--color-text-light); background: #fff;
    }
    .curriculum__tab.is-active { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }
    .curriculum__panel { display: none; }
    .curriculum__panel.is-active { display: block; }
    .curriculum__grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px;
    }
    .course-card {
      background: #fff; border-radius: var(--radius); overflow: hidden;
      border: 1px solid rgba(0,0,0,0.06); box-shadow: var(--shadow);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .course-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
    .course-card__head { background: var(--color-dark); padding: 20px; display: flex; gap: 16px; align-items: center; }
    .course-card__icon { width: 60px; height: 60px; border-radius: 12px; overflow: hidden; flex-shrink: 0; }
    .course-card__icon img { width: 100%; height: 100%; object-fit: cover; }
    .course-card__info { flex: 1; }
    .course-card__label { font-size: 11px; color: rgba(255,255,255,0.6); margin-bottom: 4px; }
    .course-card__name { font-size: 17px; font-weight: 900; color: #fff; margin-bottom: 4px; }
    .course-card__chapters { font-size: 12px; color: rgba(255,255,255,0.6); }
    .course-card__body { padding: 20px; }
    .course-card__desc { font-size: 13px; color: var(--color-text-light); line-height: 1.8; margin-bottom: 16px; }
    .course-card__link {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 13px; font-weight: 700; color: var(--color-primary);
    }
    .course-card__link::after { content: '\\2192'; }
    .course-card__badge {
      display: inline-block; background: rgba(83,58,252,0.1); color: var(--color-primary);
      font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 50px; margin-bottom: 8px;
    }
    .course-card--soon .course-card__head { background: #888; }
    @media (max-width: 640px) { .curriculum__grid { grid-template-columns: 1fr; } }

    /* ===== Skills ===== */
    .skills-section { padding: 120px 0 80px; background: linear-gradient(135deg, #1e1e3a 0%, #3a2d6e 50%, #5a4a8a 100%); position: relative; margin-top: -1px; }
    .skills-section::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0;
      height: 80px; background: var(--color-bg-light);
      clip-path: polygon(0 0, 100% 0, 50% 100%);
    }
    .skills__inner { max-width: var(--max-width); margin: 0 auto; padding: 0 24px; }
    .skills__head { text-align: center; margin-bottom: 48px; }
    .skills__head .tag { font-family: var(--font-en); font-size: 14px; font-weight: 700; color: #d4a817; letter-spacing: 0.15em; margin-top: 12px; }
    .skills__head h2 { font-size: clamp(22px, 3.5vw, 32px); font-weight: 900; color: #fff; line-height: 1.5; }
    .skills-slider { position: relative; max-width: 1100px; margin: 0 auto; }
    .skills-slider__track {
      display: flex; gap: 24px; overflow: hidden;
    }
    .skills-slide { display: none; flex: 0 0 calc(50% - 12px); min-width: 0; }
    .skills-slide.is-active { display: block; }
    .skills-slide img { width: 100%; display: block; }
    .skills-slider__arrow {
      position: absolute; top: 50%; transform: translateY(-50%);
      width: 44px; height: 44px; border: none; background: none;
      font-size: 32px; color: rgba(255,255,255,0.7); cursor: pointer; z-index: 2;
    }
    .skills-slider__arrow:hover { color: #fff; }
    .skills-slider__arrow--prev { left: -52px; }
    .skills-slider__arrow--next { right: -52px; }
    .skills-slider__dots {
      display: flex; justify-content: center; gap: 10px; margin-top: 24px;
    }
    .skills-slider__dot {
      width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.3);
      border: none; cursor: pointer; padding: 0;
    }
    .skills-slider__dot.is-active { background: #fff; }
    @media (max-width: 768px) {
      .skills-slide { flex: 0 0 100%; }
      .skills-slider__arrow--prev { left: 8px; }
      .skills-slider__arrow--next { right: 8px; }
      .skills-slider__arrow { color: rgba(255,255,255,0.9); text-shadow: 0 0 8px rgba(0,0,0,0.5); }
    }

    /* ===== Plan ===== */
    .plan { padding: 80px 0; background: var(--color-bg-light); }
    .plan__inner { max-width: var(--max-width); margin: 0 auto; padding: 0 24px; }
    .plan__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: start; }
    .plan-card {
      border-radius: 20px; overflow: hidden; background: #fff;
      border: 2px solid #e8e8ee; padding: 40px 32px;
    }
    .plan-card--pro { border-color: var(--color-primary); }
    .plan-card__logo {
      width: 48px; height: 48px; margin-bottom: 16px;
    }
    .plan-card__logo img { width: 100%; height: 100%; object-fit: contain; }
    .plan-card__label {
      font-family: var(--font-en); font-size: 22px; font-weight: 500;
      letter-spacing: 0.05em; color: var(--color-text); margin-bottom: 4px;
    }
    .plan-card__name { font-size: 14px; color: var(--color-text-light); margin-bottom: 20px; }
    .plan-card__target {
      display: inline-block; font-size: 15px; color: var(--color-text);
      border: 1px solid #ddd; border-radius: 8px; padding: 10px 20px; margin-bottom: 24px;
    }
    .plan-card__price-row { margin-bottom: 8px; }
    .plan-card__price { display: flex; align-items: baseline; gap: 2px; }
    .plan-card__price-label { font-size: 14px; color: var(--color-text); font-weight: 500; }
    .plan-card__price-yen { font-family: var(--font-en); font-size: 24px; font-weight: 500; color: var(--color-text); }
    .plan-card__price-num {
      font-family: var(--font-en); font-size: clamp(40px, 6vw, 56px); font-weight: 500; color: var(--color-text); line-height: 1;
    }
    .plan-card__price-monthly {
      font-size: 14px; color: var(--color-text-light); margin-top: 4px; margin-bottom: 20px;
    }
    .plan-card__tags {
      display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;
    }
    .plan-card__tag {
      flex: 1; min-width: 0; text-align: center; padding: 10px 8px;
      border: 1px solid #ddd; border-radius: 8px; font-size: 11px; color: var(--color-text-light);
    }
    .plan-card__tag strong {
      display: block; font-size: 15px; font-weight: 900; color: var(--color-text); margin-top: 2px;
    }
    .plan-card__divider {
      display: flex; align-items: center; gap: 12px; margin: 24px 0;
    }
    .plan-card__divider::before, .plan-card__divider::after {
      content: ''; flex: 1; height: 1px; background: #ddd;
    }
    .plan-card__divider-text { font-size: 13px; color: var(--color-text-light); white-space: nowrap; }
    .plan-card__features { display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
    .plan-card__feature { display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 700; }
    .plan-card__feature--disabled { color: #ccc; }
    .plan-card__feature-icon {
      display: flex; align-items: center; justify-content: center;
      width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
      background: var(--color-primary);
    }
    .plan-card__feature--disabled .plan-card__feature-icon { background: #ddd; }
    .plan-card__cta {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      text-align: center; padding: 18px; border-radius: 50px;
      font-weight: 900; font-size: 16px; transition: all 0.2s; width: 100%;
    }
    .plan-card__cta::after { content: '>'; }
    .plan-card__cta--pink {
      background: linear-gradient(135deg, #ff4d8d, #ff6b9d); color: #fff; border: none;
    }
    .plan-card__cta--pink:hover { opacity: 0.9; }
    .plan-card__cta--blue {
      background: var(--color-primary); color: #fff; border: none;
    }
    .plan-card__cta--blue:hover { opacity: 0.9; }
    .plan__note { margin-top: 24px; font-size: 13px; color: var(--color-text-light); text-align: center; }
    .plan__payment {
      margin-top: 48px; padding: 48px 32px; background: #f0f0f0;
      border-radius: var(--radius-lg); text-align: center;
    }
    .plan__payment h3 { font-size: clamp(18px, 3vw, 24px); font-weight: 900; margin-bottom: 32px; }
    .plan__payment__methods { display: flex; justify-content: center; gap: 32px; flex-wrap: wrap; margin-bottom: 32px; }
    .plan__payment__method { text-align: center; flex: 1; max-width: 320px; }
    .plan__payment__method__name {
      display: inline-block; font-weight: 900; font-size: 16px;
      background: var(--color-primary); color: #fff;
      padding: 12px 48px; border-radius: 8px; margin-bottom: 12px;
    }
    .plan__payment__method__note { font-size: 12px; color: var(--color-text-light); }
    .plan__payment__cards {
      display: flex; justify-content: center; margin-top: 24px;
    }
    .plan__payment__cards img { max-width: 480px; width: 100%; height: auto; }
    @media (max-width: 768px) { .plan__grid { grid-template-columns: 1fr; } }

    /* ===== Interview ===== */
    .interview { padding: 80px 0; background: var(--color-white); }
    .interview__inner { max-width: var(--max-width); margin: 0 auto; padding: 0 24px; }
    .interview__grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 48px;
    }
    .interview-card { display: flex; flex-direction: column; }
    .interview-card__hero {
      position: relative; border-radius: 8px; overflow: hidden;
      aspect-ratio: 1/1; margin-bottom: 20px;
    }
    .interview-card__hero img {
      width: 100%; height: 100%; object-fit: cover; display: block;
      transition: transform 0.3s;
    }
    .interview-card:hover .interview-card__hero img { transform: scale(1.05); }
    .interview-card__overlay {
      position: absolute; inset: 0;
      background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 70%);
      display: flex; flex-direction: column; justify-content: space-between; padding: 14px 16px;
    }
    .interview-card__overlay-top {
      display: flex; justify-content: space-between; align-items: flex-start;
    }
    .interview-card__overlay-label {
      font-family: var(--font-en); font-size: clamp(11px, 1.4vw, 15px); font-weight: 700;
      color: #fff; letter-spacing: 0.05em;
    }
    .interview-card__overlay-label strong { color: #d4a817; }
    .interview-card__overlay-num {
      font-family: var(--font-en); font-size: clamp(12px, 1.4vw, 15px); font-weight: 500; color: rgba(255,255,255,0.85);
    }
    .interview-card__overlay-bottom { color: #fff; }
    .interview-card__overlay-name-en {
      font-family: var(--font-en); font-size: clamp(10px, 1.2vw, 13px); font-weight: 500;
      color: rgba(255,255,255,0.7); letter-spacing: 0.08em; margin-bottom: 6px;
    }
    .interview-card__overlay-ttl {
      font-size: clamp(14px, 1.8vw, 18px); font-weight: 900; line-height: 1.5;
      text-shadow: 0 1px 4px rgba(0,0,0,0.3);
    }
    .interview-card__overlay-logo {
      position: absolute; bottom: 12px; right: 14px;
      width: 28px; height: 28px; opacity: 0.7;
    }
    .interview-card__overlay-logo img { width: 100%; height: 100%; }
    .interview-card__desc {
      font-size: 14px; color: var(--color-text); line-height: 1.8;
      margin-bottom: 20px; flex: 1;
    }
    .interview-card__profile {
      display: flex; align-items: center; gap: 12px;
      padding-top: 16px; border-top: 1px solid #eee;
    }
    .interview-card__avatar {
      width: 48px; height: 48px; border-radius: 50%; overflow: hidden; flex-shrink: 0;
    }
    .interview-card__avatar img { width: 100%; height: 100%; object-fit: cover; }
    .interview-card__job { font-size: 12px; color: var(--color-text-light); margin-bottom: 2px; }
    .interview-card__name { font-size: 15px; font-weight: 700; }
    .interview__more { text-align: center; }
    @media (max-width: 640px) { .interview__grid { grid-template-columns: 1fr; } }

    /* ===== Flow ===== */
    .flow { padding: 80px 0; background: var(--color-dark); }
    .flow__inner { max-width: 800px; margin: 0 auto; padding: 0 24px; }
    .flow__head { text-align: center; margin-bottom: 56px; }
    .flow__head .tag { font-family: var(--font-en); font-size: 13px; color: rgba(255,255,255,0.4); letter-spacing: 0.15em; margin-bottom: 8px; }
    .flow__head h2 { font-size: clamp(22px, 3.5vw, 32px); font-weight: 900; color: #fff; }
    .flow__steps { display: flex; flex-direction: column; gap: 0; }
    .flow__step { display: flex; gap: 24px; align-items: flex-start; position: relative; }
    .flow__step:not(:last-child)::after {
      content: ''; position: absolute; left: 30px; top: 64px;
      width: 2px; height: calc(100% - 24px); background: rgba(83,58,252,0.4);
    }
    .flow__step__num {
      width: 60px; height: 60px; border-radius: 50%;
      background: var(--color-primary); flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      font-family: var(--font-en); font-size: 18px; font-weight: 900; color: #fff;
      position: relative; z-index: 1;
    }
    .flow__step__content { padding: 16px 0 40px; }
    .flow__step__label {
      font-size: 11px; font-weight: 700; color: var(--color-primary);
      font-family: var(--font-en); letter-spacing: 0.12em; margin-bottom: 4px;
    }
    .flow__step__ttl { font-size: 20px; font-weight: 900; color: #fff; margin-bottom: 8px; }
    .flow__step__txt { font-size: 14px; color: rgba(255,255,255,0.7); line-height: 1.8; }
    .flow__cta { text-align: center; margin-top: 16px; }

    /* ===== FAQ ===== */
    .faq { padding: 80px 0; background: var(--color-white); }
    .faq__inner { max-width: var(--max-width); margin: 0 auto; padding: 0 24px; }
    .faq__groups { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: start; }
    @media (max-width: 768px) { .faq__groups { grid-template-columns: 1fr; } }
    .faq__group { margin-bottom: 0; margin-top: 24px; }
    .faq__group:first-child { margin-top: 0; }
    .faq__group__ttl {
      font-size: 16px; font-weight: 700; color: var(--color-primary);
      margin-bottom: 16px; padding-left: 12px;
      border-left: 3px solid var(--color-primary);
    }
    .faq__list { display: flex; flex-direction: column; gap: 12px; }
    .faq__item { border: 1px solid rgba(0,0,0,0.08); border-radius: var(--radius); overflow: hidden; }
    .faq__item__q {
      display: flex; align-items: center; gap: 12px; padding: 18px 20px;
      cursor: pointer; font-weight: 700; font-size: 15px;
      background: #fff; transition: background 0.2s;
      width: 100%; text-align: left;
    }
    .faq__item__q:hover { background: var(--color-bg-light); }
    .faq__item__q::before {
      content: 'Q'; width: 28px; height: 28px; border-radius: 50%;
      background: var(--color-primary); color: #fff;
      display: flex; align-items: center; justify-content: center;
      font-family: var(--font-en); font-size: 13px; font-weight: 900; flex-shrink: 0;
    }
    .faq__item__q::after {
      content: '+'; margin-left: auto; font-size: 20px; color: var(--color-primary);
      transition: transform 0.3s; flex-shrink: 0;
    }
    .faq__item.is-open .faq__item__q::after { content: '\\2212'; }
    .faq__item__a {
      padding: 0 20px; max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s;
      font-size: 14px; line-height: 1.9; color: var(--color-text-light);
      background: var(--color-bg-light);
    }
    .faq__item.is-open .faq__item__a { max-height: 400px; padding: 16px 20px; }

    /* ===== CTA Section ===== */
    .cta-section {
      padding: 80px 0;
      background: linear-gradient(135deg, var(--color-primary) 0%, #3b25d4 100%);
      text-align: center;
    }
    .cta-section__inner { max-width: 700px; margin: 0 auto; padding: 0 24px; }
    .cta-section__tag {
      font-family: var(--font-en); font-size: 12px; color: rgba(255,255,255,0.6);
      letter-spacing: 0.2em; margin-bottom: 16px;
    }
    .cta-section__ttl {
      font-size: clamp(24px, 4vw, 40px); font-weight: 900; color: #fff;
      line-height: 1.4; margin-bottom: 20px;
    }
    .cta-section__ttl .accent { color: var(--color-accent); }
    .cta-section__sub { font-size: 15px; color: rgba(255,255,255,0.8); margin-bottom: 36px; line-height: 1.8; }
    .cta-section__img { max-width: 600px; margin: 0 auto 32px; border-radius: var(--radius); overflow: hidden; }
    .cta-section__img img { width: 100%; }
    .cta-section__btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
    .cta-section__note { margin-top: 16px; font-size: 12px; color: rgba(255,255,255,0.5); }

    /* ===== Footer ===== */
    .footer { background: var(--color-dark); color: rgba(255,255,255,0.8); }
    .footer__main { padding: 60px 0 40px; }
    .footer__inner { max-width: var(--max-width); margin: 0 auto; padding: 0 24px; }
    .footer__grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; }
    .footer__brand__logo img { height: 32px; width: auto; filter: brightness(0) invert(1); margin-bottom: 16px; }
    .footer__brand__catch { font-size: 14px; margin-bottom: 20px; line-height: 1.8; }
    .footer__brand__cta a {
      display: inline-flex; align-items: center;
      background: linear-gradient(135deg, var(--color-accent) 0%, #ffb800 100%);
      color: var(--color-dark); font-weight: 700; font-size: 13px;
      padding: 12px 24px; border-radius: 50px;
    }
    .footer__col__ttl { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.4); letter-spacing: 0.1em; margin-bottom: 16px; }
    .footer__col__list { display: flex; flex-direction: column; gap: 10px; }
    .footer__col__list li a { font-size: 13px; color: rgba(255,255,255,0.7); transition: color 0.2s; }
    .footer__col__list li a:hover { color: #fff; }
    .footer__bottom {
      border-top: 1px solid rgba(255,255,255,0.08);
      padding: 20px 0; text-align: center;
    }
    .footer__bottom p { font-size: 12px; color: rgba(255,255,255,0.3); }
    @media (max-width: 768px) {
      .footer__grid { grid-template-columns: 1fr 1fr; gap: 32px; }
      .footer__brand { grid-column: 1 / -1; }
    }
    @media (max-width: 480px) { .footer__grid { grid-template-columns: 1fr; } }

    /* ===== Animation ===== */
    .fadein { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .fadein.is-visible { opacity: 1; transform: translateY(0); }
    .fadein.delay-1 { transition-delay: 0.1s; }
    .fadein.delay-2 { transition-delay: 0.2s; }
    .fadein.delay-3 { transition-delay: 0.3s; }
      `}} />

      {/* ===== HEADER ===== */}
      <header className="header">
        <div className="header__inner">
          <div className="header__logo">
            <a href="https://generative-ai.bytech.jp/"><img src="/bytech/assets/images/logo-black.svg" alt="バイテック生成AI" /></a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav__list">
              <li><a href="https://generative-ai.bytech.jp/support/" target="_blank">サポート詳細</a></li>
              <li>
                <a href="#courses">コース一覧</a>
                <div className="header__dropdown">
                  <a href="https://generative-ai.bytech.jp/chatgpt-master/" target="_blank">ChatGPTマスターコース</a>
                  <a href="https://generative-ai.bytech.jp/gemini-master/" target="_blank">Geminiマスターコース</a>
                  <a href="https://generative-ai.bytech.jp/copilot-master/" target="_blank">Copilotマスターコース</a>
                  <a href="https://generative-ai.bytech.jp/dify-master/" target="_blank">Difyマスターコース</a>
                  <a href="https://generative-ai.bytech.jp/notebooklm-master/" target="_blank">NotebookLMマスターコース</a>
                  <a href="https://generative-ai.bytech.jp/business-worker/" target="_blank">ビジネスワーカーコース</a>
                  <a href="https://generative-ai.bytech.jp/ai-writer/" target="_blank">AIウェブライターコース</a>
                  <a href="https://generative-ai.bytech.jp/ai-image-creator/" target="_blank">AI画像クリエイターコース</a>
                  <a href="https://generative-ai.bytech.jp/ai-movie-creator/" target="_blank">AI動画クリエイターコース</a>
                  <a href="https://generative-ai.bytech.jp/generative-ai-passport/" target="_blank">生成AIパスポート試験対策コース</a>
                </div>
              </li>
              <li><a href="https://generative-ai.bytech.jp/plan/" target="_blank">料金プラン</a></li>
              <li><a href="https://bytech.jp/blog/category/interview/" target="_blank">受講生インタビュー</a></li>
              <li><a href="#faq">よくある質問</a></li>
              <li><a href="https://bytech.jp/biz" target="_blank">法人研修 ↗</a></li>
            </ul>
            <div className="header__nav__cta">
              <a href="https://generative-ai.bytech.jp/counseling/" target="_blank" className="header__cta-btn header__cta-btn--outline" style={{borderRadius: '50px', padding: '10px 28px', border: '2px solid var(--color-dark)', color: 'var(--color-dark)', fontSize: '14px'}}>まずは無料で相談してみる →</a>
            </div>
          </nav>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__content">
            <h1 className="hero__ttl">
              <span className="line1">最短<strong>2</strong>ヶ月で、</span>
              <span className="line2"><span className="hl-box">年収・キャリアを上げる</span></span>
              <span className="line3">AI活用スキルを武器に。</span>
            </h1>
            <p className="hero__sub">成果直結の実践型オンラインAIスクール</p>
            <div className="hero__badges">
              <img src="/bytech/assets/images/stats-badge-bar.svg" alt="案件獲得率95% 受講生満足度96% カリキュラム数600以上" />
            </div>
            <a href="https://generative-ai.bytech.jp/counseling/" target="_blank" className="btn-primary" style={{marginTop: '24px', fontSize: '16px', padding: '16px 40px'}}>無料カウンセリングで相談する</a>
          </div>
        </div>
        <p className="hero__note" style={{maxWidth: 'var(--max-width)', margin: '0 auto', padding: '8px 24px 80px'}}>
          ※1_2025年1月~8月受講生・卒業生300名へのアンケート調査　※2_2025年1月~8月受講生・卒業生300名へのアンケート調査　※3_2024年4月~2025年4月受講生・卒業生合計で算出
        </p>
      </section>

      {/* ===== STUDENT VOICES ===== */}
      <section className="voices" style={{marginTop: '-60px', paddingTop: 0, position: 'relative', zIndex: 3}}>
        <div>
          <div className="voices__carousel fadein" style={{padding: '0 16px'}}>
            <div className="voices__item"><img src="/bytech/assets/images/artboard-5.webp" alt="受講生の声" loading="lazy" /></div>
            <div className="voices__item"><img src="/bytech/assets/images/artboard-1.webp" alt="受講生の声" loading="lazy" /></div>
            <div className="voices__item"><img src="/bytech/assets/images/artboard-6.webp" alt="受講生の声" loading="lazy" /></div>
            <div className="voices__item"><img src="/bytech/assets/images/artboard-4.webp" alt="受講生の声" loading="lazy" /></div>
            <div className="voices__item"><img src="/bytech/assets/images/artboard-19-v.webp" alt="受講生の声" loading="lazy" /></div>
            <div className="voices__item"><img src="/bytech/assets/images/artboard-7.webp" alt="受講生の声" loading="lazy" /></div>
            <div className="voices__item"><img src="/bytech/assets/images/artboard-2.webp" alt="受講生の声" loading="lazy" /></div>
            <div className="voices__item"><img src="/bytech/assets/images/artboard-20-v.webp" alt="受講生の声" loading="lazy" /></div>
            <div className="voices__item"><img src="/bytech/assets/images/artboard-3.webp" alt="受講生の声" loading="lazy" /></div>
            <div className="voices__item"><img src="/bytech/assets/images/artboard-9.webp" alt="受講生の声" loading="lazy" /></div>
            <div className="voices__item"><img src="/bytech/assets/images/artboard-8.webp" alt="受講生の声" loading="lazy" /></div>
            <div className="voices__item"><img src="/bytech/assets/images/artboard-18.webp" alt="受講生の声" loading="lazy" /></div>
            <div className="voices__item"><img src="/bytech/assets/images/artboard-10.webp" alt="受講生の声" loading="lazy" /></div>
          </div>
          <p style={{fontSize: '11px', color: 'var(--color-text-light)', marginTop: '12px', textAlign: 'center', padding: '0 24px'}}>※ 個人の感想・実績であり、効果を保証するものではありません</p>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section style={{padding: '80px 0', background: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden'}}>
        <div style={{maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 24px'}}>
          <div className="fadein" style={{display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#fff', border: '2px solid #eee', borderRadius: '16px', padding: '16px 40px', marginBottom: '48px', boxShadow: 'var(--shadow)'}}>
            <img src="/bytech/assets/images/logo-black.svg" alt="byTech" style={{height: '36px'}} />
            <span style={{fontSize: '28px', fontWeight: 900}}>とは？</span>
          </div>

          <div className="fadein" style={{position: 'relative'}}>
            <h2 style={{fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, lineHeight: 1.6, marginBottom: '12px'}}>
              未経験から実践ベースでAI活用スキルを学び、<br />
              <span style={{background: 'var(--color-primary)', color: '#fff', padding: '4px 16px', display: 'inline-block'}}>最短で実務で使える成果に繋げる</span>
            </h2>
            <p style={{fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 900}}>超実践型のオンラインAIスクール</p>

            <div style={{position: 'absolute', top: '-20px', right: 0}} className="pc-only">
              <img src="/bytech/assets/images/no1.svg" alt="AIがおすすめする生成AIスクール No.1" style={{width: '200px'}} />
            </div>
          </div>

          <div className="fadein" style={{marginTop: '40px', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto'}}>
            <img src="/bytech/assets/images/KV2.webp" alt="バイテック生成AI" style={{width: '100%', borderRadius: 'var(--radius)'}} />
          </div>

          <div className="sp-only fadein" style={{marginTop: '24px', textAlign: 'center'}}>
            <img src="/bytech/assets/images/no1.svg" alt="AIがおすすめする生成AIスクール No.1" style={{width: '160px'}} />
          </div>

          <p style={{fontSize: '11px', color: 'var(--color-text-light)', marginTop: '24px'}}>
            ※ 調査期間：2025年1月~2026年1月・調査会社：株式会社Librex・対象条件：ChatGPT / Gemini / Claude / Gensparkでの検索結果
          </p>
        </div>
      </section>

      {/* ===== IF YOU HAD AI SKILLS ===== */}
      <section style={{padding: '80px 0', background: '#fff'}}>
        <div style={{maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 24px'}}>
          <div className="fadein" style={{textAlign: 'center', marginBottom: '56px'}}>
            <h2 style={{fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 900, lineHeight: 1.6}}>
              もしあなたに<span style={{borderBottom: '3px solid var(--color-dark)'}}>AI活用スキル</span>があれば<br />
              <span style={{borderBottom: '3px solid var(--color-dark)'}}>2ヶ月</span>でこう変わる
            </h2>
            <p style={{fontFamily: 'var(--font-en)', fontSize: '14px', color: 'var(--color-text-light)', marginTop: '8px', letterSpacing: '0.05em'}}>If you had AI utilization skills</p>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px'}}>
            {/* Card 1 */}
            <div className="fadein" style={{background: '#fff', borderRadius: 'var(--radius)', overflow: 'hidden'}}>
              <div style={{position: 'relative'}}>
                <img src="/bytech/assets/images/voice-1.webp" alt="飯田 恵さん" style={{width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block'}} />
                <span style={{position: 'absolute', top: '12px', left: '12px', background: 'var(--color-dark)', color: '#fff', fontSize: '13px', fontWeight: 700, padding: '4px 12px', borderRadius: '4px'}}>飯田 恵さん（30代）</span>
              </div>
              <div style={{padding: '16px 0'}}>
                <p style={{fontSize: '15px', fontWeight: 900, lineHeight: 1.5, marginBottom: '12px'}}>広告企画の提案数が<br />Gemini活用で10倍以上に</p>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px'}}>
                  <span style={{fontSize: '12px', background: 'var(--color-bg-light)', padding: '4px 10px', borderRadius: '4px'}}>新企画のブレストから<br />提案までの業務</span>
                  <span style={{color: 'var(--color-primary)', fontWeight: 900}}>→</span>
                  <span style={{fontSize: '12px', background: 'var(--color-primary)', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontWeight: 700}}>80%工数削減<br />新規施策の実施数UP!</span>
                </div>
                <p style={{fontSize: '12px', color: 'var(--color-text-light)', lineHeight: 1.7}}>元々は、YoutubeやXを見ながら見よう見まねで色々やっていたのですが、<span style={{color: 'var(--color-primary)', fontWeight: 700}}>情報早すぎなのと、そこまで深い課題解決はできない</span>というところに悩んでいました。</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="fadein delay-1" style={{background: '#fff', borderRadius: 'var(--radius)', overflow: 'hidden'}}>
              <div style={{position: 'relative'}}>
                <img src="/bytech/assets/images/voice-2.webp" alt="上原 源さん" style={{width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block'}} />
                <span style={{position: 'absolute', top: '12px', left: '12px', background: 'var(--color-dark)', color: '#fff', fontSize: '13px', fontWeight: 700, padding: '4px 12px', borderRadius: '4px'}}>上原 源さん（20代）</span>
              </div>
              <div style={{padding: '16px 0'}}>
                <p style={{fontSize: '15px', fontWeight: 900, lineHeight: 1.5, marginBottom: '12px'}}>プログラミング挫折から<br />受講3ヶ月目で案件獲得！</p>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px'}}>
                  <span style={{fontSize: '12px', background: 'var(--color-bg-light)', padding: '4px 10px', borderRadius: '4px'}}>プログラミング挫折</span>
                  <span style={{color: 'var(--color-primary)', fontWeight: 900}}>→</span>
                  <span style={{fontSize: '12px', background: 'var(--color-primary)', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontWeight: 700}}>AI動画で<br />副業収入5万円UP</span>
                </div>
                <p style={{fontSize: '12px', color: 'var(--color-text-light)', lineHeight: 1.7}}>実際にバイテックさんを受講する前に、一度プログラミングで挫折しており、正直できるかめっちゃ不安でしたが、<span style={{color: 'var(--color-primary)', fontWeight: 700}}>AIスキルの習得スピードの低さに驚きました。</span></p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="fadein delay-2" style={{background: '#fff', borderRadius: 'var(--radius)', overflow: 'hidden'}}>
              <div style={{position: 'relative'}}>
                <img src="/bytech/assets/images/voice-3.webp" alt="近藤 由紀さん" style={{width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block'}} />
                <span style={{position: 'absolute', top: '12px', left: '12px', background: 'var(--color-dark)', color: '#fff', fontSize: '13px', fontWeight: 700, padding: '4px 12px', borderRadius: '4px'}}>近藤 由紀さん（30代）</span>
              </div>
              <div style={{padding: '16px 0'}}>
                <p style={{fontSize: '15px', fontWeight: 900, lineHeight: 1.5, marginBottom: '12px'}}>社内のAI導入率が低い中で<br />業務効率化を実現</p>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px'}}>
                  <span style={{fontSize: '12px', background: 'var(--color-bg-light)', padding: '4px 10px', borderRadius: '4px'}}>アパレル企業</span>
                  <span style={{color: 'var(--color-primary)', fontWeight: 900}}>→</span>
                  <span style={{fontSize: '12px', background: 'var(--color-primary)', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontWeight: 700}}>70%工数削減<br />顧客満足度UP!</span>
                </div>
                <p style={{fontSize: '12px', color: 'var(--color-text-light)', lineHeight: 1.7}}>生成AIについては、なんとなく知っていましたが実際に業務への活用となると全然イメージできなかったのでバイテックさんを受講しました。</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="fadein delay-3" style={{background: '#fff', borderRadius: 'var(--radius)', overflow: 'hidden'}}>
              <div style={{position: 'relative'}}>
                <img src="/bytech/assets/images/voice-4.webp" alt="Y.Kさん" style={{width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block'}} />
                <span style={{position: 'absolute', top: '12px', left: '12px', background: 'var(--color-dark)', color: '#fff', fontSize: '13px', fontWeight: 700, padding: '4px 12px', borderRadius: '4px'}}>Y.Kさん（30代）</span>
              </div>
              <div style={{padding: '16px 0'}}>
                <p style={{fontSize: '15px', fontWeight: 900, lineHeight: 1.5, marginBottom: '12px'}}><span style={{color: 'var(--color-primary)'}}>AI初心者</span>から<br />Difyで事務作業を自動化！</p>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px'}}>
                  <span style={{fontSize: '12px', background: 'var(--color-bg-light)', padding: '4px 10px', borderRadius: '4px'}}>不動産営業</span>
                  <span style={{color: 'var(--color-primary)', fontWeight: 900}}>→</span>
                  <span style={{fontSize: '12px', background: 'var(--color-primary)', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontWeight: 700}}>事務作業の自動化<br />成約率10%UP</span>
                </div>
                <p style={{fontSize: '12px', color: 'var(--color-text-light)', lineHeight: 1.7}}>社内全体でAIを使い始めていたので、個人的にスキルアップも兼ねてバイテックさんを受講しました。最初は簡単作業くらいの効果でしたが徐々に成果が出ました。</p>
              </div>
            </div>
          </div>

          <div style={{textAlign: 'center', marginTop: '48px'}} className="fadein">
            <a href="https://bytech.jp/blog/category/interview/" target="_blank" className="btn-purple">受講生インタビューを見る &gt;</a>
          </div>
        </div>
      </section>

      {/* ===== PROBLEM ===== */}
      <section id="problem" style={{padding: '80px 0', background: '#fff', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'var(--font-en)', fontSize: 'clamp(80px, 15vw, 200px)', fontWeight: 900, color: 'rgba(0,0,0,0.03)', whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 0}}>PROBLEM</div>

        <div style={{maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1}}>
          <div className="fadein" style={{textAlign: 'center', marginBottom: '56px'}}>
            <h2 style={{fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, lineHeight: 1.5}}>こんなお悩み・課題ありませんか？</h2>
            <p style={{fontFamily: 'var(--font-en)', fontSize: '14px', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.1em', marginTop: '8px'}}>PROBLEM</p>
          </div>

          <div className="fadein" style={{display: 'flex', alignItems: 'center', gap: '48px', maxWidth: '900px', margin: '0 auto'}}>
            <div style={{flex: '0 0 40%', maxWidth: '360px'}} className="pc-only">
              <img src="https://generative-ai.bytech.jp/wp-content/uploads/2026/02/Isometric-man-with-laptop-working-on-sofa-at-his-house.svg" alt="お悩みイラスト" style={{width: '100%'}} />
            </div>

            <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '24px'}}>
              <div style={{display: 'flex', alignItems: 'flex-start', gap: '14px', fontSize: 'clamp(15px, 2.5vw, 18px)', lineHeight: 1.6, fontWeight: 700}}>
                <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', background: 'var(--color-primary)', borderRadius: '50%', flexShrink: 0, marginTop: '2px'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                <p>ChatGPTは毎日使っているが<span style={{background: 'linear-gradient(transparent 60%, #ffe066 60%)', fontWeight: 900}}>使いこなせている</span>気がしない</p>
              </div>
              <div style={{display: 'flex', alignItems: 'flex-start', gap: '14px', fontSize: 'clamp(15px, 2.5vw, 18px)', lineHeight: 1.6, fontWeight: 700}}>
                <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', background: 'var(--color-primary)', borderRadius: '50%', flexShrink: 0, marginTop: '2px'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                <p>欲しい回答が出ないのでAIが本当に<span style={{background: 'linear-gradient(transparent 60%, #ffe066 60%)', fontWeight: 900}}>仕事で使えるか</span>疑問</p>
              </div>
              <div style={{display: 'flex', alignItems: 'flex-start', gap: '14px', fontSize: 'clamp(15px, 2.5vw, 18px)', lineHeight: 1.6, fontWeight: 700}}>
                <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', background: 'var(--color-primary)', borderRadius: '50%', flexShrink: 0, marginTop: '2px'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                <p>Xで情報収集はしてるが早くて<span style={{background: 'linear-gradient(transparent 60%, #ffe066 60%)', fontWeight: 900}}>全く追いつけない</span></p>
              </div>
              <div style={{display: 'flex', alignItems: 'flex-start', gap: '14px', fontSize: 'clamp(15px, 2.5vw, 18px)', lineHeight: 1.6, fontWeight: 700}}>
                <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', background: 'var(--color-primary)', borderRadius: '50%', flexShrink: 0, marginTop: '2px'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                <p>無料セミナーに参加はしたが<span style={{background: 'linear-gradient(transparent 60%, #ffe066 60%)', fontWeight: 900}}>実践レベルでは使えない</span></p>
              </div>
              <div style={{display: 'flex', alignItems: 'flex-start', gap: '14px', fontSize: 'clamp(15px, 2.5vw, 18px)', lineHeight: 1.6, fontWeight: 700}}>
                <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', background: 'var(--color-primary)', borderRadius: '50%', flexShrink: 0, marginTop: '2px'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                <p>AI副業の情報は<span style={{background: 'linear-gradient(transparent 60%, #ffe066 60%)', fontWeight: 900}}>詐欺っぽい物ばかり</span>で不安</p>
              </div>
            </div>
          </div>

          <div style={{textAlign: 'center', margin: '48px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0}}>
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none" style={{opacity: 0.4}}><polyline points="4,2 20,16 36,2" stroke="var(--color-primary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none" style={{opacity: 0.7, marginTop: '-6px'}}><polyline points="4,2 20,16 36,2" stroke="var(--color-primary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none" style={{opacity: 1, marginTop: '-6px'}}><polyline points="4,2 20,16 36,2" stroke="var(--color-primary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
          </div>

          <div className="fadein" style={{textAlign: 'center'}}>
            <div style={{display: 'inline-block', background: 'var(--color-primary)', color: '#fff', fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 900, padding: '8px 32px', borderRadius: '8px', marginBottom: '16px'}}>バイテックなら</div>
            <h3 style={{fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 900, lineHeight: 1.5}}>
              <span style={{background: 'var(--color-primary)', color: '#fff', padding: '4px 12px'}}>{'"あなたが欲しい"AI活用スキルを最短で習得'}</span>
            </h3>
          </div>
        </div>
      </section>

      {/* ===== ENVIRONMENT ===== */}
      <section id="environment" style={{padding: '80px 0 0', background: '#1a1a1a', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -60%)', fontFamily: 'var(--font-en)', fontSize: 'clamp(60px, 12vw, 160px)', fontWeight: 900, color: 'rgba(255,255,255,0.04)', whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 0}}>ENVIRONMENT</div>

        <div style={{maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1}}>
          <div className="fadein" style={{textAlign: 'center', marginBottom: '24px'}}>
            <h2 style={{fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 900, lineHeight: 1.5, color: '#fff'}}>最短で成果に繋げるバイテック独自の学習環境</h2>
            <p style={{fontFamily: 'var(--font-en)', fontSize: '14px', fontWeight: 700, color: '#b8960c', letterSpacing: '0.1em', marginTop: '8px'}}>ENVIRONMENT</p>
          </div>

          <div style={{textAlign: 'center', marginBottom: '24px'}}>
            <div style={{display: 'inline-block', width: '80%', maxWidth: '700px', height: '2px', background: 'repeating-linear-gradient(90deg, #b8960c 0px, #b8960c 4px, transparent 4px, transparent 8px)'}}></div>
          </div>

          <div className="fadein" style={{textAlign: 'center', marginBottom: '40px'}}>
            <p style={{fontSize: 'clamp(16px, 3vw, 24px)', fontWeight: 900, color: '#d4a817', lineHeight: 1.6}}>あなたの課題解決やゴール達成に必要な学習環境を設計</p>
          </div>

          <div style={{textAlign: 'center', marginBottom: '48px'}}>
            <div style={{display: 'inline-block', width: '80%', maxWidth: '700px', height: '2px', background: 'repeating-linear-gradient(90deg, #b8960c 0px, #b8960c 4px, transparent 4px, transparent 8px)'}}></div>
          </div>

          <div className="fadein" style={{textAlign: 'center', marginBottom: '48px'}}>
            <p style={{fontSize: 'clamp(16px, 2.5vw, 22px)', fontWeight: 700, color: '#fff', lineHeight: 1.8}}>あなた専用のカリキュラムとサポートで<br />最短で学びを成果に変える</p>
          </div>

          <div className="fadein" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, maxWidth: '1000px', margin: '0 auto 56px', flexWrap: 'wrap'}}>
            <div style={{flex: 1, minWidth: '220px', maxWidth: '320px'}}>
              <img src="/bytech/assets/images/env-curriculum.webp" alt="600以上のカリキュラム" style={{width: '100%', display: 'block'}} />
            </div>
            <span style={{fontSize: '22px', color: 'rgba(255,255,255,0.4)', padding: '0 16px', fontWeight: 300}}>×</span>
            <div style={{flex: 1, minWidth: '220px', maxWidth: '320px'}}>
              <img src="/bytech/assets/images/env-consulting.webp" alt="AI活用コンサルティング" style={{width: '100%', display: 'block'}} />
            </div>
            <span style={{fontSize: '22px', color: 'rgba(255,255,255,0.4)', padding: '0 16px', fontWeight: 300}}>×</span>
            <div style={{flex: 1, minWidth: '220px', maxWidth: '320px'}}>
              <img src="/bytech/assets/images/env-practice.webp" alt="100種以上の実践課題" style={{width: '100%', display: 'block'}} />
            </div>
          </div>

          <div className="fadein" style={{maxWidth: '720px', margin: '0 auto', position: 'relative'}}>
            <div style={{textAlign: 'center'}}>
              <div style={{display: 'inline-block', width: 0, height: 0, borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderBottom: '20px solid #f5f5f5'}}></div>
            </div>
            <div style={{background: '#f5f5f5', borderRadius: '12px', padding: '40px 32px', textAlign: 'center', position: 'relative', border: '2px solid #e0e0e0'}}>
              <div style={{position: 'absolute', top: '12px', left: '12px', width: '20px', height: '20px', borderTop: '3px solid #1a1a1a', borderLeft: '3px solid #1a1a1a'}}></div>
              <div style={{position: 'absolute', top: '12px', right: '12px', width: '20px', height: '20px', borderTop: '3px solid #1a1a1a', borderRight: '3px solid #1a1a1a'}}></div>
              <div style={{position: 'absolute', bottom: '12px', left: '12px', width: '20px', height: '20px', borderBottom: '3px solid #1a1a1a', borderLeft: '3px solid #1a1a1a'}}></div>
              <div style={{position: 'absolute', bottom: '12px', right: '12px', width: '20px', height: '20px', borderBottom: '3px solid #1a1a1a', borderRight: '3px solid #1a1a1a'}}></div>

              <p style={{fontSize: 'clamp(16px, 3vw, 22px)', fontWeight: 900, lineHeight: 1.7, color: '#1a1a1a'}}>
                AI業界の最前線で活躍する講師陣が<br />
                <span style={{color: 'var(--color-primary)', fontWeight: 900}}>あなたの&quot;できたらいいな&quot;</span>を現実にします！
              </p>
              <p style={{fontSize: '14px', color: '#666', marginTop: '20px', lineHeight: 1.8}}>
                20名以上の様々な領域に特化したメンターの中から<br />
                あなたの課題とゴールに最適な専任AIメンターがゴールまで徹底サポート
              </p>
            </div>
          </div>
        </div>

        <div style={{padding: '48px 24px 80px'}}>
          <div style={{textAlign: 'center'}}>
            <a href="https://generative-ai.bytech.jp/counseling/" target="_blank" className="btn-primary">無料カウンセリングで相談する</a>
          </div>
        </div>
      </section>

      {/* ===== 5 REASONS ===== */}
      <section className="features u-section" id="aboutus">
        <div className="features__inner">
          <div className="sec-header fadein">
            <h2 className="sec-header__ttl">バイテックが最短で<br />実務レベルのAI人材を育成できる<br /><span style={{color: '#d4a817'}}>5つの理由</span></h2>
            <span className="sec-header__tag" style={{color: '#e05a4f', marginTop: '12px'}}>REASON</span>
          </div>

          <div className="features__list">
            {/* Reason 1 */}
            <div className="fadein">
              <div className="feature-item">
                <div className="feature-item__content">
                  <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', overflow: 'hidden'}}>
                    <div className="feature-item__badge"><strong>01</strong></div>
                    <span style={{fontSize: '16px', fontWeight: 700, color: '#1a1a1a', whiteSpace: 'nowrap'}}>生涯学習が可能な</span>
                    <div style={{flex: 1, height: '2px', background: '#1a1a1a'}}></div>
                  </div>
                  <h3 className="feature-item__ttl">受講目的に合わせて学習できる<br /><span className="feature-item__highlight">10コース600以上の</span>カリキュラム</h3>
                  <p className="feature-item__txt">ChatGPTやGeminiなどの主要AIマスターコースからAI副業で収益化を目指せる副業コースまで、全て買い切りで無期限で見ることができます。受講生の課題や目的に合わせてカリキュラムをカスタマイズできるので、自分に必要なAI活用スキルを身につけることが可能です。</p>
                </div>
                <div className="feature-item__img">
                  <img src="/bytech/assets/img/lp_img_feature_step01.png" alt="600以上のカリキュラム" loading="lazy" />
                </div>
              </div>
              <div style={{marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '32px'}}>
                <h4 style={{fontSize: 'clamp(16px, 2.5vw, 22px)', fontWeight: 900, lineHeight: 1.5, marginBottom: '8px'}}>最新のAIスキルが学べるアップデートされるカリキュラム</h4>
                <p style={{fontSize: '14px', color: 'var(--color-text-light)', lineHeight: 1.7, marginBottom: '16px'}}>カリキュラムは毎月追加・アップデートされているので、継続して最新のカリキュラムを学習することができます。</p>
                <p style={{fontSize: '13px', color: 'var(--color-text-light)', textAlign: 'right', marginBottom: '12px'}}>横にスクロールできます ——→</p>
                <div className="course-scroll">
                  <div className="course-scroll__card"><img src="/bytech/assets/images/course-chatgpt.webp" alt="ChatGPT" /><div className="course-scroll__card__body"><div className="course-scroll__card__name">ChatGPTマスターコース</div><div className="course-scroll__card__sub">全8チャプター｜45レッスン</div></div></div>
                  <div className="course-scroll__card"><img src="/bytech/assets/images/course-gemini.webp" alt="Gemini" /><div className="course-scroll__card__body"><div className="course-scroll__card__name">Geminiマスターコース</div><div className="course-scroll__card__sub">全6チャプター｜36レッスン</div></div></div>
                  <div className="course-scroll__card"><img src="/bytech/assets/images/course-copilot.webp" alt="Copilot" /><div className="course-scroll__card__body"><div className="course-scroll__card__name">Copilotマスターコース</div><div className="course-scroll__card__sub">全6チャプター｜48レッスン</div></div></div>
                  <div className="course-scroll__card"><img src="/bytech/assets/images/course-dify.webp" alt="Dify" /><div className="course-scroll__card__body"><div className="course-scroll__card__name">Difyマスターコース</div><div className="course-scroll__card__sub">全21チャプター｜82レッスン</div></div></div>
                  <div className="course-scroll__card"><img src="/bytech/assets/images/course-notebooklm.webp" alt="NotebookLM" /><div className="course-scroll__card__body"><div className="course-scroll__card__name">NotebookLMマスターコース</div><div className="course-scroll__card__sub">全7チャプター｜31レッスン</div></div></div>
                  <div className="course-scroll__card"><img src="/bytech/assets/images/course-business.webp" alt="ビジネスワーカー" /><div className="course-scroll__card__body"><div className="course-scroll__card__name">ビジネスワーカーコース</div><div className="course-scroll__card__sub">全19チャプター｜92レッスン</div></div></div>
                  <div className="course-scroll__card"><img src="/bytech/assets/images/course-writer.webp" alt="AIウェブライター" /><div className="course-scroll__card__body"><div className="course-scroll__card__name">AIウェブライターコース</div><div className="course-scroll__card__sub">全18チャプター｜46レッスン</div></div></div>
                  <div className="course-scroll__card"><img src="/bytech/assets/images/course-image.webp" alt="AI画像クリエイター" /><div className="course-scroll__card__body"><div className="course-scroll__card__name">AI画像クリエイターコース</div><div className="course-scroll__card__sub">全31チャプター｜89レッスン</div></div></div>
                  <div className="course-scroll__card"><img src="/bytech/assets/images/course-video.webp" alt="AI動画クリエイター" /><div className="course-scroll__card__body"><div className="course-scroll__card__name">AI動画クリエイターコース</div><div className="course-scroll__card__sub">全4チャプター｜19レッスン</div></div></div>
                  <div className="course-scroll__card"><img src="/bytech/assets/images/course-passport.webp" alt="生成AIパスポート" /><div className="course-scroll__card__body"><div className="course-scroll__card__name">生成AIパスポートコース</div><div className="course-scroll__card__sub">全15チャプター｜32レッスン</div></div></div>
                </div>
              </div>
            </div>

            {/* Reason 2 */}
            <div className="feature-item reverse fadein">
              <div className="feature-item__content">
                <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', overflow: 'hidden'}}>
                  <div className="feature-item__badge"><strong>02</strong></div>
                  <span style={{fontSize: '16px', fontWeight: 700, color: '#1a1a1a', whiteSpace: 'nowrap'}}>ポートフォリオとして使える</span>
                  <div style={{flex: 1, height: '2px', background: '#1a1a1a'}}></div>
                </div>
                <h3 className="feature-item__ttl">学びを<span className="feature-item__highlight">見える形の成果</span>にする<br />AI活用スキル証明課題</h3>
                <p className="feature-item__txt">バイテックのAIメンター陣がカウンセリング参加者含めた5000人以上のヒアリングをもとに制作した初級〜上級まで網羅する証明書発行課題。各主要AIコース5コース全てにスキル証明課題が設置されているので、各種ツールでできるタスクや課題解決スキルを見える形で証明することができます。</p>
              </div>
              <div className="feature-item__img">
                <img src="/bytech/assets/img/lp_img_feature_step02.png" alt="100種以上の実践課題" loading="lazy" />
              </div>
            </div>

            {/* Reason 3 */}
            <div className="feature-item fadein">
              <div className="feature-item__content">
                <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', overflow: 'hidden'}}>
                  <div className="feature-item__badge"><strong>03</strong></div>
                  <span style={{fontSize: '16px', fontWeight: 700, color: '#1a1a1a', whiteSpace: 'nowrap'}}>領域ごとに選び抜かれた</span>
                  <div style={{flex: 1, height: '2px', background: '#1a1a1a'}}></div>
                </div>
                <h3 className="feature-item__ttl">専属AIメンターの伴走サポート</h3>
                <p className="feature-item__txt">20名以上の様々な領域に特化したメンターの中からあなたの課題とゴールに最適な専任AIメンターがゴールまで徹底サポート。業務でのAI活用から副業収入UP・AIフリーランスを目指す方もあなたに最適な専任メンターが最短でゴールまで導きます。</p>
                <p style={{marginTop: '12px', fontSize: '13px', color: 'var(--color-text-light)'}}>ただAIを使えるではなく、使いこなしている且つ特化領域を持っているメンターのみ採用しているので、メンターの質は業界随一です。</p>
                <div style={{marginTop: '16px'}}>
                  <span style={{display: 'inline-block', background: 'var(--color-bg-purple-light)', color: 'var(--color-primary)', fontSize: '13px', fontWeight: 700, padding: '6px 14px', borderRadius: '50px'}}>採用率1.6%の精鋭メンター陣</span>
                </div>
              </div>
              <div className="feature-item__img">
                <div className="mentor-scroll">
                  <div className="mentor-scroll__item"><img src="/bytech/assets/images/mentor-1.webp" alt="メンター" loading="lazy" /></div>
                  <div className="mentor-scroll__item"><img src="/bytech/assets/images/mentor-2.webp" alt="メンター" loading="lazy" /></div>
                  <div className="mentor-scroll__item"><img src="/bytech/assets/images/mentor-3.webp" alt="メンター" loading="lazy" /></div>
                  <div className="mentor-scroll__item"><img src="/bytech/assets/images/mentor-4.webp" alt="メンター" loading="lazy" /></div>
                  <div className="mentor-scroll__item"><img src="/bytech/assets/images/mentor-5.webp" alt="メンター" loading="lazy" /></div>
                  <div className="mentor-scroll__item"><img src="/bytech/assets/images/mentor-6.webp" alt="メンター" loading="lazy" /></div>
                  <div className="mentor-scroll__item"><img src="/bytech/assets/images/mentor-7.webp" alt="メンター" loading="lazy" /></div>
                  <div className="mentor-scroll__item"><img src="/bytech/assets/images/mentor-8.webp" alt="メンター" loading="lazy" /></div>
                  <div className="mentor-scroll__item"><img src="/bytech/assets/images/mentor-9.webp" alt="メンター" loading="lazy" /></div>
                  <div className="mentor-scroll__item"><img src="/bytech/assets/images/mentor-10.webp" alt="メンター" loading="lazy" /></div>
                </div>
              </div>
            </div>

            {/* Reason 4 */}
            <div className="feature-item reverse fadein">
              <div className="feature-item__content">
                <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', overflow: 'hidden'}}>
                  <div className="feature-item__badge"><strong>04</strong></div>
                  <span style={{fontSize: '16px', fontWeight: 700, color: '#1a1a1a', whiteSpace: 'nowrap'}}>最短で収益化を実現する</span>
                  <div style={{flex: 1, height: '2px', background: '#1a1a1a'}}></div>
                </div>
                <h3 className="feature-item__ttl">身につけたスキルを仕事に変える<br /><span className="mark-purple">案件マッチングサービス「b-Works」</span></h3>
                <p className="feature-item__txt">AIライティングから画像・動画生成、Difyを活用したワークフローの自動化までバイテックで身につけたAI活用スキルを案件という形で存分に発揮する場を設けています。未経験の方でも挑戦できる案件ラインナップ。</p>
                <p style={{marginTop: '12px', fontSize: '13px', color: 'var(--color-text-light)'}}>案件は定期的に更新・追加されていくので、自分に合った案件にチャレンジできます。90%の方が未経験から案件獲得に成功しています。</p>
                <p style={{marginTop: '8px', fontSize: '11px', color: 'var(--color-text-light)'}}>※案件斡旋を保証するサポートではありません。必ずテスト案件を実施していただき、合格した方のみアサインされます。</p>
              </div>
              <div className="feature-item__img">
                <div style={{background: 'linear-gradient(135deg, var(--color-bg-purple-light), #e8f4ff)', borderRadius: 'var(--radius)', padding: '40px', textAlign: 'center'}}>
                  <h4 style={{fontSize: '20px', fontWeight: 900, color: 'var(--color-primary)', marginBottom: '8px'}}>b-Works</h4>
                  <p style={{fontSize: '14px', color: 'var(--color-text-light)'}}>未経験の方でも挑戦できる<br />案件のラインナップ</p>
                  <div style={{marginTop: '20px', background: 'rgba(83,58,252,0.1)', borderRadius: '8px', padding: '16px'}}>
                    <div style={{fontFamily: 'var(--font-en)', fontSize: '32px', fontWeight: 900, color: 'var(--color-primary)'}}>90%</div>
                    <div style={{fontSize: '13px', color: 'var(--color-text-light)'}}>が未経験から案件獲得に成功</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reason 5 */}
            <div className="feature-item fadein">
              <div className="feature-item__content">
                <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', overflow: 'hidden'}}>
                  <div className="feature-item__badge"><strong>05</strong></div>
                  <span style={{fontSize: '16px', fontWeight: 700, color: '#1a1a1a', whiteSpace: 'nowrap'}}>サポート終了後も安心の</span>
                  <div style={{flex: 1, height: '2px', background: '#1a1a1a'}}></div>
                </div>
                <h3 className="feature-item__ttl">仲間と一緒にスキルアップができる<br /><span className="mark-purple">実践型AIコミュニティ「b-Crew」</span></h3>
                <p className="feature-item__txt">&quot;作って学ぶ&quot;がコンセプトの受講生や卒業生、一般のユーザーも入れる、目的や実現したいことに最適化した実践的なAIコミュニティです。受講生は永久会員としてサポート終了後もウェビナーの視聴やコンテスト・イベントの参加が可能となっています。</p>
                <p style={{marginTop: '8px', fontSize: '11px', color: 'var(--color-text-light)'}}>※コミュニティ内のイベントは今後実施予定のものもあります。</p>
              </div>
              <div className="feature-item__img">
                <div style={{background: 'linear-gradient(135deg, #1f1f2e, var(--color-dark))', borderRadius: 'var(--radius)', padding: '40px', textAlign: 'center', color: '#fff'}}>
                  <h4 style={{fontSize: '20px', fontWeight: 900, color: 'var(--color-accent)', marginBottom: '8px'}}>b-Crew</h4>
                  <p style={{fontSize: '14px', color: 'rgba(255,255,255,0.7)'}}>継続的な学習を支援する<br />豊富なコンテンツ</p>
                  <div style={{marginTop: '20px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap'}}>
                    <span style={{background: 'rgba(255,255,255,0.1)', padding: '8px 14px', borderRadius: '50px', fontSize: '13px'}}>有料級ウェビナー</span>
                    <span style={{background: 'rgba(255,255,255,0.1)', padding: '8px 14px', borderRadius: '50px', fontSize: '13px'}}>コンテスト</span>
                    <span style={{background: 'rgba(255,255,255,0.1)', padding: '8px 14px', borderRadius: '50px', fontSize: '13px'}}>イベント</span>
                    <span style={{background: 'rgba(255,255,255,0.1)', padding: '8px 14px', borderRadius: '50px', fontSize: '13px'}}>永久会員</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{textAlign: 'center', marginTop: '48px'}} className="fadein">
            <a href="https://generative-ai.bytech.jp/counseling/" target="_blank" className="btn-primary">もっとバイテックの特徴が知りたい →</a>
            <p style={{marginTop: '12px', fontSize: '12px', color: 'var(--color-text-light)'}}>※ 無理な勧誘は行っていません。</p>
          </div>
        </div>
      </section>

      {/* ===== CURRICULUM ===== */}
      <section className="curriculum" id="courses">
        <div className="curriculum__inner">
          <div className="sec-header fadein">
            <span className="sec-header__tag">CURRICULUM</span>
            <h2 className="sec-header__ttl">カリキュラム一覧</h2>
            <p className="sec-header__sub">
              <strong>全600レッスン以上</strong>のカリキュラムを学習し放題！<br />
              LITE・PROどちらかのプラン入会で学習カリキュラムはずーっと視聴可能です。
            </p>
          </div>

          <div className="curriculum__tabs fadein">
            <button className="curriculum__tab is-active" data-panel="tool">ツール別マスターコース</button>
            <button className="curriculum__tab" data-panel="freelance">AI副業・フリーランスコース</button>
            <button className="curriculum__tab" data-panel="job">職種・部門別AI活用コース</button>
          </div>

          {/* Tool Master */}
          <div className="curriculum__panel is-active" id="panel-tool">
            <div style={{display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px'}}>
              <span style={{fontFamily: 'var(--font-en)', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 900, color: 'var(--color-primary)', lineHeight: 1}}>01</span>
              <div style={{flex: 1}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '4px'}}>
                  <span style={{fontSize: '13px', fontWeight: 700, color: 'var(--color-text-light)'}}>ツール別マスターコース</span>
                  <div style={{flex: 1, height: '1px', background: '#ccc'}}></div>
                </div>
                <p style={{fontSize: 'clamp(16px, 2.5vw, 22px)', fontWeight: 900, lineHeight: 1.5}}>主要AIで、業務の効率化・自動化をするなら</p>
              </div>
            </div>
            <div className="curriculum__grid">
              <div className="course-card fadein">
                <div className="course-card__head">
                  <div className="course-card__icon"><img src="/bytech/assets/images/course-chatgpt.webp" alt="ChatGPT" /></div>
                  <div className="course-card__info"><div className="course-card__label">TOOL MASTER COURSE</div><div className="course-card__name">ChatGPTマスターコース</div><div className="course-card__chapters">全8チャプター｜45レッスン</div></div>
                </div>
                <div className="course-card__body">
                  <p className="course-card__desc">ChatGPTの基本操作から、プロンプト設計、メール・資料・アイデア出しからZapier・MCPとの連携など実務応用まで体系的に学ぶコースです。</p>
                  <a href="https://generative-ai.bytech.jp/chatgpt-master/" target="_blank" className="course-card__link">コースの詳細を見る</a>
                </div>
              </div>
              <div className="course-card fadein delay-1">
                <div className="course-card__head">
                  <div className="course-card__icon"><img src="/bytech/assets/images/course-gemini.webp" alt="Gemini" /></div>
                  <div className="course-card__info"><div className="course-card__label">TOOL MASTER COURSE</div><div className="course-card__name">Geminiマスターコース</div><div className="course-card__chapters">全6チャプター｜36レッスン</div></div>
                </div>
                <div className="course-card__body">
                  <p className="course-card__desc">リサーチ、要約、レポート作成など&quot;調べて・まとめる&quot;作業を効率化するスキルやGoogle関連のツールとAIを連携してエージェントを作成する応用スキルも習得します。</p>
                  <a href="https://generative-ai.bytech.jp/gemini-master/" target="_blank" className="course-card__link">コースの詳細を見る</a>
                </div>
              </div>
              <div className="course-card fadein delay-2">
                <div className="course-card__head">
                  <div className="course-card__icon"><img src="/bytech/assets/images/course-copilot.webp" alt="Copilot" /></div>
                  <div className="course-card__info"><div className="course-card__label">TOOL MASTER COURSE</div><div className="course-card__name">Copilotマスターコース</div><div className="course-card__chapters">全6チャプター｜48レッスン</div></div>
                </div>
                <div className="course-card__body">
                  <p className="course-card__desc">Microsoft 365に組み込まれたCopilotを使い、文書作成、資料作成、データ整理の工数を減らす実践的なスキルを身につけます。</p>
                  <a href="https://generative-ai.bytech.jp/copilot-master/" target="_blank" className="course-card__link">コースの詳細を見る</a>
                </div>
              </div>
              <div className="course-card fadein">
                <div className="course-card__head">
                  <div className="course-card__icon"><img src="/bytech/assets/images/course-dify.webp" alt="Dify" /></div>
                  <div className="course-card__info"><div className="course-card__label">TOOL MASTER COURSE</div><div className="course-card__name">Difyマスターコース</div><div className="course-card__chapters">全21チャプター｜82レッスン</div></div>
                </div>
                <div className="course-card__body">
                  <p className="course-card__desc">Dify(ディフィ)を活用して、申請フローや顧客管理、レポート自動化などの簡易システムを構築する方法を学びます。エンジニアでなくても自分の部署の業務フローを自動化できます。</p>
                  <a href="https://generative-ai.bytech.jp/dify-master/" target="_blank" className="course-card__link">コースの詳細を見る</a>
                </div>
              </div>
              <div className="course-card fadein delay-1">
                <div className="course-card__head">
                  <div className="course-card__icon"><img src="/bytech/assets/images/course-notebooklm.webp" alt="NotebookLM" /></div>
                  <div className="course-card__info"><div className="course-card__label">TOOL MASTER COURSE</div><div className="course-card__name">NotebookLMマスターコース</div><div className="course-card__chapters">全7チャプター｜31レッスン</div></div>
                </div>
                <div className="course-card__body">
                  <p className="course-card__desc">マニュアル・議事録・企画書などの社内資料をNotebookLMに読み込ませ、質問に答えてくれるナレッジAIを構築する方法を学びます。</p>
                  <a href="https://generative-ai.bytech.jp/notebooklm-master/" target="_blank" className="course-card__link">コースの詳細を見る</a>
                </div>
              </div>
              <div className="course-card fadein delay-2">
                <div className="course-card__head">
                  <div className="course-card__icon"><img src="/bytech/assets/images/course-passport.webp" alt="生成AIパスポート" /></div>
                  <div className="course-card__info"><div className="course-card__label">PASSPORT COURSE</div><div className="course-card__name">生成AIパスポートコース</div><div className="course-card__chapters">全15チャプター｜32レッスン</div></div>
                </div>
                <div className="course-card__body">
                  <p className="course-card__desc">生成AIパスポート試験の出題範囲を押さえながら、主要ツールの特徴やリスク、ビジネス活用のポイントを体系的に学ぶコースです。</p>
                  <a href="https://generative-ai.bytech.jp/generative-ai-passport/" target="_blank" className="course-card__link">コースの詳細を見る</a>
                </div>
              </div>
            </div>
          </div>

          {/* Freelance */}
          <div className="curriculum__panel" id="panel-freelance">
            <div style={{display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px'}}>
              <span style={{fontFamily: 'var(--font-en)', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 900, color: 'var(--color-primary)', lineHeight: 1}}>02</span>
              <div style={{flex: 1}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '4px'}}>
                  <span style={{fontSize: '13px', fontWeight: 700, color: 'var(--color-text-light)'}}>AI副業・フリーランスコース</span>
                  <div style={{flex: 1, height: '1px', background: '#ccc'}}></div>
                </div>
                <p style={{fontSize: 'clamp(16px, 2.5vw, 22px)', fontWeight: 900, lineHeight: 1.5}}>AIで副収入の獲得、フリーランスを目指すなら</p>
              </div>
            </div>
            <div className="curriculum__grid">
              <div className="course-card fadein">
                <div className="course-card__head">
                  <div className="course-card__icon"><img src="/bytech/assets/images/course-writer.webp" alt="AIウェブライター" /></div>
                  <div className="course-card__info"><div className="course-card__label">FREELANCE COURSE</div><div className="course-card__name">AIウェブライターコース</div><div className="course-card__chapters">全18チャプター｜46レッスン</div></div>
                </div>
                <div className="course-card__body">
                  <p className="course-card__desc">ブログ・オウンドメディア・LP・メルマガなど、Webライティングに特化したAI活用術を学ぶコースです。</p>
                  <a href="https://generative-ai.bytech.jp/ai-writer/" target="_blank" className="course-card__link">コースの詳細を見る</a>
                </div>
              </div>
              <div className="course-card fadein delay-1">
                <div className="course-card__head">
                  <div className="course-card__icon"><img src="/bytech/assets/images/course-image.webp" alt="AI画像クリエイター" /></div>
                  <div className="course-card__info"><div className="course-card__label">FREELANCE COURSE</div><div className="course-card__name">AI画像クリエイターコース</div><div className="course-card__chapters">全31チャプター｜89レッスン</div></div>
                </div>
                <div className="course-card__body">
                  <p className="course-card__desc">バナー、サムネイル、SNS用画像などを、画像生成AIで制作するスキルを身につけるコースです。プロンプト設計のコツや、AIで作った画像をCanva等で微調整する実務フローを学びます。</p>
                  <a href="https://generative-ai.bytech.jp/ai-image-creator/" target="_blank" className="course-card__link">コースの詳細を見る</a>
                </div>
              </div>
              <div className="course-card fadein delay-2">
                <div className="course-card__head">
                  <div className="course-card__icon"><img src="/bytech/assets/images/course-video.webp" alt="AI動画クリエイター" /></div>
                  <div className="course-card__info"><div className="course-card__label">FREELANCE COURSE</div><div className="course-card__name">AI動画クリエイターコース</div><div className="course-card__chapters">全4チャプター｜19レッスン</div></div>
                </div>
                <div className="course-card__body">
                  <p className="course-card__desc">画像・プロンプトからイメージ通りの動画制作を実現するスキルを身につけるコースです。編集スキルがなくても&quot;見られる動画&quot;を作成するスキルを習得できます。</p>
                  <a href="https://generative-ai.bytech.jp/ai-movie-creator/" target="_blank" className="course-card__link">コースの詳細を見る</a>
                </div>
              </div>
            </div>
          </div>

          {/* Job-based */}
          <div className="curriculum__panel" id="panel-job">
            <div style={{display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px'}}>
              <span style={{fontFamily: 'var(--font-en)', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 900, color: 'var(--color-primary)', lineHeight: 1}}>03</span>
              <div style={{flex: 1}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '4px'}}>
                  <span style={{fontSize: '13px', fontWeight: 700, color: 'var(--color-text-light)'}}>職種・部門別AI活用コース</span>
                  <div style={{flex: 1, height: '1px', background: '#ccc'}}></div>
                </div>
                <p style={{fontSize: 'clamp(16px, 2.5vw, 22px)', fontWeight: 900, lineHeight: 1.5}}>職種ごとの既存業務を効率化するなら</p>
              </div>
            </div>
            <div className="curriculum__grid">
              <div className="course-card fadein">
                <div className="course-card__head">
                  <div className="course-card__icon"><img src="/bytech/assets/images/course-business.webp" alt="ビジネスワーカー" /></div>
                  <div className="course-card__info"><div className="course-card__label">BUSINESS COURSE</div><div className="course-card__name">ビジネスワーカーコース</div><div className="course-card__chapters">全19チャプター｜92レッスン</div></div>
                </div>
                <div className="course-card__body">
                  <p className="course-card__desc">幅広い職種で共通して役立つAI活用スキルを横断的に学ぶコースです。メール作成、議事録、リサーチ、報告書、資料作成など、日々のルーチンをAIに手伝わせる具体的なパターンを紹介します。</p>
                  <a href="https://generative-ai.bytech.jp/business-worker/" target="_blank" className="course-card__link">コースの詳細を見る</a>
                </div>
              </div>
              <div className="course-card course-card--soon fadein delay-1">
                <div className="course-card__head"><div className="course-card__info"><div className="course-card__label">BUSINESS COURSE</div><div className="course-card__name">AI業務活用【営業職コース】</div><div className="course-card__chapters">全6チャプター｜36レッスン</div></div></div>
                <div className="course-card__body"><div className="course-card__badge">Coming Soon...</div><p className="course-card__desc">Geminiをベースにした、レポート作成やスクリプト作成、商談議事録の自動生成などの業務を効率化するスキルを身につけます。</p></div>
              </div>
              <div className="course-card course-card--soon fadein delay-2">
                <div className="course-card__head"><div className="course-card__info"><div className="course-card__label">BUSINESS COURSE</div><div className="course-card__name">AI業務活用【事務職コース】</div><div className="course-card__chapters">全8チャプター｜45レッスン</div></div></div>
                <div className="course-card__body"><div className="course-card__badge">Coming Soon...</div><p className="course-card__desc">議事録作成やExcelでの集計業務、業務マニュアルの作成など多岐にわたる事務業務の効率化スキルを身につけることができます。</p></div>
              </div>
              <div className="course-card course-card--soon fadein">
                <div className="course-card__head"><div className="course-card__info"><div className="course-card__label">BUSINESS COURSE</div><div className="course-card__name">AI業務活用【企画職コース】</div><div className="course-card__chapters">全8チャプター｜45レッスン</div></div></div>
                <div className="course-card__body"><div className="course-card__badge">Coming Soon...</div><p className="course-card__desc">新規施策アイディア出しからカスタマージャーニーマップの作成、アプリモック作成まで様々な企画業務に特化したスキルを身につけることができます。</p></div>
              </div>
              <div className="course-card course-card--soon fadein delay-1">
                <div className="course-card__head"><div className="course-card__info"><div className="course-card__label">BUSINESS COURSE</div><div className="course-card__name">AI業務活用【人事職コース】</div><div className="course-card__chapters">全8チャプター｜45レッスン</div></div></div>
                <div className="course-card__body"><div className="course-card__badge">Coming Soon...</div><p className="course-card__desc">求人票作成の自動化から採用基準の策定、研修プログラムの構築など人手が必要だった採用人事周りの業務を効率化・自動化するスキルを身につけることができます。</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section className="skills-section" id="skills">
        <div className="skills__inner">
          <div className="skills__head fadein">
            <h2>AI未経験からでも<br />こんなことができるようになります</h2>
            <div className="tag">SKILLS</div>
          </div>
          <div className="skills-slider fadein">
            <button className="skills-slider__arrow skills-slider__arrow--prev" data-dir="-1">&#x276E;</button>
            <div className="skills-slider__track">
              <div className="skills-slide is-active"><img src="/bytech/assets/images/skills-slide-03.webp" alt="#01 広告バナー/デザイン制作" loading="lazy" /></div>
              <div className="skills-slide"><img src="/bytech/assets/images/skills-slide-02.webp" alt="#02 高品質スライド制作" loading="lazy" /></div>
              <div className="skills-slide"><img src="/bytech/assets/images/skills-slide-05.webp" alt="#03 企画・提案書づくりの高速化" loading="lazy" /></div>
              <div className="skills-slide"><img src="/bytech/assets/images/skills-slide-04.webp" alt="#04 LINE連携AIアプリ開発" loading="lazy" /></div>
              <div className="skills-slide"><img src="/bytech/assets/images/skills-slide-06.webp" alt="#05 高品質なSEO記事制作" loading="lazy" /></div>
              <div className="skills-slide"><img src="/bytech/assets/images/skills-slide-01.webp" alt="#06 メール・資料作成の自動化" loading="lazy" /></div>
            </div>
            <button className="skills-slider__arrow skills-slider__arrow--next" data-dir="1">&#x276F;</button>
            <div className="skills-slider__dots">
              <button className="skills-slider__dot is-active" data-slide="0"></button>
              <button className="skills-slider__dot" data-slide="2"></button>
              <button className="skills-slider__dot" data-slide="4"></button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PLAN ===== */}
      <section className="plan" id="plan">
        <div className="plan__inner">
          <div className="sec-header fadein">
            <span className="sec-header__tag">PLAN</span>
            <h2 className="sec-header__ttl">バイテックの料金プラン</h2>
          </div>
          <div className="plan__grid fadein">
            {/* LITE */}
            <div className="plan-card">
              <div className="plan-card__logo"><img src="/bytech/assets/images/logo-lite.svg" alt="LITE PLAN" /></div>
              <div className="plan-card__label">LITE PLAN</div>
              <div className="plan-card__name">ライトプラン</div>
              <div className="plan-card__target"><span style={{color: 'var(--color-accent-pink)', fontWeight: 900}}>自分のペース</span>で学習したい方向け</div>
              <div className="plan-card__price-row"><div className="plan-card__price"><span className="plan-card__price-label">一括料金</span><span className="plan-card__price-yen">¥</span><span className="plan-card__price-num">178,000</span></div></div>
              <div className="plan-card__price-monthly">月額料金 ¥7,420</div>
              <div className="plan-card__tags">
                <div className="plan-card__tag">カリキュラム視聴<strong>無期限</strong></div>
                <div className="plan-card__tag">チャットサポート<strong>1年間</strong></div>
                <div className="plan-card__tag">面談サポート<strong>なし</strong></div>
              </div>
              <div className="plan-card__divider"><span className="plan-card__divider-text">このプランで受けれるサービス</span></div>
              <div className="plan-card__features">
                <div className="plan-card__feature"><span className="plan-card__feature-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span><span>全てのコース無期限学習し放題</span></div>
                <div className="plan-card__feature"><span className="plan-card__feature-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span><span>1年間無制限で質問し放題</span></div>
                <div className="plan-card__feature"><span className="plan-card__feature-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span><span>コミュニティ参加</span></div>
                <div className="plan-card__feature"><span className="plan-card__feature-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span><span>限定AI活用ウェビナー視聴</span></div>
                <div className="plan-card__feature plan-card__feature--disabled"><span className="plan-card__feature-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span><span>個別マンツーマンサポート（4ヶ月）</span></div>
                <div className="plan-card__feature plan-card__feature--disabled"><span className="plan-card__feature-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span><span>オーダーメイド実践課題の実施</span></div>
                <div className="plan-card__feature plan-card__feature--disabled"><span className="plan-card__feature-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span><span>スキル証明課題の添削</span></div>
                <div className="plan-card__feature plan-card__feature--disabled"><span className="plan-card__feature-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span><span>業務活用の検証サポート</span></div>
                <div className="plan-card__feature plan-card__feature--disabled"><span className="plan-card__feature-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span><span>収益化サポート</span></div>
                <div className="plan-card__feature plan-card__feature--disabled"><span className="plan-card__feature-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span><span>案件マッチングサポート</span></div>
              </div>
              <a href="https://form.run/@ds-form" target="_blank" className="plan-card__cta plan-card__cta--pink">今すぐ受講を申し込む</a>
            </div>
            {/* PRO */}
            <div className="plan-card plan-card--pro">
              <div className="plan-card__logo"><img src="/bytech/assets/images/logo-pro.svg" alt="PRO PLAN" /></div>
              <div className="plan-card__label">PRO PLAN</div>
              <div className="plan-card__name">プロプラン</div>
              <div className="plan-card__target"><span style={{color: 'var(--color-primary)', fontWeight: 900}}>専任のAIメンター</span>が伴走サポート</div>
              <div className="plan-card__price-row"><div className="plan-card__price"><span className="plan-card__price-label">一括料金</span><span className="plan-card__price-yen">¥</span><span className="plan-card__price-num">298,000</span></div></div>
              <div className="plan-card__price-monthly">月額料金 ¥12,400</div>
              <div className="plan-card__tags">
                <div className="plan-card__tag">カリキュラム視聴<strong>無期限</strong></div>
                <div className="plan-card__tag">チャットサポート<strong>1年間</strong></div>
                <div className="plan-card__tag">面談サポート<strong>4ヶ月間<span style={{fontSize: '10px', fontWeight: 400}}>(月2回)</span></strong></div>
              </div>
              <div className="plan-card__divider"><span className="plan-card__divider-text">このプランで受けれるサービス</span></div>
              <div className="plan-card__features">
                <div className="plan-card__feature"><span className="plan-card__feature-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span><span>全てのコース無期限学習し放題</span></div>
                <div className="plan-card__feature"><span className="plan-card__feature-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span><span>1年間無制限で質問し放題</span></div>
                <div className="plan-card__feature"><span className="plan-card__feature-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span><span>コミュニティ参加</span></div>
                <div className="plan-card__feature"><span className="plan-card__feature-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span><span>限定AI活用ウェビナー視聴</span></div>
                <div className="plan-card__feature"><span className="plan-card__feature-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span><span>個別マンツーマンサポート（4ヶ月）</span></div>
                <div className="plan-card__feature"><span className="plan-card__feature-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span><span>オーダーメイド実践課題の実施</span></div>
                <div className="plan-card__feature"><span className="plan-card__feature-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span><span>スキル証明課題の添削</span></div>
                <div className="plan-card__feature"><span className="plan-card__feature-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span><span>業務活用の検証サポート</span></div>
                <div className="plan-card__feature"><span className="plan-card__feature-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span><span>収益化サポート</span></div>
                <div className="plan-card__feature"><span className="plan-card__feature-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span><span>案件マッチングサポート</span></div>
              </div>
              <a href="https://generative-ai.bytech.jp/counseling/" target="_blank" className="plan-card__cta plan-card__cta--blue">まずは無料相談を予約する</a>
            </div>
          </div>
          <div className="plan__note fadein">
            料金に見合ったサービスが受けれるか不安な方もお気軽にご相談ください。<br />
            ※ 無理な勧誘は行っていません。
          </div>
          <div className="plan__payment fadein">
            <h3>お支払い方法は、2種類ご用意しています</h3>
            <div className="plan__payment__methods">
              <div className="plan__payment__method">
                <div className="plan__payment__method__name">銀行振込</div>
                <div className="plan__payment__method__note">※ご一括の場合のみ銀行振込を受け付けております。</div>
              </div>
              <div className="plan__payment__method">
                <div className="plan__payment__method__name">クレジットカード</div>
                <div className="plan__payment__method__note">※分割回数、金利はカード会社によって異なります。</div>
              </div>
            </div>
            <div className="plan__payment__cards">
              <img src="/bytech/assets/images/card-brands.svg" alt="VISA / Mastercard / American Express / Diners Club" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== INTERVIEW ===== */}
      <section className="interview" id="interview">
        <div className="interview__inner">
          <div className="sec-header fadein">
            <h2 className="sec-header__ttl">受講生インタビュー</h2>
            <span className="sec-header__tag" style={{color: '#d4a817', marginTop: '8px'}}>INTERVIEW</span>
          </div>
          <div className="interview__grid">
            <div className="interview-card fadein">
              <a href="https://bytech.jp/blog/sutudent-voice-1/" target="_blank" className="interview-card__hero">
                <img src="/bytech/assets/images/interview-yamamoto.webp" alt="山本大輔さん" loading="lazy" />
                <div className="interview-card__overlay">
                  <div className="interview-card__overlay-top">
                    <div className="interview-card__overlay-label"><strong>STUDENT</strong> INTERVIEW</div>
                    <div className="interview-card__overlay-num">#001</div>
                  </div>
                  <div className="interview-card__overlay-bottom">
                    <div className="interview-card__overlay-name-en">DAISUKE YAMAMOTO</div>
                    <div className="interview-card__overlay-ttl">副業からAIコンサルに独立<br />切り開いた独自のキャリア</div>
                  </div>
                  <div className="interview-card__overlay-logo"><img src="/bytech/assets/images/favicon.png" alt="bytech" /></div>
                </div>
              </a>
              <p className="interview-card__desc">「社内の小さなPoCから始めて、独立へ」――38歳・元メーカー勤務の山本大輔さんが&quot;AIコンサル&quot;で月収7桁に到達するまで</p>
              <div className="interview-card__profile">
                <div className="interview-card__avatar"><img src="/bytech/assets/images/interview-yamamoto.webp" alt="山本大輔さん" /></div>
                <div>
                  <div className="interview-card__job">メーカー管理職</div>
                  <div className="interview-card__name">山本 大輔さん</div>
                </div>
              </div>
            </div>
            <div className="interview-card fadein delay-1">
              <a href="https://bytech.jp/blog/sutudent-voice-2/" target="_blank" className="interview-card__hero">
                <img src="/bytech/assets/images/interview-sato.webp" alt="佐藤健太さん" loading="lazy" />
                <div className="interview-card__overlay">
                  <div className="interview-card__overlay-top">
                    <div className="interview-card__overlay-label"><strong>STUDENT</strong> INTERVIEW</div>
                    <div className="interview-card__overlay-num">#002</div>
                  </div>
                  <div className="interview-card__overlay-bottom">
                    <div className="interview-card__overlay-name-en">KENTA SATO</div>
                    <div className="interview-card__overlay-ttl">社内の業務改善をきっかけに<br />キャリアアップを実現</div>
                  </div>
                  <div className="interview-card__overlay-logo"><img src="/bytech/assets/images/favicon.png" alt="bytech" /></div>
                </div>
              </a>
              <p className="interview-card__desc">「&quot;削る・置き換える・任せる&quot;で定時帰りへ」――32歳・営業職の佐藤健太さんがAI活用で残業激減＆キャリア転換を実現するまで</p>
              <div className="interview-card__profile">
                <div className="interview-card__avatar"><img src="/bytech/assets/images/interview-sato.webp" alt="佐藤健太さん" /></div>
                <div>
                  <div className="interview-card__job">メーカー営業</div>
                  <div className="interview-card__name">佐藤 健太さん</div>
                </div>
              </div>
            </div>
            <div className="interview-card fadein delay-2">
              <a href="https://bytech.jp/blog/sutudent-voice-3/" target="_blank" className="interview-card__hero">
                <img src="/bytech/assets/images/interview-tanaka.webp" alt="田中美咲さん" loading="lazy" />
                <div className="interview-card__overlay">
                  <div className="interview-card__overlay-top">
                    <div className="interview-card__overlay-label"><strong>STUDENT</strong> INTERVIEW</div>
                    <div className="interview-card__overlay-num">#003</div>
                  </div>
                  <div className="interview-card__overlay-bottom">
                    <div className="interview-card__overlay-name-en">MISAKI TANAKA</div>
                    <div className="interview-card__overlay-ttl">&quot;自分なんかが&quot;を乗り越え<br />辿り着いた理想の働き方</div>
                  </div>
                  <div className="interview-card__overlay-logo"><img src="/bytech/assets/images/favicon.png" alt="bytech" /></div>
                </div>
              </a>
              <p className="interview-card__desc">「&quot;型×構成作り&quot;でスピード納品」――28歳・会社員の田中美咲さんがAIライティング副業で月収30万円達成＆Kindleでストック収入を築くまで</p>
              <div className="interview-card__profile">
                <div className="interview-card__avatar"><img src="/bytech/assets/images/interview-tanaka.webp" alt="田中美咲さん" /></div>
                <div>
                  <div className="interview-card__job">不動産会社事務</div>
                  <div className="interview-card__name">田中 美咲さん</div>
                </div>
              </div>
            </div>
          </div>
          <div className="interview__more fadein">
            <a href="https://bytech.jp/blog/category/interview/" target="_blank" className="plan-card__cta plan-card__cta--blue" style={{display: 'inline-flex', maxWidth: '360px'}}>全ての受講生インタビューを見る</a>
          </div>
        </div>
      </section>

      {/* ===== FLOW ===== */}
      <section className="flow" id="flow">
        <div className="flow__inner">
          <div className="flow__head fadein">
            <div className="tag">FLOW</div>
            <h2>学習スタートまでの<br />3ステップ</h2>
          </div>
          <div className="flow__steps">
            <div className="flow__step fadein">
              <div className="flow__step__num">01</div>
              <div className="flow__step__content">
                <div className="flow__step__label">STEP 01</div>
                <div className="flow__step__ttl">無料カウンセリング</div>
                <p className="flow__step__txt">当日は、生成AIへの興味や目指すキャリアについてヒアリングした後、受講事例や講座の詳細を質疑応答を交えてご紹介します。初心者でも大歓迎ですので、お気軽にご参加ください！<br />Zoomを利用したオンライン形式・所要時間は40〜60分。</p>
              </div>
            </div>
            <div className="flow__step fadein delay-1">
              <div className="flow__step__num">02</div>
              <div className="flow__step__content">
                <div className="flow__step__label">STEP 02</div>
                <div className="flow__step__ttl">受講申し込み</div>
                <p className="flow__step__txt">カウンセリングで最適なプランをご提案。納得いただけましたら申し込みを確定させます。申し込み後、最短当日からスタートできます。</p>
              </div>
            </div>
            <div className="flow__step fadein delay-2">
              <div className="flow__step__num">03</div>
              <div className="flow__step__content">
                <div className="flow__step__label">STEP 03</div>
                <div className="flow__step__ttl">学習スタート</div>
                <p className="flow__step__txt">専任メンターがあなた専用のカリキュラムと学習ロードマップを設計。ゴールに向けて最短ルートで学習をスタートします。</p>
              </div>
            </div>
          </div>
          <div className="flow__cta fadein">
            <a href="https://generative-ai.bytech.jp/counseling/" target="_blank" className="btn-primary">無料カウンセリングに申し込む</a>
            <p style={{marginTop: '12px', fontSize: '12px', color: 'rgba(255,255,255,0.4)'}}>※ 無理な勧誘は行っていません。</p>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="faq" id="faq">
        <div className="faq__inner">
          <div className="sec-header fadein">
            <span className="sec-header__tag">FAQ</span>
            <h2 className="sec-header__ttl">よくあるご質問</h2>
          </div>
          <div className="faq__groups">
            <div>
              <div className="faq__group fadein">
                <div className="faq__group__ttl">無料カウンセリングについて</div>
                <div className="faq__list">
                  <div className="faq__item">
                    <button className="faq__item__q">カウンセリングはどんな内容ですか？</button>
                    <div className="faq__item__a">当日は、生成AIへの興味や目指すキャリアについてヒアリングした後、受講事例や講座の詳細を質疑応答を交えてご紹介します。初心者でも大歓迎ですので、お気軽にご参加ください！</div>
                  </div>
                  <div className="faq__item">
                    <button className="faq__item__q">参加方法はどうすればいいですか？</button>
                    <div className="faq__item__a">当日はZoomを利用したオンライン形式でのご参加となります。所要時間は40〜60分を想定しております。</div>
                  </div>
                  <div className="faq__item">
                    <button className="faq__item__q">どのコースが自分にあっているかわかりません</button>
                    <div className="faq__item__a">「無料相談」でご相談いただくことをお勧めします。ご自身でご受講を通してできるようになりたいこと・学びたいことを無料相談にてお尋ねください。最適なコースをご提案させていただきます。無料相談は<a href="https://generative-ai.bytech.jp/counseling" target="_blank" style={{color: 'var(--color-primary)', textDecoration: 'underline'}}>こちら</a>よりお申し込みください。</div>
                  </div>
                </div>
              </div>
              <div className="faq__group fadein">
                <div className="faq__group__ttl">カリキュラムについて</div>
                <div className="faq__list">
                  <div className="faq__item">
                    <button className="faq__item__q">講座内で習得できるスキルは？</button>
                    <div className="faq__item__a">このコースでは、生成AIの基礎から始め、ChatGPTなどのツールを使いこなすためのプロンプトエンジニアリングの技術を短期集中で学びます。未経験者でも、数週間でAIを効果的に活用する方法をマスターすることができます。</div>
                  </div>
                  <div className="faq__item">
                    <button className="faq__item__q">講座カリキュラムに閲覧期限はありますか？</button>
                    <div className="faq__item__a">いいえ、一度購入していただいたカリキュラムに関しては、無期限で閲覧可能です。</div>
                  </div>
                  <div className="faq__item">
                    <button className="faq__item__q">古い技術や情報の教材ではありませんか？</button>
                    <div className="faq__item__a">いいえ、バイテック生成AIでは徹底した教材管理と独自システムにより、最新のバージョンやトレンドの技術のみを教材に掲載しておりますので、ご安心して受講下さい。</div>
                  </div>
                  <div className="faq__item">
                    <button className="faq__item__q">未経験ですがカリキュラムについていけますか？</button>
                    <div className="faq__item__a">多くの方が未経験で受講されています。「メンター」と呼ばれる現役エンジニア講師が、一人ひとりの学びに合わせたマンツーマン体制でサポートしていきますのでご安心ください。</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="faq__group fadein">
                <div className="faq__group__ttl">サポートについて</div>
                <div className="faq__list">
                  <div className="faq__item">
                    <button className="faq__item__q">チャットサポートはどれくらいの頻度で質問できますか？</button>
                    <div className="faq__item__a">チャット相談は24H受け付けており、13時〜22時はテクニカルサポートにて即時に返答いたします。サポート環境は全て個別となっておりますので、未経験の方でも安心して質問できる環境となっております。</div>
                  </div>
                  <div className="faq__item">
                    <button className="faq__item__q">面談に回数制限はありますか？</button>
                    <div className="faq__item__a">オンラインの面談は原則月2回の実施になります。</div>
                  </div>
                  <div className="faq__item">
                    <button className="faq__item__q">面談では何をするんですか？</button>
                    <div className="faq__item__a">オンライン面談では学習の進捗確認や進捗に合わせたロードマップの修正や次週のやるべきことのプランニングを行います。</div>
                  </div>
                </div>
              </div>
              <div className="faq__group fadein">
                <div className="faq__group__ttl">受講準備について</div>
                <div className="faq__list">
                  <div className="faq__item">
                    <button className="faq__item__q">受講する上で、準備するべきものはありますか？</button>
                    <div className="faq__item__a">こちらの<a href="https://generative-ai.bytech.jp/system-requirements/" target="_blank" style={{color: 'var(--color-primary)', textDecoration: 'underline'}}>システム要件</a>をご確認の上ご準備していただけたらと思います。</div>
                  </div>
                  <div className="faq__item">
                    <button className="faq__item__q">受講生の方はどのような方が多いですか？</button>
                    <div className="faq__item__a">はい、この生成AIコースでは会社員の方に多くご受講いただいております。その中でも25代〜40代までの方が一番多いボリュームゾーンとなっております。</div>
                  </div>
                </div>
              </div>
              <div className="faq__group fadein">
                <div className="faq__group__ttl">支払い方法について</div>
                <div className="faq__list">
                  <div className="faq__item">
                    <button className="faq__item__q">支払い方法は何がありますか？</button>
                    <div className="faq__item__a">支払い方法には現金振込・クレジット・デビットカード決済がございます。【MasterCard / Visa / American Express】</div>
                  </div>
                  <div className="faq__item">
                    <button className="faq__item__q">分割の支払いは可能ですか？</button>
                    <div className="faq__item__a">はい、可能です。分割回数など詳しい詳細はカード会社にご確認下さい。デビットカードでの分割はできませんので、ご了承下さい。</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="cta-section">
        <div className="cta-section__inner">
          <div className="cta-section__tag">FREE COUNSELING</div>
          <h2 className="cta-section__ttl">最短<span className="accent">4</span>ヶ月で、<br />生成AI活用のプロに。</h2>
          <p className="cta-section__sub">まずは無料カウンセリングで、あなたに最適な学習プランをご提案します。<br />初心者・未経験の方も大歓迎です。</p>
          <div className="cta-section__btns">
            <a href="https://generative-ai.bytech.jp/counseling/" target="_blank" className="btn-primary" style={{fontSize: '18px', padding: '20px 48px'}}>まずは無料カウンセリング</a>
          </div>
          <p className="cta-section__note">※ 無理な勧誘は行っていません。</p>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer__main">
          <div className="footer__inner">
            <div className="footer__grid">
              <div className="footer__brand">
                <div className="footer__brand__logo">
                  <img src="/bytech/assets/images/logo-black.svg" alt="バイテック生成AI" />
                </div>
                <p className="footer__brand__catch">最短4ヶ月で、<br />生成AI活用のプロに。</p>
                <div className="footer__brand__cta">
                  <a href="https://generative-ai.bytech.jp/counseling/" target="_blank">無料カウンセリングに申し込む</a>
                </div>
              </div>
              <div>
                <div className="footer__col__ttl">コース一覧 - 主要AI別</div>
                <ul className="footer__col__list">
                  <li><a href="https://generative-ai.bytech.jp/chatgpt-master/" target="_blank">ChatGPTマスターコース</a></li>
                  <li><a href="https://generative-ai.bytech.jp/gemini-master/" target="_blank">Geminiマスターコース</a></li>
                  <li><a href="https://generative-ai.bytech.jp/copilot-master/" target="_blank">Copilotマスターコース</a></li>
                  <li><a href="https://generative-ai.bytech.jp/dify-master/" target="_blank">Difyマスターコース</a></li>
                  <li><a href="https://generative-ai.bytech.jp/notebooklm-master/" target="_blank">NotebookLMマスターコース</a></li>
                </ul>
              </div>
              <div>
                <div className="footer__col__ttl">コース一覧 - 目的別</div>
                <ul className="footer__col__list">
                  <li><a href="https://generative-ai.bytech.jp/ai-writer/" target="_blank">AIウェブライターコース</a></li>
                  <li><a href="https://generative-ai.bytech.jp/ai-movie-creator/" target="_blank">AI動画クリエイターコース</a></li>
                  <li><a href="https://generative-ai.bytech.jp/ai-image-creator/" target="_blank">AI画像クリエイターコース</a></li>
                  <li><a href="https://generative-ai.bytech.jp/business-worker/" target="_blank">ビジネスワーカーコース</a></li>
                  <li><a href="https://generative-ai.bytech.jp/generative-ai-passport/" target="_blank">生成AIパスポートコース</a></li>
                </ul>
              </div>
              <div>
                <div className="footer__col__ttl">サポート</div>
                <ul className="footer__col__list">
                  <li><a href="https://generative-ai.bytech.jp/membership-terms/" target="_blank">会員規約</a></li>
                  <li><a href="https://generative-ai.bytech.jp/refund-policy/" target="_blank">返金ポリシー</a></li>
                  <li><a href="https://generative-ai.bytech.jp/job-membership-terms/" target="_blank">案件獲得保証プラン利用規約</a></li>
                  <li><a href="https://generative-ai.bytech.jp/specified_commercial/" target="_blank">特定商取引法に関する表示</a></li>
                  <li><a href="https://generative-ai.bytech.jp/system-requirements/" target="_blank">システム要件</a></li>
                </ul>
                <div className="footer__col__ttl" style={{marginTop: '24px'}}>会社情報</div>
                <ul className="footer__col__list">
                  <li><a href="https://www.librex.co.jp/" target="_blank">会社概要</a></li>
                  <li><a href="https://generative-ai.bytech.jp/privacy-policy/" target="_blank">プライバシーポリシー</a></li>
                </ul>
                <div className="footer__col__ttl" style={{marginTop: '24px'}}>関連サービス</div>
                <ul className="footer__col__list">
                  <li><a href="https://bytech.jp/biz" target="_blank">法人向けAI研修【バイテックBiz】↗</a></li>
                  <li><a href="https://bytech.jp/blog/" target="_blank">個人向けAIメディア【バイテックBLOG】↗</a></li>
                  <li><a href="https://biz.bytech.jp/blog/" target="_blank">企業向けAIメディア【バイテックBLOG Biz】↗</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="footer__inner">
            <p>&copy; 2025 Librex Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ===== STICKY CTA ===== */}
      <div className="sticky-cta" id="stickyCta">
        <a href="https://generative-ai.bytech.jp/counseling/" target="_blank" className="btn-cta-main">まずは無料カウンセリング</a>
        <a href="#courses" className="btn-cta-sub">コース一覧</a>
      </div>

      {/* Inline Scripts */}
      <Script id="bytech-fadein" strategy="afterInteractive">{`
        var fadeinEls = document.querySelectorAll('.fadein');
        var observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(el) {
            if (el.isIntersecting) {
              el.target.classList.add('is-visible');
              observer.unobserve(el.target);
            }
          });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        fadeinEls.forEach(function(el) { observer.observe(el); });
      `}</Script>

      <Script id="bytech-tabs" strategy="afterInteractive">{`
        document.querySelectorAll('.curriculum__tab').forEach(function(tab) {
          tab.addEventListener('click', function() {
            document.querySelectorAll('.curriculum__tab').forEach(function(t) { t.classList.remove('is-active'); });
            tab.classList.add('is-active');
            document.querySelectorAll('.curriculum__panel').forEach(function(p) { p.classList.remove('is-active'); });
            document.getElementById('panel-' + tab.dataset.panel).classList.add('is-active');
          });
        });
      `}</Script>

      <Script id="bytech-faq" strategy="afterInteractive">{`
        document.querySelectorAll('.faq__item').forEach(function(item) {
          item.querySelector('.faq__item__q').addEventListener('click', function() {
            var isOpen = item.classList.contains('is-open');
            document.querySelectorAll('.faq__item').forEach(function(i) { i.classList.remove('is-open'); });
            if (!isOpen) item.classList.add('is-open');
          });
        });
      `}</Script>

      <Script id="bytech-sticky" strategy="afterInteractive">{`
        var stickyCta = document.getElementById('stickyCta');
        var updateSticky = function() {
          var scrollY = window.scrollY;
          var scrollBottom = scrollY + window.innerHeight;
          var docHeight = document.documentElement.scrollHeight;
          var nearBottom = (docHeight - scrollBottom) <= 80;
          if (scrollY > 300 && !nearBottom) {
            stickyCta.classList.add('is-visible');
          } else {
            stickyCta.classList.remove('is-visible');
          }
        };
        window.addEventListener('scroll', updateSticky, { passive: true });
      `}</Script>

      <Script id="bytech-smooth-scroll" strategy="afterInteractive">{`
        document.querySelectorAll('a[href^="#"]').forEach(function(a) {
          a.addEventListener('click', function(e) {
            var href = a.getAttribute('href');
            if (href === '#') return;
            var target = document.querySelector(href);
            if (target) {
              e.preventDefault();
              window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
            }
          });
        });
      `}</Script>

      <Script id="bytech-skills-slider" strategy="afterInteractive">{`
        (function() {
          var page = 0;
          var slides = document.querySelectorAll('.skills-slide');
          var dots = document.querySelectorAll('.skills-slider__dot');
          var total = slides.length;
          var pages = Math.ceil(total / 2);
          function showPage(p) {
            page = ((p % pages) + pages) % pages;
            for (var i = 0; i < total; i++) slides[i].classList.remove('is-active');
            dots.forEach(function(d) { d.classList.remove('is-active'); });
            var a = page * 2;
            var b = a + 1;
            if (a < total) slides[a].classList.add('is-active');
            if (b < total) slides[b].classList.add('is-active');
            if (dots[page]) dots[page].classList.add('is-active');
          }
          showPage(0);
          document.querySelectorAll('.skills-slider__arrow').forEach(function(btn) {
            btn.addEventListener('click', function() {
              showPage(page + parseInt(this.getAttribute('data-dir')));
            });
          });
          dots.forEach(function(dot, i) {
            dot.addEventListener('click', function() { showPage(i); });
          });
        })();
      `}</Script>
    </>
  )
}
