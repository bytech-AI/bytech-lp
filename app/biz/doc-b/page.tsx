import DocDownloadPage from "../_doc/DocDownloadPage";

// サービス概要資料（ebook-01）の個別DLページ。3点セットは /doc-a。
export default function DocBPage() {
  return (
    <DocDownloadPage
      title="【サービス概要資料】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-01-cover.webp", alt: "サービス概要資料の表紙" }]}
      desc="実務伴走型の法人向けAI研修「バイテック法人AI研修」のサービス全体像をまとめた資料です。検討に必要な情報をこの1冊に収録しています。"
      items={[
        "研修プランと6つのコース（学習環境・サポート体制・スケジュール）",
        "料金詳細と助成金活用（AI業務効率化研修／AI業務自動化研修）",
        "導入実績・導入事例",
        "講師紹介・研修開始までの流れ・会社概要",
      ]}
      docName="サービス概要資料"
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-01-p01.webp", alt: "サービス概要資料 表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-01-p02.webp", alt: "目次" },
        { src: "/biz/assets/img/documents/preview/ebook-01-p05.webp", alt: "サポートの鍵になる3つの学習環境" },
        { src: "/biz/assets/img/documents/preview/ebook-01-p06.webp", alt: "対応する6つのコース" },
        { src: "/biz/assets/img/documents/preview/ebook-01-p08.webp", alt: "60日間の研修プログラム" },
        { src: "/biz/assets/img/documents/preview/ebook-01-p14.webp", alt: "累計受講企業300社の実績" },
        { src: "/biz/assets/img/documents/preview/ebook-01-p15.webp", alt: "導入事例" },
        { src: "/biz/assets/img/documents/preview/ebook-01-p21.webp", alt: "研修開始までの流れ" },
      ]}
    />
  );
}
