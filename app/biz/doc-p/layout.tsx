import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-p" },
  title: "医療・介護のAI活用事例集(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "病院・介護事業者10法人が公開しているAI活用の取り組みを、一覧と1法人1ページの詳細でまとめた資料です。退院サマリー・看護記録・介護記録・全職員での活用の各領域について、各社の公式発表にもとづく公表値を出典つきで掲載しています。",
  robots: "noindex",
};

export default function DocPLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
