import DocDownloadPage from "../_doc/DocDownloadPage";

// Copilot Studio活用事例集（ebook-33）の個別DLページ。3点セットは /doc-a。
export default function DocAhPage() {
  return (
    <DocDownloadPage
      title="【Copilot Studio活用事例集】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-33-cover.webp?v=20261031", alt: "Copilot Studio活用事例集の表紙" }]}
      desc="Copilot Studioの公開事例16件を、公式発表の原文で確認してまとめた資料です。国内5件、海外11件の取り組みを1件1ページで解説し、数字の性質、共通する進め方、自己解決率の測り方も掲載しています。"
      items={[
        "SCSK、オービックビジネスコンサルタント、りそなグループなど国内5件",
        "PG&E、Holland America Line、Rabobankなど海外11件",
        "申告・見込みなど、数字の性質と読み方",
        "始め方の4ステップと、自己解決率の測り方",
      ]}
      docName="Copilot Studio活用事例集"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-33-p09.webp", alt: "SCSKの事例" },
        { src: "/biz/assets/img/documents/preview/ebook-33-p03.webp", alt: "16件の数字は、強さが違う" },
        { src: "/biz/assets/img/documents/preview/ebook-33-p01.webp", alt: "Copilot Studio活用事例集 表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-33-p01.webp", alt: "表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-33-p02.webp", alt: "目次" },
        { src: "/biz/assets/img/documents/preview/ebook-33-p03.webp", alt: "16件の数字は、強さが違う" },
        { src: "/biz/assets/img/documents/preview/ebook-33-p04.webp", alt: "何に使われているか" },
        { src: "/biz/assets/img/documents/preview/ebook-33-p06.webp", alt: "公開範囲と応答の変化" },
        { src: "/biz/assets/img/documents/preview/ebook-33-p09.webp", alt: "SCSKの事例" },
      ]}
    />
  );
}
