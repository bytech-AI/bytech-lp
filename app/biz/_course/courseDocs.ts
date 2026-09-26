// 各研修コースページ（FAQ下の導線）で出す、コース別の紹介資料。
// 資料の実体は docs/ebooks/<ebook>/deck.html、DLページは app/biz/<doc>/。

export type CourseDoc = { title: string; desc: string; href: string; cover: string };

export const COURSE_DOCS: Record<string, CourseDoc> = {
  "chat-gpt-training": {
    title: "ChatGPT研修 コース紹介資料",
    desc: "カリキュラム（全8ユニット・45レッスン／視聴時間 約6時間）から、料金プランと助成金活用、研修開始までの流れまでをまとめた資料です。",
    href: "/doc-f",
    cover: "/biz/assets/img/documents/ebook-05-cover.webp",
  },
  "gemini-training": {
    title: "Gemini研修 コース紹介資料",
    desc: "カリキュラム（全11ユニット・67レッスン／視聴時間 約5時間）から、料金プランと助成金活用、研修開始までの流れまでをまとめた資料です。",
    href: "/doc-g",
    cover: "/biz/assets/img/documents/ebook-06-cover.webp",
  },
  "claude-training": {
    title: "Claude研修 コース紹介資料",
    desc: "カリキュラム（全14ユニット・81レッスン／視聴時間 約6時間）から、料金プランと助成金活用、研修開始までの流れまでをまとめた資料です。",
    href: "/doc-h",
    cover: "/biz/assets/img/documents/ebook-07-cover.webp",
  },
  "claude-code-training": {
    title: "Claude Code研修 コース紹介資料",
    desc: "カリキュラム（全5ユニット／視聴時間 約12時間）から、料金プラン・サポート体制、研修開始までの流れまでをまとめた資料です。",
    href: "/doc-i",
    cover: "/biz/assets/img/documents/ebook-08-cover.webp",
  },
  "copilot-training": {
    title: "Copilot研修 コース紹介資料",
    desc: "カリキュラム（全6ユニット・48レッスン／視聴時間 約7時間）から、料金プランと助成金活用、研修開始までの流れまでをまとめた資料です。",
    href: "/doc-j",
    cover: "/biz/assets/img/documents/ebook-09-cover.webp",
  },
  "copilot-studio-training": {
    title: "Copilot Studio研修 コース紹介資料",
    desc: "カリキュラム（全11ユニット・70レッスン／視聴時間 約9時間）から、料金プランと助成金活用、研修開始までの流れまでをまとめた資料です。",
    href: "/doc-k",
    cover: "/biz/assets/img/documents/ebook-10-cover.webp",
  },
  "creative-ai-training": {
    title: "AIクリエイティブ研修 コース紹介資料",
    desc: "カリキュラム（全12ユニット・108レッスン／視聴時間 約12時間）から、料金プランと助成金活用、研修開始までの流れまでをまとめた資料です。",
    href: "/doc-l",
    cover: "/biz/assets/img/documents/ebook-11-cover.webp",
  },
  "dify-training": {
    title: "Dify研修 コース紹介資料",
    desc: "カリキュラム（全14ユニット・85レッスン／視聴時間 約10時間）から、料金プランと助成金活用、研修開始までの流れまでをまとめた資料です。",
    href: "/doc-m",
    cover: "/biz/assets/img/documents/ebook-12-cover.webp",
  },
};
