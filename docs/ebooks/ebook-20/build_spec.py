# ebook-20「法人向け 生成AIツール比較ガイド」の spec.json を組み立てる。
# 料金・データの扱いは specs.json（各社公式ページ、2026-10-14 閲覧）、導入事例は cases.json（公式発表で裏取り）。
import json, os
D = os.path.dirname(os.path.abspath(__file__))
cases = json.load(open(os.path.join(D, "cases.json")))
ASOF = "2026年10月14日時点"
S = []
S.append({"type": "toc", "items": [
  {"title": "結論サマリーと選ぶときの5つの観点", "desc": "まず全体像", "pages": "P.2 - 3"},
  {"title": "4ツールの比較", "desc": "料金・データの扱い・管理機能・費用試算", "pages": "P.4 - 6"},
  {"title": "導入企業の事例", "desc": "ツールごとに2社、選んだ理由と成果", "pages": "P.7 - 16"},
  {"title": "選び方の傾向と使い分け", "desc": "事例から見る判断のポイント", "pages": "P.17 - 19"},
  {"title": "導入後に差がつくのは「使い方」", "desc": "定着のための研修", "pages": "P.20 - 21"},
], "foot": f"本資料の料金・機能は各社公式ページ（{ASOF}）にもとづきます。事例は各社の公式発表にもとづき当社が編集したもので、掲載企業との取引関係や推薦を示すものではありません。"})
S.append({"type": "cards", "eyebrow": "結論サマリー", "caption": "結論サマリー",
  "title_html": "迷ったら、<b>今使っている業務ツール</b>から選ぶのが近道。",
  "lead": "4つとも、法人プランでは入力データを学習に使わないと公式に明記しています。差が出るのは「どの業務ツールの中で使えるか」と「管理機能・料金体系」です。",
  "cards": [
    {"icon": "company", "logos": ["assets/logo-copilot.png"], "title": "Microsoft 365 中心なら", "desc": "<b>Microsoft 365 Copilot</b>。Word・Excel・PowerPoint・Teams の中で、社内のメールやファイルを踏まえて使えます。", "tag": "P.13・P.14 の事例"},
    {"icon": "doc", "logos": ["assets/logo-gemini.png"], "title": "Google Workspace 中心なら", "desc": "<b>Gemini</b>。Workspaceの料金にAIが含まれ、Gmail・ドキュメント・Meetで標準的に使えます。", "tag": "P.11・P.12 の事例"},
    {"icon": "chat", "logos": ["assets/logo-chatgpt.png", "assets/logo-claude.png"], "title": "まず全社で汎用的に使うなら", "desc": "<b>ChatGPT</b>。業務ツールを問わず使え、部門横断の展開が速い。長文の資料分析や開発・業務の自動化を重視するなら<b>Claude</b>も候補です。", "tag": "P.9・P.10／P.15・P.16 の事例"},
  ],
  "band": "1本に絞らず「全社はAで、開発部門はB」と組み合わせる企業も増えています（P.18）。"})
S.append({"type": "table", "eyebrow": "選ぶときの観点", "caption": "選ぶときの5つの観点",
  "title_html": "ツール選定で確認する<b>5つの観点</b>",
  "cols": [200, None, 320],
  "header": ["観点", "確認すること", "差が出やすいポイント"],
  "rows": [
    ["今使っている業務ツール", "メール・文書・会議をどのサービスで行っているか", "Microsoft 365 なら Copilot、Google Workspace なら Gemini が組み込みで使える"],
    ["セキュリティ・データの扱い", "学習に使われないか、保存地域、ログの取得", "日本でのデータ保存や監査ログは上位プランに限られることが多い"],
    ["管理機能", "SSO、アカウント自動連携（SCIM）、利用状況の分析", "SCIM・監査ログは Enterprise 系のみのツールが多い"],
    ["料金体系", "1人あたり月額、最低人数、上限人数、別途必要なライセンス", "Copilot は Microsoft 365 の契約が別途必要。Claude は米ドル建て"],
    ["得意な使い方", "文書作成、データ分析、長文読解、開発、社内データ連携", "長文・開発は Claude、Office 文書は Copilot など得意分野に差"],
  ]})
