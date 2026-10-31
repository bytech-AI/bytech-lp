import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-ai" },
  title: "Power Automate活用事例集(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "Power AutomateとTeamsなど標準機能の公開事例16件を、公式発表の原文で確認してまとめた資料です。国内5件、海外7件、標準機能4件の取り組みを1件1ページで解説し、数字の性質、共通する進め方、削減工数の測り方も掲載しています。",
  robots: "noindex",
};

export default function DocAiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
