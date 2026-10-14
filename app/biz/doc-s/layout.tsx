import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-s" },
  title: "卸売・商社のAI活用事例集(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "国内の商社・卸売10社が公開しているAI活用の取り組みを、一覧と1社1ページの詳細でまとめた資料です。全社活用・見積・問い合わせ対応・発注の各領域について、各社の公式発表にもとづく公表値を出典つきで掲載しています。",
  robots: "noindex",
};

export default function DocSLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
