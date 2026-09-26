import DocDownloadPage from "../_doc/DocDownloadPage";

// AI研修タイプ 比較ガイド（ebook-04）の個別DLページ。3点セットは /doc-a。
export default function DocEPage() {
  return (
    <DocDownloadPage
      title="【AI研修タイプ 比較ガイド】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-04-cover.webp", alt: "AI研修タイプ 比較ガイドの表紙" }]}
      desc="eラーニング・セミナー・ハンズオン・ワークショップ、4つの研修タイプの違いをまとめた資料です。タイプごとの概要・料金目安・見込める効果・導入事例・FAQに加え、比較表と目的別の選び方で、貴社に合う研修タイプを検討できます。"
      items={[
        "4つの研修タイプ（eラーニング／集団研修／ハンズオン研修／ワークショップ）の概要と実施方法",
        "タイプ別の料金目安と、料金に含まれるもの・変動する要素",
        "見込める効果と導入事例、よくあるご質問",
        "比較表と目的別の選び方、研修開始までの流れ",
      ]}
      docName="AI研修タイプ比較ガイド"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-04-p04.webp", alt: "4つの研修タイプ 全体像" },
        { src: "/biz/assets/img/documents/preview/ebook-04-p28.webp", alt: "4つの研修タイプ 比較表" },
        { src: "/biz/assets/img/documents/preview/ebook-04-p01.webp", alt: "AI研修タイプ 比較ガイド 表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-04-p01.webp", alt: "AI研修タイプ 比較ガイド 表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-04-p02.webp", alt: "目次" },
        { src: "/biz/assets/img/documents/preview/ebook-04-p04.webp", alt: "4つの研修タイプ 全体像" },
        { src: "/biz/assets/img/documents/preview/ebook-04-p05.webp", alt: "eラーニング 概要" },
        { src: "/biz/assets/img/documents/preview/ebook-04-p06.webp", alt: "eラーニング 料金" },
        { src: "/biz/assets/img/documents/preview/ebook-04-p28.webp", alt: "4つの研修タイプ 比較表" },
        { src: "/biz/assets/img/documents/preview/ebook-04-p29.webp", alt: "目的別の選び方" },
      ]}
    />
  );
}
