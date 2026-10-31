import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-al" },
  title: "Copilot効果測定ガイド(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "英国政府やMicrosoft Researchなど公開された5つの評価を読み解き、自社で記録する8つの指標、削減工数の計算の仕方、記録シート、報告前の確認12項目をまとめた資料です。",
  robots: "noindex",
};

export default function DocAlLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
