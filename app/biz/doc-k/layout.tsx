import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-k" },
  title: "Copilot Studio研修 コース紹介資料(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "バイテック法人AI研修の「Copilot Studio研修 コース紹介資料」のダウンロードページです。全11ユニット・70レッスン／視聴時間 約9時間のカリキュラム、3つの研修プランと料金、助成金活用、サポート体制、研修開始までの流れをまとめています。",
  robots: "noindex",
};

export default function DocKLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
