import DocDownloadPage from "../_doc/DocDownloadPage";

// 法人向け 生成AIツール比較ガイド（ebook-20）の個別DLページ。3点セットは /doc-a。
export default function DocUPage() {
  return (
    <DocDownloadPage
      title="【法人向け 生成AIツール比較ガイド】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-20-cover.webp?v=20261014c", alt: "法人向け 生成AIツール比較ガイドの表紙" }]}
      desc="ChatGPT・Gemini・Microsoft 365 Copilot・Claudeを、法人プランの料金、セキュリティ・データの扱い、管理機能、用途別の得意分野で比較した資料です。50人・100人・300人での費用試算と、ツールごとに2社ずつ計8社の導入事例（選んだ理由・展開・成果）を掲載しています。"
      items={[
        "4ツールの法人プランと料金、人数条件の比較（各社公式ページ、2026年10月時点）",
        "入力データの学習利用・保存地域・管理機能の比較と、50／100／300人の費用試算",
        "MIXI、三井不動産、Sky、みんなの銀行、参天製薬、JCB、NEC、エクスペリサスの導入事例",
        "事例から見る選び方の傾向と、組み合わせて使うときの考え方",
      ]}
      docName="法人向け 生成AIツール比較ガイド"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-20-p03.webp", alt: "結論サマリー" },
        { src: "/biz/assets/img/documents/preview/ebook-20-p04.webp", alt: "選ぶときの5つの観点" },
        { src: "/biz/assets/img/documents/preview/ebook-20-p01.webp", alt: "法人向け 生成AIツール比較ガイド 表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-20-p01.webp", alt: "表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-20-p02.webp", alt: "目次" },
        { src: "/biz/assets/img/documents/preview/ebook-20-p03.webp", alt: "結論サマリー" },
        { src: "/biz/assets/img/documents/preview/ebook-20-p04.webp", alt: "選ぶときの5つの観点" },
        { src: "/biz/assets/img/documents/preview/ebook-20-p05.webp", alt: "4ツールの法人プランと料金" },
        { src: "/biz/assets/img/documents/preview/ebook-20-p06.webp", alt: "セキュリティとデータの扱い" },
      ]}
    />
  );
}
