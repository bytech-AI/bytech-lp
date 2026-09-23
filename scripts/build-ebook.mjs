// お役立ち資料（ebook）のスライド原稿から、閲覧ページ用の埋め込みHTMLと配布用PDFを一括生成する。
//
//   node scripts/build-ebook.mjs ebook-02          … 埋め込みHTMLのみ更新（通常はこちら）
//   node scripts/build-ebook.mjs ebook-02 --pdf    … PDFも書き出す（配布物の更新指示があったときだけ）
//
// 入力:  docs/ebooks/<slug>/deck.html …… スライドの実体（1280x720・@media print定義済み）
// 出力:  public/biz/ebooks/<slug>/index.html（+assets/） …… /documents/<slug> が iframe で表示する埋め込み版
//        public/biz/assets/docs/<slug>.pdf                …… DLボタンの配布物
//
// deck.html を修正したら必ずこのスクリプトを実行すること。埋め込みHTML/PDFは生成物のコピーなので、
// 書き出しを忘れるとページ・PDFと原稿がズレる。
// 前提: macOSのGoogle Chrome（同梱Chromiumは古いため不使用）。

import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import puppeteer from "puppeteer";

const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const slug = process.argv[2];
const withPdf = process.argv.includes("--pdf");
if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error("usage: node scripts/build-ebook.mjs <slug>   (例: ebook-02)");
  process.exit(1);
}

const root = resolve(import.meta.dirname, "..");
const deckDir = join(root, "docs", "ebooks", slug);
const deckPath = join(deckDir, "deck.html");
const pdfOut = join(root, "public", "biz", "assets", "docs", `${slug}.pdf`);
const embedDir = join(root, "public", "biz", "ebooks", slug);

if (!existsSync(deckPath)) {
  console.error(`原稿が見つかりません: ${deckPath}`);
  process.exit(1);
}
mkdirSync(join(root, "public", "biz", "assets", "docs"), { recursive: true });
mkdirSync(embedDir, { recursive: true });

// --- PDF（--pdf 指定時のみ。配布物の更新は明示的な指示があったときだけ行う運用） ---
if (withPdf) {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1.5 });
  await page.goto(`file://${deckPath}`, { waitUntil: "networkidle2" });
  await page.evaluateHandle("document.fonts.ready");
  await new Promise((r) => setTimeout(r, 400));
  await page.pdf({
    path: pdfOut,
    width: "1280px",
    height: "720px",
    printBackground: true,
    preferCSSPageSize: true,
  });
  const pages = await page.evaluate(
    () => document.querySelectorAll("figure.slide-shell .clip").length,
  );
  await browser.close();
  console.log(`${slug}: PDF(${pages}p) -> ${pdfOut}`);
}

// --- 埋め込みHTML（レビュー用の余白・キャプション・縮小transformを打ち消して配信） ---
const EMBED_CSS = `
<style id="ebook-embed-overrides">
  body { padding: 0 !important; background: #e9edf3 !important; }
  .note { display: none !important; }
  .deck { gap: 16px !important; }
  .slide-shell { width: 1280px !important; }
  .slide-shell figcaption { display: none !important; }
  .slide-shell .clip { height: 720px !important; border-radius: 0 !important; box-shadow: none !important; }
  .slide { transform: none !important; border: none !important; border-radius: 0 !important; }
</style>
</head>`;
let html = readFileSync(deckPath, "utf-8");
html = html.replace("</head>", EMBED_CSS);
// 相対アセット参照を絶対パスへ。biz の proxy は拡張子つき相対パス(/ebooks/...svg)を
// リライトせず素通しして404にするため、/biz/ 起点の絶対参照に変換して配信する。
html = html.replaceAll('src="assets/', `src="/biz/ebooks/${slug}/assets/`);
// スタイルを別ファイルに切り出した原稿（<link href="assets/deck.css">）にも対応する。
// 外部CDN(fonts.googleapis.com)のhrefは絶対URLなのでこの置換に一致しない。
html = html.replaceAll('href="assets/', `href="/biz/ebooks/${slug}/assets/`);
writeFileSync(join(embedDir, "index.html"), html);
if (existsSync(join(deckDir, "assets"))) {
  cpSync(join(deckDir, "assets"), join(embedDir, "assets"), { recursive: true });
}

console.log(`${slug}: embed -> ${embedDir}/index.html`);
