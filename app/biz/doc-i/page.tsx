import DocDownloadPage from "../_doc/DocDownloadPage";

// Claude Code研修 コース紹介資料（ebook-08）の個別DLページ。3点セットは /doc-a。
export default function DocIPage() {
  return (
    <DocDownloadPage
      title="【Claude Code研修 コース紹介資料】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-08-cover.webp", alt: "Claude Code研修 コース紹介資料の表紙" }]}
      desc="法人向けClaude Code研修のコース紹介資料です。全5ユニット／視聴時間 約12時間のカリキュラムから、3つの研修プランと料金、サポート体制、研修開始までの流れまで、導入のご検討に必要な情報をまとめています。"
      items={[
        "Claude Code研修の全体像と、実務で成果につなげる5つのステップ",
        "カリキュラム詳細（全5ユニット／視聴時間 約12時間）",
        "3つの研修プランと料金、サポート体制",
        "研修開始までの流れ・よくあるご質問",
      ]}
      docName="Claude Code研修コース紹介資料"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-08-p05.webp", alt: "研修の概要" },
        { src: "/biz/assets/img/documents/preview/ebook-08-p11.webp", alt: "レッスン一覧" },
        { src: "/biz/assets/img/documents/preview/ebook-08-p01.webp", alt: "表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-08-p01.webp", alt: "表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-08-p03.webp", alt: "Claude Code研修とは" },
        { src: "/biz/assets/img/documents/preview/ebook-08-p04.webp", alt: "こんな組織におすすめ" },
        { src: "/biz/assets/img/documents/preview/ebook-08-p05.webp", alt: "研修の概要とステップ" },
        { src: "/biz/assets/img/documents/preview/ebook-08-p06.webp", alt: "カリキュラム" },
        { src: "/biz/assets/img/documents/preview/ebook-08-p11.webp", alt: "レッスン一覧" },
        { src: "/biz/assets/img/documents/preview/ebook-08-p12.webp", alt: "3つの研修プランと料金" },
      ]}
    />
  );
}
