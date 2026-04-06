import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "バイテック生成AI - コース詳細",
  description:
    "バイテック生成AIのAI WEBライターコース詳細。プログラミング経験ゼロからWEBサイトを作れるスキルを習得。",
};

export default function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
