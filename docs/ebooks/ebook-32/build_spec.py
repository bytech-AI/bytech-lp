#!/usr/bin/env python3
"""Copilot活用事例集の spec.json を cases.json から生成する。数値は cases.json のまま加工しない。"""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
cases = {c["id"]: c for c in json.load(open(f"{HERE}/cases.json"))}
JP = ["C01", "C02", "C03", "C05", "C06", "C07"]
INTL = ["C04", "C24", "C30", "C31", "C32", "C35", "C36", "C37"]
GOV = ["C33", "C57", "C58", "C34"]
AREA = {"実測": "実測", "利用者の申告": "申告", "推定（算出方法あり）": "推定", "見込み・試算": "見込み", "規模・件数": "規模・件数", "算定方法の記載なし": "算定法なし", "定性": "定性"}
SHORT = {"C01": "JAF", "C24": "Capita", "C30": "Lumen Technologies", "C31": "Grant Thornton Australia", "C32": "British Heart Foundation", "C35": "University of Manchester", "C33": "英国政府", "C57": "HMRC", "C58": "DWP", "C34": "NHS England"}
short = lambda i: SHORT.get(i, cases[i]["name"])
TOTAL = len(JP + INTL + GOV)
FOOT = "数値は各組織の公表値であり、当社による測定値ではありません。測定の条件が違うため、数字どうしの比較や合算はできません。出典は各事例のページに記載しています。"


def row(i):
    c = cases[i]
    area = "比較・割当" if i in ("C57", "C58") else AREA[c["evidence"]]
    return {"name": c["name"], "icon": c["icon"], "area": area, "list_action": c["list_action"], "list_result_html": c["list_result_html"]}


def caselist(ids, eyebrow, title, lead):
    return {"type": "caselist", "eyebrow": eyebrow, "caption": f"{eyebrow}の一覧", "title_html": title, "lead": lead, "col_name": "組織", "col_area": "数字の性質", "col_result": "公表された数字", "rows": [row(i) for i in ids], "foot": FOOT}


def case(i):
    c = {k: v for k, v in cases[i].items() if k not in ("id", "verified", "country", "evidence", "sheet_diff", "urls", "list_action", "list_result_html", "uses", "type")} | {"type": "case"}
    c["kpis"] = [{**c["kpis"][0], "hero": True}, *c["kpis"][1:]]
    return c


