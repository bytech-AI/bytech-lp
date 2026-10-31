#!/usr/bin/env python3
"""横断ガイド3本（ebook-35〜37）の spec.json を生成する。
使い方: python3 scripts/build-guide-spec.py ebook-35"""
import json
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "docs" / "ebooks"
COLORS = ["#6e1a44", "#b83a76", "#fbe9f1"]
CTA_LEAD = "バイテック法人AI研修では、Copilotの業務活用から、Copilot Studioによるエージェントの内製、Power Automateによる業務の自動化までを研修でご支援します。"
LEGAL = "社名・製品名は各社の商標または登録商標です。本資料はMicrosoftの公式資料ではありません。本資料の内容の無断転載・再配布はご遠慮ください。　発行：バイテック法人AI研修（2026年10月版）"
RENAME = "Microsoft 365 Copilotは現在、Microsoft Copilotに改称されています。公開事例や一部の公式資料には旧称が残っています。"


def cta():
    return {"type": "cta", "caption": "ご相談", "title_html": "どの業務から始めるか、<b>一緒に整理</b>します。", "lead": CTA_LEAD, "cards": [{"icon": "chat", "title": "Copilot研修", "desc": "会議・メール・資料作成など、<b>日々の業務での使い方</b>を実際の操作に沿って学びます。"}, {"icon": "target", "title": "Copilot Studio研修", "desc": "社内データやPower Automateと連携する<b>エージェントの構築と運用</b>を学びます。"}, {"icon": "yen", "title": "助成金の活用サポート", "desc": '人材開発支援助成金の対象となる研修の設計と、必要な情報をご案内します。<span class="ex">支給の可否は管轄労働局の審査で決まります</span>'}], "cta_title": "まずは無料個別相談で、自社の課題をお聞かせください", "cta_desc": "オンライン・約60分。どの業務から始めるか、研修内容と助成金の見込みまでご案内します。"}


FORMULA = {"type": "formula", "formula": [{"label": "実行件数", "value": "30", "unit": "件／月"}, {"op": "×"}, {"op": "（"}, {"label": "導入前の手作業", "value": "60", "unit": "分／件"}, {"op": "−"}, {"label": "導入後の手作業", "value": "20", "unit": "分／件"}, {"op": "）"}, {"op": "−"}, {"label": "保守・学習", "value": "3", "unit": "時間／月"}, {"op": "="}, {"label": "実現した削減工数", "value": "17", "unit": "時間／月", "total": True}], "bars_title": "導入後の時間には、確認と修正も含める", "bars": [{"label": "導入前", "parts": [{"v": 60, "t": "人が作成 60分", "tone": "gr"}]}, {"label": "導入後", "parts": [{"v": 5, "t": "指示", "tone": "bl"}, {"v": 10, "t": "確認", "tone": "am"}, {"v": 5, "t": "修正", "tone": "am2"}]}], "bars_note": "導入後の20分は、AIへの指示5分、確認10分、修正5分の例です。待ち時間の短縮とは分けて記録します。", "metrics": [{"icon": "people", "title": "利用・定着", "desc": "対象者のうち、実務で使っている人の割合を見ます。利用回数だけでは改善を説明できません。"}, {"icon": "check", "title": "品質", "desc": "誤登録、手戻り、差し戻しの数を見ます。時間が減っても、訂正が増えていないかを確認します。"}, {"icon": "trend", "title": "再配分した成果", "desc": "短縮した時間を何に使ったかを見ます。業務の結果まで記録します。"}]}

PICKS = [
    ("ebook-23", "01", "議事メモ・会議引継ぎ"), ("ebook-23", "03", "メール要約・初稿"),
    ("ebook-23", "09", "受付・承認・督促"), ("ebook-23", "06", "部門FAQ・規程検索"),
    ("ebook-22", "04", "提案書レビュー"), ("ebook-26", "02", "請求書の受付・照合"),
    ("ebook-25", "03", "入社・研修手続"), ("ebook-29", "04", "現場進捗報告"),
]