S.append({"type": "table", "eyebrow": "4ツール比較", "caption": "4ツール比較表（料金・プラン）", "dense": "mid",
  "title_html": "4ツールの<b>法人プランと料金</b>", "lead": f"1ユーザーあたり月額（{ASOF}、各社公式ページ）。年払い／月払いで価格が異なります。",
  "cols": [175, 250, None, 210],
  "header": ["ツール", "主な法人プラン", "料金（1ユーザー／月）", "人数の条件"],
  "rows": [
    ["ChatGPT", "Business／Enterprise", "Business：<b>¥3,050</b>（年払い）・¥3,850（月払い）／Enterprise：要問い合わせ", "2名以上"],
    ["Gemini", "Google Workspace Business Standard／Plus／Enterprise", "Standard：<b>¥1,600</b>（年間プラン）・Plus：¥2,500／Enterprise：要問い合わせ（税別・Workspace利用料込み）", "Business系は最大300名"],
    ["Microsoft 365 Copilot", "Copilot Business（一般法人）／Copilot（エンタープライズ）", "Business：<b>¥3,148</b>（年払い）／エンタープライズ：<b>¥4,497</b>（年払い）（税別・M365ライセンスが別途必要）", "Business は最大300名"],
    ["Claude", "Team／Enterprise", "Team スタンダード：<b>US$22</b>（年払い）・US$27.50（月払い）／Enterprise：要問い合わせ（席料金＋利用量課金）", "Team は2〜150名"],
  ],
  "foot": "料金は各社公式ページの表記（2026年10月14日閲覧）。キャンペーン価格は除いています。Microsoft 365 Copilot Chat は対象の Microsoft 365 プラン利用者なら追加費用なしで利用可能。最新の料金は各社公式ページでご確認ください。"})
S.append({"type": "table", "eyebrow": "4ツール比較", "caption": "セキュリティ・データの扱い比較", "dense": "mid",
  "title_html": "<b>セキュリティとデータの扱い</b>の比較",
  "cols": [175, 270, 260, None],
  "header": ["ツール", "入力データの学習利用", "データの保存地域", "主な管理機能"],
  "rows": [
    ["ChatGPT", "法人プランは<b>デフォルトで学習に使用しない</b>", "Enterprise は日本を含む10地域から選択可（Business は非対応）", "SSO・利用分析（Business）／SCIM・監査用API・暗号鍵管理（Enterprise）"],
    ["Gemini", "許可なくドメイン外の<b>学習に使用しない</b>", "米国またはEUに処理を限定可。保存場所の制御は Enterprise プラン", "既存のWorkspace権限・DLPを継承／Vault（Business Plus以上）"],
    ["Microsoft 365 Copilot", "プロンプト・応答・データは<b>基盤モデルの学習に使用しない</b>", "データ所在地のコミットメントあり（Advanced Data Residency 等）", "既存のアクセス権・秘密度ラベルを尊重／Purview で監査・保持"],
    ["Claude", "ビジネスプランは<b>デフォルトで学習に使用しない</b>", "Enterprise で「米国のみの推論」オプション", "SSO・利用分析（Team）／SCIM・監査ログ・データ保持設定（Enterprise）"],
  ],
  "foot": "各社公式ページ（プライバシー・トラストセンター・製品ページ、2026年10月14日閲覧）の記載を要約。認証・機能はプランにより異なります。"})
S.append({"type": "table", "eyebrow": "費用の試算", "caption": "料金シミュレーション",
  "title_html": "<b>50人・100人・300人</b>で導入した場合の月額（試算）",
  "cols": [240, None, None, None, 260],
  "header": ["ツール（試算に使ったプラン）", "50人", "100人", "300人", "別途必要なもの"],
  "rows": [
    ["ChatGPT Business（年払い ¥3,050）", "<b>¥152,500</b>", "<b>¥305,000</b>", "<b>¥915,000</b>", "なし"],
    ["Gemini（Workspace Business Standard 年間 ¥1,600）", "<b>¥80,000</b>", "<b>¥160,000</b>", "<b>¥480,000</b>", "なし（Workspace利用料込み）"],
    ["Microsoft 365 Copilot Business（年払い ¥3,148）", "<b>¥157,400</b>", "<b>¥314,800</b>", "<b>¥944,400</b>", "Microsoft 365 のライセンス"],
    ["Claude Team スタンダード（年払い US$22）", "<b>US$1,100</b>", "<b>US$2,200</b>", "Team は150名まで（Enterprise は要問い合わせ）", "為替の影響"],
  ],
  "band": "試算は公式の表示単価×人数の概算（税・キャンペーン・既存契約は考慮していません）。Gemini は Workspace 自体の料金を含むため、他ツールと単純比較はできません。"})
