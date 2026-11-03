# geek.bytech.jp/news の記事下書き

GEEKのお知らせ（`app/geek-news`）は microCMS（サービス `bytech-biz`）の **`geek-news`** APIから読む。
APIが無い・取得に失敗したときは「現在公開中のお知らせはありません。」と出る。

## microCMS 側の準備（初回だけ）

1. 管理画面で API を追加する
   - API名: GEEKのお知らせ／エンドポイント: `geek-news`／型: リスト形式
2. スキーマ（biz の `news` と同じ項目名にする。コードを共通で使うため）
   | フィールドID | 種類 | 備考 |
   | --- | --- | --- |
   | `title` | テキストフィールド | 必須 |
   | `category` | セレクトフィールド | 選択肢は「お知らせ」「メディア掲載」の2つ |
   | `content` | リッチエディタ | 本文 |
   | `thumbnail` | 画像 | 任意。未設定なら GEEK の OGP 画像を出す |
   | `description` | テキストフィールド | 任意。meta description に使う |
3. APIキー（`.env` / Vercel の `MICROCMS_API_KEY`）の権限で `geek-news` の GET を許可する
   - 下書きをスクリプトで入れるなら PUT も許可する

エンドポイント名を変える場合だけ、Vercel に `MICROCMS_GEEK_NEWS_ENDPOINT` を設定する（既定は `geek-news`）。

## 下書きの投入

このフォルダの `*.html`（先頭コメントに title / category / description）を下書きで登録する。

```sh
node scripts/create-news-drafts.mjs --geek            # 下書きで登録
node scripts/create-news-drafts.mjs --geek --publish  # 公開で登録
```

記事ID（URLの `/news/<id>`）はファイル名になる。PUT 権限が無いキーだと `PUT is forbidden` で失敗するので、その場合は管理画面に本文を貼って作る。
