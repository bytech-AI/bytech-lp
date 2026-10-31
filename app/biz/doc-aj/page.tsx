import DocDownloadPage from "../_doc/DocDownloadPage";

// Copilot導入の進め方と最初に選ぶ業務8選（ebook-35）の個別DLページ。3点セットは /doc-a。
export default function DocAjPage() {
  return (
    <DocDownloadPage
      title="【Copilot導入の進め方と最初に選ぶ業務8選】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-35-cover.webp?v=20261031b", alt: "Copilot導入の進め方と最初に選ぶ業務8選の表紙" }]}
      desc="Copilot・Copilot Studio・Power Automateの導入を、どの業務から、どの順番で進めるかを整理した資料です。導入の4段階と進む判断、最初に選ぶ8業務の使い方、効果の測り方、始める前の確認15項目を掲載しています。活用アイデアは当社の設計案です。"
      items={[
        "導入の4段階と、次の段階へ進む判断",
        "最初の業務を選ぶ3つの基準",
        "議事メモ、メール、受付・承認など8業務を1件1ページで解説",
        "効果の測り方と、始める前の確認15項目",
      ]}
      docName="Copilot導入の進め方と最初に選ぶ業務8選"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-35-p06.webp", alt: "先に検討したい8つの業務" },
        { src: "/biz/assets/img/documents/preview/ebook-35-p03.webp", alt: "導入は4つの段階で進める" },
        { src: "/biz/assets/img/documents/preview/ebook-35-p01.webp", alt: "Copilot導入の進め方と最初に選ぶ業務8選 表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-35-p01.webp", alt: "表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-35-p02.webp", alt: "目次" },
        { src: "/biz/assets/img/documents/preview/ebook-35-p03.webp", alt: "導入は4つの段階で進める" },
        { src: "/biz/assets/img/documents/preview/ebook-35-p05.webp", alt: "最初の業務を選ぶ3つの基準" },
        { src: "/biz/assets/img/documents/preview/ebook-35-p06.webp", alt: "先に検討したい8つの業務" },
        { src: "/biz/assets/img/documents/preview/ebook-35-p08.webp", alt: "会議の議事メモ" },
      ]}
    />
  );
}
