import DocDownloadPage from "../_doc/DocDownloadPage";

// 医療・介護のAI活用事例集（ebook-15）の個別DLページ。3点セットは /doc-a。
export default function DocPPage() {
  return (
    <DocDownloadPage
      title="【医療・介護のAI活用事例集】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-15-cover.webp?v=20261014", alt: "医療・介護のAI活用事例集の表紙" }]}
      desc="病院・介護事業者10法人が公開しているAI活用の取り組みを、一覧と1法人1ページの詳細でまとめた資料です。掲載している数値はすべて各社の公式発表にもとづく公表値で、出典を明記しています。自社で同じことをするなら何から着手すべきか、当社の見解も添えています。"
      items={[
        "医療・介護10法人の取り組みと公表されている成果の一覧（退院サマリー・看護記録・介護記録・全職員での活用）",
        "1法人1ページの詳細事例（取り組み・成果が出た理由・公表されている数値・今後の展開）",
        "藤田医科大学病院、長野市民病院、相澤病院、シーユーシー、ベネッセスタイルケアほか計10法人",
        "各事例から自社に置き換えるときの着眼点",
      ]}
      docName="医療・介護のAI活用事例集"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-15-p03.webp", alt: "医療・介護10法人の事例一覧" },
        { src: "/biz/assets/img/documents/preview/ebook-15-p05.webp", alt: "詳細事例" },
        { src: "/biz/assets/img/documents/preview/ebook-15-p01.webp", alt: "医療・介護のAI活用事例集 表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-15-p01.webp", alt: "医療・介護のAI活用事例集 表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-15-p02.webp", alt: "目次" },
        { src: "/biz/assets/img/documents/preview/ebook-15-p03.webp", alt: "事例一覧（1/2）" },
        { src: "/biz/assets/img/documents/preview/ebook-15-p04.webp", alt: "事例一覧（2/2）" },
        { src: "/biz/assets/img/documents/preview/ebook-15-p05.webp", alt: "詳細事例 藤田医科大学病院" },
        { src: "/biz/assets/img/documents/preview/ebook-15-p06.webp", alt: "詳細事例 長野市民病院" },
      ]}
    />
  );
}
