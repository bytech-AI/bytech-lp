import DocDownloadPage from "../_doc/DocDownloadPage";

// Dify研修 コース紹介資料（ebook-12）の個別DLページ。3点セットは /doc-a。
export default function DocMPage() {
  return (
    <DocDownloadPage
      title="【Dify研修 コース紹介資料】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-12-cover.webp", alt: "Dify研修 コース紹介資料の表紙" }]}
      desc="法人向けDify研修のコース紹介資料です。全14ユニット・85レッスン／視聴時間 約10時間のカリキュラムから、3つの研修プランと料金・助成金活用、サポート体制、研修開始までの流れまで、導入のご検討に必要な情報をまとめています。"
      items={[
        "Dify研修の全体像と、実務で成果につなげる3つのステップ",
        "カリキュラム詳細（全14ユニット・85レッスン／視聴時間 約10時間）",
        "3つの研修プランと料金、助成金活用で実質負担が最大75%OFFになる試算",
        "研修開始までの流れ・よくあるご質問",
      ]}
      docName="Dify研修コース紹介資料"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-12-p05.webp", alt: "研修の概要" },
        { src: "/biz/assets/img/documents/preview/ebook-12-p09.webp", alt: "レッスン一覧" },
        { src: "/biz/assets/img/documents/preview/ebook-12-p01.webp", alt: "表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-12-p01.webp", alt: "表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-12-p03.webp", alt: "Dify研修とは" },
        { src: "/biz/assets/img/documents/preview/ebook-12-p04.webp", alt: "こんな組織におすすめ" },
        { src: "/biz/assets/img/documents/preview/ebook-12-p05.webp", alt: "研修の概要とステップ" },
        { src: "/biz/assets/img/documents/preview/ebook-12-p06.webp", alt: "カリキュラム" },
        { src: "/biz/assets/img/documents/preview/ebook-12-p09.webp", alt: "レッスン一覧" },
        { src: "/biz/assets/img/documents/preview/ebook-12-p11.webp", alt: "3つの研修プランと料金" },
      ]}
    />
  );
}
