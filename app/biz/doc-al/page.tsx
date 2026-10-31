import DocDownloadPage from "../_doc/DocDownloadPage";

// Copilot効果測定ガイド（ebook-37）の個別DLページ。3点セットは /doc-a。
export default function DocAlPage() {
  return (
    <DocDownloadPage
      title="【Copilot効果測定ガイド】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-37-cover.webp?v=20261031", alt: "Copilot効果測定ガイドの表紙" }]}
      desc="英国政府やMicrosoft Researchなど公開された5つの評価を読み解き、自社で記録する8つの指標、削減工数の計算の仕方、記録シート、報告前の確認12項目をまとめた資料です。"
      items={[
        "Microsoft Research、英国政府、NHSなど5つの評価の読み方",
        "削減工数の計算の仕方",
        "自社で記録する8つの指標",
        "記録シートと、報告前の確認12項目",
      ]}
      docName="Copilot効果測定ガイド"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-37-p03.webp", alt: "公開された5つの評価" },
        { src: "/biz/assets/img/documents/preview/ebook-37-p09.webp", alt: "記録シート" },
        { src: "/biz/assets/img/documents/preview/ebook-37-p01.webp", alt: "Copilot効果測定ガイド 表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-37-p01.webp", alt: "表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-37-p02.webp", alt: "目次" },
        { src: "/biz/assets/img/documents/preview/ebook-37-p03.webp", alt: "公開された5つの評価" },
        { src: "/biz/assets/img/documents/preview/ebook-37-p04.webp", alt: "平均の数字の裏側を見る" },
        { src: "/biz/assets/img/documents/preview/ebook-37-p05.webp", alt: "社内で報告するときの3つの原則" },
        { src: "/biz/assets/img/documents/preview/ebook-37-p09.webp", alt: "記録シート" },
      ]}
    />
  );
}
