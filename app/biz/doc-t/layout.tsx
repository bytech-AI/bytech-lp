import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-t" },
  title: "生成AI 社内ガイドライン＆リスク対策ガイド(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "生成AIの社内ルールづくりのための資料です。実際に起きた事故3事例と、ガイドラインを整えた企業・自治体7事例を1件1ページで解説し、規程に入れる10項目、条文ひな形（18条）、運用チェックリスト、押さえておきたい公的な指針をまとめています。",
  robots: "noindex",
};

export default function DocTLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
