import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "サポート詳細 -【公式】バイテックAIスクール",
  description:
    "バイテックAIスクールのサポート詳細。生成AIスキルを有した各領域ごとの実績豊富なAI講師がゴールまで徹底マンツーマンサポート。",
};

export default function SupportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
