import DocDownloadPage from "../_doc/DocDownloadPage";

// 製品の使い分けとライセンス確認ガイド（ebook-36）の個別DLページ。3点セットは /doc-a。
export default function DocAkPage() {
  return (
    <DocDownloadPage
      title="【製品の使い分けとライセンス確認ガイド】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-36-cover.webp?v=20261031b", alt: "製品の使い分けとライセンス確認ガイドの表紙" }]}
      desc="Copilot・Copilot Studio・Power Automateの役割と選び方、導入時に確認するライセンスと課金の条件を、2026年10月時点の公式資料をもとに整理した資料です。データと運用の確認点、契約前に確かめる15項目も掲載しています。価格は記載していません。"
      items={[
        "4つの製品の関係と、やりたいことからの選び方",
        "Copilot、Copilot Studio、Power Automateの確認事項",
        "データと権限、公開後の運用で決めておくこと",
        "契約前に確かめる15項目",
      ]}
      docName="製品の使い分けとライセンス確認ガイド"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-36-p03.webp", alt: "4つの製品の関係" },
        { src: "/biz/assets/img/documents/preview/ebook-36-p04.webp", alt: "やりたいことから製品を選ぶ" },
        { src: "/biz/assets/img/documents/preview/ebook-36-p01.webp", alt: "製品の使い分けとライセンス確認ガイド 表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-36-p01.webp", alt: "表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-36-p02.webp", alt: "目次" },
        { src: "/biz/assets/img/documents/preview/ebook-36-p03.webp", alt: "4つの製品の関係" },
        { src: "/biz/assets/img/documents/preview/ebook-36-p04.webp", alt: "やりたいことから製品を選ぶ" },
        { src: "/biz/assets/img/documents/preview/ebook-36-p05.webp", alt: "Copilotの確認事項" },
        { src: "/biz/assets/img/documents/preview/ebook-36-p10.webp", alt: "契約前に確かめる15項目" },
      ]}
    />
  );
}
