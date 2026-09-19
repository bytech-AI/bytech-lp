import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-b" },
  title: "サービス概要資料(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "バイテック法人AI研修の「サービス概要資料」のダウンロードページです。研修プラン・6つのコース・料金と助成金活用・導入事例・研修開始までの流れをまとめています。",
  robots: "noindex",
};

export default function DocBLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
