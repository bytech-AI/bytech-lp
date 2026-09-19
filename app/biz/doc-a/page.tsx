import DocDownloadPage from "../_doc/DocDownloadPage";

// お役立ち資料3点セットのDLページ。個別資料は /doc-b（概要）/doc-c（助成金）/doc-d（チェックシート）。
export default function DocAPage() {
  return (
    <DocDownloadPage
      title="【お役立ち資料3点セット】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[
        { src: "/biz/assets/img/documents/ebook-01-cover.webp", alt: "サービス概要資料の表紙" },
        { src: "/biz/assets/img/documents/ebook-02-cover.webp", alt: "助成金活用ガイドの表紙" },
        { src: "/biz/assets/img/documents/ebook-03-cover.webp", alt: "AI導入を成功させる50のチェックシートの表紙" },
      ]}
      desc="人気の3冊「サービス概要資料」「助成金活用ガイド」「AI導入を成功させる50のチェックシート」をセットで無料ダウンロードできます。"
      items={[
        "サービス概要資料：研修プラン・料金・導入事例・サポート体制",
        "助成金活用ガイド：研修費用を最大75%抑える要件・試算例・申請の流れ",
        "AI導入を成功させる50のチェックシート：5カテゴリ50項目で組織の現状を可視化",
      ]}
      docName="お役立ち資料3点セット"
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
