import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "サポート詳細 -【公式】バイテック｜未経験からプロのAI活用人材を、目指せる実践型AIスクール",
  description:
    "バイテック生成AIのサポート詳細。生成AIスキルを有した各領域ごとの実績豊富なAI講師がゴールまで徹底マンツーマンサポート。",
};

export default function SupportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
