import type { Metadata } from "next";

export const metadata: Metadata = {
  // ルートレイアウトの canonical("/"=apex) を継承しないよう自ページを明示する
  alternates: { canonical: "/doc-ad" },
  title: "製造・建設・物流のAI・自動化アイデア10選(無料ダウンロード)｜バイテック法人AI研修",
  description:
    "製造・建設・物流の業務でMicrosoft 365 Copilot・Copilot Studio・Power Automateをどう使うかを、10のアイデアにまとめた資料です。業務の流れ、必要なデータ、測る指標、確認点を1件1ページで解説し、近い領域の公開事例6社、効果の測り方、導入前の確認も掲載しています。活用アイデアは当社の設計案です。",
  robots: "noindex",
};

export default function DocAdLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
