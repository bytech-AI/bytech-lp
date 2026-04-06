import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ChatGPTマスターコース - 【公式】バイテック｜今日から仕事が変わる、ChatGPT活用スキルを習得。",
  description:
    "ChatGPTの基本操作から、プロンプト設計、メール・資料・アイデア出しからZapier・MCPとの連携など実務応用まで体系的に学ぶコースです。",
};

export default function ChatgptMasterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
