import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/estimate" },
  title: "AI研修 見積もりシミュレーター｜バイテック法人AI研修",
  description:
    "研修コース・受講プラン・人数を選ぶだけで、法人向けAI研修の概算費用をその場でシミュレーション。助成金活用時の実質負担額もあわせてご確認いただけます。",
  // formrun送信の本番動作確認が取れるまでは noindex のまま運用する。
  // 公開判断が出たらこの行を外す。
  robots: "noindex",
};

export default function EstimateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
