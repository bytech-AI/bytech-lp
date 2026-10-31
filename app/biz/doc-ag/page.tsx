import DocDownloadPage from "../_doc/DocDownloadPage";

// Copilot活用事例集（ebook-32）の個別DLページ。3点セットは /doc-a。
export default function DocAgPage() {
  return (
    <DocDownloadPage
      title="【Copilot活用事例集】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-32-cover.webp?v=20261031f", alt: "Copilot活用事例集の表紙" }]}
      desc="Microsoft 365 Copilotの公開事例18件を、公式発表の原文で確認してまとめた資料です。国内6件、海外8件、英国の公的機関4件の取り組みを1件1ページで解説し、申告・見込み・推定といった数字の性質、定着に向けた進め方、効果の測り方も掲載しています。"
      items={[
        "JAF、JCB、デンソー、住友商事、INPEX、東京建物など国内6件",
        "Vodafone、Capita、Grant Thornton Australiaなど海外8件",
        "英国政府、HMRC、DWP、NHS Englandの検証と、その限界",
        "数字の読み方、定着に向けた進め方、効果の測り方",
      ]}
      docName="Copilot活用事例集"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-32-p09.webp", alt: "日本自動車連盟（JAF）の事例" },
        { src: "/biz/assets/img/documents/preview/ebook-32-p03.webp", alt: "18件の数字は、強さが違う" },
        { src: "/biz/assets/img/documents/preview/ebook-32-p01.webp", alt: "Copilot活用事例集 表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-32-p01.webp", alt: "表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-32-p02.webp", alt: "目次" },
        { src: "/biz/assets/img/documents/preview/ebook-32-p03.webp", alt: "18件の数字は、強さが違う" },
        { src: "/biz/assets/img/documents/preview/ebook-32-p04.webp", alt: "何に使われているか" },
        { src: "/biz/assets/img/documents/preview/ebook-32-p06.webp", alt: "人数を段階的に広げた例" },
        { src: "/biz/assets/img/documents/preview/ebook-32-p09.webp", alt: "日本自動車連盟（JAF）の事例" },
      ]}
    />
  );
}
