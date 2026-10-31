import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-aj" },
  title: "Copilot導入の進め方と最初に選ぶ業務8選(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "Copilot・Copilot Studio・Power Automateの導入を、どの業務から、どの順番で進めるかを整理した資料です。導入の4段階と進む判断、最初に選ぶ8業務の使い方、効果の測り方、始める前の確認15項目を掲載しています。活用アイデアは当社の設計案です。",
  robots: "noindex",
};

export default function DocAjLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
