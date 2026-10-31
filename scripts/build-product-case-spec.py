#!/usr/bin/env python3
"""製品別 活用事例集の spec.json を docs/ebooks/<slug>/cases.json から生成する。
使い方: python3 scripts/build-product-case-spec.py ebook-33
数値は cases.json のまま加工しない。文面の設定は下の BOOKS に置く。"""
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AREA = {"実測": "実測", "利用者の申告": "申告", "推定（算出方法あり）": "推定", "見込み・試算": "見込み", "目標": "目標", "規模・件数": "規模・件数", "算定方法の記載なし": "算定法なし", "定性": "定性"}
EVID = [
    ("実測", "システムの記録や集計に基づく値", "集計の期間と対象を確認する"),
    ("利用者の申告", "アンケートなどで利用者が答えた値", "回答者の値で、全社平均ではない"),
    ("推定（算出方法あり）", "調査や集計から算出した値", "計算の前提を確認する"),
    ("見込み・試算", "仮定や初期の結果から見込んだ値", "実績として扱わない"),
    ("目標", "組織が掲げた目標", "達成した値ではない"),
    ("算定方法の記載なし", "公表はあるが、測り方の記載がない", "参考値にとどめる"),
    ("規模・件数", "人数、件数、作成数など", "効果の値ではない。進め方を参考にする"),
    ("定性", "数値の公表がない", "取り組みの内容を参考にする"),
]
FOOT = "数値は各組織の公表値であり、当社による測定値ではありません。測定の条件が違うため、数字どうしの比較や合算はできません。出典は各事例のページに記載しています。"
CTA_LEAD = "バイテック法人AI研修では、Copilotの業務活用から、Copilot Studioによるエージェントの内製、Power Automateによる業務の自動化までを研修でご支援します。"
BOOKS = {
    "ebook-33": {
        "title": "Copilot Studio活用事例集", "name": "Copilot Studio", "colors": ["#2e2466", "#5a3fb0", "#ece8f8"], "theme": "violet",
        "sub": "Copilot Studioの公開事例を、数字の根拠とあわせて読む", "subtitle": "Copilot Studioの公開事例16件を、数字の根拠とあわせて読む",
        "pills": ["公開事例16件", "数字の読み方つき", "自己解決率の測り方"],
        "chapters": [("国内の事例", ["C08", "C09", "C10", "C11", "C12"], "国内は<b>社内の問い合わせと検索</b>から", "数字の性質を左から3列目に示しています。数字どうしは比較できません。"),
                     ("海外の事例", ["C20", "C21", "C22", "C23", "C25", "C26", "C27", "C28", "C29", "C59", "C62"], "海外は<b>顧客対応と基幹連携</b>まで広がる", "数字の性質を左から3列目に示しています。数字どうしは比較できません。")],
        "uses": {"title": "入口は<b>問い合わせと検索</b>。慣れると処理の実行まで広がる", "lead": "16件の使い方を5つに分けました。下に行くほど、接続や権限の設計が必要になります。",
                 "rows": [["FAQ・問い合わせ", "社内のFAQボット、照会業務の支援、市サイトの案内", "コニカミノルタ、りそなグループ、府中市"],
                          ["社内検索", "サポート用ナレッジの検索、研究開発資料への質問", "OBC、Amgen"],
                          ["文書の確認", "提案書のレビュー、輸送請求書と契約の差異検出", "SCSK、Dow"],
                          ["顧客対応", "銀行の問い合わせ、Webの案内役、カード送付の通知", "Rabobank、ABN AMRO Bank、Holland America Line、Virgin Money"],
                          ["基幹・RPA連携", "SAPの解除申請、返金処理の起動、不正調査の情報収集", "PG&E、Cineplex、Pets at Home"]]},
        "cards": {"title": "成果に近づくための<b>3つの設計</b>", "lead": "公開事例から読み取れる共通点です（当社の整理）。",
                  "items": [("step-small", "対象を絞って作る", "最初から何でも答えさせず、目的と範囲を決めています。", "りそなグループ：照会業務に絞る<br>Cineplex：返金対応に絞る<br>Holland America Line：Webの案内役"),
                            ("step-measure", "公開前に試し、段階的に広げる", "代表的な質問で確かめ、公開範囲を少しずつ広げています。", "府中市：職員約350名で1,000件ほどのテスト<br>Holland America Line：5→50→100%<br>McKinsey：パイロットで検証"),
                            ("step-learn", "人に渡す経路を残す", "すべてをAIで完結させず、有人対応と組み合わせています。", "Rabobank：チャットの62%が有人転送なし<br>コニカミノルタ：AIと有人で分担")]},
        "num": {"title": "公開範囲と応答の変化を、<b>数字で見る</b>", "lead": "3組織の例です。棒の長さは各カードの中でのみ比べてください。",
                "items": [{"name": "Holland America Line", "action": "Webの案内役を段階公開", "pre": "", "value": "100", "unit": "%まで公開", "bars": [{"l": "最初", "v": 5, "t": "5%"}, {"l": "次", "v": 50, "t": "50%"}, {"l": "全体", "v": 100, "t": "100%"}], "note": "社内検証後の公開比率です。効果の削減率は公表されていません"},
                          {"name": "Cineplex", "action": "返金対応の時間（1件）", "pre": "通常", "value": "30", "unit": "秒", "bars": [{"l": "導入前", "v": 900, "t": "5〜15分"}, {"l": "導入後", "v": 30, "t": "30秒"}], "note": "棒は導入前の上限15分で描いています。算定方法の記載はありません"},
                          {"name": "Virgin Money", "action": "カード送付の通知への対応", "pre": "", "value": "97", "unit": "%が完了", "bars": [{"l": "反応", "v": 54, "t": "約54%"}, {"l": "完了", "v": 97, "t": "97%"}], "note": "97%は通知に反応した顧客のうち、手続を完了した割合です"}]},
        "steps": {"title": "16件から学ぶ、<b>4つのステップ</b>", "items": [("対象の業務を1つ決める", "問い合わせの多い領域を選び、答える範囲を決める", "りそなグループ"), ("知識と権限を整える", "最新の資料を選び、責任者と更新の手順を決める", "OBC、コニカミノルタ"), ("公開前に試す", "代表的な質問と例外で確かめ、少人数から公開する", "府中市、Holland America Line"), ("測って広げる", "自己解決率と有人対応の量を見て、次の業務へ広げる", "Rabobank")]},
        "formula": {"title": "会話の数ではなく、<b>人の手なしで完了した割合</b>を測る", "formula": [{"label": "人の手なしで完了", "value": "600", "unit": "件"}, {"op": "÷"}, {"label": "対象の問い合わせ", "value": "1,000", "unit": "件"}, {"op": "="}, {"label": "自己解決率", "value": "60", "unit": "%", "total": True}],
                    "bars_title": "1,000件の内訳を分けて記録する", "bars": [{"label": "内訳", "parts": [{"v": 600, "t": "完了 600件", "tone": "bl"}, {"v": 100, "t": "再問合せ", "tone": "am"}, {"v": 300, "t": "有人 300件", "tone": "gr"}]}], "bars_note": "再度問い合わせた件数は、解決に数えません。",
                    "metrics": [{"icon": "check", "title": "自己解決率", "desc": "完了の定義を決め、失敗や途中離脱も含めて数えます。"}, {"icon": "people", "title": "有人対応の工数", "desc": "問い合わせの数ではなく、人がかけた時間を見ます。"}, {"icon": "shield", "title": "品質", "desc": "誤回答と回答できなかった質問を記録します。"}]},
    },
    "ebook-34": {
        "title": "Power Automate活用事例集", "name": "Power Automate", "colors": ["#7a2c10", "#c9601f", "#fbeee2"], "theme": "amber",
        "sub": "Power Automateと標準機能の公開事例を、数字の根拠とあわせて読む", "subtitle": "Power AutomateとTeamsなど標準機能の公開事例16件を、数字の根拠とあわせて読む",
        "pills": ["公開事例16件", "標準機能の事例つき", "削減工数の測り方"],
        "chapters": [("国内の事例", ["C14", "C15", "C17", "C18", "C56"], "国内は<b>現場が自分で</b>作る事例が中心", "数字の性質を左から3列目に示しています。数字どうしは比較できません。"),
                     ("海外の事例", ["C19", "C39", "C40", "C41", "C42", "C60", "C61"], "海外は<b>基幹連携とRPA</b>まで踏み込む", "数字の性質を左から3列目に示しています。数字どうしは比較できません。"),
                     ("標準機能の事例", ["C49", "C51", "C53", "C54"], "追加の開発をせず、<b>Teamsなど標準機能</b>で変える", "Power Automateを使わない事例も含みます。入力と連絡の電子化は、自動化の土台になります。")],
        "uses": {"title": "入口は<b>承認と転記</b>。基幹連携やRPAは次の段階", "lead": "16件の使い方を5つに分けました。下に行くほど、ライセンスと運用の確認が必要になります。",
                 "rows": [["連絡・共有", "店舗の連絡手段を統一、目的別チャネルで事前共有", "資生堂、Coop Norge、コスモ石油販売"],
                          ["申請・承認", "口座登録の電子化、予算承認の依頼、出張・休暇申請", "早稲田大学、AKKODiSコンサルティング、聖徳大学附属取手聖徳女子"],
                          ["転記・帳票", "営業帳票の起票、入金PDFの確認と回収", "富士フイルムBI、渋谷区"],
                          ["現場入力", "内装工事の進捗をスマホで報告し、管理表へ反映", "鹿島建設"],
                          ["基幹連携・RPA", "SAP請求処理、旧システムの同期、医療記録の整理、請求書の修正", "Coca-Cola United、T-Mobile、US Acute Care Solutions、Komatsu Australia"]]},
        "cards": {"title": "広がった組織が取り組む<b>3つのこと</b>", "lead": "公開事例から読み取れる共通点です（当社の整理）。",
                  "items": [("step-small", "小さな業務から始める", "1つの業務や拠点で試し、形ができてから広げています。", "Komatsu Australia：1仕入先から<br>コスモ石油販売：九州で試験導入<br>Evergy：RPAから順に展開"),
                            ("step-learn", "作れる人を育てる", "研修や推進役で、現場に作り手を増やしています。", "Games Global：2回の社内研修<br>渋谷区：DLS 68名<br>Coop Norge：推進役 約200人"),
                            ("step-measure", "現場が自分で直す", "業務を知る人が作ることで、改善が続いています。", "早稲田大学：利用部門が内製<br>富士フイルムBI：現場主導<br>渋谷区：職員自身が自動化")]},
        "num": {"title": "全社の大きな数字は、<b>小さな自動化の積み上げ</b>", "lead": "3組織の例です。全社の数字は複数の施策の合算で、Power Automate単体の効果ではありません。",
                "items": [{"name": "Games Global", "action": "社内研修から生まれた自動化", "pre": "年", "value": "22,370", "unit": "時間", "bars": [{"l": "1回目", "v": 5434, "t": "5,434"}, {"l": "合計", "v": 22370, "t": "22,370"}], "note": "2回の研修の合計です。Power AppsとCopilot Studioを含みます"},
                          {"name": "Evergy", "action": "勤怠入力の改善と全社の施策", "pre": "年", "value": "120,000", "unit": "時間超", "bars": [{"l": "勤怠", "v": 15000, "t": "15,000超"}, {"l": "全体", "v": 120000, "t": "120,000超"}], "note": "全体は275超の施策の合算で、Power Appsを含みます"},
                          {"name": "Cineplex", "action": "返金の自動化と全社の施策", "pre": "年", "value": "30,000", "unit": "時間超", "bars": [{"l": "返金", "v": 5000, "t": "5,000"}, {"l": "全体", "v": 30000, "t": "30,000超"}], "note": "全体は全施策の合算で、Copilot連携などを含みます"}]},
        "steps": {"title": "16件から学ぶ、<b>4つのステップ</b>", "items": [("反復する作業を記録する", "件数、手作業の時間、待ち時間、不備を記録する", "AKKODiSコンサルティング"), ("標準の連携で試す", "Forms・SharePoint・Teamsなどで、小さな流れを作る", "渋谷区、聖徳大学附属取手聖徳女子"), ("基幹とRPAへ広げる", "例外、権限、監視を決めてから、基幹システムへつなぐ", "Komatsu Australia、T-Mobile"), ("作り手を増やす", "研修と推進役で広げ、所有者と変更の手順を管理する", "Games Global、Coop Norge")]},
        "formula": {"title": "「作る時間」ではなく、<b>実際に減った工数</b>を測る", "formula": [{"label": "実行件数", "value": "30", "unit": "件／月"}, {"op": "×"}, {"op": "（"}, {"label": "導入前の手作業", "value": "60", "unit": "分／件"}, {"op": "−"}, {"label": "導入後の手作業", "value": "20", "unit": "分／件"}, {"op": "）"}, {"op": "−"}, {"label": "保守・学習", "value": "3", "unit": "時間／月"}, {"op": "="}, {"label": "実現した削減工数", "value": "17", "unit": "時間／月", "total": True}],
                    "bars_title": "導入後の時間には、確認と例外処理も含める", "bars": [{"label": "導入前", "parts": [{"v": 60, "t": "人が作業 60分", "tone": "gr"}]}, {"label": "導入後", "parts": [{"v": 10, "t": "入力", "tone": "bl"}, {"v": 7, "t": "確認", "tone": "am"}, {"v": 3, "t": "例外", "tone": "am2"}]}], "bars_note": "計算の仕方を示すための仮の数字です。待ち時間の短縮とは分けて記録します。",
                    "metrics": [{"icon": "trend", "title": "リードタイム", "desc": "受付から完了までの時間を、作業時間と分けて見ます。"}, {"icon": "check", "title": "品質", "desc": "誤登録、差し戻し、手戻りの数を見ます。"}, {"icon": "people", "title": "運用", "desc": "保守の工数と、所有者が決まっているかを確認します。"}]},
    },
}


