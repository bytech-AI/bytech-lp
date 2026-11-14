// /e-learning の見出し（セクション見出し・特長の見出し・CTA帯の見出し）だけ Noto Sans JP で出すための、使う文字だけのサブセットを作る。
// サイト全体では日本語Webフォントの配信をやめている（app/layout.tsx 参照）ため、ページ専用に数KBへ絞って読み込む。
//   node scripts/build-el-heading-font.mjs   （要 fonttools[woff]：fonttools / pyftsubset コマンド）
// 見出しの文言を変えたら再実行すること。出力: public/biz/assets/fonts/el-heading-noto.woff2
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const src = readFileSync(join(root, "app/biz/e-learning/page.tsx"), "utf8");
const titles = [...src.matchAll(/className="ct-about__title">([^<]+)</g)].map((m) => m[1]);
const feat = src.slice(src.indexOf("const FEATURES"), src.indexOf("] as const", src.indexOf("const FEATURES")));
// CTA帯の見出し（「資料1つで分かります！」など）。JSXのタグを除いた文字だけ使う
const bands = [...src.matchAll(/className="el-band__title">([\s\S]*?)<\/p>/g)].map((m) => m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, ""));
const heads = [...feat.matchAll(/\bh: "([^"]+)"/g)].map((m) => m[1].replace(/\\n/g, ""));
// 文言の小さな修正で欠けないよう、英数字と基本の記号は常に含める
const text = [...new Set([...titles, ...heads, ...bands].join("") + "0123456789,.、。・ー〜～ eAI")].join("");

// 可変フォントのままだと重いので、見出しで使う太さ（800）に固定してから絞る
const fixed = join(mkdtempSync(join(tmpdir(), "el-font-")), "noto-800.otf");
execFileSync("fonttools", ["varLib.instancer", join(root, "app/fonts/NotoSansJP-VF.otf"), "wght=800", "-o", fixed, "-q"]);
execFileSync("pyftsubset", [
  fixed,
  `--text=${text}`,
  "--no-hinting",
  "--desubroutinize",
  "--flavor=woff2",
  `--output-file=${join(root, "public/biz/assets/fonts/el-heading-noto.woff2")}`,
]);
console.log(`el-heading-noto.woff2: ${text.length} chars`);
