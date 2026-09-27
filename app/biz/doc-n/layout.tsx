import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-n" },
  title: "製造業のAI活用事例集(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "国内メーカー10社が公開しているAI活用の取り組みを、一覧と1社1ページの詳細でまとめた資料です。設計・品質保証・設備保全・研究開発の各領域での成果を、出典つきで掲載しています。",
  robots: "noindex",
};

export default function DocNLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
