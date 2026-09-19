import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/estimate/thanks" },
  title: "お見積もり依頼を受け付けました｜バイテック法人AI研修",
  robots: "noindex",
};

export default function EstimateThanksLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
