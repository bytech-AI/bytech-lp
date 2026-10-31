// AI活用ノウハウ系の資料（事例を厚く載せるタイプ）の deck.html を spec.json から生成する。
//   node scripts/build-knowledge-ebook.mjs ebook-19
//   → docs/ebooks/<slug>/spec.json を読み、docs/ebooks/<slug>/deck.html と cover.html を書き出す。
//     そのあと node scripts/build-ebook.mjs <slug> --pdf で埋め込みHTML・PDFを作る。
// スタイルは業種別事例集（ebook-13）の <head> を土台に、ノウハウ系のスライド型を足している。
// ★事例・数値・料金は spec.json に出典の表記どおり入れること。ここでは一切加工しない。
//
// spec.json: { title, subtitle, edition, cover_title_html, category_label, notes_title?, slides: [ {type, ...} ] }
// type: toc | lead(見出し＋本文) | cards | steps | chapter | table | caselist | case | template | checklist | cta | notes
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const slug = process.argv[2];
if (!slug) throw new Error("usage: node scripts/build-knowledge-ebook.mjs <slug>");
const dir = join(root, "docs", "ebooks", slug);
const spec = JSON.parse(readFileSync(join(dir, "spec.json"), "utf8"));
const tpl = readFileSync(join(root, "docs", "ebooks", "ebook-13", "deck.html"), "utf8");

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
  alert: '<path d="M12 3.5l9.5 16.5h-19z"/><path d="M12 10v4.5M12 17.2h.01"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10"/><path d="M8 10.5V7.5a4 4 0 018 0v3"/>',
  scale: '<path d="M12 3v18M5 21h14M5 7h14"/><path d="M5 7l-3 7a3 3 0 006 0zM19 7l-3 7a3 3 0 006 0z"/>',
  book: '<path d="M4 4.5h6a2 2 0 012 2V20a2 2 0 00-2-2H4zM20 4.5h-6a2 2 0 00-2 2V20a2 2 0 012-2h6z"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8"/>',
  yen: '<path d="M6 3l6 8 6-8M12 11v10M7.5 13h9M7.5 16.5h9"/>',
  check: '<rect x="4" y="4" width="16" height="16"/><path d="M8.5 12.2l2.5 2.5 4.8-5"/>',
};
const icon = (key, size, sw = 1.9) => {
  const body = ICON[key || "doc"];
  if (!body) throw new Error(`unknown icon: ${key}`);
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" ${P} stroke-width="${sw}">${body}</svg>`;
};
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const logo = '<img class="s-logo" src="assets/biz-logo.svg" alt="byTech BUSINESS">';
const foot = (t) => (t ? `<p class="s-foot">${t}</p>` : "");
const shell = (caption, inner, cls = "slide") =>
  `    <figure class="slide-shell"><div class="clip">\n      <div class="${cls}">\n${inner}\n      </div>\n    </div><figcaption>${esc(caption)}</figcaption></figure>\n`;
const body = (eyebrow, inner, footText, fill = true) =>
  `        <div class="s-body${fill ? " fl" : ""}">
        <p class="s-eyebrow">${esc(eyebrow)}</p>
        ${logo}
${inner}
        ${foot(footText)}
        <div class="s-num en"></div>
        </div>`;
const head = (title_html, lead) =>
  `        <div class="kh"><p class="t">${title_html}</p>${lead ? `<p class="l">${lead}</p>` : ""}</div>`;
const items = (arr, cls = "i") => (arr || []).map((t) => `<p class="${cls}">${t}</p>`).join("");
const sec = (h, arr, top) =>
  `<div class="sec"${top ? ' style="margin-top:12px"' : ""}><p class="h">${esc(h)}</p><div class="b">${items(arr)}</div></div>`;
const kpiBox = (kpis) =>
  kpis && kpis.length
    ? `<div class="kpi">${kpis
        .map((k) => `<div><p class="k">${esc(k.label)}</p><p class="v">${esc(k.value)}<small>${esc(k.unit)}</small></p><p class="n">${esc(k.note)}</p></div>`)
        .join("")}</div>`
    : "";


// ===== 事例ページの数値ビジュアル =====
// % の値はドーナツ、「A→B」はビフォーアフターの棒グラフ、それ以外は大きな数字のタイルにする。
const num = (t) => {
  const m = String(t).replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : null;
};
const donut = (pct, tone) => {
  const r = 34, c = 2 * Math.PI * r, v = Math.max(0, Math.min(100, pct));
  const col = tone === "red" ? "#d6453d" : "#1a6fb5";
  return `<svg width="92" height="92" viewBox="0 0 92 92"><circle cx="46" cy="46" r="${r}" fill="none" stroke="#e6edf6" stroke-width="12"/><circle cx="46" cy="46" r="${r}" fill="none" stroke="${col}" stroke-width="12" stroke-dasharray="${(c * v) / 100} ${c}" transform="rotate(-90 46 46)"/></svg>`;
};
const bars = (a, b, la, lb, unit, tone) => {
  const mx = Math.max(a, b) || 1;
  const col = tone === "red" ? "#d6453d" : "#1a6fb5";
  const row = (lab, v, hi) =>
    `<div class="br"><span class="bl">${esc(lab)}</span><span class="bt"><span style="width:${Math.max(6, (v / mx) * 100)}%;background:${hi ? col : "#b9c7da"}"></span></span><span class="bv${hi ? " hi" : ""}">${esc(lab === "" ? "" : "")}${v.toLocaleString("ja-JP")}<small>${esc(unit)}</small></span></div>`;
  return row(la, a, false) + row(lb, b, true);
};
const vizKpis = (kpis, tone) => {
  if (!kpis || !kpis.length) return "";
  const out = [];
  const tiles = [];
  // hero:true の指標を主役に固定する（%の指標がドーナツで先に立つのを防ぐ）
  const forced = kpis.find((k) => k.hero);
  for (const k of kpis.filter((x) => x !== forced)) {
    const v = String(k.value);
    const arrow = v.split(/→|->/);
    if (arrow.length === 2 && num(arrow[0]) !== null && num(arrow[1]) !== null) {
      out.push(`<div class="vk chart"><p class="k">${esc(k.label)}</p>${bars(num(arrow[0]), num(arrow[1]), "前", "後", k.unit, tone)}<p class="n">${esc(k.note)}</p></div>`);
    } else if (/%|％/.test(k.unit + v) && num(v) !== null && num(v) <= 100 && !forced && out.filter((x) => x.includes("donut")).length < 1) {
      const rest = (k.unit || "").replace(/^[%％]/, "");
      out.push(`<div class="vk donut"><div class="dn">${donut(num(v), tone)}<span>${esc(String(num(v)))}<small>%</small></span></div><div><p class="k">${esc(k.label)}${rest ? `（${esc(rest)}）` : ""}</p><p class="n">${esc(k.note)}</p></div></div>`);
    } else tiles.push(k);
  }
  const hero = forced || (tiles.length && !out.length ? tiles.shift() : null);
  const heroHtml = hero ? `<div class="vk hero ${tone}"><p class="k">${esc(hero.label)}</p><p class="v">${esc(hero.value)}<small>${esc(hero.unit)}</small></p><p class="n">${esc(hero.note)}</p></div>` : "";
  const tileHtml = tiles.length ? `<div class="vt c${Math.min(tiles.length, 3)}">${tiles.slice(0, 3).map((k) => `<div><p class="k">${esc(k.label)}</p><p class="v">${esc(k.value)}<small>${esc(k.unit)}</small></p><p class="n">${esc(k.note)}</p></div>`).join("")}</div>` : "";
  return heroHtml + out.join("") + tileHtml;
};

// 活用アイデアの着手段階と、導入の負荷（1〜3）の表示
const STAGE = { 1: "まず試す", 2: "部門で広げる", 3: "基幹とつなぐ" };
const loadDots = (n) => `<span class="ld" aria-label="負荷${n}">${[1, 2, 3].map((i) => `<i${i <= n ? ' class="on"' : ""}></i>`).join("")}</span>`;

