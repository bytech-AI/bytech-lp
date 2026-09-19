import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-a" },
  title: "お役立ち資料3点セット(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "バイテック法人AI研修の「サービス概要資料」「助成金活用ガイド」「AI導入を成功させる50のチェックシート」を3点セットで無料ダウンロードできます。",
  robots: "noindex",
};

export default function DocALayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
