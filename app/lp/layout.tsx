import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "【公式】バイテック | 最短2ヶ月で、AI活用のプロに。",
  description: "副業やキャリアアップで使えるAIスキルが身につくオンラインキャリアスクール",
  icons: {
    icon: "/lp/assets/favicon.png",
  },
};

export default function LpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="lp-root" style={{ all: "initial" }}>{children}</div>;
}
