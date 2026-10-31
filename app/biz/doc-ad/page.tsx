import DocDownloadPage from "../_doc/DocDownloadPage";

// 製造・建設・物流のAI・自動化アイデア10選（ebook-29）の個別DLページ。3点セットは /doc-a。
export default function DocAdPage() {
  return (
    <DocDownloadPage
      title="【製造・建設・物流のAI・自動化アイデア10選】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-29-cover.webp?v=20261031", alt: "製造・建設・物流のAI・自動化アイデア10選の表紙" }]}
      desc="製造・建設・物流の業務でMicrosoft 365 Copilot・Copilot Studio・Power Automateをどう使うかを、10のアイデアにまとめた資料です。業務の流れ、必要なデータ、測る指標、確認点を1件1ページで解説し、近い領域の公開事例6社、効果の測り方、導入前の確認も掲載しています。活用アイデアは当社の設計案です。"
      items={[
        "製造・建設・物流の流れに沿った10のアイデアと、始める順番",
        "1件1ページの解説（業務の流れ・必要なデータ・測る指標・確認点）",
        "近い領域の公開事例：デンソー、鹿島建設、富士フイルムビジネスイノベーション、コスモ石油販売、Dow、Evergy",
        "必要な製品の対応表・効果の測り方・導入前の確認",
      ]}
      docName="製造・建設・物流のAI・自動化アイデア10選"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-29-p08.webp", alt: "現場訪問前の情報整理" },
        { src: "/biz/assets/img/documents/preview/ebook-29-p05.webp", alt: "製造・建設・物流の10のアイデアの全体像" },
        { src: "/biz/assets/img/documents/preview/ebook-29-p01.webp", alt: "製造・建設・物流のAI・自動化アイデア10選 表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-29-p01.webp", alt: "表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-29-p02.webp", alt: "目次" },
        { src: "/biz/assets/img/documents/preview/ebook-29-p03.webp", alt: "製造・建設・物流の手間は3つに分けて考える" },
        { src: "/biz/assets/img/documents/preview/ebook-29-p04.webp", alt: "4つの製品の関係" },
        { src: "/biz/assets/img/documents/preview/ebook-29-p05.webp", alt: "製造・建設・物流の10のアイデアの全体像" },
        { src: "/biz/assets/img/documents/preview/ebook-29-p08.webp", alt: "現場訪問前の情報整理" },
      ]}
    />
  );
}
