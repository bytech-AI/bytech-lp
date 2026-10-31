// お役立ち資料の一覧・DLページ用の画像を書き出す。
//   node scripts/export-ebook-images.mjs <slug> [ページ番号 ...]   （既定は 1 2 3 4 5 6）
// 出力: public/biz/assets/img/documents/<slug>-cover.webp（640×996・角は透過）
//       public/biz/assets/img/documents/preview/<slug>-pNN.webp（1280×720）
import { execFileSync } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import puppeteer from "puppeteer";

const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const root = resolve(import.meta.dirname, "..");
const [slug, ...rest] = process.argv.slice(2);
if (!slug) throw new Error("usage: node scripts/export-ebook-images.mjs <slug> [ページ番号 ...]");
const pages = (rest.length ? rest : ["1", "2", "3", "4", "5", "6"]).map(Number);
const deck = join(root, "docs", "ebooks", slug);
const img = join(root, "public", "biz", "assets", "img", "documents");
const tmp = mkdtempSync(join(tmpdir(), "ebook-img-"));
const webp = (src, dest) => execFileSync("cwebp", ["-quiet", "-q", "86", "-exact", src, "-o", dest]);

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 640, height: 996, deviceScaleFactor: 1 });
await page.goto(`file://${join(deck, "cover.html")}`, { waitUntil: "networkidle2" });
await page.evaluateHandle("document.fonts.ready");
await page.screenshot({ path: join(tmp, "cover.png"), omitBackground: true });
webp(join(tmp, "cover.png"), join(img, `${slug}-cover.webp`));

await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });
await page.goto(`file://${join(deck, "deck.html")}`, { waitUntil: "networkidle2" });
await page.evaluateHandle("document.fonts.ready");
await page.addStyleTag({ content: ".slide{transform:none!important}.slide-shell{width:1280px!important}.slide-shell .clip{height:720px!important}" });
await new Promise((r) => setTimeout(r, 400));
const slides = await page.$$(".slide");
for (const n of pages) {
  const png = join(tmp, `p${n}.png`);
  await slides[n - 1].screenshot({ path: png });
  webp(png, join(img, "preview", `${slug}-p${String(n).padStart(2, "0")}.webp`));
}
await browser.close();
console.log(`${slug}: cover + ${pages.length} previews`);
