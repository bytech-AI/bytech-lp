import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-ah" },
  title: "Copilot Studio活用事例集(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "Copilot Studioの公開事例16件を、公式発表の原文で確認してまとめた資料です。国内5件、海外11件の取り組みを1件1ページで解説し、数字の性質、共通する進め方、自己解決率の測り方も掲載しています。",
  robots: "noindex",
};

export default function DocAhLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