S.append({"type": "chapter", "no": "03", "title": "導入企業の事例", "desc": "ツールごとに2社。選んだ理由・展開・成果", "caption": "章扉 導入事例"})
S.append({"type": "caselist", "eyebrow": "導入事例 一覧", "caption": "導入事例 一覧",
  "title_html": "決め手は<b>既存の業務環境</b>と<b>セキュリティ</b>。成果は「定着させる仕組み」で差がつく。",
  "col_name": "企業", "col_area": "ツール",
  "rows": [dict(c, source_short=c["source_full"].split("「")[0].split(" ")[0]) for c in cases],
  "foot": "出典：各社の公式発表（プレスリリース・公式サイト・統合報告書）ほか。出典の詳細は各事例ページに記載しています。数値は各社の公表値であり、当社による測定値ではありません。"})
for c in cases:
  S.append({"type": "case", "eyebrow": f"導入事例｜{c['tool']}", "icon": c["icon"], "logo": f"assets/logo-{c['tool'].lower()}.png", "name": c["name"], "tagline": c["tagline"], "tags": c["tags"],
    "sections": [{"h": "選んだ理由・比較した候補", "items": c["why_html"]}, {"h": "展開・定着の取り組み", "items": c["actions_html"]}],
    "kpis": c["kpis"], "side": [], "learn_title": "選ぶとき・入れるときのポイント（当社の見解）", "learn": c["learn"], "source_full": c["source_full"]})
S.append({"type": "cards", "eyebrow": "選び方の傾向", "caption": "事例から見る選び方の傾向",
  "title_html": "事例から見える<b>3つの傾向</b>", "cards": [
    {"icon": "company", "title": "既存の業務環境に合わせる", "desc": "Microsoft 365 の企業は Copilot、Google Workspace の企業は Gemini を選ぶ例が多く、<b>メールやファイルを横断して使える</b>ことが決め手になっています。"},
    {"icon": "lock", "title": "セキュリティは前提条件", "desc": "どの事例も、学習に使われないこと・アクセス権の継承・ログの取得を<b>最初の確認事項</b>にしています。"},
    {"icon": "people", "title": "定着の仕組みで差がつく", "desc": "同じツールでも成果は、研修・推進役・活用事例の共有といった<b>定着の仕組み</b>があるかで大きく変わります。"},
  ]})
S.append({"type": "table", "eyebrow": "使い分け", "caption": "組み合わせて使う", "title_html": "1本に絞らず、<b>組み合わせる</b>という選択肢",
  "cols": [260, None, 300],
  "header": ["組み合わせの例", "考え方", "注意点"],
  "rows": [
    ["全社：Copilot ／ 開発部門：Claude", "日常の文書・会議は Office の中で、長文分析や開発は得意なツールで", "ライセンスの二重払いになる人を最小限にする"],
    ["全社：Gemini ／ 企画部門：ChatGPT", "Workspace の料金内で全員が使い、高度な用途だけ追加", "使ってよいツールを社内ガイドラインで明記する"],
    ["全社：ChatGPT ／ 一部：Copilot Chat", "汎用AIを全社展開し、Microsoft 365 内の作業は無償の Copilot Chat で", "データの扱い・ログ取得の条件をツールごとに確認"],
  ],
  "band": "どの組み合わせでも、社内ガイドラインで「業務で使ってよいツール」を決めておくことが前提です（「社内ガイドライン＆リスク対策ガイド」参照）。"})
S.append({"type": "table", "eyebrow": "用途別の得意・不得意", "caption": "用途別の得意・不得意",
  "title_html": "<b>用途別</b>に見た、各ツールの得意分野",
  "cols": [200, None, None, None, None],
  "header": ["用途", "ChatGPT", "Gemini", "Microsoft 365 Copilot", "Claude"],
  "rows": [
    ["文書・メール作成", "<b>◎</b> 汎用的に強い", "<b>◎</b> Gmail・ドキュメント内で", "<b>◎</b> Word・Outlook内で", "<b>◎</b> 長い文書も一貫して"],
    ["会議の要約", "○ 文字起こしを貼り付け", "<b>◎</b> Meet と連携", "<b>◎</b> Teams と連携", "○ 文字起こしを貼り付け"],
    ["表計算・データ分析", "<b>◎</b> ファイルを分析", "○ スプレッドシート内で", "<b>◎</b> Excel 内で", "<b>◎</b> ファイルを分析"],
    ["長文資料の読み込み", "○", "○", "○ 社内ファイルを横断", "<b>◎</b> 長いコンテキストに対応"],
    ["開発・業務の自動化", "<b>◎</b> Codex 等", "○", "○ Copilot Studio 等", "<b>◎</b> Claude Code 等"],
  ],
  "band": "◎○は各社公式ページの機能説明にもとづく当社の整理です。実際の向き不向きは業務内容で変わるため、無料トライアル等で試すことをおすすめします。"})
