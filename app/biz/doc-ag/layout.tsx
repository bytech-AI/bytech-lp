import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-ag" },
  title: "Copilot活用事例集(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "Microsoft 365 Copilotの公開事例18件を、公式発表の原文で確認してまとめた資料です。国内6件、海外8件、英国の公的機関4件の取り組みを1件1ページで解説し、申告・見込み・推定といった数字の性質、定着に向けた進め方、効果の測り方も掲載しています。",
  robots: "noindex",
};

export default function DocAgLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
