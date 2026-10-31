import DocDownloadPage from "../_doc/DocDownloadPage";

// Power Automate活用事例集（ebook-34）の個別DLページ。3点セットは /doc-a。
export default function DocAiPage() {
  return (
    <DocDownloadPage
      title="【Power Automate活用事例集】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-34-cover.webp?v=20261031", alt: "Power Automate活用事例集の表紙" }]}
      desc="Power AutomateとTeamsなど標準機能の公開事例16件を、公式発表の原文で確認してまとめた資料です。国内5件、海外7件、標準機能4件の取り組みを1件1ページで解説し、数字の性質、共通する進め方、削減工数の測り方も掲載しています。"
      items={[
        "早稲田大学、富士フイルムビジネスイノベーション、渋谷区など国内5件",
        "Games Global、T-Mobile、Komatsu Australiaなど海外7件",
        "資生堂、Coop Norgeなど、標準機能で変えた4件",
        "始め方の4ステップと、削減工数の測り方",
      ]}
      docName="Power Automate活用事例集"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-34-p09.webp", alt: "早稲田大学の事例" },
        { src: "/biz/assets/img/documents/preview/ebook-34-p03.webp", alt: "16件の数字は、強さが違う" },
        { src: "/biz/assets/img/documents/preview/ebook-34-p01.webp", alt: "Power Automate活用事例集 表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-34-p01.webp", alt: "表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-34-p02.webp", alt: "目次" },
        { src: "/biz/assets/img/documents/preview/ebook-34-p03.webp", alt: "16件の数字は、強さが違う" },
        { src: "/biz/assets/img/documents/preview/ebook-34-p04.webp", alt: "何に使われているか" },
        { src: "/biz/assets/img/documents/preview/ebook-34-p06.webp", alt: "全社の大きな数字は、小さな自動化の積み上げ" },
        { src: "/biz/assets/img/documents/preview/ebook-34-p09.webp", alt: "早稲田大学の事例" },
      ]}
    />
  );
}
