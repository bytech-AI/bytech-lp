import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-u" },
  title: "法人向け 生成AIツール比較ガイド(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "ChatGPT・Gemini・Microsoft 365 Copilot・Claudeを、法人プランの料金、セキュリティ・データの扱い、管理機能、用途別の得意分野で比較した資料です。50人・100人・300人での費用試算と、ツールごとに2社ずつ計8社の導入事例（選んだ理由・展開・成果）を掲載しています。",
  robots: "noindex",
};

export default function DocULayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
