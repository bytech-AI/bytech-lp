import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "【公式】バイテック | 最短2ヶ月で、AI活用のプロに。",
  description: "副業やキャリアアップで使えるAIスキルが身につくオンラインキャリアスクール",
  icons: {
    icon: "/ac/assets/favicon.png",
  },
};

export default function AcLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="ac-root" style={{ all: "initial" }}>{children}</div>;
}
