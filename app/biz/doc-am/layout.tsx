import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-am" },
  title: "リーダー・マネージャー向けAI研修 コース紹介資料(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "バイテック法人AI研修の「リーダー・マネージャー向けAI研修 コース紹介資料」のダウンロードページです。全8チャプター・35レッスン／視聴時間 約5時間のカリキュラム、利用環境に合わせた調整、研修開始までの流れをまとめています。",
  robots: "noindex",
};

export default function DocAmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
