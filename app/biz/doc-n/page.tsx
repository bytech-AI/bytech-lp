import DocDownloadPage from "../_doc/DocDownloadPage";

// 製造業のAI活用事例集（ebook-13）の個別DLページ。3点セットは /doc-a。
export default function DocNPage() {
  return (
    <DocDownloadPage
      title="【製造業のAI活用事例集】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-13-cover.webp", alt: "製造業のAI活用事例集の表紙" }]}
      desc="国内メーカー10社が公開しているAI活用の取り組みを、一覧と1社1ページの詳細でまとめた資料です。掲載している数値はすべて各社の公式発表にもとづく公表値で、出典を明記しています。自社で同じことをするなら何から着手すべきか、当社の見解も添えています。"
      items={[
        "製造業10社の取り組みと公表されている成果の一覧（設計・品質保証・設備保全・研究開発）",
        "1社1ページの詳細事例（背景と課題・取り組み・成果が出た理由・今後の展開）",
        "パナソニック コネクト、日立製作所、ダイキン工業、旭化成、日本精工ほか計10社",
        "各事例から自社に置き換えるときの着眼点",
      ]}
      docName="製造業のAI活用事例集"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-13-p03.webp", alt: "製造業10社の事例一覧" },
        { src: "/biz/assets/img/documents/preview/ebook-13-p05.webp", alt: "詳細事例" },
        { src: "/biz/assets/img/documents/preview/ebook-13-p01.webp", alt: "製造業のAI活用事例集 表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-13-p01.webp", alt: "製造業のAI活用事例集 表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-13-p02.webp", alt: "目次" },
        { src: "/biz/assets/img/documents/preview/ebook-13-p03.webp", alt: "事例一覧（1/2）" },
        { src: "/biz/assets/img/documents/preview/ebook-13-p04.webp", alt: "事例一覧（2/2）" },
        { src: "/biz/assets/img/documents/preview/ebook-13-p05.webp", alt: "詳細事例 パナソニック コネクト" },
        { src: "/biz/assets/img/documents/preview/ebook-13-p06.webp", alt: "詳細事例 日立製作所" },
      ]}
    />
  );
}