// 事例の通し番号（caselist / case で共有）
let caseNo = 0;
const R = {
  // 表紙：既存のノウハウ資料（ebook-02/03/04）と同じ青グラデーション＋波の形式
  cover: (s) =>
    shell(
      "表紙",
      `        <svg class="waves" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path d="M700,-80 C980,60 820,300 1120,380 C1320,433 1360,560 1280,760 L1380,760 L1380,-80 Z" fill="rgba(255,255,255,0.07)"/>
          <path d="M880,-120 C1150,40 980,260 1240,330 L1340,330 L1340,-120 Z" fill="rgba(90,160,230,0.28)"/>
          <path d="M-80,560 C240,480 420,660 760,600 C1040,551 1180,640 1300,760 L-80,760 Z" fill="rgba(20,40,80,0.22)"/>
          <path d="M-80,640 C300,560 560,720 900,660 C1120,621 1240,690 1310,760 L-80,760 Z" fill="rgba(90,160,230,0.18)"/>
        </svg>
        <div class="badge-row"><span class="badge">お役立ち資料</span><span class="badge-note">バイテック法人AI研修</span></div>
        <p class="sub">${esc(spec.cover_sub || spec.subtitle)}</p>
        <h1 class="title">${spec.cover_title_html}</h1>
        ${spec.cover_pills ? `<div class="pills${spec.cover_illus ? " row" : ""}">${spec.cover_pills.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
        ${spec.cover_illus ? `<div class="cvil"><img src="${spec.cover_illus}" alt=""></div>` : ""}
        <p class="date">UPDATE 2026.10</p>
        <img class="logo" src="assets/biz-logo-w.svg" alt="byTech BUSINESS">`,
      `slide blue-bg kcover${spec.cover_theme ? ` ${spec.cover_theme}` : ""}`
    ),
  toc: (s) =>
    shell(
      "目次",
      body(
        "Contents",
        `        <div class="hd" style="margin-top:4px"><p class="t" style="font-size:27px">目次</p></div>
        <div class="grow toc">${s.items
          .map((it, i) => `<div><span class="n">${String(i + 1).padStart(2, "0")}</span><span class="nm">${esc(it.title)}<small>${esc(it.desc || "")}</small></span><span class="pg">${esc(it.pages)}</span></div>`)
          .join("")}</div>`,
        s.foot
      )
    ),
  lead: (s) =>
    shell(s.caption || s.eyebrow, body(s.eyebrow, `${head(s.title_html, s.lead)}<div class="ld">${items(s.paras, "p")}</div>${s.band ? `<div class="band">${s.band}</div>` : ""}`, s.foot)),
  cards: (s) =>
    shell(
      s.caption || s.eyebrow,
      body(
        s.eyebrow,
        `${head(s.title_html, s.lead)}
        <div class="grow cards c${s.cards.length}">${s.cards
          .map((c) => `<div>${c.illus ? `<img class="cil" src="${c.illus}" alt="">` : `<span class="ic${c.logos ? " lg" : ""}">${c.logos ? c.logos.map((l) => `<img src="${l}" alt="">`).join("") : icon(c.icon, 22)}</span>`}<p class="t">${esc(c.title)}</p><p class="d">${c.desc}</p>${c.tag ? `<p class="g">${esc(c.tag)}</p>` : ""}</div>`)
          .join("")}</div>${s.band ? `<div class="band">${s.band}</div>` : ""}`,
        s.foot
      )
    ),
  steps: (s) =>
    shell(
      s.caption || s.eyebrow,
      body(
        s.eyebrow,
        `${head(s.title_html, s.lead)}
        <div class="grow steps">${s.steps
          .map((st, i) => `<div><span class="n">${String(i + 1).padStart(2, "0")}</span><div><p class="t">${st.title}</p><p class="d">${st.desc}</p></div>${st.side ? `<p class="sd">${st.side}</p>` : ""}</div>`)
          .join("")}</div>${s.band ? `<div class="band">${s.band}</div>` : ""}`,
        s.foot
      )
    ),
  chapter: (s) =>
    shell(
      s.caption || `章扉 ${s.title}`,
      `        <div class="chp">
          <img class="s-logo" src="assets/biz-logo-w.svg" alt="byTech BUSINESS">
          <span class="no">${esc(s.no)}</span>
          <p class="t">${esc(s.title)}</p>
          <p class="d">${esc(s.desc || "")}</p>
          <div class="s-num en"></div>
        </div>`,
      "slide ch"
    ),
  table: (s) =>
    shell(
      s.caption || s.eyebrow,
      body(
        s.eyebrow,
        `${head(s.title_html, s.lead)}
        <table class="grow cs kt${s.dense === "mid" ? " mid" : s.dense ? " cmp" : ""}${s.rows.length <= 6 && s.dense !== true ? " tall" : ""}">
          ${s.cols ? `<colgroup>${s.cols.map((w) => `<col${w ? ` style="width:${w}px"` : ""}>`).join("")}</colgroup>` : ""}
          <tr>${s.header.map((h) => `<th>${esc(h)}</th>`).join("")}</tr>
          ${s.rows.map((r) => `<tr>${r.map((c, j) => `<td${j === 0 ? ' class="kc"' : ""}>${c}</td>`).join("")}</tr>`).join("\n          ")}
        </table>${s.band ? `<div class="band">${s.band}</div>` : ""}`,
        s.foot
      )
    ),
  caselist: (s) => {
    const start = caseNo;
    return shell(
      s.caption || "事例一覧",
      body(
        s.eyebrow,
        `${head(s.title_html, s.lead)}
        <table class="grow cs${s.rows.length > 5 ? " cmp" : ""}">
          <colgroup><col style="width:40px"><col style="width:176px"><col style="width:120px"><col><col style="width:262px"></colgroup>
          <tr><th>No.</th><th>${esc(s.col_name || "企業")}</th><th>${esc(s.col_area || "区分")}</th><th>取り組み</th><th>${esc(s.col_result || "公表されている成果")}</th></tr>
${s.rows
  .map(
    (c, i) => `          <tr>
            <td class="no">${String(start + i + 1).padStart(2, "0")}</td><td class="co"><span>${esc(c.name)}</span></td><td class="ar"><span>${icon(c.icon, 13)}${esc(c.area)}</span></td>
            <td>${c.list_action}</td>
            <td class="rs">${c.list_result_html}</td>
          </tr>`
  )
  .join("\n")}
        </table>${s.band ? `<div class="band">${s.band}</div>` : ""}`,
        s.foot || `出典：各社・各機関の公式発表。${s.rows.map((c) => c.source_short).filter(Boolean).join("／")}。数値は公表値であり、当社による測定値ではありません。`
      )
    );
  },
  case: (c) => {
    // c.no を指定すると通し番号を使わない（例：事故事例を A/B/C で振る）
    const no = c.no ?? String(++caseNo).padStart(2, "0");
    const tone = c.tone || "blue"; // red = 事故事例
    const secIcons = ["target", "trend", "people", "check"];
    const left = (c.sections || [])
      .map(
        (x, i) =>
          `<div class="vsec"><p class="vh"><span class="vi">${icon(c.sec_icons?.[i] || secIcons[i % 4], 15, 2.1)}</span>${esc(x.h)}</p><div class="vb">${items(x.items)}</div></div>`
      )
      .join("");
    // 補足の節はいったん左列に置き、表示時のスクリプトで高さが揃う方の列へ移す（deck.html 末尾）
    const sideLeft = true;
    const side = (c.side || []).map((x) => `<div class="vsec sm"><p class="vh"><span class="vi">${icon("search", 15, 2.1)}</span>${esc(x.h)}</p><div class="vb">${items(x.items)}</div></div>`).join("");
    return shell(
      `詳細事例 ${no} ${c.name}`,
      body(
        c.eyebrow,
        `        <div class="dhd">
          <span class="no">${no}</span>
          <span class="mark${c.logo ? " lg" : ""}">${c.logo ? `<img src="${c.logo}" alt="">` : icon(c.icon, 24)}</span>
          <p class="co">${esc(c.name)}<small>${esc(c.sub || (c.tags || []).join("｜"))}</small></p>
          <div class="tags">${(c.tags || []).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
        </div>
        <div class="grow vdt">
          <div class="vl">${sideLeft ? left + side : left}</div>
          <div class="vr">${vizKpis(c.kpis, tone)}${sideLeft ? "" : side}</div>
        </div>
        <div class="learn ${tone}">
          <p class="h">${esc(c.learn_title || "自社に置き換えるなら（当社の見解）")}</p>
          <div class="g">${c.learn.map((l, k) => `<div><span class="ln">${k + 1}</span><div><p class="t">${esc(l.title)}</p><p class="d">${esc(l.desc)}</p></div></div>`).join("")}</div>
        </div>`,
        `出典：${esc(c.source_full)}。${c.foot_note || "数値は公表値であり、当社による測定値ではありません。「自社に置き換えるなら」は当社の見解です。"}`
      )
    );
  },
  template: (s) =>
    shell(
      s.caption || s.eyebrow,
      body(
        s.eyebrow,
        `${head(s.title_html, s.lead)}
        <div class="grow tpl">${s.articles.map((a) => `<div><p class="at">${esc(a.title)}</p><div class="ab">${items(a.lines, "al")}</div></div>`).join("")}</div>`,
        s.foot
      )
    ),
  checklist: (s) =>
    shell(
      s.caption || s.eyebrow,
      body(
        s.eyebrow,
        `${head(s.title_html, s.lead)}
        <div class="grow chk c${s.groups.length}">${s.groups
          .map((g, i) => `<div><p class="gh"><span>${String.fromCharCode(65 + i)}</span>${esc(g.title)}</p>${g.items.map((t) => `<p class="ci">${t}</p>`).join("")}</div>`)
          .join("")}</div>${s.band ? `<div class="band">${s.band}</div>` : ""}`,
        s.foot
      )
    ),
  cta: (s) =>
    shell(
      s.caption || "ご相談",
      body(
        s.eyebrow || "Contact",
        `${head(s.title_html, s.lead)}
        <div class="grow cards c3">${(s.cards || [])
          .map((c) => `<div><span class="ic">${icon(c.icon, 22)}</span><p class="t">${esc(c.title)}</p><p class="d">${c.desc}</p></div>`)
          .join("")}</div>
        <div class="ctab"><div><p class="t">${esc(s.cta_title)}</p><p class="d">${esc(s.cta_desc)}</p></div><span class="bt">${esc(s.cta_button || "無料個別相談を予約する")} ›</span></div>`,
        s.foot
      )
    ),
  // 部門別の活用アイデア集：業務の流れに10件を並べた全体マップ
  ideamap: (s) =>
    shell(
      s.caption || s.eyebrow,
      body(
        s.eyebrow,
        `${head(s.title_html, s.lead)}
        <div class="grow imap">${s.phases
          .map(
            (p) => `<div><p class="ph">${esc(p.title)}</p>${p.ideas
              .map((i) => `<div class="ii"><span class="n">${esc(i.no)}${icon(i.icon, 19, 2)}</span><p class="t">${esc(i.name)}</p><p class="m"><span class="st s${i.stage}">${esc(STAGE[i.stage])}</span>${loadDots(i.load)}</p></div>`)
              .join("")}</div>`
          )
          .join("")}</div>${s.band ? `<div class="band">${s.band}</div>` : ""}`,
        s.foot
      )
    ),
  // 部門別の活用アイデア集：着手の順番（3段階）
  roadmap: (s) =>
    shell(
      s.caption || s.eyebrow,
      body(
        s.eyebrow,
        `${head(s.title_html, s.lead)}
        ${s.arrow ? `<div class="iar" style="grid-template-columns:repeat(${s.arrow.length},1fr)">${s.arrow.map((a) => `<span>${esc(a)}</span>`).join("")}</div>` : ""}
        <div class="grow irm" style="grid-template-columns:repeat(${s.stages.length},1fr)">${s.stages
          .map(
            (g, i) => `<div class="c${g.stage ?? i + 1}"><p class="ph"><span>STEP ${i + 1}</span>${esc(STAGE[g.stage ?? i + 1])}</p><p class="d">${g.desc}</p><div class="ls${g.ideas.length > 5 ? " many" : ""}">${g.ideas.map((t) => `<p>${esc(t)}</p>`).join("")}</div><p class="nx"><b>次へ進む目安</b>${g.next}</p></div>`
          )
          .join("")}</div>${s.band ? `<div class="band">${s.band}</div>` : ""}`,
        s.foot
      )
    ),
  // 部門別の活用アイデア集：1アイデア1ページ
  idea: (s) =>
    shell(
      `活用アイデア ${s.no} ${s.name}`,
      body(
        s.eyebrow,
        `        <div class="ihd"><span class="no">${esc(s.no)}</span><div class="nm"><p class="t">${esc(s.name)}</p><p class="d">${esc(s.tagline)}</p></div><p class="m"><span class="st s${s.stage}">${esc(STAGE[s.stage])}</span><span class="lb">導入の負荷</span>${loadDots(s.load)}</p></div>
        <div class="iba"><div class="bf"><p class="k">いま</p><p class="v">${s.before}</p></div><span class="ar"></span><div class="af"><p class="k">こう変える</p><p class="v">${s.after}</p></div><img class="il" src="${s.illus}" alt=""></div>
        <div class="ifl"><p class="pd"><b>使う製品</b>${s.products.map((p) => `<span>${esc(p)}</span>`).join("")}<em><i class="h"></i>人の作業<i class="a"></i>AI・自動化</em></p><div class="fw">${s.flow
          .map(([who, text]) => {
            const human = who === "人";
            return `<div class="${human ? "h" : "a"}"><span class="n">${icon(human ? "people" : who === "フロー" || who === "AI Builder" ? "gear" : "chat", 16, 2)}</span><p><small>${esc(who)}</small>${text}</p></div>`;
          })
          .join("")}</div></div>
        <div class="grow igr">
          <div class="rows">${[["必要なデータ", s.data], ["測る指標", s.kpi], ["始める前の確認", s.check]]
            .map(([h, arr]) => `<div><p class="h">${esc(h)}</p><p class="v">${arr.map(esc).join("／")}</p></div>`)
            .join("")}</div>
          <div class="fs"><p class="h">${esc(s.first_title)}</p><p class="b">${s.first}</p></div>
        </div>
        ${s.case ? `<p class="icase"><b>近い領域の公開事例</b>${s.case}</p>` : ""}`,
        s.foot
      )
    ),
  // 製品の関係図：土台の上に3つの製品が載る
  stack: (s) =>
    shell(
      s.caption || s.eyebrow,
      body(
        s.eyebrow,
        `${head(s.title_html, s.lead)}
        <div class="grow istk">
          <div class="pl">${s.pillars
            .map((p) => `<div><span class="ic">${icon(p.icon, 26)}</span><p class="ro">${esc(p.role)}</p><p class="t">${esc(p.title)}</p><p class="d">${p.desc}</p>${p.illus ? `<img class="il" src="${p.illus}" alt="">` : ""}<p class="ex"><b>${esc(s.ex_label || "営業では")}</b>${esc(p.example)}</p></div>`)
            .join("")}</div>
          <div class="fd"><span class="ic">${icon(s.base.icon, 26)}</span><div><p class="ro">${esc(s.base.role)}</p><p class="t">${esc(s.base.title)}</p></div><p class="d">${s.base.desc}</p></div>
        </div>`,
        s.foot
      )
    ),
  // 公開事例：数字を主役にしたカード
  numcards: (s) =>
    shell(
      s.caption || s.eyebrow,
      body(
        s.eyebrow,
        `${head(s.title_html, s.lead)}
        <div class="grow inum${s.tall ? " tall" : ""}">${s.items
          .map((c) => {
            const mx = c.bars ? Math.max(...c.bars.map((b) => b.v)) : 0;
            return `<div><p class="co">${esc(c.name)}</p><p class="ac">${esc(c.action)}</p><p class="v">${esc(c.pre || "")}<b>${esc(c.value)}</b>${esc(c.unit)}</p>${
              c.bars ? `<div class="bs">${c.bars.map((b, i) => `<p><span>${esc(b.l)}</span><i><u class="${i ? "on" : ""}" style="width:${(b.v / mx) * 100}%"></u></i><span>${esc(b.t)}</span></p>`).join("")}</div>` : ""
            }<p class="n">${esc(c.note)}</p></div>`;
          })
          .join("")}</div>`,
        s.foot
      )
    ),
  // 効果測定：計算式と、導入後の時間の内訳
  formula: (s) => {
    const mx = Math.max(...s.bars.map((b) => b.parts.reduce((n, p) => n + p.v, 0)));
    return shell(
      s.caption || s.eyebrow,
      body(
        s.eyebrow,
        `${head(s.title_html, s.lead)}
        <div class="ifm">${s.formula
          .map((x) => (x.op ? `<span class="op">${esc(x.op)}</span>` : `<div class="${x.total ? "tt" : ""}"><p class="k">${esc(x.label)}</p><p class="v">${esc(x.value)}<small>${esc(x.unit)}</small></p></div>`))
          .join("")}</div>
        <div class="grow ifb">
          <div class="bc"><p class="h">${esc(s.bars_title)}</p>${s.bars
            .map((b) => `<div class="br"><span class="l">${esc(b.label)}</span><div class="tr">${b.parts.map((p) => `<span class="${p.tone}" style="width:${(p.v / mx) * 100}%">${esc(p.t)}</span>`).join("")}</div></div>`)
            .join("")}<p class="n">${s.bars_note}</p></div>
          <div class="mt">${s.metrics.map((m) => `<div><span class="ic">${icon(m.icon, 20)}</span><div><p class="t">${esc(m.title)}</p><p class="d">${m.desc}</p></div></div>`).join("")}</div>
        </div>`,
        s.foot
      )
    );
  },
  // 導入前の確認：アイデア×製品の対応表＋確認項目
  matrix: (s) =>
    shell(
      s.caption || s.eyebrow,
      body(
        s.eyebrow,
        `${head(s.title_html, s.lead)}
        <div class="grow imx">
          <table><tr><th></th>${s.columns.map((c) => `<th>${c}</th>`).join("")}</tr>${s.rows
            .map((r) => `<tr><td class="k"><b>${esc(r.no)}</b>${esc(r.name)}</td>${s.columns.map((_, i) => `<td>${r.on.includes(i) ? "<i></i>" : ""}</td>`).join("")}</tr>`)
            .join("")}</table>
          <div class="ck">${s.checks.map((c) => `<div><span class="ic">${icon(c.icon, 20)}</span><div><p class="t">${esc(c.title)}</p><p class="d">${c.desc}</p></div></div>`).join("")}</div>
        </div>`,
        s.foot
      )
    ),
  // 進め方：右へ上がっていく階段
  ladder: (s) =>
    shell(
      s.caption || s.eyebrow,
      body(
        s.eyebrow,
        `${head(s.title_html, s.lead)}
        <div class="grow ilad">${s.steps
          .map((st, i) => `<div class="c${i + 1}"><p class="n">${String(i + 1).padStart(2, "0")}</p><span class="ic">${icon(st.icon, 24)}</span><p class="t">${esc(st.title)}</p><p class="d">${st.desc}</p>${st.example ? `<p class="eg">${esc(st.example)}</p>` : ""}<p class="nx"><b>次へ進む目安</b>${st.side}</p></div>`)
          .join("")}</div>`,
        s.foot
      )
    ),
  notes: (s) =>
    shell(
      "ご留意事項・出典",
      body("Notes", `        <div class="hd" style="margin-top:4px"><p class="t" style="font-size:27px">${esc(spec.notes_title || "ご留意事項・出典")}</p></div><div class="grow nts">${items(s.items, "nt")}</div>`, "")
    ),
};

const slides = [R.cover({})];
for (const s of spec.slides) {
  const fn = R[s.type];
  if (!fn) throw new Error(`unknown slide type: ${s.type}`);
  slides.push(fn(s));
}
const total = slides.length;

const css = `
  /* ===== 表紙（ノウハウ形式） ===== */
  .blue-bg { background: linear-gradient(135deg, #1c3a6b 0%, var(--blue) 46%, #3a76c4 100%); color: #fff; }
  .waves { position: absolute; inset: 0; width: 100%; height: 100%; }
  .kcover .badge-row { position: absolute; top: 66px; left: 64px; display: flex; align-items: center; gap: 16px; }
  .kcover .badge { background: var(--amber); color: #4a3605; font-size: 16px; font-weight: 800; padding: 10px 18px; border-radius: 8px; }
  .kcover .badge-note { font-size: 20px; font-weight: 700; padding-bottom: 12px; border-bottom: 2px solid rgba(255,255,255,.85); letter-spacing: .04em; }
  .kcover .sub { position: absolute; left: 66px; top: 236px; font-size: 23px; font-weight: 700; letter-spacing: .04em; }
  .kcover .title { position: absolute; left: 62px; top: 288px; font-size: 68px; font-weight: 800; letter-spacing: .04em; line-height: 1.28; }
  .kcover .title small { display: block; margin-top: 10px; font-size: 34px; font-weight: 800; }
  .kcover .pills { position: absolute; right: 64px; top: 250px; display: grid; gap: 12px; }
  .kcover .pills span { border: 1.5px solid rgba(255,255,255,.75); border-radius: 999px; padding: 7px 22px; font-size: 14px; font-weight: 800; text-align: center; background: rgba(255,255,255,.08); }
  .kcover .date { position: absolute; left: 66px; top: 590px; font-size: 15px; font-weight: 600; letter-spacing: .18em; opacity: .8; }
  .kcover .logo { position: absolute; right: 64px; bottom: 48px; height: 44px; }
  /* ===== 縦方向をページいっぱいに使う ===== */
  .s-body.fl { display: flex; flex-direction: column; padding-bottom: 62px; }
  .s-body.fl > .grow { flex: 1 1 auto; min-height: 0; }
  .s-body.fl > .band { flex: 0 0 auto; }
  .cards.grow > div { display: flex; flex-direction: column; justify-content: flex-start; padding: 30px 28px; }
  .cards.grow .ic { width: 58px; height: 58px; } .cards.grow .ic svg { width: 28px; height: 28px; }
  .cards.grow .t { margin-top: 18px; font-size: 20px; } .cards.grow .d { margin-top: 12px; font-size: 14.5px; line-height: 1.95; }
  .cards.grow .g { align-self: flex-start; margin-top: auto; font-size: 12px; padding: 5px 14px; }
  .steps.grow { grid-auto-rows: 1fr; }
  .tpl.grow { grid-auto-rows: 1fr; }
  .chk.grow > div { display: flex; flex-direction: column; } .chk.grow .ci { flex: 1 1 0; display: flex; align-items: center; }
  .chk.grow .ci::before { top: 50%; transform: translateY(-50%); }
  .toc.grow { grid-auto-rows: 1fr; } .toc.grow > div { border-bottom: 1px solid var(--line); }
  table.grow { height: 100%; }
  .nts.grow { align-content: space-evenly; }
  /* ===== 事例ページ（メリハリ版） ===== */
  .vpt { margin-top: 10px; display: flex; align-items: center; gap: 14px; background: linear-gradient(90deg, #eaf2fc, #f6f9fd); border-left: 6px solid var(--blue-bright); padding: 9px 18px; }
  .vpt p { font-size: 18px; font-weight: 900; color: var(--blue-deep); letter-spacing: .02em; }
  .vpt .q { color: var(--blue-bright); display: flex; }
  .vpt.red { background: linear-gradient(90deg, #fdecea, #fef7f6); border-left-color: #d6453d; } .vpt.red p { color: #7a1f1a; } .vpt.red .q { color: #d6453d; }
  .vdt { display: grid; grid-template-columns: 1.15fr 1fr; gap: 18px; margin-top: 10px; align-items: start; }
  .vdt + .learn { margin-top: 10px; }
  .vsec + .vsec { margin-top: 10px; }
  .vsec .vh { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 900; color: var(--blue-deep); padding-bottom: 6px; border-bottom: 2px solid var(--line); }
  .vsec .vi { width: 24px; height: 24px; border-radius: 50%; background: var(--blue-deep); color: #fff; display: flex; align-items: center; justify-content: center; }
  .vsec .vb { padding-top: 6px; }
  .vsec .vb .i { position: relative; padding: 3px 0 3px 16px; font-size: 12.8px; font-weight: 500; color: #3a4252; line-height: 1.55; }
  .vsec .vb .i::before { content: ""; position: absolute; left: 2px; top: 12px; width: 6px; height: 6px; background: var(--blue-bright); }
  .vsec .vb b, .vpt b { color: #1a2330; background: linear-gradient(transparent 58%, #ffe27a 58%); font-weight: 800; }
  .vsec.sm { margin-top: 8px; background: #f7f9fc; padding: 10px 12px; } .vsec.sm .vh { border-bottom-color: #e3e9f2; }
  .vk { background: #fff; border: 1.5px solid var(--line); padding: 8px 14px; margin-bottom: 8px; }
  .vk .k { font-size: 11.5px; font-weight: 800; color: var(--blue); }
  .vk .n { font-size: 10.5px; font-weight: 600; color: #7a8698; margin-top: 2px; }
  .vk.hero { background: var(--blue-deep); border: 0; color: #fff; padding: 14px 18px; }
  .vk.hero .k { color: #a9c8f0; } .vk.hero .n { color: #c3d3ea; }
  .vk.hero .v { font-size: 40px; font-weight: 900; line-height: 1.1; margin-top: 4px; } .vk.hero .v small { font-size: 16px; margin-left: 4px; }
  .vk.hero.red { background: #7a1f1a; }
  .vk.donut { display: flex; align-items: center; gap: 16px; } .vk.donut .k { font-size: 14px; }
  .vk .dn { position: relative; width: 92px; height: 92px; flex: 0 0 auto; }
  .vk .dn span { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 900; color: #1a2330; }
  .vk .dn small { font-size: 11px; }
  .vk.chart .br { display: grid; grid-template-columns: 26px 1fr 96px; align-items: center; gap: 8px; margin-top: 6px; }
  .vk.chart .bl { font-size: 11px; font-weight: 800; color: #7a8698; }
  .vk.chart .bt { height: 16px; background: #f0f3f8; display: block; } .vk.chart .bt span { display: block; height: 100%; }
  .vk.chart .bv { font-size: 14px; font-weight: 800; color: #5a6578; text-align: right; } .vk.chart .bv.hi { font-size: 18px; color: #1a2330; }
  .vk.chart .bv small { font-size: 10.5px; margin-left: 2px; }
  .vt { display: grid; gap: 8px; } .vt.c1 { grid-template-columns: 1fr; } .vt.c2 { grid-template-columns: 1fr 1fr; } .vt.c3 { grid-template-columns: 1fr 1fr 1fr; }
  .vt > div { background: var(--tint); border-top: 3px solid var(--blue-bright); padding: 9px 12px; }
  .vt .k { font-size: 11px; font-weight: 800; color: var(--blue); }
  .vt .v { font-size: 22px; font-weight: 900; color: #1a2330; line-height: 1.2; margin-top: 2px; } .vt .v small { font-size: 11px; margin-left: 2px; color: #6b7789; }
  .vt .n { font-size: 10px; font-weight: 600; color: #7a8698; margin-top: 2px; }
  .learn .g > div { display: flex; gap: 10px; align-items: flex-start; padding-top: 7px; padding-bottom: 8px; }
  .learn .ln { flex: 0 0 auto; width: 24px; height: 24px; border-radius: 50%; background: var(--amber); color: #4a3605; font-size: 12px; font-weight: 900; display: flex; align-items: center; justify-content: center; margin-top: 2px; }
  .learn.red { border-color: #d6453d; } .learn.red .h { background: #d6453d; }
  /* 事例ページも縦をページいっぱいに使う（下に余白を残さない） */
  .s-body.fl > .dhd { flex: 0 0 auto; }
  .vdt.grow { align-items: stretch; margin-top: 12px; }
  .vdt.grow > .vl, .vdt.grow > .vr { display: flex; flex-direction: column; gap: 10px; min-height: 0; }
  .vdt.grow > .vl { justify-content: space-between; }
  .vdt.grow .vsec + .vsec { margin-top: 0; }
  .vdt.grow .vsec { flex: 1 1 auto; display: flex; flex-direction: column; }
  .vdt.grow .vsec .vb { flex: 1 1 auto; display: flex; flex-direction: column; justify-content: space-evenly; }
  .vdt.grow > .vr > * { flex: 1 1 auto; margin-bottom: 0; display: flex; flex-direction: column; justify-content: center; }
  .vdt.grow > .vr > .vk.donut { flex-direction: row; justify-content: flex-start; }
  .vdt.grow > .vr > .vt { display: grid; }
  .vdt.grow > .vr > .vt > div { display: flex; flex-direction: column; justify-content: center; }
  .vdt.grow > .vr > .vsec.sm { justify-content: flex-start; }
  .vdt.measure > div > *, .vdt.measure .vb { flex: none !important; }
  .s-body.fl > .learn { flex: 0 0 auto; margin-top: 14px; }
  .vl.roomy .vsec .vb .i { font-size: 14px; line-height: 1.7; } .vl.roomy .vsec .vh { font-size: 15.5px; }
  .learn .g > div { padding-top: 12px; padding-bottom: 13px; }
  /* ツールのロゴ */
  .cards .ic.lg { width: auto; height: 64px; border-radius: 0; background: none; gap: 10px; justify-content: flex-start; }
  .cards .ic.lg img { height: 56px; width: 56px; object-fit: contain; }
  .dhd .mark.lg { background: #fff; } .dhd .mark.lg img { width: 30px; height: 30px; object-fit: contain; }
  /* ===== ノウハウ系の追加スライド型 ===== */
  .kh { margin-top: 8px; }
  .kh .t { font-size: 25px; font-weight: 900; color: #1a2330; line-height: 1.4; letter-spacing: .01em; }
  .kh .t b { color: var(--blue-bright); }
  .kh .l { margin-top: 8px; font-size: 13.5px; font-weight: 600; color: #5a6578; line-height: 1.7; }
  .ld { margin-top: 18px; display: grid; gap: 10px; }
  .ld .p { font-size: 14px; font-weight: 500; color: #3a4252; line-height: 1.85; }
  .ld .p b { color: #1a2330; }
  .cards { display: grid; gap: 16px; margin-top: 22px; }
  .cards.c2 { grid-template-columns: 1fr 1fr; } .cards.c3 { grid-template-columns: 1fr 1fr 1fr; } .cards.c4 { grid-template-columns: 1fr 1fr 1fr 1fr; }
  .cards.c6 { grid-template-columns: 1fr 1fr 1fr; }
  .cards > div { border: 1.5px solid var(--line); border-top: 4px solid var(--blue); padding: 16px 18px 18px; background: #fff; }
  .cards .ic { width: 40px; height: 40px; border-radius: 50%; background: var(--tint); color: var(--blue); display: flex; align-items: center; justify-content: center; }
  .cards .t { margin-top: 10px; font-size: 16px; font-weight: 900; color: var(--blue-deep); line-height: 1.4; }
  .cards .d { margin-top: 7px; font-size: 12.5px; font-weight: 500; color: #4a5568; line-height: 1.75; }
  .cards .d b { color: #1a2330; }
  .cards .g { margin-top: 10px; display: inline-block; background: var(--tint); color: var(--blue); font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: 999px; }
  .steps { margin-top: 20px; display: grid; gap: 10px; }
  .steps > div { display: flex; align-items: center; gap: 16px; border: 1.5px solid var(--line); padding: 12px 18px; }
  .steps .n { flex: 0 0 auto; width: 40px; height: 40px; border-radius: 50%; background: var(--blue-deep); color: #fff; font-weight: 800; font-size: 14px; display: flex; align-items: center; justify-content: center; }
  .steps .t { font-size: 15.5px; font-weight: 900; color: #1a2330; } .steps .t b { color: var(--blue-bright); }
  .steps .d { margin-top: 3px; font-size: 12.5px; font-weight: 500; color: #5a6578; line-height: 1.6; }
  .steps .sd { margin-left: auto; flex: 0 0 300px; font-size: 12px; font-weight: 700; color: var(--blue); background: var(--tint); padding: 8px 12px; line-height: 1.55; }
  .ch { background: linear-gradient(135deg, #1a2e50 0%, #2c5c9c 70%, #3f7fc6 100%); }
  .chp { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; text-align: center; }
  .chp .s-logo { position: absolute; top: 38px; right: 56px; height: 30px; }
  .chp .no { width: 92px; height: 92px; border: 2px solid rgba(255,255,255,.85); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; font-weight: 800; }
  .chp .t { margin-top: 30px; font-size: 40px; font-weight: 900; letter-spacing: .04em; }
  .chp .d { margin-top: 12px; font-size: 16px; font-weight: 700; opacity: .85; }
  .chp .s-num { background: rgba(255,255,255,.18); }
  table.kt td { font-size: 12.5px; } table.kt td.kc { font-weight: 800; color: #1a2330; background: var(--tint); }
  table.kt td b { color: var(--blue-bright); }
  .tpl { margin-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px 20px; }
  .tpl > div { border-left: 4px solid var(--blue); background: #f7f9fc; padding: 16px 20px; min-height: 118px; }
  .tpl .at { font-size: 15px; font-weight: 900; color: var(--blue-deep); }
  .tpl .al { margin-top: 7px; font-size: 13.5px; font-weight: 500; color: #3a4252; line-height: 1.8; }
  .chk { margin-top: 16px; display: grid; gap: 16px; } .chk.c2 { grid-template-columns: 1fr 1fr; } .chk.c3 { grid-template-columns: 1fr 1fr 1fr; }
  .chk > div { border: 1.5px solid var(--line); }
  .chk .gh { background: var(--blue-deep); color: #fff; font-size: 15px; font-weight: 800; padding: 13px 16px; display: flex; align-items: center; gap: 9px; }
  .chk .gh span { width: 20px; height: 20px; border-radius: 50%; background: #fff; color: var(--blue-deep); font-size: 11px; display: flex; align-items: center; justify-content: center; }
  .chk .ci { position: relative; padding: 24px 16px 24px 42px; font-size: 14.5px; font-weight: 600; color: #3a4252; border-bottom: 1px solid var(--line); line-height: 1.5; }
  .chk .ci:last-child { border-bottom: 0; }
  .chk .ci::before { content: ""; position: absolute; left: 16px; top: 27px; width: 13px; height: 13px; border: 1.6px solid var(--blue); }
  .ctab { margin-top: 20px; background: linear-gradient(90deg, #1a2e50, #2c5c9c); color: #fff; padding: 20px 26px; display: flex; align-items: center; gap: 20px; }
  .ctab .t { font-size: 19px; font-weight: 900; } .ctab .d { margin-top: 5px; font-size: 12.5px; font-weight: 600; opacity: .85; line-height: 1.6; }
  .ctab .bt { margin-left: auto; flex: 0 0 auto; background: #fff; color: var(--blue-deep); font-size: 14px; font-weight: 900; padding: 12px 24px; border-radius: 999px; }
  .nts { margin-top: 24px; display: grid; gap: 16px; }
  .nts .nt { position: relative; padding-left: 22px; font-size: 14px; font-weight: 500; color: #3a4252; line-height: 1.7; }
  .nts .nt::before { content: "※"; position: absolute; left: 0; color: var(--blue-pale); }
  .toc { margin-top: 22px; display: grid; gap: 12px; }
  .toc > div { display: flex; align-items: center; gap: 16px; border-bottom: 1px solid var(--line); padding: 14px 4px; }
  .toc .n { font-size: 15px; font-weight: 800; color: var(--blue); width: 30px; }
  .toc .nm { font-size: 18px; font-weight: 800; color: #1a2330; } .toc .nm small { margin-left: 14px; font-size: 12.5px; font-weight: 600; color: #7a8698; }
  .toc .pg { margin-left: auto; font-size: 13px; font-weight: 700; color: #7a8698; }
  .trend .l { flex: 0 0 150px; }
  .trend .r { white-space: normal; text-align: right; line-height: 1.35; }
  .cs td { padding-top: 11px; padding-bottom: 11px; }
  .cs.cmp td { padding-top: 6px; padding-bottom: 6px; line-height: 1.45; }
  /* 余白が出やすいページを埋める：通常の表は行を高く、カードは文字を大きく */
  /* 行数が多めの表（10行前後）：詰めすぎず、ページを埋める中間の行高 */
  table.kt.mid td { padding-top: 15px; padding-bottom: 15px; font-size: 14px; line-height: 1.6; }
  table.kt.mid th { padding-top: 12px; padding-bottom: 12px; font-size: 14px; }
  table.kt:not(.cmp):not(.mid) td { padding-top: 17px; padding-bottom: 17px; font-size: 13.5px; line-height: 1.65; }
  .cards > div { padding: 22px 22px 24px; }
  .cards .t { font-size: 17px; } .cards .d { font-size: 13.5px; line-height: 1.85; }
  .ctab { margin-top: 28px; padding: 26px 30px; }
  .steps > div { padding: 16px 20px; } .steps .t { font-size: 16.5px; } .steps .d { font-size: 13.5px; }
  /* ===== 部門別の活用アイデア集 ===== */
  .st { display: inline-block; font-size: 12px; font-weight: 800; padding: 4px 11px; border-radius: 999px; white-space: nowrap; }
  .st.s1 { background: var(--amber); color: #4a3605; } .st.s2 { background: #dbe8f7; color: var(--blue-deep); } .st.s3 { background: var(--blue-deep); color: #fff; }
  .ld { display: inline-flex; gap: 4px; align-items: center; }
  .ld i { width: 10px; height: 10px; border-radius: 50%; background: #dfe5ee; } .ld i.on { background: var(--blue-bright); }
  .imap { margin-top: 16px; display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
  .imap > div { display: flex; flex-direction: column; gap: 10px; min-height: 0; }
  .imap .ph { background: var(--blue-deep); color: #fff; font-size: 16px; font-weight: 800; text-align: center; padding: 13px 18px 13px 8px; clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%); }
  .imap .ii { flex: 1 1 0; border: 1.5px solid var(--line); border-top: 3px solid var(--blue); padding: 13px 14px; display: flex; flex-direction: column; background: #fff; }
  .imap .ii .n { font-size: 15px; font-weight: 900; color: var(--blue-bright); }
  .imap .ii .t { margin-top: 4px; font-size: 16px; font-weight: 900; color: #1a2330; line-height: 1.45; }
  .imap .ii .m { margin-top: auto; padding-top: 8px; display: flex; align-items: center; justify-content: space-between; gap: 6px; }
  .irm { margin-top: 18px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .irm > div { border: 1.5px solid var(--line); display: flex; flex-direction: column; }
  .irm .ph { padding: 15px 18px; font-size: 20px; font-weight: 900; display: flex; align-items: center; gap: 12px; }
  .irm .ph span { font-size: 12px; font-weight: 800; letter-spacing: .08em; }
  .irm .c1 .ph { background: var(--amber); color: #4a3605; } .irm .c2 .ph { background: #dbe8f7; color: var(--blue-deep); } .irm .c3 .ph { background: var(--blue-deep); color: #fff; }
  .irm .d { padding: 15px 18px 0; font-size: 14px; font-weight: 500; color: #4a5568; line-height: 1.75; }
  .irm .ls { padding: 12px 18px; flex: 1 1 auto; display: flex; flex-direction: column; justify-content: space-evenly; gap: 6px; }
  .irm .ls p { font-size: 15.5px; font-weight: 800; color: #1a2330; padding: 7px 0; border-bottom: 1px solid var(--line); }
  .irm .ls p:last-child { border-bottom: 0; }
  .irm .ls.many { display: grid; grid-template-columns: 1fr 1fr; gap: 0 18px; align-content: space-evenly; } .irm .ls.many p { font-size: 14.5px; padding: 8px 0; }
  .irm .nx { margin: 0 18px 16px; padding: 11px 14px; background: var(--tint); font-size: 13px; font-weight: 600; color: #3a4252; line-height: 1.65; }
  .irm .nx b { display: block; font-size: 12px; font-weight: 800; color: var(--blue); }
  .ihd { margin-top: 8px; display: flex; align-items: center; gap: 16px; }
  .ihd .no { flex: 0 0 auto; background: var(--blue-deep); color: #fff; font-size: 24px; font-weight: 800; padding: 9px 16px; }
  .ihd .t { font-size: 26px; font-weight: 900; color: #1a2330; line-height: 1.3; }
  .ihd .d { margin-top: 2px; font-size: 14px; font-weight: 700; color: #5a6578; }
  .ihd .m { margin-left: auto; margin-right: 150px; display: flex; align-items: center; gap: 10px; }
  .ihd .lb { margin-left: 6px; font-size: 12px; font-weight: 700; color: #6b7789; white-space: nowrap; }
  .iba { margin-top: 8px; display: grid; grid-template-columns: 1fr 30px 1.16fr 228px; align-items: center; gap: 8px; }
  .iba > div { align-self: stretch; padding: 12px 18px; display: flex; flex-direction: column; justify-content: center; }
  .iba .bf { background: #f1f3f7; } .iba .af { background: var(--tint); border-left: 5px solid var(--blue-bright); }
  .iba .k { font-size: 13px; font-weight: 800; color: #6b7789; } .iba .af .k { color: var(--blue-bright); }
  .iba .v { margin-top: 4px; font-size: 17px; font-weight: 800; color: #1a2330; line-height: 1.55; } .iba .bf .v { color: #4a5568; font-weight: 700; }
  .iba .ar { justify-self: center; width: 0; height: 0; border-left: 18px solid var(--blue-bright); border-top: 15px solid transparent; border-bottom: 15px solid transparent; }
  .iba .il { width: 228px; height: 158px; object-fit: contain; }
  .ifl { margin-top: 8px; }
  .ifl .pd { display: flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 800; color: var(--blue-deep); }
  .ifl .pd b { margin-right: 4px; } .ifl .pd span { background: #fff; border: 1.5px solid #cfdcee; color: var(--blue); font-size: 13px; font-weight: 800; padding: 3px 12px; border-radius: 999px; }
  .ifl .pd em { margin-left: auto; display: flex; align-items: center; gap: 6px; font-style: normal; font-size: 12.5px; font-weight: 700; color: #5a6578; }
  .ifl .pd em i { width: 13px; height: 13px; } .ifl .pd em i.h { background: var(--amber); } .ifl .pd em i.a { margin-left: 10px; background: var(--blue); }
  .ifl .fw { margin-top: 7px; display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 4px; }
  .ifl .fw > div { padding: 8px 28px 8px 13px; min-height: 72px; display: flex; align-items: center; gap: 10px; clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%); }
  .ifl .fw > .a { background: var(--blue); color: #fff; } .ifl .fw > .h { background: #fde9b4; color: #3a2c05; }
  .ifl .fw .n { flex: 0 0 auto; width: 32px; height: 32px; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; }
  .ifl .fw > .a .n { color: var(--blue); } .ifl .fw > .h .n { color: #a8780a; }
  .ifl .fw p { font-size: 14.5px; font-weight: 800; line-height: 1.4; }
  .ifl .fw small { display: block; font-size: 11.5px; font-weight: 800; opacity: .8; }
  .igr { margin-top: 10px; display: grid; grid-template-columns: 1.08fr 1fr; gap: 12px; }
  .igr .rows { display: grid; grid-auto-rows: 1fr; gap: 5px; min-height: 0; }
  .igr .rows > div { display: grid; grid-template-columns: 124px 1fr; align-items: stretch; border: 1.5px solid var(--line); }
  .igr .rows .h { display: flex; align-items: center; padding: 4px 11px; background: var(--tint); font-size: 13.5px; font-weight: 900; color: var(--blue-deep); }
  .igr .rows .v { display: flex; align-items: center; padding: 4px 12px; font-size: 14px; font-weight: 700; color: #3a4252; line-height: 1.45; }
  .igr .fs { display: flex; flex-direction: column; background: #fff9e8; border: 1.5px solid #f2d98d; padding: 9px 16px; min-height: 0; }
  .igr .fs .h { font-size: 14px; font-weight: 900; color: #7a5a06; padding-bottom: 5px; border-bottom: 2px solid #f2d98d; }
  .igr .fs .b { flex: 1 1 auto; display: flex; align-items: center; padding-top: 4px; font-size: 14.5px; font-weight: 600; color: #3a3320; line-height: 1.6; }
  .cards .ex { display: block; margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--line); font-size: 14.5px; font-weight: 700; color: #3a4252; line-height: 1.9; }
  table.kt b.big { font-size: 21px; font-weight: 900; }
  /* 図解 */
  .kcover .pills.row { right: auto; left: 66px; top: 500px; display: flex; }
  .kcover.pan.teal { --pn: #e3f4f0; background: linear-gradient(135deg, #0a4f54 0%, #0f8078 100%) !important; }
  .kcover.pan.violet { --pn: #ece8f8; background: linear-gradient(135deg, #2e2466 0%, #5a3fb0 100%) !important; }
  .kcover.pan.amber { --pn: #fbeee2; background: linear-gradient(135deg, #7a2c10 0%, #c9601f 100%) !important; }
  .kcover.pan.rose { --pn: #fbe9f1; background: linear-gradient(135deg, #6e1a44 0%, #b83a76 100%) !important; }
  .kcover.pan .sub { font-size: 20px; }
  .kcover.pan .cvil { width: 500px; right: 0; top: 0; height: 600px; border-radius: 0; background: var(--pn); }
  .kcover.pan .cvil img { width: 464px; height: 400px; mix-blend-mode: multiply; }
  .cvil { position: absolute; right: 44px; top: 96px; width: 450px; height: 450px; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; }
  .cvil img { width: 372px; height: 372px; object-fit: contain; }
  .cards .cil { display: block; height: 182px; width: 100%; object-fit: contain; flex: 0 0 auto; }
  .cards.grow:has(.cil) > div { padding: 12px 24px 14px; }
  .cards:has(.cil) .t { margin-top: 8px; } .cards:has(.cil) .d { margin-top: 6px; font-size: 13.5px; line-height: 1.7; } .cards:has(.cil) .ex { margin-top: 9px; padding-top: 8px; font-size: 14px; line-height: 1.65; }
  .cards:has(.cil) .g { margin-top: 8px; }
  .imap .ii .n { display: flex; align-items: center; justify-content: space-between; }
  .iar { margin-top: 14px; display: grid; grid-template-columns: repeat(3, 1fr); background: linear-gradient(90deg, #f7d778, #5a93d3 55%, #1a2e50); clip-path: polygon(0 0, calc(100% - 22px) 0, 100% 50%, calc(100% - 22px) 100%, 0 100%); }
  .iar span { padding: 8px 18px; font-size: 13.5px; font-weight: 800; color: #fff; text-align: center; } .iar span:first-child { color: #4a3605; }
  .iar + .irm { margin-top: 12px; }
  .istk { margin-top: 16px; display: flex; flex-direction: column; gap: 10px; }
  .istk .pl { flex: 1 1 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; min-height: 0; }
  .istk .pl > div { position: relative; border: 1.5px solid var(--line); border-top: 5px solid var(--blue); padding: 16px 20px; display: flex; flex-direction: column; }
  .istk .ic { width: 50px; height: 50px; border-radius: 50%; background: var(--tint); color: var(--blue); display: flex; align-items: center; justify-content: center; }
  .istk .pl .ic { position: absolute; top: 16px; right: 18px; }
  .istk .ro { font-size: 13px; font-weight: 800; color: var(--blue-bright); }
  .istk .t { margin-top: 3px; font-size: 21px; font-weight: 900; color: var(--blue-deep); line-height: 1.3; }
  .istk .il { flex: 1 1 0; min-height: 0; width: 100%; object-fit: contain; margin: 8px 0; }
  .istk .pl .d { margin-top: 10px; font-size: 14.5px; font-weight: 600; color: #4a5568; line-height: 1.75; }
  .istk .d b { color: #1a2330; }
  .istk .ex { margin-top: auto; background: var(--tint); padding: 10px 14px; font-size: 14px; font-weight: 800; color: #1a2330; line-height: 1.55; }
  .istk .ex b { display: block; font-size: 12px; color: var(--blue); }
  .istk .fd { flex: 0 0 auto; background: var(--blue-deep); color: #fff; padding: 15px 24px; display: flex; align-items: center; gap: 18px; }
  .istk .fd .ic { flex: 0 0 auto; background: #fff; } .istk .fd .ro { color: #a9c8f0; } .istk .fd .t { color: #fff; white-space: nowrap; }
  .istk .fd .d { margin-left: 26px; font-size: 14.5px; font-weight: 600; line-height: 1.7; color: #dbe6f4; } .istk .fd .d b { color: #fff; }
  .inum { margin-top: 16px; display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 1fr; gap: 12px; }
  .inum > div { border: 1.5px solid var(--line); border-top: 4px solid var(--blue); padding: 11px 16px; display: flex; flex-direction: column; min-height: 0; }
  .inum .co { font-size: 15.5px; font-weight: 900; color: #1a2330; line-height: 1.35; }
  .inum .ac { margin-top: 3px; font-size: 13.5px; font-weight: 600; color: #5a6578; line-height: 1.45; }
  .inum .v { margin-top: 8px; font-size: 15px; font-weight: 800; color: #5a6578; } .inum .v b { font-size: 46px; font-weight: 900; color: var(--blue-bright); line-height: 1.15; margin: 0 3px; }
  .inum .bs { margin-top: 4px; } .inum .bs p { display: grid; grid-template-columns: 36px 1fr 52px; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 700; color: #5a6578; }
  .inum .bs i { height: 9px; background: #eef1f6; display: block; } .inum .bs u { display: block; height: 100%; background: #b9c7da; } .inum .bs u.on { background: var(--blue-bright); }
  .inum .n { margin-top: auto; padding-top: 6px; font-size: 13px; font-weight: 600; color: #6b7789; line-height: 1.5; }
  .inum.tall > div { display: flex; flex-direction: column; }
  .inum.tall .bs { flex: 1; display: flex; flex-direction: column; justify-content: space-evenly; margin: 14px 0; }
  .inum.tall .bs p { grid-template-columns: 44px 1fr 72px; font-size: 15px; font-weight: 700; }
  .inum.tall .bs p span:last-child { font-size: 17px; text-align: right; }
  .inum.tall .bs i { height: 30px; }
  .inum.tall .bs u { height: 100%; }
  .ifm { margin-top: 14px; display: flex; align-items: stretch; gap: 8px; }
  .ifm > div { flex: 1 1 0; background: var(--tint); padding: 10px 12px; text-align: center; display: flex; flex-direction: column; justify-content: center; }
  .ifm .k { font-size: 12.5px; font-weight: 800; color: var(--blue); }
  .ifm .v { margin-top: 2px; font-size: 25px; font-weight: 900; color: #1a2330; line-height: 1.2; } .ifm .v small { margin-left: 2px; font-size: 12px; font-weight: 800; color: #5a6578; }
  .ifm .tt { flex: 1.3 1 0; background: var(--blue-deep); } .ifm .tt .k { color: #a9c8f0; } .ifm .tt .v { color: #fff; } .ifm .tt .v small { color: #dbe6f4; }
  .ifm .op { align-self: center; font-size: 25px; font-weight: 900; color: var(--blue); }
  .ifb { margin-top: 14px; display: grid; grid-template-columns: 1.15fr 1fr; gap: 14px; }
  .ifb .bc { border: 1.5px solid var(--line); padding: 14px 18px; display: flex; flex-direction: column; justify-content: space-between; }
  .ifb .h { font-size: 15px; font-weight: 900; color: var(--blue-deep); }
  .ifb .br { display: grid; grid-template-columns: 66px 1fr; align-items: center; gap: 8px; }
  .ifb .br .l { font-size: 13px; font-weight: 800; color: #3a4252; }
  .ifb .tr { display: flex; height: 50px; }
  .ifb .tr span { display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; color: #fff; text-align: center; line-height: 1.25; border-right: 2px solid #fff; }
  .ifb .tr .gr { background: #93a3b8; } .ifb .tr .bl { background: var(--blue); } .ifb .tr .am { background: var(--amber); color: #4a3605; } .ifb .tr .am2 { background: #f7d778; color: #4a3605; }
  .ifb .n { font-size: 12.5px; font-weight: 600; color: #5a6578; line-height: 1.6; }
  .ifb .mt, .imx .ck { display: grid; grid-auto-rows: 1fr; gap: 9px; min-height: 0; }
  .ifb .mt > div, .imx .ck > div { border: 1.5px solid var(--line); padding: 9px 14px; display: flex; align-items: center; gap: 12px; }
  .ifb .ic, .imx .ic { flex: 0 0 auto; width: 40px; height: 40px; border-radius: 50%; background: var(--tint); color: var(--blue); display: flex; align-items: center; justify-content: center; }
  .ifb .t, .imx .ck .t { font-size: 15px; font-weight: 900; color: var(--blue-deep); }
  .ifb .mt .d, .imx .ck .d { margin-top: 1px; font-size: 12.8px; font-weight: 600; color: #4a5568; line-height: 1.5; }
  .imx { margin-top: 14px; display: grid; grid-template-columns: 1.45fr 1fr; gap: 16px; }
  .imx table { width: 100%; height: 100%; border-collapse: collapse; }
  .imx th { background: var(--blue-deep); color: #fff; font-size: 11.5px; font-weight: 800; padding: 6px 3px; line-height: 1.25; vertical-align: middle; }
  .imx td { border-bottom: 1px solid var(--line); text-align: center; padding: 3px; }
  .imx tr:nth-child(odd) td { background: #f7f9fc; }
  .imx td.k { text-align: left; font-size: 13px; font-weight: 800; color: #1a2330; white-space: nowrap; padding-left: 10px; } .imx td.k b { margin-right: 8px; color: var(--blue-bright); }
  .imx td i { display: inline-block; width: 15px; height: 15px; border-radius: 50%; background: var(--blue-bright); vertical-align: middle; }
  .ilad { margin-top: 16px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; align-items: end; }
  .ilad > div { position: relative; display: flex; flex-direction: column; padding: 16px 18px 14px; color: #fff; }
  .ilad .c1 { height: 76%; background: #5a93d3; } .ilad .c2 { height: 84%; background: var(--blue); } .ilad .c3 { height: 92%; background: #24497e; } .ilad .c4 { height: 100%; background: var(--blue-deep); }
  .ilad .n { font-size: 14px; font-weight: 900; opacity: .8; }
  .ilad .ic { position: absolute; top: 14px; right: 14px; width: 44px; height: 44px; border-radius: 50%; background: #fff; color: var(--blue); display: flex; align-items: center; justify-content: center; }
  .ilad .t { margin-top: 12px; font-size: 21px; font-weight: 900; }
  .ilad .d { margin-top: 8px; font-size: 14.5px; font-weight: 600; line-height: 1.7; }
  .ilad .eg { margin-top: 12px; padding: 9px 12px; border: 1.5px solid rgba(255,255,255,.55); font-size: 13.5px; font-weight: 700; line-height: 1.6; }
  .ilad .nx { margin-top: auto; background: #fff; color: #1a2330; padding: 9px 12px; font-size: 13px; font-weight: 700; line-height: 1.5; }
  .ilad .nx b { display: block; font-size: 11.5px; font-weight: 800; color: var(--blue); }
  .icase { margin-top: 10px; margin-right: 60px; font-size: 13px; font-weight: 600; color: #4a5568; line-height: 1.5; }
  .icase b { margin-right: 10px; font-size: 13px; font-weight: 800; color: var(--blue); }
`;
const headHtml = tpl
  .slice(0, tpl.indexOf("<body>"))
  .replace(/<title>[^<]*<\/title>/, `<title>${esc(spec.title)}｜全${total}スライド</title>`)
  .replace("</style>", `${css}</style>`);
writeFileSync(
  join(dir, "deck.html"),
  `${headHtml}<body>
  <p class="note">${esc(spec.title)}｜全${total}スライド／事例・数値は各社・各機関の公開情報にもとづく</p>
  <div class="deck">

${slides.join("\n")}  </div>
<script>
  // 事例ページ：補足の節（.vsec.sm）を、左右の列の高さが揃う方へ移す
  document.querySelectorAll(".vdt").forEach(function (d) {
    var l = d.querySelector(".vl"), r = d.querySelector(".vr"), sm = l.querySelectorAll(".vsec.sm");
    if (!sm.length) return;
    function need(c) { var n = 0; Array.prototype.forEach.call(c.children, function (e) { n += e.scrollHeight + 10; }); return n; }
    var sh = 0; sm.forEach(function (e) { sh += e.scrollHeight + 10; });
    d.classList.add("measure");
    var L = need(l), R = need(r);
    if (Math.max(L - sh, R + sh) < Math.max(L, R)) sm.forEach(function (e) { r.appendChild(e); });
    d.classList.remove("measure");
  });
  // 事例ページ：列に余裕があるときは本文を一段大きくする（下に余白を残さない）
  document.querySelectorAll(".vdt").forEach(function (d) {
    [d.querySelector(".vl"), d.querySelector(".vr")].forEach(function (col) {
      d.classList.add("measure"); var need = 0; Array.prototype.forEach.call(col.children, function (e) { need += e.scrollHeight; }); d.classList.remove("measure");
      if (col.clientHeight - need > 90) col.classList.add("roomy");
    });
  });
</script>
</body>
</html>
`
);
console.log(`${slug}: ${total} slides -> docs/ebooks/${slug}/deck.html`);

// 縦長カバー（640×996）。既存資料と見た目が被らないよう、spec.book.layout で3種類を切り替える。
//   dark  : 紺地のタイポグラフィ中心（警告色のアクセント）
//   grid  : 白地に比較対象のロゴを2×2のタイルで並べる
//   split : 上半分が青のタイトル、下半分がイラスト＋ステップ帯
const bk = spec.book || {};
const head2 = `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500;700;800;900&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 640px; height: 996px; background: transparent; }
  .bk { position: relative; width: 640px; height: 996px; border-radius: 18px; overflow: hidden; font-family: "Noto Sans JP", sans-serif; }
  /* dark */
  .dark { background: #0f2240; color: #fff; }
  .dark .stripe { position: absolute; right: -120px; top: 120px; width: 520px; height: 70px; background: #f0b429; transform: rotate(-28deg); opacity: .95; }
  .dark .stripe.b { top: 210px; right: -170px; background: #d6453d; height: 26px; }
  .dark .tag { position: absolute; left: 48px; top: 54px; font-size: 15px; font-weight: 800; letter-spacing: .12em; color: #f0b429; }
  .dark .tag::before { content: "■ "; }
  .dark .ttl { position: absolute; left: 46px; top: 330px; right: 40px; font-size: 62px; font-weight: 900; line-height: 1.2; }
  .dark .ttl em { font-style: normal; background: linear-gradient(transparent 62%, #d6453d 62%); }
  .dark .ttl small { display: block; margin-top: 12px; font-size: 36px; color: #c9d8ee; }
  .dark .lead { position: absolute; left: 48px; top: 270px; font-size: 20px; font-weight: 800; color: #f0b429; }
  .dark .il { position: absolute; right: 30px; bottom: 150px; width: 300px; height: 300px; object-fit: contain; }
  .dark .list { position: absolute; left: 48px; bottom: 190px; display: grid; gap: 12px; }
  .dark .list span { font-size: 18px; font-weight: 800; border-left: 4px solid #f0b429; padding-left: 12px; }
  .dark .ft { position: absolute; left: 0; right: 0; bottom: 0; height: 110px; border-top: 1px solid rgba(255,255,255,.2); display: flex; align-items: center; justify-content: space-between; padding: 0 48px; }
  .dark .ft p { font-size: 15px; font-weight: 700; color: #c9d8ee; } .dark .ft img { height: 34px; }
  /* grid */
  .grid { background: #fff; }
  .grid .top { position: absolute; left: 0; right: 0; top: 0; height: 330px; padding: 54px 48px 0; }
  .grid .lead { font-size: 18px; font-weight: 800; color: #2b5fcf; letter-spacing: .04em; }
  .grid .ttl { margin-top: 14px; font-size: 56px; font-weight: 900; color: #1a2330; line-height: 1.22; }
  .grid .ttl em { font-style: normal; color: #2b5fcf; }
  .grid .tiles { position: absolute; left: 48px; right: 48px; top: 360px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .grid .tiles div { background: #f2f6fc; border-radius: 16px; height: 190px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; }
  .grid .tiles img { width: 92px; height: 92px; object-fit: contain; }
  .grid .tiles p { font-size: 17px; font-weight: 800; color: #1a2330; }
  .grid .vs { position: absolute; left: 50%; top: 545px; transform: translate(-50%, -50%); width: 64px; height: 64px; border-radius: 50%; background: #f0b429; color: #1a2330; font-size: 20px; font-weight: 900; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 6px #fff; }
  .grid .ft { position: absolute; left: 48px; right: 48px; bottom: 44px; display: flex; gap: 10px; flex-wrap: wrap; }
  .grid .ft span { background: #1a2e50; color: #fff; font-size: 15px; font-weight: 800; padding: 9px 18px; border-radius: 999px; }
  /* split */
  .split { background: #eaf3fb; }
  .split .top { position: absolute; left: 0; right: 0; top: 0; height: 430px; background: linear-gradient(160deg, #1f6fc4, #2b5fcf 60%, #3a4fb8); color: #fff; padding: 56px 48px 0; clip-path: polygon(0 0, 100% 0, 100% 86%, 0 100%); }
  .split .lead { display: inline-block; font-size: 16px; font-weight: 800; border: 1.5px solid rgba(255,255,255,.8); border-radius: 999px; padding: 6px 18px; }
  .split .ttl { margin-top: 22px; font-size: 60px; font-weight: 900; line-height: 1.2; }
  .split .ttl em { font-style: normal; color: #ffd75a; }
  /* 製品別事例集：濃色の見出し＋淡色の面に大きなイラスト＋黄色の帯。他カテゴリと被らないよう製品ごとに色を変える */
  .bk.stat { background: var(--c3); color: #fff; }
  .stat .top { position: absolute; top: 0; left: 0; right: 0; height: 336px; padding: 50px 46px 0; background: linear-gradient(120deg, var(--c1), var(--c2)); clip-path: ellipse(92% 100% at 50% 0); }
  .stat .eb { font-size: 16px; font-weight: 800; letter-spacing: .08em; }
  .stat .nm { margin-top: 12px; font-size: 88px; font-weight: 900; line-height: 1.05; color: #ffd75a; white-space: nowrap; }
  .stat .tt { margin-top: 2px; font-size: 50px; font-weight: 900; line-height: 1.2; }
  .stat .il { position: absolute; left: 16px; right: 16px; width: 608px; top: 330px; height: 426px; object-fit: contain; mix-blend-mode: multiply; }
  .stat .ft { position: absolute; left: 0; right: 0; bottom: 0; height: 216px; padding: 0 44px; background: #ffd75a; color: var(--c1); display: flex; flex-direction: column; justify-content: center; }
  .stat .big { display: flex; align-items: baseline; gap: 10px; font-size: 32px; font-weight: 900; }
  .stat .big b { font-size: 92px; line-height: 1; letter-spacing: -.01em; }
  .stat .seg { margin-top: 12px; display: flex; gap: 8px; }
  .stat .seg div { flex: 1; padding: 7px 0; text-align: center; background: var(--c1); color: #fff; font-size: 17px; font-weight: 800; white-space: nowrap; }
  .stat .note { margin-top: 10px; font-size: 14px; font-weight: 800; }
  .split .il { position: absolute; left: 50%; bottom: 150px; transform: translateX(-50%); width: 430px; height: 410px; object-fit: cover; border-radius: 50%; border: 8px solid #fff; box-shadow: 0 10px 30px rgba(20,40,80,.15); }
  .split .il.ct { object-fit: contain; background: #fff; padding: 34px; }
  .split .steps { position: absolute; left: 32px; right: 32px; bottom: 44px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
  .split .steps div { background: #fff; border-radius: 12px; padding: 10px 6px; text-align: center; box-shadow: 0 4px 12px rgba(20,40,80,.08); }
  .split .steps b { display: block; font-size: 11px; font-weight: 900; color: #2b5fcf; letter-spacing: .1em; }
  .split .steps span { display: block; margin-top: 3px; font-size: 14px; font-weight: 800; color: #1a2330; }
</style></head><body>`;
let inner = "";
if (bk.layout === "stat") {
  // 表紙の幅に1行で収まるよう、長い製品名は文字を小さくする
  const nameSize = Math.min(88, Math.floor(540 / [...bk.name].reduce((w, c) => w + (c.charCodeAt(0) < 128 ? 0.58 : 1), 0)));
  inner = `<div class="bk stat" style="--c1:${bk.colors[0]};--c2:${bk.colors[1]};--c3:${bk.colors[2]}">
  <div class="top"><p class="eb">${esc(bk.tag)}</p><p class="nm" style="font-size:${nameSize}px">${esc(bk.name)}</p><p class="tt">${esc(bk.ttl)}</p></div>
  <img class="il" src="${bk.illus}" alt="">
  <div class="ft"><div class="big">${esc(bk.pre)}<b>${esc(bk.count)}</b>${esc(bk.unit)}</div>
  <div class="seg">${bk.segments.map((s) => `<div>${esc(s.text ?? `${s.label} ${s.n}${bk.unit}`)}</div>`).join("")}</div>
  <p class="note">全${spec.slides.length + 1}ページ・${esc(bk.foot)}</p></div></div>`;
} else if (bk.layout === "dark") {
  inner = `<div class="bk dark"><div class="stripe"></div><div class="stripe b"></div>
  <p class="tag">${esc(bk.tag || "AI活用ノウハウ")}</p>
  <p class="lead">${esc(bk.lead || "")}</p>
  <p class="ttl">${bk.title_html}</p>
  <div class="list">${(bk.points || []).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
  ${bk.illus ? `<img class="il" src="${bk.illus}" alt="">` : ""}
  <div class="ft"><p>バイテック法人AI研修</p><img src="assets/biz-logo-w.svg" alt=""></div></div>`;
} else if (bk.layout === "grid") {
  inner = `<div class="bk grid"><div class="top"><p class="lead">${esc(bk.lead || "")}</p><p class="ttl">${bk.title_html}</p></div>
  <div class="tiles">${(bk.tiles || []).map((t) => `<div><img src="${t.img}" alt=""><p>${esc(t.name)}</p></div>`).join("")}</div>
  <div class="vs">VS</div>
  <div class="ft">${(bk.points || []).map((t) => `<span>${esc(t)}</span>`).join("")}</div></div>`;
} else {
  inner = `<div class="bk split"><div class="top"><p class="lead">${esc(bk.lead || "")}</p><p class="ttl">${bk.title_html}</p></div>
  <img class="il${bk.illus_contain ? " ct" : ""}" src="${bk.illus || "assets/book-illus.jpg"}" alt="">
  <div class="steps">${(bk.steps || []).map((t, i) => `<div><b>STEP ${i + 1}</b><span>${esc(t)}</span></div>`).join("")}</div></div>`;
}
writeFileSync(join(dir, "cover.html"), `${head2}${inner}</body></html>`);
