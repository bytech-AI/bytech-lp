import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-an" },
  title: "法人向けAIeラーニング サービス概要資料(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "バイテック法人AI研修の「法人向けAIeラーニング サービス概要資料」のダウンロードページです。1,000本以上のAI講座と専用LMS・AI機能、プログラム一覧、料金（1IDあたり月額2,980円）・助成金、受講開始までの流れをまとめています。",
  robots: "noindex",
};

export default function DocAnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
