import DocDownloadPage from "../_doc/DocDownloadPage";

// 法人向けAIeラーニング サービス概要資料（ebook-39）の個別DLページ。LPは /e-learning。
export default function DocAnPage() {
  return (
    <DocDownloadPage
      title="【法人向けAIeラーニング サービス概要資料】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-39-cover.webp", alt: "法人向けAIeラーニング サービス概要資料の表紙" }]}
      desc="1IDあたり月額2,980円（税抜）で1,000本以上のAI講座が見放題になる、法人向けAIeラーニングのサービス概要資料です。専用LMSとAI機能で学び続けられる仕組みから、プログラム一覧、料金・助成金の活用、受講開始までの流れまで、導入のご検討に必要な情報をまとめています。"
      items={[
        "社内のAI教育の課題と、eラーニングでの解決方法",
        "目的の登録から達成までの学習サイクルと5つの特長",
        "受講者向け・研修管理者向けのAI機能",
        "プログラム一覧と料金・助成金（定額制訓練）",
        "受講開始までの3ステップ・よくあるご質問",
      ]}
      docName="法人向けAIeラーニングサービス概要資料"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-39-p03.webp", alt: "eラーニングとは" },
        { src: "/biz/assets/img/documents/preview/ebook-39-p12.webp", alt: "研修管理者向けのAI機能" },
        { src: "/biz/assets/img/documents/preview/ebook-39-p01.webp", alt: "表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-39-p01.webp", alt: "表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-39-p03.webp", alt: "eラーニングとは" },
        { src: "/biz/assets/img/documents/preview/ebook-39-p04.webp", alt: "こんな課題を解決します" },
        { src: "/biz/assets/img/documents/preview/ebook-39-p05.webp", alt: "学習サイクル" },
        { src: "/biz/assets/img/documents/preview/ebook-39-p06.webp", alt: "特長" },
        { src: "/biz/assets/img/documents/preview/ebook-39-p11.webp", alt: "受講者向けのAI機能" },
        { src: "/biz/assets/img/documents/preview/ebook-39-p12.webp", alt: "研修管理者向けのAI機能" },
        { src: "/biz/assets/img/documents/preview/ebook-39-p13.webp", alt: "プログラム一覧" },
        { src: "/biz/assets/img/documents/preview/ebook-39-p14.webp", alt: "料金" },
      ]}
    />
  );
}
