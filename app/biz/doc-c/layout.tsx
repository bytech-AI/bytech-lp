import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-c" },
  title: "助成金活用ガイド(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "人材開発支援助成金「事業展開等リスキリング支援コース」でAI研修の費用を最大75%抑える方法をまとめた「助成金活用ガイド」のダウンロードページです。",
  robots: "noindex",
};

export default function DocCLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