def guide35(here):
    ideas = []
    (here / "assets/illus").mkdir(parents=True, exist_ok=True)
    for i, (slug, no, label) in enumerate(PICKS, 1):
        src = json.load(open(ROOT / slug / "spec.json"))
        idea = next(x for x in src["slides"] if x["type"] == "idea" and x["no"] == no)
        pick = dict(idea, no=f"{i:02d}", eyebrow="最初に選ぶ業務", illus=f"assets/illus/pick{i:02d}.webp")
        shutil.copy(ROOT / slug / idea["illus"], here / pick["illus"])
        ideas.append(pick)
    head = [
        {"type": "steps", "eyebrow": "進め方の全体像", "caption": "4つの段階", "title_html": "導入は<b>4つの段階</b>で進める", "steps": [{"title": "業務を選ぶ", "desc": "件数、手作業の時間、待ち時間、不備を記録し、標準化できる部分を選ぶ", "side": "業務担当・業務責任者"}, {"title": "小さく試す", "desc": "限定した業務と利用者で試し、正解と失敗例を確認する", "side": "業務担当・IT"}, {"title": "業務をつなぐ", "desc": "Copilot Studio、帳票のAI、基幹連携を足し、例外・権限・監視を運用する", "side": "業務責任者・IT・管理者"}, {"title": "横展開する", "desc": "フロー、知識、研修の共通部分を再利用し、部門ごとの効果を確認する", "side": "現場推進者・IT・管理者"}], "band": "右列は主な担当です。段階の整理は当社の見解で、自社の契約、業務量、データの状態に合わせて見直してください。"},
        {"type": "table", "eyebrow": "進め方の全体像", "caption": "次の段階へ進む判断", "title_html": "<b>進む判断</b>を先に決めておく", "lead": "各段階の対象と、次へ進んでよいと判断する条件です。", "header": ["段階", "対象", "すること", "進む判断"], "cols": [140, 200, 430, 0], "dense": "mid", "rows": [["業務を選ぶ", "反復する作業", "件数、手作業の時間、待ち時間、不備を記録する", "効果と元の作業量を説明できる"], ["小さく試す", "限定した業務・利用者", "既存のMicrosoft 365、Copilot、標準のフローで試す", "確認と修正を含めても便益があり、品質も満たす"], ["業務をつなぐ", "部門の標準プロセス", "Copilot Studio、帳票のAI、基幹APIを足す", "未処理や手戻りを追跡でき、運用担当が決まる"], ["横展開する", "他部門・拠点", "共通部分を再利用し、部門ごとの効果を確認する", "利用が定着し、保守と費用を含めた効果が続く"]]},
        {"type": "cards", "eyebrow": "業務の選び方", "caption": "業務の選び方", "title_html": "最初の業務を選ぶ<b>3つの基準</b>", "lead": "8つの業務に共通する基準です。自社の業務を当てはめて、候補を絞ります。", "cards": [{"illus": "assets/illus/step-small.webp", "title": "何度も繰り返す", "desc": '部門を問わず、毎週のように発生する作業から選びます。<span class="ex">例：議事メモ、メールの要約</span>'}, {"illus": "assets/illus/step-learn.webp", "title": "手順や基準が決まっている", "desc": '確認の観点や承認の規則を、言葉にできる業務を選びます。<span class="ex">例：受付・承認、提案書のレビュー</span>'}, {"illus": "assets/illus/step-measure.webp", "title": "資料の範囲を絞れる", "desc": '読ませる資料が決まっていて、結果を確かめやすい業務を選びます。<span class="ex">例：部門のFAQ、規程の検索</span>'}]},
        {"type": "table", "eyebrow": "業務の選び方", "caption": "先に検討する8業務", "title_html": "先に検討したい<b>8つの業務</b>", "lead": "選ぶ理由、必要な準備、検証する指標を一覧にしました。", "header": ["業務", "選ぶ理由", "必要な準備", "検証する指標"], "cols": [190, 400, 320, 0], "dense": True, "rows": [["議事メモ・会議引継ぎ", "標準機能で始めやすく、部門を問わず繰り返す", "文字起こし、関連資料、共有のルール", "完成までの時間、修正率"], ["メール要約・初稿", "読む・書く仕事の頻度が高い", "メール、文書、テンプレート", "読解・返信の時間、書き直し"], ["受付・承認・督促", "手順が明確で、転記や確認をまとめて改善できる", "申請、対象者、承認の規則", "処理日数、転記の時間、不備"], ["部門FAQ・規程検索", "問い合わせの内容と回答の文書を絞れる", "最新のFAQ・規程、引用元", "自己解決率、有人対応の工数"], ["提案書レビュー", "確認の観点を再利用できる", "提案書、評価基準、実績", "レビューの時間、差し戻し率"], ["請求書の受付・照合", "件数が多い組織では手作業が大きい", "帳票、契約、取引先マスタ", "入力の時間、精度、例外率"], ["入社・研修手続", "複数の部署への依頼をまとめられる", "人事の確定情報、タスク", "準備の完了率、運営の時間"], ["現場進捗報告", "現場の入力から転記・共有までを省ける", "工程、場所、担当、現場の端末", "集計の時間、更新の遅れ"]], "foot": "8業務は当社の調査による候補で、効果を保証するものではありません。"},
    ]
    tail = [
        dict(FORMULA, eyebrow="効果の測り方", caption="効果の測り方", title_html="「作る時間」ではなく、<b>完成して使えるまで</b>の時間を測る", lead="下の数字はすべて、計算の仕方を示すための仮の数字です。"),
        {"type": "checklist", "eyebrow": "始める前の確認", "caption": "始める前の確認", "title_html": "試す前にそろえたい<b>15項目</b>", "groups": [{"title": "業務", "items": ["対象の業務を1つに絞った", "月の件数と手作業の時間を記録した", "業務の責任者を決めた", "正解の例と失敗の例を集めた", "進む判断の条件を決めた"]}, {"title": "データ・権限", "items": ["読ませる資料の最新版を確認した", "資料の責任者と更新の手順を決めた", "SharePointなどの過剰な共有を見直した", "入力してよい情報の範囲を決めた", "出力を人が確認する手順を決めた"]}, {"title": "契約・運用", "items": ["自社の契約で使える機能を確認した", "利用者を決めて研修を用意した", "フローやエージェントの所有者を決めた", "副担当と変更の手順を決めた", "効果を記録する形式を決めた"]}]},
    ]
    chapter = {"type": "chapter", "no": "03", "title": "最初に選ぶ8業務", "desc": "使い方、流れ、確認すること", "caption": "章扉 最初に選ぶ8業務"}
    slides = [*head, chapter, *ideas, *tail, cta(), {"type": "notes", "items": ["活用アイデアは当社の設計案で、導入実績ではありません。掲載の公開事例は近い領域の参考で、同じ機能の導入を示すものではありません。", "効果の数字は計算の仕方を示す仮の数字です。効果を保証するものではありません。", "製品の機能や条件は2026年10月時点の公式資料にもとづきます。契約やテナントの設定によって異なります。" + RENAME, "難易度や段階は相対的な目安です。自社の契約、業務量、データの状態に合わせて見直してください。", LEGAL]}]
    toc = [{"title": "進め方の全体像", "desc": "4つの段階と、次へ進む判断", "pages": "P.2 - 3"}, {"title": "業務の選び方", "desc": "3つの基準と8つの業務", "pages": "P.4 - 5"}, {"title": "最初に選ぶ8業務", "desc": "使い方、流れ、確認すること", "pages": "P.6 - 14"}, {"title": "効果の測り方と事前確認", "desc": "計算の仕方と15項目", "pages": "P.15 - 16"}]
    return {
        "title": "Copilot導入の進め方と最初に選ぶ業務8選", "subtitle": "どの業務から、どの順番で始めるかを整理する", "edition": "2026年10月版",
        "book": {"layout": "stat", "colors": COLORS, "tag": "Copilot導入ガイド", "name": "Copilot導入", "ttl": "進め方と業務8選", "illus": "assets/illus/cover-book.webp", "pre": "最初に選ぶ業務", "count": "8", "unit": "選", "segments": [{"text": "4つの段階"}, {"text": "進む判断"}, {"text": "事前確認15項目"}], "foot": "活用アイデアは当社の設計案"},
        "cover_sub": "どの業務から、どの順番で始めるかを整理する", "cover_pills": ["導入の4段階", "最初に選ぶ8業務", "事前確認15項目"], "cover_theme": "pan rose", "cover_illus": "assets/illus/cover-book.webp",
        "cover_title_html": '<small style="margin:-8px 0 0;line-height:1.15;font-size:32px">Copilot導入の進め方と</small>最初に選ぶ<br>業務8選', "book_title_html": "<b>Copilot導入</b>の<br>進め方", "category_label": "Copilot導入ガイド", "book_pills": ["導入の4段階", "最初に選ぶ8業務"],
        "slides": [{"type": "toc", "items": toc, "foot": "活用アイデアは当社の設計案で、導入実績ではありません。"}, *slides],
    }


