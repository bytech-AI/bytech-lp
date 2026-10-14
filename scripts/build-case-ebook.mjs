// 業種別 AI活用事例集の deck.html を cases.json から生成する。
//   node scripts/build-case-ebook.mjs ebook-14
//   → docs/ebooks/<slug>/cases.json を読み、docs/ebooks/<slug>/deck.html を書き出す。
//     そのあと node scripts/build-ebook.mjs <slug> --pdf で埋め込みHTML・PDFを作る。
// スタイルは製造業版（ebook-13）の deck.html の <head> をそのまま流用する。
// ★数値は cases.json に出典の表記どおり入れること。ここでは一切加工しない。
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const slug = process.argv[2];
if (!slug) throw new Error("usage: node scripts/build-case-ebook.mjs <slug>");
const dir = join(root, "docs", "ebooks", slug);
const data = JSON.parse(readFileSync(join(dir, "cases.json"), "utf8"));
const tpl = readFileSync(join(root, "docs", "ebooks", "ebook-13", "deck.html"), "utf8");

// 共通アセット（ロゴ）は製造業版から複製。表紙イラストは業種ごとに assets/cover-illus.png を置く。
mkdirSync(join(dir, "assets"), { recursive: true });
for (const f of ["biz-logo.svg", "biz-logo-w.svg"]) {
  copyFileSync(join(root, "docs", "ebooks", "ebook-13", "assets", f), join(dir, "assets", f));
}
if (!existsSync(join(dir, "assets", "cover-illus.png"))) throw new Error("assets/cover-illus.png がありません");