S.append({"type": "cards", "eyebrow": "導入後に差がつくのは「使い方」", "caption": "導入後に差がつくのは使い方",
  "title_html": "どのツールを選んでも、成果を分けるのは<b>使い方の教育</b>",
  "lead": "事例の企業はいずれも、ツールの配布と同時に研修や推進役の育成を行っています。バイテック法人AI研修では、各ツールに対応したコースをご用意しています。",
  "cards": [
    {"icon": "chat", "logos": ["assets/logo-chatgpt.png", "assets/logo-gemini.png"], "title": "ChatGPT研修・Gemini研修", "desc": "全社員が業務で使える「型」を、実務を題材にしたハンズオンで身につけます。"},
    {"icon": "company", "logos": ["assets/logo-copilot.png"], "title": "Copilot研修・Copilot Studio研修", "desc": "Word・Excel・Teams での活用から、社内向けエージェントづくりまで。"},
    {"icon": "gear", "logos": ["assets/logo-claude.png"], "title": "Claude研修・Claude Code研修", "desc": "長文資料の分析や、業務の自動化・開発への活用を学びます。"},
  ]})
S.append({"type": "cta", "caption": "ご相談", "title_html": "ツール選びから、<b>全社定着</b>まで。",
  "lead": "どのツールが自社に合うか、導入後にどう定着させるか。無料個別相談で一緒に整理します。",
  "cards": [
    {"icon": "search", "title": "ツール選定のご相談", "desc": "今の業務環境とセキュリティ要件から、合うツールと組み合わせを整理します。"},
    {"icon": "people", "title": "ツール別のハンズオン研修", "desc": "選んだツールに合わせて、全社員・推進役向けの研修を設計します。"},
    {"icon": "yen", "title": "助成金の活用サポート", "desc": "人材開発支援助成金の対象となる研修設計で、実質負担を抑えます。"},
  ],
  "cta_title": "まずは無料個別相談で、今の業務環境をお聞かせください", "cta_desc": "オンライン・約60分。ツール選定の考え方と、導入後の研修・助成金の活用方法をご案内します。"})
S.append({"type": "notes", "items": [
  f"料金・プラン・機能・データの扱いは、各社公式ページ（OpenAI、Google、Microsoft、Anthropic）の記載にもとづきます（{ASOF}）。料金は予告なく変更されることがあります。導入前に必ず各社公式ページでご確認ください。",
  "表示価格の税込・税別は各社の表記に従います（Google・Microsoft・Anthropic は税別、OpenAI は表記なし）。Claude の料金は米ドル建てです。キャンペーン価格は除いています。",
  "料金シミュレーションは公式の表示単価に人数を掛けた概算で、実際の契約金額を保証するものではありません。",
  "導入事例は各社の公式発表にもとづいて当社が編集したものです。掲載企業との取引関係や、各社・各ツール提供元による推薦を示すものではありません。数値は各社の公表値です。",
  "用途別の◎○、「選ぶとき・入れるときのポイント」は当社の見解です。",
  "ChatGPT は OpenAI、Gemini・Google Workspace は Google、Microsoft 365 Copilot は Microsoft、Claude は Anthropic の商標または登録商標です。本資料の無断転載・再配布はご遠慮ください。　発行：バイテック法人AI研修（2026年10月版）",
]})
spec = {"title": "法人向け 生成AIツール比較ガイド", "subtitle": "ChatGPT／Gemini／Microsoft 365 Copilot／Claude を料金・セキュリティ・導入事例で比較",
  "edition": "2026年10月版", "book": {'layout': 'grid', 'lead': '法人向け｜料金・セキュリティ・導入事例で比較', 'title_html': '<em>生成AIツール</em><br>比較ガイド', 'tiles': [{'img': 'assets/logo-chatgpt.png', 'name': 'ChatGPT'}, {'img': 'assets/logo-gemini.png', 'name': 'Gemini'}, {'img': 'assets/logo-copilot.png', 'name': 'Microsoft 365 Copilot'}, {'img': 'assets/logo-claude.png', 'name': 'Claude'}], 'points': ['料金・プラン', 'セキュリティ', '導入事例8社']}, "cover_sub": 'ChatGPT・Gemini・Copilot・Claude を料金・セキュリティ・事例で比較', "cover_pills": ['料金・プラン比較', 'セキュリティ比較', '導入事例8社'], "cover_title_html": "法人向け<br>生成AIツール比較ガイド",
  "book_title_html": "法人向け<br><b>生成AIツール</b><br>比較ガイド", "category_label": "AI活用ノウハウ",
  "book_pills": ["4ツール比較", f"導入事例{len(cases)}社"], "slides": S}
json.dump(spec, open(os.path.join(D, "spec.json"), "w"), ensure_ascii=False, indent=1)
print("slides", len(S) + 1)