slides = [
    {"type": "toc", "items": [
        {"title": "数字の読み方", "desc": "18件の数字は、強さが違う", "pages": "P.2"},
        {"title": "何に使い、どう広げたか", "desc": "使い方の分類と、共通する進め方", "pages": "P.3 - 5"},
        {"title": "国内の事例", "desc": "6件", "pages": "P.6 - 13"},
        {"title": "海外の事例", "desc": "8件", "pages": "P.14 - 23"},
        {"title": "公的機関の検証", "desc": "4件と、4機関の比較", "pages": "P.24 - 30"},
        {"title": "自社で始めるには", "desc": "進め方と効果の測り方", "pages": "P.31 - 32"},
    ], "foot": "掲載の18件は、公式発表の原文を2026年10月に確認したものです。"},
    {"type": "table", "eyebrow": "数字の読み方", "caption": "18件の数字は、強さが違う",
     "title_html": "18件の数字は、<b>強さが違う</b>。まず根拠の種類を見る",
     "lead": "同じ「削減時間」でも、測り方によって意味が変わります。本資料では、各事例の数字に性質を付けています。",
     "header": ["数字の性質", "どんな数字か", "該当する事例", "読むときの注意"], "cols": [150, 300, 390, 0], "dense": "mid",
     "rows": [
         ["比較・割当で検証", "配布の割当や比較群を設計して評価した", "、".join(short(i) for i in ["C57", "C58"]), "最も参考にしやすいが、時間はどちらも自己申告"],
         ["利用者の申告", "アンケートで利用者が答えた時間", "、".join(short(i) for i in ["C01", "C03", "C04", "C30", "C31", "C35", "C36", "C33"]), "回答者や受講者の値で、全社平均ではない"],
         ["算出方法つきの推定", "調査結果と人件費などから金額に換算", short("C05"), "計算の前提を確認する。支出の減少とは別"],
         ["見込み・試算", "試行の調査や仮定から見込んだ値", "、".join(short(i) for i in ["C02", "C32", "C34"]), "実績として扱わない"],
         ["規模・件数のみ", "人数、作成数、依頼件数など", "、".join(short(i) for i in ["C06", "C07", "C37"]), "効果の値ではない。進め方を参考にする"],
         ["算定方法の記載なし", "公表はあるが、測り方と内訳が不明", short("C24"), "参考値にとどめる"],
     ],
     "foot": "数字の性質は、原文の記載をもとに当社が分類したものです。" + FOOT},
    {"type": "table", "eyebrow": "使い方の全体像", "caption": "何に使われているか",
     "title_html": "使い方は<b>会議・検索・文書</b>から始まり、エージェントへ広がる",
     "lead": "多くの組織が、毎日発生する作業から使い始めています。代表的な使い方を6つに分けました。",
     "header": ["使い方", "具体例", "主な事例"], "cols": [150, 560, 0], "dense": "mid",
     "rows": [
         ["会議", "欠席した会議の把握、昼の会議の要約を夜勤で確認、議事メモのたたき台", "デンソー、東京建物、KPMG Canada"],
         ["検索・理解", "業務マニュアルの理解、社内情報の収集、過去の設計情報の探索", "JAF、JCB、デンソー"],
         ["文書・メール", "長いメールの要約、報告書の初稿、契約書の要約とレビュー", "住友商事、British Heart Foundation、Vodafone"],
         ["資料・データ", "提案書の下書き、プレゼン準備、Excelの数式修正、決算書の分析", "Grant Thornton Australia、住友商事"],
         ["調査", "レポート作成や市場分析の依頼を、リサーチツールで処理", "INPEX"],
         ["エージェント", "規程の照会やマニュアル検索を、現場や各部署が自ら作成", "東京建物、INPEX、Capita"],
     ], "foot": "分類は原文の記載をもとに当社が整理したものです。Agent BuilderやCopilot Studioなど、製品が分かれる使い方を含みます。"},
    {"type": "cards", "eyebrow": "共通する進め方", "caption": "定着した組織の共通点",
     "title_html": "定着に向けて、多くの組織が取り組む<b>3つのこと</b>",
     "lead": "配って終わりにせず、順番を決めて広げています。公開事例から読み取れる共通点です（当社の整理）。",
     "cards": [
         {"illus": "assets/illus/step-small.webp", "title": "少人数で試して広げる", "desc": "最初から全員に配らず、試行の結果を見て次の人数を決めています。<span class=\"ex\">デンソー：300人から3段階<br>JCB：全部署に配分してPoC<br>JAF：約20人の試験導入から</span>"},
         {"illus": "assets/illus/step-learn.webp", "title": "学ぶ場と共有の場を作る", "desc": "自社の業務を題材に学び、社内で使い方を共有しています。<span class=\"ex\">JAF：パイロット養成講習<br>JCB：動画と小テスト、週次Tips<br>University of Manchester：今週のプロンプト</span>"},
         {"illus": "assets/illus/step-measure.webp", "title": "測って経営に報告する", "desc": "利用状況と効果を定期的に確認し、次の判断に使っています。<span class=\"ex\">デンソー：3カ月に1回の本部長会議<br>KPMG Canada：利用状況を毎週追跡<br>Grant Thornton Australia：時点を分けて計測</span>"},
     ]},
    {"type": "numcards", "tall": True, "eyebrow": "段階的な展開", "caption": "人数を段階的に広げた例",
     "title_html": "最初は数十〜数百人。<b>試行の結果を見て</b>次の人数を決める",
     "lead": "3組織の展開の段階です。",
     "items": [
         {"name": "デンソー", "action": "300人の先行利用から本社へ", "pre": "", "value": "3", "unit": "段階で展開", "bars": [{"l": "先行", "v": 300, "t": "300"}, {"l": "第2", "v": 6000, "t": "6,000"}, {"l": "本格", "v": 30000, "t": "30,000"}], "note": "単位は人です。30,000人は2024年7月に本格導入を決断した対象です"},
         {"name": "KPMG Canada", "action": "早期試行から全従業員へ", "pre": "", "value": "3", "unit": "段階で展開", "bars": [{"l": "試行", "v": 40, "t": "40"}, {"l": "拡大", "v": 1000, "t": "1,000"}, {"l": "全員", "v": 12000, "t": "12,000"}], "note": "試行の40はライセンス数、他は人数です。時間削減の数値は未公表です"},
         {"name": "JCB", "action": "PoCの結果をもとに拡大", "pre": "", "value": "2", "unit": "段階で拡大", "bars": [{"l": "PoC", "v": 440, "t": "440"}, {"l": "拡大", "v": 1600, "t": "1,600"}], "note": "単位はライセンスです"},
     ], "foot": FOOT},
    {"type": "chapter", "no": "01", "title": "国内の事例", "desc": "6件の取り組みと、公表された数字", "caption": "章扉 国内の事例"},
    caselist(JP, "国内の事例", "国内は<b>試行から全社へ</b>広げた事例が中心", "数字の性質を左から2列目に示しています。数字どうしは比較できません。"),
    *[case(i) for i in JP],
    {"type": "chapter", "no": "02", "title": "海外の事例", "desc": "8件の取り組みと、公表された数字", "caption": "章扉 海外の事例"},
    caselist(INTL, "海外の事例", "海外は<b>部門別の効果</b>や<b>経営層の率先</b>に学ぶ", "数字の性質を左から2列目に示しています。数字どうしは比較できません。"),
    *[case(i) for i in INTL],
    {"type": "chapter", "no": "03", "title": "公的機関の検証", "desc": "英国の4機関が公開した評価と、その限界", "caption": "章扉 公的機関の検証"},
    caselist(GOV, "公的機関の検証", "評価の方法と<b>うまくいかなかった点</b>まで公開されている", "英国の政府機関は、調査の方法や限界を詳しく公表しています。効果の測り方を考える材料になります。"),
    *[case(i) for i in GOV],
    {"type": "table", "eyebrow": "公的機関の検証", "caption": "4機関の比較",
     "title_html": "同じ製品でも、<b>測り方が違えば数字も違う</b>",
     "lead": "4機関は対象も方法も異なるため、数字の大小では比べられません。方法の違いを見るための表です。",
     "header": ["機関", "対象", "測り方", "公表された数字", "注意点"], "cols": [150, 220, 280, 190, 0], "dense": "mid",
     "rows": [
         ["英国政府", "12組織・2万人（3か月）", "アンケート7,115件。無作為割当・対照群の記載なし", "26分/日（自己申告）", "DWP・HMRCを含むため合算不可"],
         ["HMRC", "3,000件を無作為割当", "1,364人の調査。申告値を約20%減額", "約60分/週（週の2-3%）", "比較群の結果とタスク演習は未掲載"],
         ["DWP", "本部職員3,549人（6か月）", "未付与の比較群と回帰分析", "19分/日（AI関心を統制しないと10〜12分）", "非無作為・事前基準なし"],
         ["NHS England", "90組織・3万人超", "算出方法の記載なし", "43分/人・日（削減可能量）", "実績の確定値ではない"],
     ], "band": "効果を社内で示すなら、<b>導入前の測定</b>、<b>未利用者との比較</b>、<b>確認にかかった時間</b>の3つを最初から設計しておくことが重要です。",
     "foot": "DWP：回帰推定の値。出典は各機関のページに記載しています。数値は各機関の公表値であり、当社による測定値ではありません。"},
    {"type": "steps", "eyebrow": "自社で始めるには", "caption": "中堅企業の進め方",
     "title_html": "18件から学ぶ、<b>4つのステップ</b>",
     "steps": [
         {"title": "対象の業務と基準を決める", "desc": "会議・検索・文書から選び、<b>導入前の時間</b>と利用条件を決める", "side": "JCB、DWP"},
         {"title": "少人数で試す", "desc": "部署や職種を混ぜて配り、<b>自社の業務</b>で使い方を確かめる", "side": "JCB、British Heart Foundation"},
         {"title": "学ぶ場と共有の場を作る", "desc": "全員に基礎を学んでもらい、推進役が社内の事例を広げる", "side": "JAF、住友商事"},
         {"title": "測って報告し、次の人数を決める", "desc": "利用率と削減時間を定期的に報告し、確認の手間も含めて判断する", "side": "デンソー、KPMG Canada"},
     ], "band": "ステップの整理は当社の見解です。右列は参考になる事例を示しています。"},
    {"type": "formula", "eyebrow": "効果の測り方", "caption": "効果の測り方",
     "title_html": "申告だけで終えず、<b>確認の時間まで含めて</b>測る",
     "lead": "下の数字はすべて、計算の仕方を示すための仮の数字です。",
     "formula": [{"label": "対象の人数", "value": "30", "unit": "人"}, {"op": "×"}, {"op": "（"}, {"label": "導入前の作業", "value": "10", "unit": "時間／月"}, {"op": "−"}, {"label": "導入後の作業", "value": "7", "unit": "時間／月"}, {"op": "）"}, {"op": "="}, {"label": "削減工数", "value": "90", "unit": "時間／月", "total": True}],
     "bars_title": "導入後の時間には、確認と修正も含める",
     "bars": [{"label": "導入前", "parts": [{"v": 10, "t": "人が作業 10時間", "tone": "gr"}]}, {"label": "導入後", "parts": [{"v": 4, "t": "作業 4時間", "tone": "bl"}, {"v": 2, "t": "確認", "tone": "am"}, {"v": 1, "t": "修正", "tone": "am2"}]}],
     "bars_note": "DWPの評価では、確認作業で時間の削減が相殺された例が報告されています。",
     "metrics": [{"icon": "people", "title": "利用率", "desc": "付与した人のうち、毎月使っている人の割合を見ます。"}, {"icon": "check", "title": "比較", "desc": "可能なら未利用の人にも同じ調査をして、差を見ます。"}, {"icon": "trend", "title": "時間の使い道", "desc": "減った時間を何に使ったかも確認します。"}]},
    {"type": "cta", "caption": "ご相談", "title_html": "どの業務から始めるか、<b>一緒に整理</b>します。",
     "lead": "バイテック法人AI研修では、Microsoft 365 Copilotの業務活用から、Copilot Studioによるエージェントの内製までを研修でご支援します。",
     "cards": [
         {"icon": "chat", "title": "Copilot研修", "desc": "会議・メール・資料作成など、<b>日々の業務での使い方</b>を実際の操作に沿って学びます。"},
         {"icon": "target", "title": "Copilot Studio研修", "desc": "社内データやPower Automateと連携する<b>エージェントの構築と運用</b>を学びます。"},
         {"icon": "yen", "title": "助成金の活用サポート", "desc": "人材開発支援助成金の対象となる研修の設計と、必要な情報をご案内します。<span class=\"ex\">支給の可否は管轄労働局の審査で決まります</span>"},
     ], "cta_title": "まずは無料個別相談で、自社の課題をお聞かせください", "cta_desc": "オンライン・約60分。どの業務から始めるか、研修内容と助成金の見込みまでご案内します。"},
    {"type": "notes", "items": [
        "掲載事例の数値は各組織の公表値であり、当社による測定値ではありません。測定の条件が異なるため、数字どうしの比較や合算はできません。",
        "「中堅企業が取り入れるなら」、数字の性質の分類、共通点、ステップの整理は当社の見解です。効果を保証するものではありません。",
        "掲載組織との取引関係や、各組織による推薦を示すものではありません。出典は各事例のページに記載しています。2026年10月に確認しました。",
        "製品の機能や名称は記事の公開時点のものです。契約やテナントの設定によって異なり、変更される場合があります。",
        "社名・製品名は各社の商標または登録商標です。本資料はMicrosoftの公式資料ではありません。本資料の内容の無断転載・再配布はご遠慮ください。　発行：バイテック法人AI研修（2026年10月版）",
    ]},
]

