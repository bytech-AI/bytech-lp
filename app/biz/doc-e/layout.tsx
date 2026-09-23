import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-e" },
  title: "AI研修タイプ 比較ガイド(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "バイテック法人AI研修の「AI研修タイプ 比較ガイド」のダウンロードページです。eラーニング・セミナー・ハンズオン・ワークショップの違いを、料金目安・見込める効果・導入事例・FAQと比較表でまとめています。",
  robots: "noindex",
};

export default function DocELayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
