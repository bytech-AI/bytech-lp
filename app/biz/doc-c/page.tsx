import DocDownloadPage from "../_doc/DocDownloadPage";

// 助成金活用ガイド（ebook-02）の個別DLページ。3点セットは /doc-a。
export default function DocCPage() {
  return (
    <DocDownloadPage
      title="【助成金活用ガイド】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-02-cover.webp", alt: "助成金活用ガイドの表紙" }]}
      desc="人材開発支援助成金「事業展開等リスキリング支援コース」を使って、AI研修の費用負担を最大75%抑える方法をまとめた資料です。要件の確認から申請の流れまで、この1冊にまとめています。"
      items={[
        "助成金でいくら戻るのか（助成率・限度額・試算例）",
        "自社で使えるかの事前チェック（13項目）",
        "知らないと損する、つまずきポイント",
        "申請スケジュールと必要書類",
      ]}
      docName="助成金活用ガイド"
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-02-p01.webp", alt: "助成金活用ガイド 表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-02-p02.webp", alt: "この資料でわかること" },
        { src: "/biz/assets/img/documents/preview/ebook-02-p03.webp", alt: "結論：AI研修は助成金の対象になり得ます" },
        { src: "/biz/assets/img/documents/preview/ebook-02-p06.webp", alt: "助成率・限度額一覧" },
        { src: "/biz/assets/img/documents/preview/ebook-02-p08.webp", alt: "試算例" },
        { src: "/biz/assets/img/documents/preview/ebook-02-p11.webp", alt: "事前チェックリスト" },
        { src: "/biz/assets/img/documents/preview/ebook-02-p14.webp", alt: "知らないと損する、つまずきポイント" },
        { src: "/biz/assets/img/documents/preview/ebook-02-p18.webp", alt: "申請の流れ" },
      ]}
    />
  );
}
