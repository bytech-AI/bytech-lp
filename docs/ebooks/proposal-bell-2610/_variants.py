#!/usr/bin/env python3
"""ベル様提案書の A案 deck.html から B案（稟議書形式）・C案（ストーリー型）の deck.html を組み立てる。

  python3 docs/ebooks/proposal-bell-2610/_variants.py
  node scripts/build-ebook.mjs proposal-bell-2610-b && node scripts/build-ebook.mjs proposal-bell-2610-c

A案の各スライドを部品として並べ替え、B/C固有のスライド（稟議サマリー・目的・失敗の構造・解決の考え方・LINEヤフー事例）
はこのファイル内で定義する。A案の共通スライドを直したら、これを再実行して B/C にも反映する。
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
A = (ROOT / "proposal-bell-2610" / "deck.html").read_text(encoding="utf-8")

head, rest = A.split('  <div class="deck">\n', 1)
body, tail = rest.rsplit("\n  </div>\n</body>", 1)
tail = "\n  </div>\n</body>" + tail
parts = re.split(r"(?=    <!-- ===== \d\d )", body)
slides = [p for p in parts if p.strip()]
assert len(slides) == 12, len(slides)
COVER, SUMMARY, S1, S2, S3, S5, S4, S6, S7, S8, S9, S10 = slides


def eyebrow(s, text):
    return re.sub(r'<p class="s-eyebrow">.*?</p>', f'<p class="s-eyebrow">{text}</p>', s, count=1)


def caption(s, text):
    return re.sub(r"<figcaption>.*?</figcaption>", f"<figcaption>{text}</figcaption>", s, count=1)


def marker(s, text):
    return re.sub(r"<!-- ===== .*? ===== -->", f"<!-- ===== {text} ===== -->", s, count=1)


def slide(s, mark, eb, cap):
    return caption(eyebrow(marker(s, mark), eb), cap)


def swap(s, old, new):
    assert s.count(old) == 1, old[:60]
    return s.replace(old, new)


EXTRA_CSS = """
  /* ===== B/C案 固有パーツ（_variants.py が付加） ===== */
  /* 稟議サマリー表 */
  table.rg { width: 100%; border-collapse: separate; border-spacing: 0; margin-top: 16px; table-layout: fixed; }
  .rg td { padding: 15px 18px; border-bottom: 1px solid var(--line); font-size: 14.2px; font-weight: 600; color: #1a2330; line-height: 1.65; vertical-align: top; }
  .rg td:first-child { background: #f2f5fa; color: var(--blue-deep); font-weight: 800; width: 160px; }
  .rg td b { color: var(--blue-bright); font-weight: 800; }
  .rg td small { display: block; font-size: 12.5px; font-weight: 600; color: #6b7789; margin-top: 2px; }
  .rg tr.hi td { background: var(--tint); }
  .rg tr.hi td:first-child { background: var(--blue); color: #fff; }
  /* 目的スライド */
  .obj { margin-top: 22px; background: var(--blue-deep); color: #fff; padding: 36px 40px; }
  .obj .l { font-size: 12.5px; font-weight: 800; letter-spacing: .14em; color: #8fd0ff; }
  .obj .t { font-size: 34px; font-weight: 800; line-height: 1.45; margin-top: 8px; }
  .obj .t b { color: #8fd0ff; }
  .obj .d { font-size: 15.5px; font-weight: 600; color: #c4d2e6; line-height: 1.7; margin-top: 8px; }
  .def { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 22px; }
  .def .c { border: 1px solid var(--line); padding: 26px 24px; }
  .def .c .n { font-size: 11px; font-weight: 800; color: var(--blue-pale); letter-spacing: .12em; }
  .def .c .t { font-size: 18.5px; font-weight: 800; color: #1a2330; line-height: 1.4; margin-top: 6px; }
  .def .c .d { font-size: 14.2px; font-weight: 500; color: #4a5568; line-height: 1.8; margin-top: 10px; }
  .def .c .d b { color: #1a2330; font-weight: 800; }
  /* C案: 失敗の構造（両列とも課題） */
  .vs .col.gy .h { background: var(--blue-deep); }
  .vs .col.gy .row .ic { background: var(--red-tint); color: var(--red); }
  .vs.big { margin-top: 22px; }
  .vs.big .col .h { font-size: 16px; padding: 14px 22px; }
  .vs.big .col .b { padding: 14px 22px 16px; }
  .vs.big .row { padding: 18px 0; }
  .vs.big .row .t { font-size: 17px; }
  .vs.big .row .d { font-size: 14px; line-height: 1.75; margin-top: 6px; }
  /* C案: 解決の考え方 3ステップ */
  .way { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 22px; }
  .way .c { border: 1px solid var(--line); padding: 26px 24px 24px; position: relative; }
  .way .c .n { width: 34px; height: 34px; background: var(--blue); color: #fff; font-size: 14px; font-weight: 800; display: flex; align-items: center; justify-content: center; }
  .way .c .t { font-size: 19px; font-weight: 800; color: #1a2330; line-height: 1.4; margin-top: 12px; }
  .way .c .d { font-size: 14.2px; font-weight: 500; color: #4a5568; line-height: 1.8; margin-top: 10px; }
  .way .c .d b { color: #1a2330; font-weight: 800; }
  .way .c img { position: absolute; right: 20px; top: 18px; height: 76px; width: auto; }
  /* C案: 参考事例（ebook-13 の詳細事例レイアウトを流用） */
  .dhd { display: flex; align-items: flex-start; gap: 18px; margin-top: 12px; }
  .dhd .co { font-size: 25px; font-weight: 800; color: #1a2330; line-height: 1.3; }
  .dhd .co small { display: block; font-size: 14px; font-weight: 700; color: #6b7789; margin-top: 5px; }
  .dhd .tags { margin-left: auto; display: flex; gap: 7px; padding-top: 6px; }
  .dhd .tags span { font-size: 11.5px; font-weight: 800; color: var(--blue); background: var(--tint); border: 1px solid #d5e3f4; border-radius: 999px; padding: 5px 13px; white-space: nowrap; }
  .dt { display: grid; grid-template-columns: 1.18fr 1fr; gap: 20px; margin-top: 14px; align-items: start; }
  .dt .kpi .v { font-size: 26px; }
  .learn { margin-top: 12px; border: 1.5px solid var(--blue); }
  .learn .h { background: var(--blue); color: #fff; font-size: 12.5px; font-weight: 800; padding: 8px 16px; letter-spacing: .02em; }
  .learn .g { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0; }
  .learn .g div { padding: 10px 16px 11px; border-right: 1px solid var(--line); }
  .learn .g div:last-child { border-right: none; }
  .learn .t { font-size: 13.5px; font-weight: 800; color: var(--blue-deep); }
  .learn .d { font-size: 12px; font-weight: 500; color: #4a5568; line-height: 1.6; margin-top: 3px; }
"""

LOGO = '<img class="s-logo" src="assets/biz-logo.svg" alt="byTech BUSINESS">'
FOOT = '<p class="s-foot">© 株式会社AI棒</p><div class="s-num en"></div>'


def wrap(mark, cap, eyebrow_text, inner):
    return f"""    <!-- ===== {mark} ===== -->
    <figure class="slide-shell"><div class="clip">
      <div class="slide">
        <div class="s-body">
        <p class="s-eyebrow">{eyebrow_text}</p>
        {LOGO}
{inner}
        {FOOT}
        </div>
      </div>
    </div><figcaption>{cap}</figcaption></figure>

"""


# ---------------------------------------------------------------- B案：稟議書の形にそろえる
B_SUMMARY = wrap("02 稟議用サマリー", "02 稟議用サマリー", "稟議用サマリー", """
        <h2 class="s-title">稟議用サマリー：<b>AI推進担当3名のマンツーマン研修</b>の導入</h2>
        <table class="rg">
          <colgroup><col style="width:150px"><col></colgroup>
          <tr><td>件名</td><td>AI推進担当の育成研修（バイテック法人AI研修「マンツーマン研修」）の導入</td></tr>
          <tr><td>目的</td><td>来期（10月〜）の1年で<b>AIを全社の業務の根幹に置く</b>。まず推進担当3名を育て、社内に広げる役にする</td></tr>
          <tr><td>背景・課題</td><td>大阪営業の自発的なChatGPT活用で成果あり（商品台帳の更新 1時間→10〜15分）。一方で毎日使う人は全社の10％未満。過去に社内AIチャットを導入したが定着せず1ヶ月で解約</td></tr>
          <tr><td>施策の内容</td><td>推進担当3名（大阪営業2名・内勤1名）に1人1講師で伴走。業務の棚卸し → Must／Want課題の実装 → 社内勉強会・実演会の実施まで支援。動画教材＋2週間に1回の面談（60分）＋チャット無制限＋月1回の事務局面談</td></tr>
          <tr class="hi"><td>費用（税抜）</td><td>4ヶ月プラン <b>66万円</b>（3名・定価90万円）／2ヶ月プラン <b>45万円</b>（3名・定価60万円）<small>ベル様 特別価格。助成金は使わない（申請費用・待機期間なし。理由はP.6）</small></td></tr>
          <tr><td>期待効果</td><td>1人1日1時間の削減で、3名で<b>年間 約216万円</b>相当（240営業日・時給3,000円換算）。研修費は約3.7ヶ月で回収。社内に広がった分は上乗せ</td></tr>
          <tr><td>リスクと対策</td><td>情報の取り扱い → 入力しない情報のルール化・連携時の確認手順を研修内で整備／受講者の業務負担 → 1日約1時間を目安に設計し、繁忙期は面談で調整</td></tr>
          <tr><td>スケジュール</td><td>10月開始。4ヶ月プランは2027年2月、2ヶ月プランは2026年12月に修了。お申し込み → 事前説明会 → 個別ヒアリング面談（講師確定） → 研修開始</td></tr>
        </table>
""").replace(FOOT, '<p class="s-foot">© 株式会社AI棒　｜　金額はすべて税抜。特別価格は本ご提案（2026年10月開始）に限ります。</p><div class="s-num en"></div>')

B_OBJECTIVE = wrap("03 1 目的", "03 1｜目的", "1｜目的", """
        <h2 class="s-title">来期の1年で、<b>AIを全社の業務の根幹に置く</b>。</h2>
        <p class="s-lead">一部の人の工夫で終わらせず、全社が活用できる状態にする。そのための「起爆剤」として、推進担当を育てる研修を導入します。</p>
        <div class="obj">
          <p class="l">本施策の目的</p>
          <p class="t">推進担当3名を育て、<b>「AIを使わないと回らない業務の流れ」</b>を社内に作る</p>
          <p class="d">研修の目的は「個人の効率化」にとどめず、「チームとして成果を出す／全社に広げる」まで含めます。推進担当が社内向けの内製化施策（勉強会・実演会）を打てる状態にすることがゴールです。</p>
        </div>
        <div class="def">
          <div class="c"><p class="n">GOAL 01</p><p class="t">3名それぞれの業務にAIが組み込まれている</p><p class="d">棚卸しで決めた<b>Must課題が実務に実装</b>され、「業務がどう変わったか」を語れる状態で修了する。</p></div>
          <div class="c"><p class="n">GOAL 02</p><p class="t">社内に広げる施策を自分たちで打てる</p><p class="d">研修期間中に<b>社内勉強会・実演会</b>を実施し、使っていない人の目の前で実演できるようになる。</p></div>
          <div class="c"><p class="n">GOAL 03</p><p class="t">セキュリティも社内で判断できる</p><p class="d">扱う情報のルールと連携時の確認手順を持ち、<b>外部に聞かずに判断</b>できる推進担当になる。</p></div>
        </div>
""")

B = [
    swap(COVER, "推進担当3名の「マンツーマン研修」のご提案</p>", "推進担当3名の「マンツーマン研修」のご提案｜稟議資料</p>"),
    B_SUMMARY,
    B_OBJECTIVE,
    slide(S1, "04 2 背景と課題", "2｜背景と課題", "04 2｜背景と課題"),
    slide(S2, "05 3 施策の内容 1/2", "3｜施策の内容（1/2）考え方", "05 3｜施策の内容（1/2）"),
    slide(S3, "06 3 施策の内容 2/2", "3｜施策の内容（2/2）研修の中身と進め方", "06 3｜施策の内容（2/2）"),
    swap(slide(S6, "07 4 比較検討 1/2", "4｜比較検討（1/2）助成金を使わない理由", "07 4｜比較検討（1/2）"), "（次ページ）", "（P.8）"),
    slide(S9, "08 4 比較検討 2/2", "4｜比較検討（2/2）他社との違い", "08 4｜比較検討（2/2）"),
    slide(S7, "09 5 費用", "5｜費用（3名・税抜）", "09 5｜費用"),
    slide(S8, "10 6 期待効果", "6｜期待効果", "10 6｜期待効果"),
    slide(S4, "11 7 リスクと対策 1/2", "7｜リスクと対策（1/2）セキュリティ", "11 7｜リスクと対策（1/2）"),
    swap(swap(slide(S5, "12 7 リスクと対策 2/2", "7｜リスクと対策（2/2）受講者の業務負担", "12 7｜リスクと対策（2/2）"),
              '<h2 class="s-title"><b>2週間を1サイクル</b>に、面談と実務課題を繰り返します。</h2>',
              '<h2 class="s-title">受講者の負担は<b>1日約1時間</b>。2週間サイクルで、繁忙期は面談で調整します。</h2>'),
         "受講者の方（本日ご参加でない内勤の方も）に、どのくらいの時間がかかるかをお伝えするためのイメージです。",
         "受講者の業務負担を見積もるためのイメージです。本日ご参加でない内勤の方にも、このページでお伝えください。"),
    slide(S10, "13 8 スケジュール", "8｜スケジュール", "13 8｜スケジュール"),
]

# ---------------------------------------------------------------- C案：ストーリー型
C_WHY = wrap("02 1 なぜ誰も使わないのか", "02 1｜「全社に入れたのに、誰も使わない」はなぜ起きるか", "1｜「全社に入れたのに、誰も使わない」はなぜ起きるか", """
        <h2 class="s-title">ツールを入れても、研修をしても、<b>「使う理由」が業務の中になければ</b>使われない。</h2>
        <div class="vs big">
          <div class="col ng">
            <p class="h">貴社で起きたこと（面談で伺った内容）</p>
            <div class="b">
              <div class="row"><span class="ic">✕</span><div><p class="t">社内向けAIチャットを導入したが、1ヶ月で解約</p><p class="d"><b>登録・ログインすらしない人</b>もいた。「入れただけ」では使う理由が生まれなかった。</p></div></div>
              <div class="row"><span class="ic">✕</span><div><p class="t">毎日使っているのは数名のみ（全社で10％未満）</p><p class="d">大阪の営業は自発的にChatGPTを使い、<b>商品台帳の更新が1時間→10〜15分</b>になっている。ただし個人の工夫にとどまり、周りに広がっていない。</p></div></div>
            </div>
          </div>
          <p class="mid">＝</p>
          <div class="col gy">
            <p class="h">よくあるAI研修・導入の失敗</p>
            <div class="b">
              <div class="row"><span class="ic">✕</span><div><p class="t">全員向けのeラーニング・集団研修</p><p class="d">「受けて終わり、すぐ元どおり」。自分の業務にどう使うかまで落ちない。</p></div></div>
              <div class="row"><span class="ic">✕</span><div><p class="t">ツールを入れて「使ってください」</p><p class="d">使う・使わないが個人の意欲任せ。忙しい人ほど使わない。</p></div></div>
              <div class="row"><span class="ic">✕</span><div><p class="t">使える人の効率化で止まる</p><p class="d">成果が出ていても、それを<b>広げる役割の人がいない</b>。</p></div></div>
            </div>
          </div>
        </div>
        <div class="band"><span>共通する原因は、<b>「AIを使わないと回らない業務の流れ」</b>と、<b>それを社内に広げる人</b>がいないこと。次のページで、この2つを作る方法をご提案します。</span></div>
""")

C_HOW = wrap("03 2 解決の考え方", "03 2｜解決の考え方", "2｜解決の考え方", """
        <h2 class="s-title">推進担当を作り、<b>「使わないと回らない流れ」</b>を作る。</h2>
        <p class="s-lead">全員に一斉に教えるのではなく、まず少人数を「社内に広げる役」として育て、その人たちが業務の流れそのものを変えていきます。</p>
        <div class="way">
          <div class="c"><img src="assets/illus/comp-02.webp" alt=""><span class="n">1</span><p class="t">推進担当（AI人材）を<br>少人数から育てる</p><p class="d">大阪営業2名＋内勤1名の3名を、<b>1人に1人の講師</b>がついてマンツーマンで育成。自分の業務で成果を出すところから始めます。</p></div>
          <div class="c"><img src="assets/illus/comp-04.webp" alt=""><span class="n">2</span><p class="t">「AIを使わないと回らない<br>業務の流れ」を作る</p><p class="d">使う・使わないを個人の意欲に任せず、<b>業務の流れそのものにAIを組み込む</b>。推進担当がその設計をできるようにします。</p></div>
          <div class="c"><img src="assets/illus/comp-05.webp" alt=""><span class="n">3</span><p class="t">研修期間中に、<br>社内に広げる施策を打つ</p><p class="d">社内勉強会・実演会など、<b>使っていない人の目の前で実演する</b>施策を、研修の中で実施するところまで支援します。</p></div>
        </div>
        <div class="aim">
          <p class="l">研修の目的</p>
          <div class="c"><span class="n">A</span><div><p class="t">個人の効率化</p><p class="d">自分の業務をAIで速く・正確にする</p></div></div>
          <div class="c"><span class="n">B</span><div><p class="t">チームとして成果を出す／全社に広げる</p><p class="d">周りが使う仕組みを作り、成果を社内に展開する</p></div></div>
        </div>
        <div class="band"><span>大阪の営業で起きた「自発的に使って成果が出た」流れを、<b>3名から全社へ意図的に再現する</b>のが今回の研修です。</span></div>
""")

C_CASE = wrap("04 3 参考事例 LINEヤフー", "04 3｜参考事例：LINEヤフー", "3｜参考事例：LINEヤフー", """
        <h2 class="s-title">「使うかどうか」を個人に任せず、<b>業務のルールに組み込んだ</b>会社の例。</h2>
        <div class="dhd">
          <p class="co">LINEヤフー株式会社<small>全従業員 約11,000人を対象に「生成AI活用の義務化」を前提とした働き方へ（2025年7月〜）</small></p>
          <div class="tags"><span>全社活用</span><span>ルール化</span><span>教育とセット</span></div>
        </div>
        <div class="dt">
          <div>
            <div class="sec"><p class="h">取り組み</p><div class="b">
              <p class="i">業務の約3割を占める<b>「調査・検索」「資料作成」「会議」</b>の共通領域から、生成AIを使うルールを策定</p>
              <p class="i">例：調査は<b>「まずはAIに聞く」</b>／資料は<b>「ゼロベースでは作らない」</b>／社内会議の議事録は<b>AIで作成</b></p>
              <p class="i">全従業員がリスク管理とプロンプトの<b>eラーニングを受講し、テスト合格</b>を利用の条件に</p>
            </div></div>
            <div class="sec" style="margin-top:12px"><p class="h">ポイント</p><div class="b">
              <p class="i">「使ってください」ではなく、<b>使わないと回らない業務ルール</b>にした</p>
              <p class="i">罰則ではなく、<b>教育とルールの組み合わせ</b>で利用を当たり前にした</p>
            </div></div>
          </div>
          <div>
            <div class="kpi">
              <div><p class="k">対象</p><p class="v">約11,000<small>人</small></p><p class="n">全従業員</p></div>
              <div><p class="k">目標</p><p class="v">生産性 2<small>倍</small></p><p class="n">3年以内（同社発表）</p></div>
              <div><p class="k">利用率</p><p class="v">ほぼ100<small>％</small></p><p class="n">業務特性上難しい従業員を除く（報道）</p></div>
              <div><p class="k">対象業務</p><p class="v">3<small>領域</small></p><p class="n">調査・検索／資料作成／会議</p></div>
            </div>
          </div>
        </div>
        <div class="learn">
          <p class="h">貴社に置き換えるなら（当社の見解）</p>
          <div class="g">
            <div><p class="t">「使う場面」を業務で決める</p><p class="d">商品台帳の更新・見積・議事録など、貴社の業務単位で「ここはAIで」を決める。</p></div>
            <div><p class="t">決めるのは推進担当</p><p class="d">1万人規模の会社が本部で決めたことを、貴社では推進担当3名が現場の実態に合わせて決める。</p></div>
            <div><p class="t">教育とセットで広げる</p><p class="d">ルールだけ配っても使われない。勉強会・実演会で「使えばこうなる」を見せる。</p></div>
          </div>
        </div>
""").replace(FOOT, '<p class="s-foot">出典：LINEヤフー株式会社 プレスリリース「全従業員約11,000人を対象に業務における『生成AI活用の義務化』を前提とした新しい働き方を開始」（2025年7月14日）、Business Insider Japan（2025年12月）ほか同社公開情報・報道。数値は同社の公表値・報道によるもので、当社による測定値ではありません。「貴社に置き換えるなら」は当社の見解です。社名は同社の商標です。</p><div class="s-num en"></div>')

C = [
    COVER,
    C_WHY,
    C_HOW,
    C_CASE,
    slide(S3, "05 4 貴社でやること 1/2", "4｜貴社でやること（1/2）研修の中身と進め方", "05 4｜貴社でやること（1/2）"),
    slide(S5, "06 4 貴社でやること 2/2", "4｜貴社でやること（2/2）学習期間・時間のイメージ", "06 4｜貴社でやること（2/2）"),
    slide(S4, "07 5 安心して進めるために", "5｜安心して進めるために（セキュリティ）", "07 5｜安心して進めるために"),
    slide(S6, "08 6 なぜ助成金を使わないのか", "6｜なぜ助成金を使わないのか", "08 6｜なぜ助成金を使わないのか"),
    slide(S7, "09 7 料金と費用対効果 1/2", "7｜料金と費用対効果（1/2）料金", "09 7｜料金と費用対効果（1/2）"),
    slide(S8, "10 7 料金と費用対効果 2/2", "7｜料金と費用対効果（2/2）費用対効果", "10 7｜料金と費用対効果（2/2）"),
    slide(S10, "11 8 次のステップ", "8｜次のステップ", "11 8｜次のステップ"),
]


def emit(name, title, note, slides_):
    h = head.replace("</style>", EXTRA_CSS + "</style>")
    h = re.sub(r"<title>.*?</title>", f"<title>{title}</title>", h, count=1)
    h = re.sub(r'<p class="note">.*?</p>', f'<p class="note">{note}</p>', h, count=1)
    out = h + '  <div class="deck">\n' + "".join(slides_) + tail
    (ROOT / name / "deck.html").write_text(out, encoding="utf-8")
    print(name, len(slides_), "slides")


emit("proposal-bell-2610-b", "ベル様 ご提案書（B案：稟議書形式）｜全13スライド",
     "ベル様 ご提案書（B案：稟議書の形にそろえる）｜_variants.py が A案 deck.html から生成。直接編集せず A案または _variants.py を直す", B)
emit("proposal-bell-2610-c", "ベル様 ご提案書（C案：ストーリー型）｜全11スライド",
     "ベル様 ご提案書（C案：ストーリー型）｜_variants.py が A案 deck.html から生成。直接編集せず A案または _variants.py を直す", C)
