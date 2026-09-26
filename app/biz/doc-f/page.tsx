import DocDownloadPage from "../_doc/DocDownloadPage";

// ChatGPT研修 コース紹介資料（ebook-05）の個別DLページ。3点セットは /doc-a。
export default function DocFPage() {
  return (
    <DocDownloadPage
      title="【ChatGPT研修 コース紹介資料】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-05-cover.webp", alt: "ChatGPT研修 コース紹介資料の表紙" }]}
      desc="法人向けChatGPT研修のコース紹介資料です。全8ユニット・45レッスンのカリキュラムから、3つの研修プランと料金・助成金活用、サポート体制、研修開始までの流れまで、導入のご検討に必要な情報をまとめています。"
      items={[
        "ChatGPT研修の全体像と、実務で成果につなげる3つのステップ",
        "カリキュラム詳細（全8ユニット・45レッスン／視聴時間 約6時間）",
        "3つの研修プランと料金、助成金活用で実質負担が最大75%OFFになる試算",
        "サポート体制・研修開始までの流れ・よくあるご質問",
      ]}
      docName="ChatGPT研修コース紹介資料"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-05-p05.webp", alt: "研修の概要と3つのステップ" },
        { src: "/biz/assets/img/documents/preview/ebook-05-p09.webp", alt: "レッスン一覧" },
        { src: "/biz/assets/img/documents/preview/ebook-05-p01.webp", alt: "ChatGPT研修 コース紹介資料 表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-05-p01.webp", alt: "ChatGPT研修 コース紹介資料 表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-05-p03.webp", alt: "ChatGPT研修とは" },
        { src: "/biz/assets/img/documents/preview/ebook-05-p05.webp", alt: "研修の概要と3つのステップ" },
        { src: "/biz/assets/img/documents/preview/ebook-05-p06.webp", alt: "カリキュラム STEP01" },
        { src: "/biz/assets/img/documents/preview/ebook-05-p09.webp", alt: "レッスン一覧" },
        { src: "/biz/assets/img/documents/preview/ebook-05-p10.webp", alt: "3つの研修プランと料金" },
        { src: "/biz/assets/img/documents/preview/ebook-05-p11.webp", alt: "助成金活用とサポート体制" },
      ]}
    />
  );
}
