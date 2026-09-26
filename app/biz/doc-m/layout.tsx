import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-m" },
  title: "Dify研修 コース紹介資料(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "バイテック法人AI研修の「Dify研修 コース紹介資料」のダウンロードページです。全14ユニット・85レッスン／視聴時間 約10時間のカリキュラム、3つの研修プランと料金、助成金活用、サポート体制、研修開始までの流れをまとめています。",
  robots: "noindex",
};

export default function DocMLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
