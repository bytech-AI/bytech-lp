import DocDownloadPage from "../_doc/DocDownloadPage";

// Copilot Studio研修 コース紹介資料（ebook-10）の個別DLページ。3点セットは /doc-a。
export default function DocKPage() {
  return (
    <DocDownloadPage
      title="【Copilot Studio研修 コース紹介資料】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-10-cover.webp", alt: "Copilot Studio研修 コース紹介資料の表紙" }]}
      desc="法人向けCopilot Studio研修のコース紹介資料です。全11ユニット・70レッスン／視聴時間 約9時間のカリキュラムから、3つの研修プランと料金・助成金活用、サポート体制、研修開始までの流れまで、導入のご検討に必要な情報をまとめています。"
      items={[
        "Copilot Studio研修の全体像と、実務で成果につなげる3つのステップ",
        "カリキュラム詳細（全11ユニット・70レッスン／視聴時間 約9時間）",
        "3つの研修プランと料金、助成金活用で実質負担が最大75%OFFになる試算",
        "研修開始までの流れ・よくあるご質問",
      ]}
      docName="Copilot Studio研修コース紹介資料"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-10-p05.webp", alt: "研修の概要" },
        { src: "/biz/assets/img/documents/preview/ebook-10-p09.webp", alt: "レッスン一覧" },
        { src: "/biz/assets/img/documents/preview/ebook-10-p01.webp", alt: "表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-10-p01.webp", alt: "表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-10-p03.webp", alt: "Copilot Studio研修とは" },
        { src: "/biz/assets/img/documents/preview/ebook-10-p04.webp", alt: "こんな組織におすすめ" },
        { src: "/biz/assets/img/documents/preview/ebook-10-p05.webp", alt: "研修の概要とステップ" },
        { src: "/biz/assets/img/documents/preview/ebook-10-p06.webp", alt: "カリキュラム" },
        { src: "/biz/assets/img/documents/preview/ebook-10-p09.webp", alt: "レッスン一覧" },
        { src: "/biz/assets/img/documents/preview/ebook-10-p11.webp", alt: "3つの研修プランと料金" },
      ]}
    />
  );
}
