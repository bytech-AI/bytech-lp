import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-ak" },
  title: "製品の使い分けとライセンス確認ガイド(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "Copilot・Copilot Studio・Power Automateの役割と選び方、導入時に確認するライセンスと課金の条件を、2026年10月時点の公式資料をもとに整理した資料です。データと運用の確認点、契約前に確かめる15項目も掲載しています。価格は記載していません。",
  robots: "noindex",
};

export default function DocAkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
