import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "【公式】バイテックBiz",
  description: "AIを最高の部下に変えるハンズオン型法人向けAI研修",
  robots: { index: true, follow: true },
  icons: {
    icon: "/biz/assets/img/common/favicon.svg",
  },
};

export default function BizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="biz-root" style={{ all: "initial" }}>{children}</div>;
}
