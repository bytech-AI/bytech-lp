import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-i" },
  title: "Claude Code研修 コース紹介資料(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "バイテック法人AI研修の「Claude Code研修 コース紹介資料」のダウンロードページです。全5ユニット／視聴時間 約12時間のカリキュラム、3つの研修プランと料金、サポート体制、研修開始までの流れをまとめています。",
  robots: "noindex",
};

export default function DocILayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
