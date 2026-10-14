import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-q" },
  title: "コンサルティング業のAI活用事例集(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "国内コンサルティングファーム10社が公開しているAI活用の取り組みを、一覧と1社1ページの詳細でまとめた資料です。全社活用・提案書作成・調査分析・ナレッジ活用の各領域について、各社の公式発表にもとづく公表値を出典つきで掲載しています。",
  robots: "noindex",
};

export default function DocQLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
