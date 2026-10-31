import DocDownloadPage from "../_doc/DocDownloadPage";

// 総務のAI・自動化アイデア10選（ebook-23）の個別DLページ。3点セットは /doc-a。
export default function DocXPage() {
  return (
    <DocDownloadPage
      title="【総務のAI・自動化アイデア10選】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-23-cover.webp?v=20261031", alt: "総務のAI・自動化アイデア10選の表紙" }]}
      desc="総務の業務でMicrosoft 365 Copilot・Copilot Studio・Power Automateをどう使うかを、10のアイデアにまとめた資料です。業務の流れ、必要なデータ、測る指標、確認点を1件1ページで解説し、近い領域の公開事例6社、効果の測り方、導入前の確認も掲載しています。活用アイデアは当社の設計案です。"
      items={[
        "総務の流れに沿った10のアイデアと、始める順番",
        "1件1ページの解説（業務の流れ・必要なデータ・測る指標・確認点）",
        "近い領域の公開事例：デンソー、オービックビジネスコンサルタント（OBC）、早稲田大学、聖徳大学附属取手聖徳女子中学校・高等学校、AKKODiSコンサルティング、コスモ石油販売",
        "必要な製品の対応表・効果の測り方・導入前の確認",
      ]}
      docName="総務のAI・自動化アイデア10選"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-23-p08.webp", alt: "会議の議事メモ" },
        { src: "/biz/assets/img/documents/preview/ebook-23-p05.webp", alt: "総務の10のアイデアの全体像" },
        { src: "/biz/assets/img/documents/preview/ebook-23-p01.webp", alt: "総務のAI・自動化アイデア10選 表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-23-p01.webp", alt: "表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-23-p02.webp", alt: "目次" },
        { src: "/biz/assets/img/documents/preview/ebook-23-p03.webp", alt: "総務の手間は3つに分けて考える" },
        { src: "/biz/assets/img/documents/preview/ebook-23-p04.webp", alt: "4つの製品の関係" },
        { src: "/biz/assets/img/documents/preview/ebook-23-p05.webp", alt: "総務の10のアイデアの全体像" },
        { src: "/biz/assets/img/documents/preview/ebook-23-p08.webp", alt: "会議の議事メモ" },
      ]}
    />
  );
}
