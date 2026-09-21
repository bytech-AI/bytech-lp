import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "バイテックAIスクール - コース詳細",
  description:
    "バイテックAIスクールのAI WEBライターコース詳細。プログラミング経験ゼロからWEBサイトを作れるスキルを習得。",
};

export default function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