def main(slug):
    b = BOOKS[slug]
    here = f"{ROOT}/docs/ebooks/{slug}"
    cases = {c["id"]: c for c in json.load(open(f"{here}/cases.json"))}
    total = sum(len(ids) for *_, ids, _a, _b in [(c[0], c[1], c[2], c[3]) for c in b["chapters"]])
    assert total == len(cases), (total, len(cases))
    short = lambda i: cases[i]["name"].split("（")[0] if i not in ("C09", "C60", "C62") else {"C09": "OBC", "C60": "Cineplex", "C62": "Cineplex"}[i]

    def row(i):
        c = cases[i]
        return {"name": c["name"], "icon": c["icon"], "area": AREA[c["evidence"]], "list_action": c["list_action"], "list_result_html": c["list_result_html"]}

    def caselist(ids, eyebrow, title, lead):
        return {"type": "caselist", "eyebrow": eyebrow, "caption": f"{eyebrow}の一覧", "title_html": title, "lead": lead, "col_name": "組織", "col_area": "数字の性質", "col_result": "公表された数字", "rows": [row(i) for i in ids], "foot": FOOT}

    def case(i):
        c = {k: v for k, v in cases[i].items() if k not in ("id", "verified", "country", "evidence", "sheet_diff", "urls", "list_action", "list_result_html", "uses", "type", "verify_note")} | {"type": "case"}
        c["kpis"] = [{**c["kpis"][0], "hero": True}, *c["kpis"][1:]]
        return c

    ev_rows = []
    for k, what, how in EVID:
        ids = [i for i, c in cases.items() if c["evidence"] == k]
        if ids:
            ev_rows.append([k, what, "、".join(dict.fromkeys(short(i) for i in ids)), how])
    head = [
        {"type": "table", "eyebrow": "数字の読み方", "caption": "数字の性質", "title_html": f"{total}件の数字は、<b>強さが違う</b>。まず根拠の種類を見る", "lead": "同じ「削減」でも、測り方によって意味が変わります。本資料では、各事例の数字に性質を付けています。", "header": ["数字の性質", "どんな数字か", "該当する事例", "読むときの注意"], "cols": [170, 270, 420, 0], "dense": True if len(ev_rows) > 6 else "mid", "rows": ev_rows, "foot": "数字の性質は、原文の記載をもとに当社が分類したものです。" + FOOT},
        {"type": "table", "eyebrow": "使い方の全体像", "caption": "何に使われているか", "title_html": b["uses"]["title"], "lead": b["uses"]["lead"], "header": ["使い方", "具体例", "主な事例"], "cols": [150, 540, 0], "dense": "mid", "rows": b["uses"]["rows"], "foot": "分類は原文の記載をもとに当社が整理したものです。"},
        {"type": "cards", "eyebrow": "共通する進め方", "caption": "共通する進め方", "title_html": b["cards"]["title"], "lead": b["cards"]["lead"], "cards": [{"illus": f"assets/illus/{il}.webp", "title": t, "desc": f'{d}<span class="ex">{ex}</span>'} for il, t, d, ex in b["cards"]["items"]]},
        {"type": "numcards", "tall": True, "eyebrow": "数字で見る", "caption": "数字で見る", "title_html": b["num"]["title"], "lead": b["num"]["lead"], "items": b["num"]["items"], "foot": FOOT},
    ]
    body, toc = [], []
    for n, (name, ids, title, lead) in enumerate(b["chapters"], 1):
        start = len(head) + len(body) + 2
        body.append({"type": "chapter", "no": f"{n:02d}", "title": name, "desc": f"{len(ids)}件の取り組みと、公表された数字", "caption": f"章扉 {name}"})
        size = 6 if len(ids) <= 6 else (len(ids) + 1) // 2
        for k in range(0, len(ids), size):
            part = ids[k:k + size]
            body.append(caselist(part, name, title, lead))
            body += [case(i) for i in part]
        toc.append({"title": name, "desc": f"{len(ids)}件", "pages": f"P.{start} - {len(head) + len(body) + 1}"})
    tail = [
        {"type": "steps", "eyebrow": "自社で始めるには", "caption": "始め方", "title_html": b["steps"]["title"], "steps": [{"title": t, "desc": d, "side": s} for t, d, s in b["steps"]["items"]], "band": "ステップの整理は当社の見解です。右列は参考になる事例を示しています。"},
        {"type": "formula", "eyebrow": "効果の測り方", "caption": "効果の測り方", "title_html": b["formula"]["title"], "lead": "下の数字はすべて、計算の仕方を示すための仮の数字です。", **{k: v for k, v in b["formula"].items() if k != "title"}},
        {"type": "cta", "caption": "ご相談", "title_html": "どの業務から始めるか、<b>一緒に整理</b>します。", "lead": CTA_LEAD, "cards": [{"icon": "chat", "title": "Copilot研修", "desc": "会議・メール・資料作成など、<b>日々の業務での使い方</b>を実際の操作に沿って学びます。"}, {"icon": "target", "title": "Copilot Studio研修", "desc": "社内データやPower Automateと連携する<b>エージェントの構築と運用</b>を学びます。"}, {"icon": "yen", "title": "助成金の活用サポート", "desc": '人材開発支援助成金の対象となる研修の設計と、必要な情報をご案内します。<span class="ex">支給の可否は管轄労働局の審査で決まります</span>'}], "cta_title": "まずは無料個別相談で、自社の課題をお聞かせください", "cta_desc": "オンライン・約60分。どの業務から始めるか、研修内容と助成金の見込みまでご案内します。"},
        {"type": "notes", "items": ["掲載事例の数値は各組織の公表値であり、当社による測定値ではありません。測定の条件が異なるため、数字どうしの比較や合算はできません。", "「中堅企業が取り入れるなら」、数字の性質の分類、共通点、ステップの整理は当社の見解です。効果を保証するものではありません。", "掲載組織との取引関係や、各組織による推薦を示すものではありません。出典は各事例のページに記載しています。2026年10月に確認しました。", "製品の機能や名称は記事の公開時点のものです。Microsoft 365 Copilotは現在、Microsoft Copilotに改称されています。契約やテナントの設定によって条件が異なります。", "社名・製品名は各社の商標または登録商標です。本資料はMicrosoftの公式資料ではありません。本資料の内容の無断転載・再配布はご遠慮ください。　発行：バイテック法人AI研修（2026年10月版）"]},
    ]
    n_tail = len(head) + len(body) + 2
    toc = [{"title": "数字の読み方", "desc": f"{total}件の数字は、強さが違う", "pages": "P.2"}, {"title": "何に使い、どう進めたか", "desc": "使い方の分類と、共通する進め方", "pages": "P.3 - 5"}, *toc, {"title": "自社で始めるには", "desc": "進め方と効果の測り方", "pages": f"P.{n_tail} - {n_tail + 1}"}]
    slides = [{"type": "toc", "items": toc, "foot": f"掲載の{total}件は、公式発表の原文を2026年10月に確認したものです。"}, *head, *body, *tail]
    segs = [{"label": c[0].replace("の事例", ""), "n": len(c[1])} for c in b["chapters"]]
    spec = {
        "title": b["title"], "subtitle": b["subtitle"], "edition": "2026年10月版",
        "book": {"layout": "stat", "colors": b["colors"], "tag": "製品別 活用事例集", "name": b["name"], "ttl": "活用事例集", "illus": "assets/illus/cover-book.webp", "pre": "公開事例", "count": str(total), "unit": "件", "segments": segs, "foot": "公開情報ベース・出典明記"},
        "cover_sub": b["sub"], "cover_pills": b["pills"], "cover_theme": f"pan {b['theme']}", "cover_illus": "assets/illus/cover-book.webp",
        "cover_title_html": f"{b['name']}<br>活用事例集", "book_title_html": f"<b>{b['name']}</b><br>活用事例集", "category_label": "製品別 活用事例集", "book_pills": b["pills"][:2],
        "slides": slides,
    }
    json.dump(spec, open(f"{here}/spec.json", "w"), ensure_ascii=False, indent=1)
    print(slug, len(slides) + 1, "pages")


main(sys.argv[1])
