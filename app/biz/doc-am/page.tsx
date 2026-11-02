import DocDownloadPage from "../_doc/DocDownloadPage";

// リーダー・マネージャー向けAI研修 コース紹介資料（ebook-38）の個別DLページ。3点セットは /doc-a。
export default function DocAmPage() {
  return (
    <DocDownloadPage
      title="【リーダー・マネージャー向けAI研修 コース紹介資料】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-38-cover.webp", alt: "リーダー・マネージャー向けAI研修 コース紹介資料の表紙" }]}
      desc="管理職向けの法人AI研修「リーダー・マネージャー向けAI研修」のコース紹介資料です。全8チャプター・35レッスン／視聴時間 約5時間のカリキュラムから、使えるAIツールに合わせた研修内容の調整、研修開始までの流れまで、導入のご検討に必要な情報をまとめています。"
      items={[
        "リーダー・マネージャー向けAI研修の全体像と、成果につなげる3つのステップ",
        "カリキュラム詳細（全8チャプター・35レッスン／視聴時間 約5時間）",
        "Gemini・Microsoft Copilot・ChatGPT・Claudeなど利用環境に合わせた調整",
        "研修開始までの流れ・よくあるご質問",
      ]}
      docName="リーダー・マネージャー向けAI研修コース紹介資料"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-38-p05.webp", alt: "研修の概要" },
        { src: "/biz/assets/img/documents/preview/ebook-38-p09.webp", alt: "レッスン一覧" },
        { src: "/biz/assets/img/documents/preview/ebook-38-p01.webp", alt: "表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-38-p01.webp", alt: "表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-38-p03.webp", alt: "リーダー・マネージャー向けAI研修とは" },
        { src: "/biz/assets/img/documents/preview/ebook-38-p04.webp", alt: "こんな組織におすすめ" },
        { src: "/biz/assets/img/documents/preview/ebook-38-p05.webp", alt: "研修の概要" },
        { src: "/biz/assets/img/documents/preview/ebook-38-p06.webp", alt: "カリキュラム" },
        { src: "/biz/assets/img/documents/preview/ebook-38-p09.webp", alt: "レッスン一覧" },
        { src: "/biz/assets/img/documents/preview/ebook-38-p11.webp", alt: "利用環境に合わせた調整" },
      ]}
    />
  );
}
