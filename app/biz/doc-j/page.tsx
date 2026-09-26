import DocDownloadPage from "../_doc/DocDownloadPage";

// Copilot研修 コース紹介資料（ebook-09）の個別DLページ。3点セットは /doc-a。
export default function DocJPage() {
  return (
    <DocDownloadPage
      title="【Copilot研修 コース紹介資料】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-09-cover.webp", alt: "Copilot研修 コース紹介資料の表紙" }]}
      desc="法人向けCopilot研修のコース紹介資料です。全6ユニット・48レッスン／視聴時間 約7時間のカリキュラムから、3つの研修プランと料金・助成金活用、サポート体制、研修開始までの流れまで、導入のご検討に必要な情報をまとめています。"
      items={[
        "Copilot研修の全体像と、実務で成果につなげる3つのステップ",
        "カリキュラム詳細（全6ユニット・48レッスン／視聴時間 約7時間）",
        "3つの研修プランと料金、助成金活用で実質負担が最大75%OFFになる試算",
        "研修開始までの流れ・よくあるご質問",
      ]}
      docName="Copilot研修コース紹介資料"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-09-p05.webp", alt: "研修の概要" },
        { src: "/biz/assets/img/documents/preview/ebook-09-p09.webp", alt: "レッスン一覧" },
        { src: "/biz/assets/img/documents/preview/ebook-09-p01.webp", alt: "表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-09-p01.webp", alt: "表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-09-p03.webp", alt: "Copilot研修とは" },
        { src: "/biz/assets/img/documents/preview/ebook-09-p04.webp", alt: "こんな組織におすすめ" },
        { src: "/biz/assets/img/documents/preview/ebook-09-p05.webp", alt: "研修の概要とステップ" },
        { src: "/biz/assets/img/documents/preview/ebook-09-p06.webp", alt: "カリキュラム" },
        { src: "/biz/assets/img/documents/preview/ebook-09-p09.webp", alt: "レッスン一覧" },
        { src: "/biz/assets/img/documents/preview/ebook-09-p11.webp", alt: "3つの研修プランと料金" },
      ]}
    />
  );
}
