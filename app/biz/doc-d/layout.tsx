import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-d" },
  title: "AI導入を成功させる50のチェックシート(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "「導入したのに使われない」を防ぐ、5カテゴリ・50項目のチェックシートのダウンロードページです。スコアから自社のフェーズと次の一手がわかります。",
  robots: "noindex",
};

export default function DocDLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
