import DocDownloadPage from "../_doc/DocDownloadPage";

// AI人材育成計画の立て方（ebook-21）の個別DLページ。3点セットは /doc-a。
export default function DocVPage() {
  return (
    <DocDownloadPage
      title="【AI人材育成計画の立て方】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-21-cover.webp?v=20261014c", alt: "AI人材育成計画の立て方の表紙" }]}
      desc="AI人材の育成計画を立てるための実務ガイドです。現状把握から人材像（3層モデル）、育成プログラム、定着と評価までの4ステップと、育成に取り組む企業8社の事例を1社1ページで解説し、層別カリキュラム例、年間計画、KPI、助成金、計画シートのひな形をまとめています。"
      items={[
        "単発研修で終わる3つの失敗と、計画づくりの4ステップ",
        "全社員・推進リーダー・開発人材の3層モデル（デジタルスキル標準との対応）",
        "ソフトバンク、LINEヤフー、旭化成、ダイキン工業、東京海上、日立製作所、JR東日本、富士フイルムの育成事例",
        "層別カリキュラム例・12か月の年間計画・KPI・助成金と、そのまま使える計画シート",
      ]}
      docName="AI人材育成計画の立て方"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-21-p03.webp", alt: "単発研修で終わる3つの失敗" },
        { src: "/biz/assets/img/documents/preview/ebook-21-p04.webp", alt: "計画づくりの4ステップ" },
        { src: "/biz/assets/img/documents/preview/ebook-21-p01.webp", alt: "AI人材育成計画の立て方 表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-21-p01.webp", alt: "表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-21-p02.webp", alt: "目次" },
        { src: "/biz/assets/img/documents/preview/ebook-21-p03.webp", alt: "単発研修で終わる3つの失敗" },
        { src: "/biz/assets/img/documents/preview/ebook-21-p04.webp", alt: "計画づくりの4ステップ" },
        { src: "/biz/assets/img/documents/preview/ebook-21-p05.webp", alt: "現状把握のアセスメント" },
        { src: "/biz/assets/img/documents/preview/ebook-21-p06.webp", alt: "3層の人材モデル" },
      ]}
    />
  );
}
