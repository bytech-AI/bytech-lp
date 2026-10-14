import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-v" },
  title: "AI人材育成計画の立て方(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "AI人材の育成計画を立てるための実務ガイドです。現状把握から人材像（3層モデル）、育成プログラム、定着と評価までの4ステップと、育成に取り組む企業8社の事例を1社1ページで解説し、層別カリキュラム例、年間計画、KPI、助成金、計画シートのひな形をまとめています。",
  robots: "noindex",
};

export default function DocVLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