def lic_table(here, themes, eyebrow, title, lead, extra=None):
    all_rows = {r["theme"]: r for r in json.load(open(here / "license.json"))}
    edits = extra or {}
    rows, urls = [], []
    for t in themes:
        r = all_rows[t]
        rows.append([r["theme"].replace("（旧Microsoft 365 Copilot）", "").replace("M365", "Microsoft 365"), edits.get(t, {}).get("can", r["can"]), edits.get(t, {}).get("check", r["check"]), edits.get(t, {}).get("note", r["note"]).replace("M365", "Microsoft 365")])
        if "learn.microsoft.com" in r["url"] and r["url"] not in urls:
            urls.append(r["url"])
    foot = "出典：Microsoft Learn（2026年10月に確認）" + "、".join(u.replace("https://learn.microsoft.com/en-us", "") for u in urls)
    return {"type": "table", "eyebrow": eyebrow, "caption": eyebrow, "title_html": title, "lead": lead, "header": ["確認する項目", "できること", "導入時に確認すること", "判断の補足"], "cols": [170, 290, 340, 0], "dense": "mid", "rows": rows, "foot": foot}


def guide36(here):
    stack = {"type": "stack", "eyebrow": "製品の役割", "caption": "4つの製品の関係", "title_html": "<b>Microsoft 365を土台</b>に、3つの製品を役割で使い分ける", "lead": "それぞれ得意な作業が違います。名称はMicrosoft 365 CopilotからMicrosoft Copilotに変わっています。", "ex_label": "例えば", "pillars": [{"icon": "chat", "role": "個人の作業を速くする", "title": "Microsoft Copilot", "desc": "<b>読む・探す・書く・会議を追う</b>。メールやファイルをまたいで整理します。", "example": "議事録、文書の初稿、メール、社内情報の検索", "illus": "assets/illus/product-copilot.webp"}, {"icon": "target", "role": "チームの判断をそろえる", "title": "Copilot Studio", "desc": "<b>独自の業務エージェント</b>を作ります。知識と業務の手順を組み合わせます。", "example": "FAQ、制度の照会、知識検索、処理の対話窓口", "illus": "assets/illus/product-studio.webp"}, {"icon": "gear", "role": "決まった手順を動かす", "title": "Power Automate", "desc": "<b>登録・通知・承認・転記</b>を実行します。標準連携から基幹連携まで広げられます。", "example": "申請、督促、帳票、ERP連携、RPA", "illus": "assets/illus/product-automate.webp"}], "base": {"icon": "people", "role": "資料と台帳を置く土台", "title": "Microsoft 365", "desc": "<b>Teams、SharePoint、Lists、Forms、Bookings</b>などで、入力・共有・共同編集・予約を行います。資料の置き場所と権限を整えることが、上の3つを使う前提になります。"}}
    choose = {"type": "table", "eyebrow": "製品の選び方", "caption": "製品の選び方", "title_html": "<b>やりたいこと</b>から製品を選ぶ", "lead": "まず既存の契約で試せる範囲を確かめ、足りない部分だけ次の製品へ進みます。", "header": ["製品", "主な使い方", "着手する業務", "考え方"], "cols": [230, 260, 320, 0], "dense": "mid", "rows": [["Microsoft 365", "入力・共有・共同編集・予約", "入力フォーム、共同台帳、拠点連絡、予約", "最初に既存契約の機能とアクセスを確認する"], ["Microsoft Copilot", "読む・探す・書く・会議を追う", "議事録、文書の初稿、メール、社内情報の検索", "対象データ、利用者、出力の確認を明確にする"], ["Copilot Studio", "独自の業務エージェントを作る", "FAQ、制度の照会、知識検索、処理の対話窓口", "知識の整備、認証、有人への経路、課金を確認する"], ["Power Automate", "登録・通知・承認・転記を実行する", "申請、督促、帳票、ERP連携、RPA", "標準連携から、基幹・AI・無人RPAへ段階的に広げる"]]}
    copilot = lic_table(here, ["M365の既存機能", "Copilot Chatの区分", "Microsoft Copilot（旧Microsoft 365 Copilot）", "簡易知識エージェント"], "Copilotの確認事項", "<b>Copilot</b>は3つの区分を分けて確認する", "Copilot Chat、Basic、有償の区分で、使える範囲が変わります。", {"Microsoft Copilot（旧Microsoft 365 Copilot）": {"check": "追加ライセンス、前提のMicrosoft 365契約、300人以下はBusiness版、利用ポリシー", "note": "E7プランには同梱。デバイス単位のライセンスは対象外。事例では当時の製品名を残す場合がある。"}, "Copilot Chatの区分": {"check": "Copilot Chat（Basic）、Microsoft 365 Copilot（Basic）、有償の別。テナント設定、対象データ"}, "簡易知識エージェント": {"note": "簡易機能で足りるなら、Copilot Studioを使わない選択もある。"}})
    studio = lic_table(here, ["Copilot Studio", "Studioの利用料金", "Studio試用版", "Studioとフローの接続"], "Copilot Studioの確認事項", "<b>Copilot Studio</b>は実行方式で機能と課金が変わる", "作る時の権限と、公開して使う時の条件を分けて確認します。", {"Copilot Studio": {"check": "作成者の権限、環境、実行方式、接続、公開先、実行者のID"}})
    pa = lic_table(here, ["Power Automate標準連携", "Premium・基幹連携", "有人・無人RPA", "AI Builder・文書処理"], "Power Automateの確認事項", "<b>Power Automate</b>はコネクタとトリガーで条件が変わる", "標準連携の範囲か、Premiumや追加容量が必要かを確認します。", {"AI Builder・文書処理": {"note": "2026年11月1日以降の新規・更新ライセンスに付属クレジットなし。Premiumの要否は公式の2ページで記載が異なるため、契約前に要確認。"}, "有人・無人RPA": {"note": "個人のWindowsでの試行と、共有・クラウド起動・無人運用の権利は別。画面変更の保守負担も見積もる（当社の助言）。"}})
    data = lic_table(here, ["知識の鮮度と構造", "組織データのアクセス", "外部顧客・Web公開"], "データの確認事項", "回答の質は<b>資料と権限</b>で決まる", "製品の設定より先に、読ませる資料と見せる範囲を整えます。")
    ops = lic_table(here, ["取引を伴う操作", "運用の継続", "本番前の評価"], "運用の確認事項", "公開後も<b>止まらない体制</b>を決めておく", "担当者の退職や画面の変更でも止まらないように、所有者と手順を決めます。", {"運用の継続": {"note": "公式では、所有者のいないフローは対応しないと14日で停止する。所有者の退職、資格情報の失効、容量の超過を監視する。"}})
    check = {"type": "checklist", "eyebrow": "契約前の確認", "caption": "契約前の確認", "title_html": "契約前に確かめる<b>15項目</b>", "groups": [{"title": "契約", "items": ["現在のMicrosoft 365プランを確認した", "Teamsを含む契約かを確認した", "Copilotの対象人数と版を決めた", "現場・外部利用者の条件を確認した", "Premiumの要否を確認した"]}, {"title": "製品の条件", "items": ["コネクタの標準／Premiumを確認した", "トリガーと所有者・実行者を確認した", "Copilot Studioの実行方式を決めた", "課金の単位と想定の利用量を出した", "試用版と本番の条件の差を確認した"]}, {"title": "データ・運用", "items": ["過剰な共有を見直した", "読ませる資料の責任者を決めた", "所有者と副担当を決めた", "接続、ログ、利用量の確認担当を決めた", "公開前に試す質問と例外を用意した"]}]}
    toc = [{"title": "製品の役割と選び方", "desc": "4つの製品の関係", "pages": "P.2 - 3"}, {"title": "製品ごとの確認事項", "desc": "Copilot、Copilot Studio、Power Automate", "pages": "P.4 - 6"}, {"title": "データと運用", "desc": "資料、権限、体制", "pages": "P.7 - 8"}, {"title": "契約前の確認", "desc": "確かめる15項目", "pages": "P.9"}]
    notes = {"type": "notes", "items": ["2026年10月に確認した公式資料をもとに整理しました。機能やライセンスは、利用チャネル、実行主体、契約、テナントの設定で異なり、変更される場合があります。", "価格は記載していません。契約の判断は、Microsoftまたは販売代理店の最新の案内をご確認ください。", RENAME, "AI Builderを含むフローのPremiumの要否は、公式資料の間で記載が異なるため、本資料では断定していません。", "知識の設計、取引を伴う操作、運用の継続、RPAの保守に関する補足は、公式の記載ではなく当社の助言です。", LEGAL]}
    return {
        "title": "製品の使い分けとライセンス確認ガイド", "subtitle": "Copilot・Copilot Studio・Power Automateの選び方と、契約前に確かめること", "edition": "2026年10月版",
        "book": {"layout": "stat", "colors": COLORS, "tag": "Copilot導入ガイド", "name": "製品の使い分け", "ttl": "ライセンス確認ガイド", "illus": "assets/illus/cover-book.webp", "pre": "契約前の確認", "count": "15", "unit": "項目", "segments": [{"text": "製品の選び方"}, {"text": "課金の確認点"}, {"text": "2026年10月時点"}], "foot": "公式資料ベース・価格は記載なし"},
        "cover_sub": "Copilot・Copilot Studio・Power Automateの選び方", "cover_pills": ["製品の選び方", "ライセンスの確認点", "契約前の15項目"], "cover_theme": "pan rose", "cover_illus": "assets/illus/cover-book.webp",
        "cover_title_html": '<small style="margin:-8px 0 0;line-height:1.15;font-size:32px">製品の使い分けと</small>ライセンス<br>確認ガイド', "book_title_html": "<b>製品の使い分け</b>と<br>ライセンス確認", "category_label": "Copilot導入ガイド", "book_pills": ["製品の選び方", "契約前の15項目"],
        "slides": [{"type": "toc", "items": toc, "foot": "2026年10月時点の公式資料をもとに整理しました。価格は記載していません。"}, stack, choose, copilot, studio, pa, data, ops, check, cta(), notes],
    }


