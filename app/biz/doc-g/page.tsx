import DocDownloadPage from "../_doc/DocDownloadPage";

// Gemini研修 コース紹介資料（ebook-06）の個別DLページ。3点セットは /doc-a。
export default function DocGPage() {
  return (
    <DocDownloadPage
      title="【Gemini研修 コース紹介資料】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-06-cover.webp", alt: "Gemini研修 コース紹介資料の表紙" }]}
      desc="法人向けGemini研修のコース紹介資料です。全11ユニット・67レッスン／視聴時間 約5時間のカリキュラムから、3つの研修プランと料金・助成金活用、サポート体制、研修開始までの流れまで、導入のご検討に必要な情報をまとめています。"
      items={[
        "Gemini研修の全体像と、実務で成果につなげる3つのステップ",
        "カリキュラム詳細（全11ユニット・67レッスン／視聴時間 約5時間）",
        "3つの研修プランと料金、助成金活用で実質負担が最大75%OFFになる試算",
        "研修開始までの流れ・よくあるご質問",
      ]}
      docName="Gemini研修コース紹介資料"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-06-p05.webp", alt: "研修の概要" },
        { src: "/biz/assets/img/documents/preview/ebook-06-p09.webp", alt: "レッスン一覧" },
        { src: "/biz/assets/img/documents/preview/ebook-06-p01.webp", alt: "表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-06-p01.webp", alt: "表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-06-p03.webp", alt: "Gemini研修とは" },
        { src: "/biz/assets/img/documents/preview/ebook-06-p04.webp", alt: "こんな組織におすすめ" },
        { src: "/biz/assets/img/documents/preview/ebook-06-p05.webp", alt: "研修の概要とステップ" },
        { src: "/biz/assets/img/documents/preview/ebook-06-p06.webp", alt: "カリキュラム" },
        { src: "/biz/assets/img/documents/preview/ebook-06-p09.webp", alt: "レッスン一覧" },
        { src: "/biz/assets/img/documents/preview/ebook-06-p11.webp", alt: "3つの研修プランと料金" },
      ]}
    />
  );
}