const P = 'fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"';
const ICON = {
  company: '<path d="M3 21h18M5 21V7l7-4 7 4v14M9.5 21v-4.5h5V21"/>',
  shield: '<path d="M12 3l7 3v5c0 4.2-2.9 7.7-7 8.8C7.9 18.7 5 15.2 5 11V6z"/><path d="M9 11.6l2.1 2.1L15.2 9.6"/>',
  gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.2v2.6M12 19.2v2.6M4.4 4.4l1.9 1.9M17.7 17.7l1.9 1.9M2.2 12h2.6M19.2 12h2.6M4.4 19.6l1.9-1.9M17.7 6.3l1.9-1.9"/>',
  flask: '<path d="M9.2 3h5.6M10.3 3v6.2L5 18.4A2 2 0 006.7 21.4h10.6a2 2 0 001.7-3L13.7 9.2V3"/>',
  trend: '<path d="M3 17.2l6-6 4 4 7.2-8"/><path d="M20.8 7.2v-4h-4"/>',
  factory: '<path d="M3 21h18V10.2l-6 3.9v-3.9l-6 3.9V6.6H3z"/><path d="M7 21v-3.4M12 21v-3.4M17 21v-3.4"/>',
  helmet: '<path d="M3 17h18M5 17a7 7 0 0114 0"/><path d="M10 10V6h4v4"/><path d="M4 20h16"/>',
  doc: '<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  chat: '<path d="M21 12a8 8 0 01-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1121 12z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M20.5 20.5l-4.8-4.8"/>',
  people: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 4.6a3.2 3.2 0 010 6.3M21 20c0-2.6-1.6-4.8-4-5.6"/>',
  truck: '<path d="M2.5 6h11v10h-11zM13.5 10h4l3.5 3.5V16h-7.5"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  cart: '<path d="M3 4h2.2l2.3 11.2h11L21 7.5H6.2"/><circle cx="9" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0112 7.6 4.3 4.3 0 0119.5 10c0 5.4-7.5 10-7.5 10z"/><path d="M8.5 12.5h2l1-2 1.5 4 1-2h1.5"/>',
  calc: '<rect x="5" y="3" width="14" height="18" rx="0"/><path d="M8 7h8M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h.01M15.5 18h.01"/>',
};
const icon = (key, size, sw) => {
  const body = ICON[key];
  if (!body) throw new Error(`unknown icon: ${key}`);
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" ${P} stroke-width="${sw}">${body}</svg>`;
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const ind = data.industry;
const cos = data.companies;
const n = cos.length;
if (n < 8 || n > 10) throw new Error(`事例は8〜10件: ${n}`);
const half = data.split ?? Math.ceil(n / 2); // 一覧1ページ目に載せる社数（テーマの区切り）
const pages = [cos.slice(0, half), cos.slice(half)];
const detailStart = 4; // 表紙=1, 目次=2, 一覧=3-4, 詳細=5-
const no = (i) => String(i + 1).padStart(2, "0");
const logo = '<img class="s-logo" src="assets/biz-logo.svg" alt="byTech BUSINESS">';
// 一覧ページの出典はそのページに載せた社だけ（10社分を並べると本文に重なるため）
const footList = (list) =>
  `<p class="s-foot">出典：各社の公式発表（プレスリリース・ニュースルーム・公式サイト）。${list.map((c) => c.source_short).join("／")}。数値は各社の公表値であり、当社による測定値ではありません。社名・製品名は各社の商標です。</p>`;
const shell = (caption, inner, cls = "slide") =>
  `    <figure class="slide-shell"><div class="clip">\n      <div class="${cls}">\n${inner}\n      </div>\n    </div><figcaption>${caption}</figcaption></figure>\n`;

const slides = [];

// 表紙
slides.push(
  shell(
    "表紙",
    `        <p class="t">${esc(ind)}の<br>AI活用事例集</p>
        <p class="sub">${esc(data.subtitle)}</p>
        <p class="meta">${esc(data.edition)}　｜　バイテック法人AI研修</p>
        <img class="il" src="assets/cover-illus.png" alt="">
        <img class="logo" src="assets/biz-logo.svg" alt="byTech BUSINESS">`,
    "slide cv"
  )
);

// 目次
const ix = cos
  .map(
    (c, i) =>
      `<div><span class="n">${no(i)}</span><span class="nm">${esc(c.name)}<span class="ar">${icon(c.icon, 11, 2)}${esc(c.area)}</span></span><span class="pg">P.${detailStart + 1 + i}</span></div>`
  )
  .join("");
slides.push(
  shell(
    "目次",
    `        <div class="s-body">
        <p class="s-eyebrow">Contents</p>
        ${logo}
        <div class="hd" style="margin-top:4px">
          <p class="t" style="font-size:27px">目次</p>
        </div>
        <div class="ixh"><span class="lb">詳細事例</span><span class="tx">1社1ページ。背景・取り組み・成果・自社への応用まで</span><span class="pg">P.${detailStart + 1} - ${detailStart + n}</span></div>
        <div class="ixg">${ix}</div>
        <p class="s-foot">本資料は各社が公開している情報をもとにバイテック法人AI研修が編集したものです。掲載している数値はすべて各社の公表値であり、当社による測定値ではありません。掲載企業との取引関係や、各社による推薦を示すものではありません。</p>
        <div class="s-num en"></div>
        </div>`
  )
);

// 一覧 2ページ
pages.forEach((list, p) => {
  const pg = p === 0 ? data.page1 : data.page2;
  const rows = list
    .map((c) => {
      const i = cos.indexOf(c);
      return `          <tr>
            <td class="no">${no(i)}</td><td class="co"><span>${esc(c.name)}</span></td><td class="ar"><span>${icon(c.icon, 13, 1.9)}${esc(c.area)}</span></td>
            <td>${c.list_action}</td>
            <td class="rs">${c.list_result_html}</td>
          </tr>`;
    })
    .join("\n");
  slides.push(
    shell(
      `${ind}（${p + 1}/2）`,
      `        <div class="s-body">
        <p class="s-eyebrow">${esc(ind)} 活用事例</p>
        ${logo}
        <div class="hd">
          <span class="badge">${esc(ind)}<small>${p + 1} / 2</small></span>
          <p class="t">${pg.headline_html}</p>
        </div>
        <table class="cs${list.length > 5 ? " cmp" : ""}">
          <colgroup><col style="width:40px"><col style="width:176px"><col style="width:112px"><col><col style="width:262px"></colgroup>
          <tr><th>No.</th><th>企業</th><th>活用領域</th><th>取り組み</th><th>公表されている成果</th></tr>
${rows}
        </table>
        <div class="band">${pg.band}</div>
        ${footList(list)}
        <div class="s-num en"></div>
        </div>`
    )
  );
});

// 詳細 1社1ページ
const sec = (h, items, top) =>
  `<div class="sec"${top ? ' style="margin-top:12px"' : ""}><p class="h">${h}</p><div class="b">${items
    .map((t) => `<p class="i">${t}</p>`)
    .join("")}</div></div>`;
cos.forEach((c, i) => {
  const kpi = `<div class="kpi">${c.kpis
    .map((k) => `<div><p class="k">${esc(k.label)}</p><p class="v">${esc(k.value)}<small>${esc(k.unit)}</small></p><p class="n">${esc(k.note)}</p></div>`)
    .join("")}</div>`;
  const trend = c.trend ? `<div class="trend"><p class="l">${c.trend.label}</p><p class="r">${c.trend.value_html}</p></div>` : "";
  const next = c.next_html ? sec("この先の目標", [c.next_html], true) : "";
  const learn = c.learn
    .map((l) => `<div><p class="t">${esc(l.title)}</p><p class="d">${esc(l.desc)}</p></div>`)
    .join("");
  slides.push(
    shell(
      `詳細事例 ${no(i)} ${c.name}`,
      `        <div class="s-body">
        <p class="s-eyebrow">詳細事例｜${esc(ind)}</p>
        ${logo}
        <div class="dhd">
          <span class="no">${no(i)}</span>
          <span class="mark">${icon(c.icon, 24, 1.9)}</span>
          <p class="co">${esc(c.name)}<small>${esc(c.tagline)}</small></p>
          <div class="tags">${c.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
        </div>
        <div class="dt">
          <div>${sec("取り組み", c.actions_html)}${sec("成果が出た理由", c.reasons_html, true)}</div>
          <div>${kpi}${trend}${next}</div>
        </div>
        <div class="learn">
          <p class="h">自社に置き換えるなら（当社の見解）</p>
          <div class="g">${learn}</div>
        </div>
        <p class="s-foot">出典：${esc(c.source_full)}。数値は各社の公表値であり、当社による測定値ではありません。「自社に置き換えるなら」は当社の見解です。</p>
        <div class="s-num en"></div>
        </div>`
    )
  );
});

const total = slides.length;
const head = tpl
  .slice(0, tpl.indexOf("<body>"))
  .replace(/<title>[^<]*<\/title>/, `<title>${esc(ind)}のAI活用事例集｜全${total}スライド</title>`)
  // 推移ラベルが長いと縦に潰れるため、ラベル幅を確保して値側を折り返し可にする
  .replace("</style>", "  .trend .l { flex: 0 0 150px; }\n  .trend .r { white-space: normal; text-align: right; line-height: 1.35; }\n  .cs td { padding-top: 11px; padding-bottom: 11px; }\n  .cs.cmp td { padding-top: 6px; padding-bottom: 6px; line-height: 1.45; }\n</style>");
const html = `${head}<body>
  <p class="note">${esc(ind)}のAI活用事例集｜一覧2ページ＋詳細${n}ページ／事例はすべて各社の公開情報にもとづく</p>
  <div class="deck">

${slides.join("\n")}  </div>
</body>
</html>
`;
writeFileSync(join(dir, "deck.html"), html);
console.log(`${slug}: ${total} slides -> docs/ebooks/${slug}/deck.html`);

// 一覧・DLページ用の縦長カバー（640×996）。スクショして public/biz/assets/img/documents/<slug>-cover.webp にする。
const cover = `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500;700;800;900&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 640px; height: 996px; background: transparent; }
  .bk { position: relative; width: 640px; height: 996px; background: #fff; border-radius: 18px; overflow: hidden; font-family: "Noto Sans JP", sans-serif; }
  .bar { position: absolute; top: 0; left: 0; right: 0; height: 9px; background: linear-gradient(90deg, #ef6d3b 0 34%, #2960cf 34% 100%); }
  .eb { position: absolute; top: 46px; left: 44px; display: flex; align-items: center; gap: 9px; font-size: 14px; font-weight: 800; color: #2b5fcf; }
  .eb::before { content: ""; width: 9px; height: 9px; border-radius: 50%; background: #ef6f38; }
  .ind { position: absolute; top: 90px; left: 42px; right: 30px; font-size: ${[...ind].length > 5 ? 52 : 64}px; font-weight: 900; color: #2b5fcf; line-height: 1.12; letter-spacing: .01em; }
  .ttl { position: absolute; top: 178px; left: 44px; font-size: 34px; font-weight: 900; color: #1a2e50; }
  .sub { position: absolute; top: 326px; left: 46px; right: 30px; font-size: 15px; font-weight: 700; color: #3a4252; }
  .il { position: absolute; left: 50%; bottom: 196px; transform: translateX(-50%); width: 560px; max-height: 420px; object-fit: contain; object-position: bottom; }
  .ft { position: absolute; left: 0; right: 0; bottom: 0; height: 186px; background: #2b5fcf; border-top: 5px solid #ef6d3b; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px; }
  .ft p { color: #fff; font-size: 31px; font-weight: 900; letter-spacing: .02em; }
  .ft div { display: flex; gap: 12px; }
  .ft span { border: 1.5px solid rgba(255,255,255,.85); color: #fff; font-size: 14px; font-weight: 800; padding: 6px 18px; border-radius: 999px; }
</style></head><body><div class="bk">
  <div class="bar"></div>
  <p class="eb">業種別 AI活用事例集</p>
  <p class="ind">${esc(ind)}</p>
  <p class="ttl">AI活用事例集</p>
  <p class="sub">${esc(data.subtitle)}</p>
  <img class="il" src="assets/cover-illus.png" alt="">
  <div class="ft"><p>掲載${n}${data.count_unit ?? "社"}・全${total}ページ</p><div><span>公開情報ベース</span><span>出典明記</span></div></div>
</div></body></html>`;
writeFileSync(join(dir, "cover.html"), cover);