spec = {
    "title": "Copilot活用事例集", "subtitle": "Microsoft 365 Copilotの公開事例18件を、数字の根拠とあわせて読む", "edition": "2026年10月版",
    "book": {"layout": "stat", "colors": ["#0a4f54", "#0f8078", "#e3f4f0"], "tag": "製品別 活用事例集", "name": "Copilot", "ttl": "活用事例集", "illus": "assets/illus/cover-teal.webp",
             "pre": "公開事例", "count": str(TOTAL), "unit": "件", "segments": [{"label": "国内", "n": len(JP)}, {"label": "海外", "n": len(INTL)}, {"label": "英国の公的機関", "n": len(GOV)}], "foot": "公開情報ベース・出典明記"},
    "cover_sub": "Microsoft 365 Copilotの公開事例を、数字の根拠とあわせて読む",
    "cover_pills": ["公開事例18件", "数字の読み方つき", "英国4機関の検証"],
    "cover_theme": "pan teal", "cover_illus": "assets/illus/cover-teal.webp",
    "cover_title_html": "Copilot<br>活用事例集",
    "book_title_html": "<b>Copilot</b><br>活用事例集", "category_label": "製品別 事例集", "book_pills": ["公開事例18件", "数字の読み方つき"],
    "slides": slides,
}
assert TOTAL == 18
json.dump(spec, open(f"{HERE}/spec.json", "w"), ensure_ascii=False, indent=1)
