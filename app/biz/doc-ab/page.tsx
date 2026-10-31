import DocDownloadPage from "../_doc/DocDownloadPage";

// 調達・法務のAI・自動化アイデア10選（ebook-27）の個別DLページ。3点セットは /doc-a。
export default function DocAbPage() {
  return (
    <DocDownloadPage
      title="【調達・法務のAI・自動化アイデア10選】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-27-cover.webp?v=20261031", alt: "調達・法務のAI・自動化アイデア10選の表紙" }]}
      desc="調達・法務の業務でMicrosoft 365 Copilot・Copilot Studio・Power Automateをどう使うかを、10のアイデアにまとめた資料です。業務の流れ、必要なデータ、測る指標、確認点を1件1ページで解説し、近い領域の公開事例6社、効果の測り方、導入前の確認も掲載しています。活用アイデアは当社の設計案です。"
      items={[
        "調達・法務の流れに沿った10のアイデアと、始める順番",
        "1件1ページの解説（業務の流れ・必要なデータ・測る指標・確認点）",
        "近い領域の公開事例：Vodafone、りそなグループ、早稲田大学、Games Global、Pets at Home、Komatsu Australia",
        "必要な製品の対応表・効果の測り方・導入前の確認",
      ]}
      docName="調達・法務のAI・自動化アイデア10選"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-27-p08.webp", alt: "取引先登録・審査依頼" },
        { src: "/biz/assets/img/documents/preview/ebook-27-p05.webp", alt: "調達・法務の10のアイデアの全体像" },
        { src: "/biz/assets/img/documents/preview/ebook-27-p01.webp", alt: "調達・法務のAI・自動化アイデア10選 表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-27-p01.webp", alt: "表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-27-p02.webp", alt: "目次" },
        { src: "/biz/assets/img/documents/preview/ebook-27-p03.webp", alt: "調達・法務の手間は3つに分けて考える" },
        { src: "/biz/assets/img/documents/preview/ebook-27-p04.webp", alt: "4つの製品の関係" },
        { src: "/biz/assets/img/documents/preview/ebook-27-p05.webp", alt: "調達・法務の10のアイデアの全体像" },
        { src: "/biz/assets/img/documents/preview/ebook-27-p08.webp", alt: "取引先登録・審査依頼" },
      ]}
    />
  );
}
