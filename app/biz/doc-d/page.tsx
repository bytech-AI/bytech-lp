import DocDownloadPage from "../_doc/DocDownloadPage";

// AI導入を成功させる50のチェックシート（ebook-03）の個別DLページ。3点セットは /doc-a。
export default function DocDPage() {
  return (
    <DocDownloadPage
      title="【AI導入を成功させる50のチェックシート】【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-03-cover.webp", alt: "AI導入を成功させる50のチェックシートの表紙" }]}
      desc="社内のAI活用が「導入したのに使われない」状態に陥らないための50項目のチェックシートです。5カテゴリで現状を可視化し、スコアからフェーズ別の次の一手がわかります。"
      items={[
        "なぜ「導入したのに使われない」が起きるのか",
        "50のチェックリスト（目的設定・推進体制・ルール・教育・定着の5カテゴリ）",
        "スコア判定：自社はどのフェーズか",
        "フェーズ別・次の一手",
      ]}
      docName="AI導入50チェックシート"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-03-p05.webp", alt: "カテゴリ1 目的設定のチェック項目" },
        { src: "/biz/assets/img/documents/preview/ebook-03-p10.webp", alt: "スコア判定（3フェーズ）" },
        { src: "/biz/assets/img/documents/preview/ebook-03-p01.webp", alt: "AI導入を成功させる50のチェックシート 表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-03-p01.webp", alt: "AI導入を成功させる50のチェックシート 表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-03-p02.webp", alt: "目次" },
        { src: "/biz/assets/img/documents/preview/ebook-03-p03.webp", alt: "なぜ「導入したのに使われない」が起きるのか" },
        { src: "/biz/assets/img/documents/preview/ebook-03-p04.webp", alt: "チェックシートの使い方（3ステップ）" },
        { src: "/biz/assets/img/documents/preview/ebook-03-p05.webp", alt: "カテゴリ1 目的設定のチェック項目" },
        { src: "/biz/assets/img/documents/preview/ebook-03-p10.webp", alt: "スコア判定（3フェーズ）" },
        { src: "/biz/assets/img/documents/preview/ebook-03-p11.webp", alt: "フェーズ別・次の一手" },
      ]}
    />
  );
}