def guide37(here):
    src = "公開された評価資料の値です。測定の条件が違うため、数字どうしの比較や合算はできません。"
    evals = {"type": "table", "eyebrow": "公開された評価", "caption": "5つの評価資料", "title_html": "公開された<b>5つの評価</b>を見比べる", "lead": "同じCopilotの評価でも、対象と測り方が違います。数字だけを並べて比較はできません。", "header": ["評価資料", "対象・期間", "公表された結果", "測り方", "読むときの注意"], "cols": [160, 240, 220, 290, 0], "dense": "mid", "rows": [["Microsoft Research", "56社・6,000人超、6か月", "メール読解が週約30分短縮、文書の完成が12%速い", "実環境の無作為実験。定期利用は約40%", "ベンダー自身の研究。公開ページの要旨で確認"], ["英国政府（GDS）", "12組織2万人、2024年9〜12月", "平均26分／日", "7,115件の自己申告。区分回答の中間点で算出", "無作為割当の記載なし。17%は明確な削減なし"], ["英国HMRC", "3,000件を無作為割当、調査1,364人", "約60分／週（労働時間の2〜3%）", "自己申告を約20%減額した推定", "未利用者を含む比較結果は掲載なし"], ["英国DWP", "本部職員3,549人、2024年10月〜2025年3月", "19分／日（回帰推定）", "利用者1,716件と比較群2,535件を比較", "非無作為・事前基準なし。AI関心を統制しないと10〜12分"], ["NHS England", "90組織・3万人超", "43分／日の削減可能量", "算出方法の記載なし", "実績の確定値ではない。全面展開は見込み"]], "foot": src + "NBERの論文（66社7,137人）は値が異なるため混ぜていません。"}
    num = {"type": "numcards", "tall": True, "eyebrow": "数字の読み方", "caption": "平均の裏側", "title_html": "<b>平均の数字</b>の裏側を見る", "lead": "3つの評価の例です。棒の長さは各カードの中でのみ比べてください。", "items": [{"name": "英国DWP", "action": "AIへの関心の統制（なし／あり）", "pre": "1日", "value": "19", "unit": "分（統制後）", "bars": [{"l": "なし", "v": 12, "t": "10〜12分"}, {"l": "あり", "v": 19, "t": "19分"}], "note": "棒は統制なしの上限12分で描いています。どちらも自己申告の回帰推定です"}, {"name": "英国政府（GDS）", "action": "時間の削減を感じた人", "pre": "明確な削減なし", "value": "17", "unit": "%", "bars": [{"l": "全体", "v": 100, "t": "100%"}, {"l": "なし", "v": 17, "t": "17%"}], "note": "平均26分の裏に、削減を感じなかった回答者がいます"}, {"name": "Microsoft Research", "action": "提供された人のうち定期利用", "pre": "約", "value": "40", "unit": "%", "bars": [{"l": "提供", "v": 100, "t": "100%"}, {"l": "定期", "v": 40, "t": "約40%"}], "note": "ライセンスを渡しても全員が使うわけではありません"}], "foot": src}
    cards = {"type": "cards", "eyebrow": "数字の読み方", "caption": "読み取りの3原則", "title_html": "社内で報告するときの<b>3つの原則</b>", "lead": "公開された評価から読み取れることを整理しました（当社の見解）。", "cards": [{"illus": "assets/illus/step-measure.webp", "title": "申告と実測を分ける", "desc": '自己申告の平均だけで判断せず、利用ログや実作業の計測と並べます。<span class="ex">例：HMRCは申告値を約20%減額</span>'}, {"illus": "assets/illus/step-small.webp", "title": "見込みと実績を分ける", "desc": '「できる見込み」は実績と分けて示し、導入後に測った値へ置き換えます。<span class="ex">例：NHSの43分は削減可能量</span>'}, {"illus": "assets/illus/step-learn.webp", "title": "分母をそろえる", "desc": 'ライセンス保有者、対象者、実際の利用者を分けて記録します。<span class="ex">例：定期利用は約40%</span>'}]}
    formula = dict(FORMULA, eyebrow="計算の仕方", caption="削減工数の計算", title_html="「作る時間」ではなく、<b>実際に減った工数</b>を測る", lead="下の数字はすべて、計算の仕方を示すための仮の数字です。")
    head = ["指標", "測り方", "含めるもの", "比較の条件", "評価の注意"]
    cols = [130, 270, 290, 250, 0]
    m1 = [["手作業時間", "同じ種類の業務を導入前後で計測する", "導入後はAI出力の確認、修正、例外処理を含める", "代表的な難易度・量・担当者で比較する", "作成時間だけでなく、完成して使えるまでを測る"], ["実現した削減工数", "実行件数 ×（導入前の手作業 − 導入後の手作業）", "月間の保守・学習の工数を別に引く", "実績の件数と同じ期間の時間を使う", "待ち時間の短縮と作業時間の削減を混ぜない"], ["利用・定着", "対象者のうち実業務で使う人の割合", "ライセンス保有者、対象者、利用者を分ける", "導入直後と習熟後を別に記録する", "利用回数の増加だけでは改善を説明できない"], ["自動完了・自己解決", "人の追加作業なしで完了した割合", "完了の定義、再問い合わせ、例外処理を記録する", "失敗や途中離脱も含める", "会話件数や回答の表示数を解決件数に数えない"]]
    m2 = [["品質", "誤登録、誤回答、手戻り、差し戻しの数・割合", "分母を処理件数にして、重大度も残す", "代表的な質問、難しい例外、権限違いを試す", "時間の短縮で訂正や問い合わせが増えていないか確認する"], ["リードタイム", "受付から完了までの経過時間", "承認待ち、差し戻し、再開までの時間を含める", "同じ案件の種別・受付量で比較する", "待ち時間と担当者の労働時間は別の指標"], ["総費用", "ライセンス、容量、基幹接続、開発、保守、教育の実費", "初期費と月額費を分け、削減金額の内訳を確認する", "自社の契約条件と利用量で試算する", "創出時間の金額換算と、支出が実際に減ることを分ける"], ["再配分した成果", "短縮した時間を何の業務へ振り向けたか", "顧客対応、案件処理、品質改善の結果を記録する", "時間の申告値だけでなく業務の結果を確認する", "同じ時間を複数の施策の成果に重ねて数えない"]]
    t1 = {"type": "table", "eyebrow": "自社で記録する指標", "caption": "指標 1/2", "title_html": "<b>時間と利用</b>を測る4つの指標", "lead": "導入前から同じ形で記録し、前後を比べます。", "header": head, "cols": cols, "dense": "mid", "rows": m1}
    t2 = {"type": "table", "eyebrow": "自社で記録する指標", "caption": "指標 2/2", "title_html": "<b>品質・費用・成果</b>を測る4つの指標", "lead": "時間以外の変化も並べて、効果が本物かを確かめます。", "header": head, "cols": cols, "dense": "mid", "rows": m2}
    tmpl = {"type": "template", "eyebrow": "記録シート", "caption": "記録シート", "title_html": "そのまま使える<b>記録シート</b>", "lead": "［　］内を自社の内容に置き換えてお使いください。", "foot": "記録の項目は一般的な例です。自社の業務に合わせて調整してください。", "articles": [{"title": "1. 導入前の記録", "lines": ["対象業務［　　］／対象者［　　人］／月の件数［　　件］／1件の手作業［　　分］", "待ち時間［　　日］／不備・差し戻し［　　件／月］／記録した期間［　　］"]}, {"title": "2. 試行中の記録", "lines": ["利用者［　　人／対象者　　人］／実業務で使う割合［　　%］／1件の手作業［　　分］", "内訳：指示［　　分］確認［　　分］修正［　　分］／誤り・手戻り［　　件］／例外［　　件］"]}, {"title": "3. 費用の記録", "lines": ["ライセンス［　　］／容量・接続［　　］／開発・保守［　　時間／月］／教育［　　時間］"]}, {"title": "4. 判定", "lines": ["実現した削減工数［　　時間／月］／再配分した業務［　　］／業務の結果［　　］", "判定［続ける・直す・止める］／理由［　　］／次に見直す日［　　］"]}]}
    check = {"type": "checklist", "eyebrow": "報告前の確認", "caption": "報告前の確認", "title_html": "社内へ報告する前の<b>12項目</b>", "groups": [{"title": "測り方", "items": ["導入前の値を測っている", "同じ種類の業務で比べている", "確認と修正の時間を含めている", "申告値か実測かを明記している"]}, {"title": "分母", "items": ["対象者と利用者を分けている", "失敗や途中離脱を含めている", "使わなかった人の理由を聞いている", "見込みと実績を分けている"]}, {"title": "成果", "items": ["待ち時間と工数を分けている", "保守と教育の工数を引いている", "短縮した時間の使い道を記録している", "他の施策と重ねて数えていない"]}]}
    toc = [{"title": "公開された評価", "desc": "5つの資料と数字の読み方", "pages": "P.2 - 4"}, {"title": "計算の仕方", "desc": "実際に減った工数を測る", "pages": "P.5"}, {"title": "自社で記録する指標", "desc": "8つの指標", "pages": "P.6 - 7"}, {"title": "記録シートと報告前の確認", "desc": "そのまま使える形式と12項目", "pages": "P.8 - 9"}]
    notes = {"type": "notes", "items": ["評価資料の数値は各組織の公表値であり、当社による測定値ではありません。測定の条件が違うため、数字どうしの比較や合算はできません。", "Microsoft Researchの結果は公開ページの要旨で確認しました。本文は確認できていません。", "計算例の数字は、計算の仕方を示すための仮の数字です。指標の整理と原則は当社の見解で、効果を保証するものではありません。", RENAME, "出典：Microsoft Research「Early Impacts of M365 Copilot」、GDS「Microsoft 365 Copilot Experiment: Cross-Government Findings Report」、HMRC「Evaluating the Impact of Microsoft Copilot in HMRC」、DWP「An Evaluation of DWP’s Microsoft 365 Copilot Trial」、DHSC「Major NHS AI trial delivers unprecedented time and cost savings」", LEGAL]}
    return {
        "title": "Copilot効果測定ガイド", "subtitle": "公開された評価の読み方と、自社で記録する8つの指標", "edition": "2026年10月版",
        "book": {"layout": "stat", "colors": COLORS, "tag": "Copilot導入ガイド", "name": "Copilot", "ttl": "効果測定ガイド", "illus": "assets/illus/cover-book.webp", "pre": "自社で記録する指標", "count": "8", "unit": "つ", "segments": [{"text": "公開評価5件"}, {"text": "記録シート"}, {"text": "報告前12項目"}], "foot": "公開情報ベース・出典明記"},
        "cover_sub": "公開された評価の読み方と、自社で記録する指標", "cover_pills": ["公開評価5件", "指標8つ", "記録シートつき"], "cover_theme": "pan rose", "cover_illus": "assets/illus/cover-book.webp",
        "cover_title_html": "Copilot<br>効果測定ガイド", "book_title_html": "<b>Copilot</b><br>効果測定ガイド", "category_label": "Copilot導入ガイド", "book_pills": ["公開評価5件", "指標8つ"],
        "slides": [{"type": "toc", "items": toc, "foot": "公開された評価は、原文を2026年10月に確認したものです。"}, evals, num, cards, formula, t1, t2, tmpl, check, cta(), notes],
    }


def main(slug):
    here = ROOT / slug
    spec = {"ebook-35": guide35, "ebook-36": guide36, "ebook-37": guide37}[slug](here)
    json.dump(spec, open(here / "spec.json", "w"), ensure_ascii=False, indent=1)
    print(slug, len(spec["slides"]) + 1, "pages")


main(sys.argv[1])
