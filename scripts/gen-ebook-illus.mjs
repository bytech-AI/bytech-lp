// お役立ち資料のイラストを fal.ai（openai/gpt-image-2）で生成し、背景を透過して webp にする。
//   node scripts/gen-ebook-illus.mjs <slug> [id ...]
// 入力: docs/ebooks/<slug>/illus.json … [{ "id": "idea01", "p": "英語のプロンプト" }, ...]
// 出力: docs/ebooks/<slug>/assets/illus/<id>.webp
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const [slug, ...only] = process.argv.slice(2);
if (!slug) throw new Error("usage: node scripts/gen-ebook-illus.mjs <slug> [id ...]");
const KEY = readFileSync(join(root, ".env.local"), "utf8").match(/^FAL_KEY=["']?([^"'\n]+)/m)[1];
const dir = join(root, "docs", "ebooks", slug);
const outDir = join(dir, "assets", "illus");
mkdirSync(outDir, { recursive: true });
const raw = mkdtempSync(join(tmpdir(), "ebook-illus-"));
const STYLE =
  "Flat vector corporate illustration in a clean modern Japanese business style. Limited palette: dark navy, royal blue, light sky blue, soft warm amber accent, white, and natural skin tones. Simple geometric shapes, no outlines, no gradients, no shadows. Solid plain white background. Absolutely no text, no letters, no numbers, no logos, no knot or flower-shaped logo; screens and documents show only plain blank bars and simple shapes. Centered composition with margin around the subject.";
const H = { Authorization: `Key ${KEY}`, "Content-Type": "application/json" };
const items = JSON.parse(readFileSync(join(dir, "illus.json"), "utf8")).filter(
  (i) => (only.length ? only.includes(i.id) : !existsSync(join(outDir, `${i.id}.webp`)))
);

let failed = 0;
async function one(it) {
  const r = await fetch("https://queue.fal.run/openai/gpt-image-2", {
    method: "POST",
    headers: H,
    body: JSON.stringify({ prompt: `${it.p} ${STYLE}`, image_size: { width: 1024, height: 1024 }, quality: "medium", output_format: "png", num_images: 1 }),
  });
  const j = await r.json();
  if (!j.status_url) {
    failed++;
    return console.log(it.id, "ERR", r.status, JSON.stringify(j).slice(0, 200));
  }
  for (let n = 0; n < 120; n++) {
    await new Promise((x) => setTimeout(x, 3000));
    const s = await (await fetch(j.status_url, { headers: H })).json();
    if (s.status === "COMPLETED") {
      const res = await (await fetch(j.response_url, { headers: H })).json();
      const url = res.images?.[0]?.url;
      if (!url) break;
      writeFileSync(join(raw, `${it.id}.png`), Buffer.from(await (await fetch(url)).arrayBuffer()));
      return console.log(it.id, "ok");
    }
    if (s.status === "FAILED") break;
  }
  failed++;
  console.log(it.id, "failed");
}
for (let i = 0; i < items.length; i += 4) await Promise.all(items.slice(i, i + 4).map(one));
execFileSync("python3", [join(root, "scripts", "ebook-illus-transparent.py"), raw, outDir], { stdio: "inherit" });
if (failed) process.exit(1);
