import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "バイテックAIスクール - カリキュラム詳細",
  description:
    "バイテックAIスクールのカリキュラム詳細。107項目のカリキュラムと56の実践課題を通じてプロが認めるスキルを手に入れる。",
};

export default function CurriculumLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
