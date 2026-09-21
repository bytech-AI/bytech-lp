import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "料金プラン - 【公式】バイテックAIスクール",
  description:
    "バイテックAIスクールの料金プラン。LITEプラン・PROプランの2つのプランをご用意。受講目的や不安なポイントに合わせてお選びいただけます。",
};

export default function PlanLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
