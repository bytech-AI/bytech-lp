# geek.bytech.jp/news の記事下書き

GEEKのお知らせ（`app/geek-news`）は **GEEK専用の microCMS サービス** の `news` API から読む。
bytech-biz サービスはプランのAPI数上限（5つ）に達していて geek 用のAPIを足せないため、サービスを分けている。
環境変数が無い・取得に失敗したときは「現在公開中のお知らせはありません。」と出る。

## 環境変数（Vercel・ローカルの .env）

| 名前 | 中身 |
| --- | --- |
| `MICROCMS_GEEK_SERVICE_DOMAIN` | GEEK用サービスのサービスID（`https://<ここ>.microcms.io`） |
| `MICROCMS_GEEK_API_KEY` | GEEK用サービスのAPIキー（`news` の GET が要る） |
| `MICROCMS_GEEK_NEWS_ENDPOINT` | 任意。既定は `news` |

## news API のスキーマ（biz の news と同じ項目名。コードを共通で使うため）

| フィールドID | 種類 | 備考 |
| --- | --- | --- |
| `title` | テキストフィールド | 必須 |
| `category` | セレクトフィールド | 選択肢は「お知らせ」「メディア掲載」の2つ |
| `content` | リッチエディタ | 本文 |
| `thumbnail` | 画像 | 任意。未設定なら GEEK の OGP 画像を出す |
| `description` | テキストフィールド | 任意。meta description に使う |

APIはマネジメントAPI `POST https://<サービスID>.microcms-management.io/api/v1/apis` でも作れる（キーに「APIの作成」権限が要る）。

## 下書きの投入

このフォルダの `*.html`（先頭コメントに title / category / description）を登録する。記事ID（URLの `/news/<id>`）はファイル名になる。

```sh
node scripts/create-news-drafts.mjs --geek            # 下書きで登録
node scripts/create-news-drafts.mjs --geek --publish  # 公開で登録
```
