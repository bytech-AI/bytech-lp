import DocDownloadPage from "../_doc/DocDownloadPage";

// 生成AI 社内ガイドライン＆リスク対策ガイド（ebook-19）の個別DLページ。3点セットは /doc-a。
export default function DocTPage() {
  return (
    <DocDownloadPage
      title="【生成AI 社内ガイドライン＆リスク対策ガイド】「バイテック法人AI研修」【資料ダウンロード】"
      covers={[{ src: "/biz/assets/img/documents/ebook-19-cover.webp?v=20261014c", alt: "生成AI 社内ガイドライン＆リスク対策ガイドの表紙" }]}
      desc="生成AIの社内ルールづくりのための資料です。実際に起きた事故3事例と、ガイドラインを整えた企業・自治体7事例を1件1ページで解説し、規程に入れる10項目、条文ひな形（18条）、運用チェックリスト、押さえておきたい公的な指針をまとめています。"
      items={[
        "実際に起きた事故3事例（情報漏洩・著作権・誤情報）の経緯と防ぎ方",
        "パナソニック コネクト、NEC、LINEヤフー、日立製作所、東京都、デジタル庁、横須賀市のガイドライン事例",
        "社内ガイドラインに入れる10項目と、そのまま自社用に直せる条文ひな形（18条）",
        "運用チェックリスト18項目と、参照したい公的な指針",
      ]}
      docName="生成AI 社内ガイドライン＆リスク対策ガイド"
      stack={[
        { src: "/biz/assets/img/documents/preview/ebook-19-p03.webp", alt: "なぜ今ルールが必要か" },
        { src: "/biz/assets/img/documents/preview/ebook-19-p04.webp", alt: "主なリスク一覧" },
        { src: "/biz/assets/img/documents/preview/ebook-19-p01.webp", alt: "生成AI 社内ガイドライン＆リスク対策ガイド 表紙" },
      ]}
      carousel={[
        { src: "/biz/assets/img/documents/preview/ebook-19-p01.webp", alt: "表紙" },
        { src: "/biz/assets/img/documents/preview/ebook-19-p02.webp", alt: "目次" },
        { src: "/biz/assets/img/documents/preview/ebook-19-p03.webp", alt: "なぜ今ルールが必要か" },
        { src: "/biz/assets/img/documents/preview/ebook-19-p04.webp", alt: "主なリスク一覧" },
        { src: "/biz/assets/img/documents/preview/ebook-19-p05.webp", alt: "章扉 実際に起きたこと" },
        { src: "/biz/assets/img/documents/preview/ebook-19-p06.webp", alt: "事故事例 A" },
      ]}
    />
  );
}
