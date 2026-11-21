# bytech.jp/news（バイテックAIスクールのお知らせ）

実体は `app/news`（route handler で静的HTMLを組み立て、共通ヘッダー/フッターと計測タグは `renderedHtmlResponse` が差し込む）。
biz.bytech.jp・geek.bytech.jp の `/news` は proxy.ts でそれぞれのルートへリライトされるので、ここは apex 専用。

記事は **microCMS の bytech-blog サービス**（ブログと同じ）の `news` API。bytech-biz はAPI数の上限で追加できないため。
環境変数が無い・取得に失敗したときは「現在公開中のお知らせはありません。」と出る。反映は最大5分（revalidate 300）。

## 環境変数（Vercel・ローカルの .env）

| 名前 | 中身 |
| --- | --- |
| `MICROCMS_SCHOOL_SERVICE_DOMAIN` | `bytech-blog` |
| `MICROCMS_SCHOOL_API_KEY` | bytech-blog サービスのAPIキー（`news` の GET が要る） |
| `MICROCMS_SCHOOL_NEWS_ENDPOINT` | 任意。既定は `news` |

## news API のスキーマ（biz・GEEK の news と同じ項目名）

| フィールドID | 種類 | 備考 |
| --- | --- | --- |
| `title` | テキストフィールド | 必須 |
| `category` | セレクトフィールド | 「お知らせ」「メディア掲載」の2つ（タブもこの2つ） |
| `content` | リッチエディタ | 本文 |
| `thumbnail` | 画像 | 任意。未設定ならロゴの枠を出す |
| `description` | テキストフィールド | 任意。meta description に使う |

個別記事はサイトマップ（public/sitemap.xml）に載らない。一覧 `/news` だけ登録している。
