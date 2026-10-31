#!/usr/bin/env python3
"""部門別「AI・自動化アイデア10選」の spec.json を dept.json から生成する。

    python3 scripts/build-dept-idea-spec.py ebook-22
    → docs/ebooks/<slug>/dept.json を読み、同じ場所へ spec.json を書き出す。
      そのあと node scripts/build-knowledge-ebook.mjs <slug> → node scripts/build-ebook.mjs <slug> --pdf

ページ構成・効果測定・ライセンスの説明・ご留意事項は全部門で共通。部門ごとに違う内容だけ dept.json に書く。
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
slug = sys.argv[1]
DIR = ROOT / "docs" / "ebooks" / slug
d = json.loads((DIR / "dept.json").read_text(encoding="utf-8"))

ideas = d["ideas"]
if len(ideas) != 10:
    raise SystemExit("ideas は10件必要です")
by_no = {i["no"]: i for i in ideas}
for i in ideas:
    i["illus"] = f"assets/illus/idea{i['no']}.webp"
    if len(i["flow"]) != 4:
        raise SystemExit(f"{i['no']}: flow は4ステップ必要です")

DEPT = d["dept"]
TITLE = f"{DEPT}のAI・自動化アイデア10選"
cases = d["cases"]
if len(cases) != 6:
    raise SystemExit("cases は6件必要です")
pick = lambda nos: [{"no": n, "name": by_no[n]["name"], "stage": by_no[n]["stage"], "load": by_no[n]["load"], "icon": by_no[n]["icon"]} for n in nos]
label = lambda nos: [f"{n}　{by_no[n]['name']}" for n in nos]
dots = lambda nos: "・".join(nos)
br = "<br>".join

STAGE_DEFAULT = {
    1: "負荷の小さいものから。少人数で、確認と修正の時間まで含めて効果を見ます。",
    2: "フローやエージェントを作り、チームの標準の手順に組み込みます。",
    3: "基幹システムと接続します。例外処理と監視の設計が必要です。",
}
STAGE_NEXT = {
    1: "確認・修正を含めても時間が減り、品質も保てている",
    2: "未処理や手戻りを追跡でき、運用の担当者が決まっている",
    3: "保守と費用を含めても、効果が続いている",
}
ARROW = {1: "少人数で試す", 2: "部門の手順にする", 3: "基幹システムとつなぐ"}
stages = [s for s in (1, 2, 3) if any(i["stage"] == s for i in ideas)]

# P.19の確認項目は、その部門のアイデアで使う製品に関係するものだけ載せる
used = " ".join(p for i in ideas for p in i["products"])
uses_copilot = any(p.startswith(("Microsoft 365 Copilot", "Copilot分析")) or p == "Copilot" for i in ideas for p in i["products"])
uses_ai_rpa = any(k in used for k in ("AI Builder", "RPA", "Desktop"))
checks = [
    {"icon": "lock", "title": "資料の権限", "desc": "Copilotは閲覧できる範囲で回答します。SharePointなどの過剰な共有を先に直します。" if uses_copilot else "SharePointなどの過剰な共有を先に直し、参照する資料の範囲を決めます。"},
]
if uses_copilot:
    checks.append({"icon": "chat", "title": "Copilotのライセンス", "desc": "対象のライセンスと、前提になるMicrosoft 365の契約を確認します。"})
checks += [
    {"icon": "target", "title": "Copilot Studioの課金", "desc": "公開先、実行方法、利用量によって、Copilot Creditsの扱いが変わります。"},
    {"icon": "gear", "title": "Power Automateの区分", "desc": "標準かPremiumかを確認します。CRM、SQL、APIへの接続は追加のライセンスが必要な場合があります。"},
]
if uses_ai_rpa:
    checks.append({"icon": "yen", "title": "AI BuilderとRPA", "desc": "AI機能の課金、無人RPAの契約、画面変更時の保守を見積もります。"})
if "Process Mining" in used:
    checks.append({"icon": "trend", "title": "Process Miningの条件", "desc": "対象のライセンスと、分析に使う業務ログの範囲を確認します。"})
if "Teams通話" in used:
    checks.append({"icon": "chat", "title": "Teams通話の契約", "desc": "追加の契約、電話番号、外線との接続を確認します。"})

tasks = d["tasks"]
pillars = d["pillars"]

slides = [
    {
        "type": "toc",
        "items": [
            {"title": f"{DEPT}の手間と、製品の役割", "desc": tasks["toc_desc"], "pages": "P.2 - 3"},
            {"title": "10のアイデアの全体像", "desc": "業務の流れと、始める順番", "pages": "P.4 - 5"},
            {"title": "活用アイデア10選", "desc": "1アイデア1ページで、流れと確認点を解説", "pages": "P.6 - 16"},
            {"title": "近い領域の公開事例", "desc": "6社の取り組みと数字の読み方", "pages": "P.17"},
            {"title": "効果の測り方と導入前の確認", "desc": "指標・ライセンス・進め方", "pages": "P.18 - 20"},
        ],
        "foot": "本資料の10のアイデアは、公開事例と公式機能をもとにバイテック法人AI研修が作成した設計案です。導入実績を示すものではありません。",
    },
    {
        "type": "cards", "eyebrow": f"{DEPT}の手間", "caption": f"{DEPT}の手間は3つに分けて考える",
        "title_html": tasks["title_html"],
        "lead": "どの作業かによって、使う製品も始めやすさも変わります。まず自社の手間がどれに当たるかを見てください。",
        "cards": [
            {
                "illus": f"assets/illus/{c['illus']}.webp", "title": c["title"],
                "desc": c["desc"] + '<span class="ex">' + br(c.get("ex") or [f"{n} {by_no[n]['name']}" for n in c["nos"]]) + "</span>",
                "tag": f"→ アイデア {' ・ '.join(c['nos']).replace(' ・ ', '・')}",
            }
            for c in tasks["cards"]
        ],
    },
    {
        "type": "stack", "eyebrow": "製品の役割", "caption": "4つの製品の関係",
        "title_html": "<b>Microsoft 365を土台</b>に、3つの製品を役割で使い分ける",
        "lead": "それぞれ得意な作業が違います。自社の契約でどこまで使えるかは、P.19で確認します。",
        "ex_label": d.get("ex_label", f"{DEPT}では"),
        "pillars": [
            {"icon": "chat", "role": "個人の作業を速くする", "title": "Microsoft 365 Copilot", "desc": "<b>読む・探す・書く・会議を追う</b>。メールやファイルをまたいで整理します。", **pillars["copilot"]},
            {"icon": "target", "role": "チームの判断をそろえる", "title": "Copilot Studio", "desc": "<b>独自の業務エージェント</b>を作ります。知識と業務の手順を組み合わせます。", **pillars["studio"]},
            {"icon": "gear", "role": "決まった手順を動かす", "title": "Power Automate", "desc": "<b>登録・通知・承認・転記</b>を実行します。標準連携から基幹連携まで広げられます。", **pillars["automate"]},
        ],
        "base": {"icon": "people", "role": "資料と台帳を置く土台", "title": "Microsoft 365", "desc": "<b>Teams、SharePoint、Lists、Forms</b>などで、入力・共有・共同編集を行います。資料の置き場所と権限を整えることが、上の3つを使う前提になります。"},
    },
    {
        "type": "ideamap", "eyebrow": "全体像", "caption": "業務の流れと10のアイデア",
        "title_html": f"{DEPT}の流れに沿って、<b>10のアイデア</b>を並べる",
        "lead": "ラベルは始める順番、丸の数は導入の負荷（1〜3の相対的な目安）です。",
        "phases": [{"title": p["title"], "ideas": pick(p["nos"])} for p in d["phases"]],
    },
    {
        "type": "roadmap", "eyebrow": "始める順番", "caption": "始める順番",
        "title_html": f"全部を同時に始めない。<b>{len(stages)}つの段階</b>で順に広げる。",
        "arrow": [ARROW[s] for s in stages],
        "stages": [
            {
                "stage": s,
                "desc": d.get("stage_desc", {}).get(str(s), STAGE_DEFAULT[s]),
                "ideas": label([i["no"] for i in ideas if i["stage"] == s]),
                "next": STAGE_NEXT[s],
            }
            for s in stages
        ],
    },
    {"type": "chapter", "no": "03", "title": "活用アイデア10選", "desc": "1アイデア1ページで、流れと確認点を解説", "caption": "章扉 活用アイデア10選"},
    *[{"type": "idea", "eyebrow": f"{DEPT}の活用アイデア", **i} for i in ideas],
    {
        "type": "numcards", "eyebrow": "公開事例", "caption": "近い領域の公開事例",
        "title_html": "近い領域の<b>公開事例</b>と、数字の読み方",
        "lead": "10のアイデアと同じ施策の実績ではありません。測定の条件が違うため、数字どうしの比較や合算もできません。",
        "items": cases,
        "foot": "出典：Microsoft公式の顧客事例・ニュース・ブログ。掲載企業との取引関係や推薦を示すものではありません。詳細はP.22。" if not d.get("cases_foot") else d["cases_foot"],
    },
    {
        "type": "formula", "eyebrow": "効果の測り方", "caption": "効果の測り方",
        "title_html": "「作る時間」ではなく、<b>完成して使えるまで</b>の時間を測る",
        "lead": "下の数字はすべて、計算の仕方を示すための仮の数字です。",
        "formula": [
            {"label": "実行件数", "value": "30", "unit": "件／月"}, {"op": "×"}, {"op": "（"},
            {"label": "導入前の手作業", "value": "60", "unit": "分／件"}, {"op": "−"},
            {"label": "導入後の手作業", "value": "20", "unit": "分／件"}, {"op": "）"}, {"op": "−"},
            {"label": "保守・学習", "value": "3", "unit": "時間／月"}, {"op": "="},
            {"label": "実現した削減工数", "value": "17", "unit": "時間／月", "total": True},
        ],
        "bars_title": "導入後の時間には、確認と修正も含める",
        "bars": [
            {"label": "導入前", "parts": [{"v": 60, "t": "人が作成 60分", "tone": "gr"}]},
            {"label": "導入後", "parts": [{"v": 5, "t": "指示", "tone": "bl"}, {"v": 10, "t": "確認", "tone": "am"}, {"v": 5, "t": "修正", "tone": "am2"}]},
        ],
        "bars_note": "導入後の20分は、AIへの指示5分、確認10分、修正5分の例です。待ち時間の短縮とは分けて記録します。",
        "metrics": [
            {"icon": "people", "title": "利用・定着", "desc": "対象者のうち、実務で使っている人の割合を見ます。利用回数だけでは改善を説明できません。"},
            {"icon": "check", "title": "品質", "desc": "誤登録、手戻り、差し戻しの数を見ます。時間が減っても、訂正が増えていないかを確認します。"},
            {"icon": "trend", "title": "再配分した成果", "desc": f"短縮した時間を何に使ったかを見ます。{d['reallocate']}"},
        ],
    },
    {
        "type": "matrix", "eyebrow": "導入前の確認", "caption": "導入前の確認",
        "title_html": "どのアイデアに<b>どの製品が必要か</b>を先に確認する",
        "lead": "機能や提供条件は、契約やテナントの設定によって異なります。最新の条件はMicrosoftの公式資料で確認してください。",
        "columns": d["matrix"]["columns"],
        "rows": [{"no": i["no"], "name": i["name"], "on": d["matrix"]["on"][i["no"]]} for i in ideas],
        "checks": checks,
    },
    {
        "type": "ladder", "eyebrow": "進め方", "caption": "進め方の4段階",
        "title_html": "1つの業務から始めて、<b>4つの段階</b>で広げる",
        "steps": [
            {"icon": "search", "title": "業務を選ぶ", "desc": "件数、手作業の時間、待ち時間、不備を記録し、標準化できる部分を選びます。", "example": d["ladder_examples"][0], "side": "効果と元の作業量を説明できる"},
            {"icon": "flask", "title": "小さく試す", "desc": "限られた利用者で試し、うまくいく例と失敗する例を確認します。", "example": d["ladder_examples"][1], "side": "確認・修正込みで便益があり、品質も満たす"},
            {"icon": "gear", "title": "業務をつなぐ", "desc": "エージェントや基幹連携を足し、例外・権限・監視を運用に組み込みます。", "example": d["ladder_examples"][2], "side": "未処理と手戻りを追跡でき、担当が決まっている"},
            {"icon": "people", "title": "横展開する", "desc": "フロー・知識・研修の共通部分を再利用し、他の部門へ広げます。", "example": d["ladder_examples"][3], "side": "利用が定着し、保守と費用を含む効果が続く"},
        ],
    },
    {
        "type": "cta", "caption": "ご相談",
        "title_html": "どの業務から始めるか、<b>一緒に整理</b>します。",
        "lead": "バイテック法人AI研修では、Microsoft 365 Copilotの業務活用から、Copilot Studioによるエージェントの内製までを研修でご支援します。",
        "cards": [
            {"icon": "chat", "title": "Copilot研修", "desc": f'会議・メール・資料作成など、<b>日々の業務での使い方</b>を実際の操作に沿って学びます。<span class="ex">本資料のアイデア {d["cta_nos"]["copilot"]} に対応</span>'},
            {"icon": "target", "title": "Copilot Studio研修", "desc": f'社内データやPower Automateと連携する<b>エージェントの構築と運用</b>を学びます。<span class="ex">本資料のアイデア {d["cta_nos"]["studio"]} に対応</span>'},
            {"icon": "yen", "title": "助成金の活用サポート", "desc": '人材開発支援助成金の対象となる研修の設計と、必要な情報をご案内します。<span class="ex">支給の可否は管轄労働局の審査で決まります</span>'},
        ],
        "cta_title": f"まずは無料個別相談で、{DEPT}の課題をお聞かせください",
        "cta_desc": "オンライン・約60分。どの業務から始めるか、研修内容と助成金の見込みまでご案内します。",
    },
    {
        "type": "notes",
        "items": [
            "本資料の10のアイデア、指示文の例、負荷の目安、始める順番は、公開事例と公式機能をもとに当社が作成した設計案です。導入実績や効果を保証するものではありません。",
            "公開事例の数値は各社・各機関の公表値であり、当社による測定値ではありません。掲載企業との取引関係や、各社による推薦を示すものではありません。",
            f"出典：{d['sources']}。2026年10月に確認。",
            "製品の機能・ライセンス・課金の条件は2026年10月時点の公式資料にもとづきます。契約やテナントの設定によって異なり、変更される場合があります。",
            "社名・製品名は各社の商標または登録商標です。本資料はMicrosoftの公式資料ではありません。本資料の内容の無断転載・再配布はご遠慮ください。　発行：バイテック法人AI研修（2026年10月版）",
        ],
    },
]

spec = {
    "title": TITLE,
    "subtitle": d["subtitle"],
    "edition": "2026年10月版",
    "book": {
        "layout": "split", "lead": "部門別 活用アイデア集",
        "title_html": f'<em{" style=\'font-size:.7em\'" if len(DEPT) > 9 else ""}>{DEPT}</em>の<br>AI・自動化<br>アイデア10選',
        "illus": "assets/illus/cover.webp", "illus_contain": True,
        "steps": ["選ぶ", "試す", "つなぐ", "広げる"],
    },
    "cover_sub": "Copilot・Copilot Studio・Power Automateで変える",
    "cover_pills": ["活用アイデア10件", "指示文の例つき", "公開事例6社"],
    "cover_illus": "assets/illus/cover.webp",
    "cover_title_html": f'<small style="margin:-8px 0 0;line-height:1.15;font-size:32px">{DEPT}の</small>AI・自動化<br>アイデア10選',
    "book_title_html": f"<b>{DEPT}</b>の<br>AI・自動化<br>アイデア10選",
    "category_label": "部門別 活用アイデア集",
    "book_pills": ["活用アイデア10件", "指示文の例つき"],
    "slides": slides,
}
(DIR / "spec.json").write_text(json.dumps(spec, ensure_ascii=False, indent=1), encoding="utf-8")
print(f"{slug}: {TITLE} {len(slides)} slides")
