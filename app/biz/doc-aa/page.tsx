import DocDownloadPage from "../_doc/DocDownloadPage";

// 経理・財務のAI・自動化アイデア10選（ebook-26）の個別DLページ。3点セットは /doc-a。
export default function DocAaPage() {
  return (
    <DocDownloadPage
      title="【経理・財務のAI・自動化アイデア10選】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-26-cover.webp?v=20261031", alt: "経理・財務のAI・自動化アイデア10選の表紙" }]}
      desc="経理・財務の業務でMicrosoft 365 Copilot・Copilot Studio・Power Automateをどう使うかを、10のアイデアにまとめた資料です。業務の流れ、必要なデータ、測る指標、確認点を1件1ページで解説し、近い領域の公開事例6社、効果の測り方、導入前の確認も掲載しています。活用アイデアは当社の設計案です。"
      items={[
        "経理・財務の流れに沿った10のアイデアと、始める順番",
        "1件1ページの解説（業務の流れ・必要なデータ・測る指標・確認点）",
        "近い領域の公開事例：早稲田大学、渋谷区、AKKODiSコンサルティング、Dow、Komatsu Australia、Cineplex",
        "必要な製品の対応表・効果の測り方・導入前の確認",
      ]}
      docName="経理・財務のAI・自動化アイデア10選"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-26-p08.webp", alt: "予算申請・承認" },
        { src: "/biz/assets/img/documents/preview/ebook-26-p05.webp", alt: "経理・財務の10のアイデアの全体像" },
        { src: "/biz/assets/img/documents/preview/ebook-26-p01.webp", alt: "経理・財務のAI・自動化アイデア10選 表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-26-p01.webp", alt: "表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-26-p02.webp", alt: "目次" },
        { src: "/biz/assets/img/documents/preview/ebook-26-p03.webp", alt: "経理・財務の手間は3つに分けて考える" },
        { src: "/biz/assets/img/documents/preview/ebook-26-p04.webp", alt: "4つの製品の関係" },
        { src: "/biz/assets/img/documents/preview/ebook-26-p05.webp", alt: "経理・財務の10のアイデアの全体像" },
        { src: "/biz/assets/img/documents/preview/ebook-26-p08.webp", alt: "予算申請・承認" },
      ]}
    />
  );
}
