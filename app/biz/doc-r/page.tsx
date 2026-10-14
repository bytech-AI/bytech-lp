import DocDownloadPage from "../_doc/DocDownloadPage";

// 人材業界のAI活用事例集（ebook-17）の個別DLページ。3点セットは /doc-a。
export default function DocRPage() {
  return (
    <DocDownloadPage
      title="【人材業界のAI活用事例集】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-17-cover.webp?v=20261014", alt: "人材業界のAI活用事例集の表紙" }]}
      desc="国内人材サービス10社が公開しているAI活用の取り組みを、一覧と1社1ページの詳細でまとめた資料です。掲載している数値はすべて各社の公式発表にもとづく公表値で、出典を明記しています。自社で同じことをするなら何から着手すべきか、当社の見解も添えています。"
      items={[
        "人材業界10社の取り組みと公表されている成果の一覧（求人票作成・営業支援・全社活用・社員教育）",
        "1社1ページの詳細事例（取り組み・成果が出た理由・公表されている数値・今後の展開）",
        "パーソルキャリア、ディップ、ビズリーチ、マイナビ、リクルートほか計10社",
        "各事例から自社に置き換えるときの着眼点",
      ]}
      docName="人材業界のAI活用事例集"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-17-p03.webp", alt: "人材業界10社の事例一覧" },
        { src: "/biz/assets/img/documents/preview/ebook-17-p05.webp", alt: "詳細事例" },
        { src: "/biz/assets/img/documents/preview/ebook-17-p01.webp", alt: "人材業界のAI活用事例集 表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-17-p01.webp", alt: "人材業界のAI活用事例集 表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-17-p02.webp", alt: "目次" },
        { src: "/biz/assets/img/documents/preview/ebook-17-p03.webp", alt: "事例一覧（1/2）" },
        { src: "/biz/assets/img/documents/preview/ebook-17-p04.webp", alt: "事例一覧（2/2）" },
        { src: "/biz/assets/img/documents/preview/ebook-17-p05.webp", alt: "詳細事例 パーソルキャリア" },
        { src: "/biz/assets/img/documents/preview/ebook-17-p06.webp", alt: "詳細事例 ディップ" },
      ]}
    />
  );
}
