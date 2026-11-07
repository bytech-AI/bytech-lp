import Link from "next/link";
import { BizFooter, BizHeader } from "../../../_chrome/BizChrome";
import "../../../_course/course.css";
import "../../e-learning.css";
import "../trial.css";

// 無料トライアル申込の完了ページ（formrun 管理画面の送信後リダイレクト先に設定する）
export const metadata = {
  title: "無料トライアルのお申し込みを受け付けました｜バイテック法人AI研修",
  alternates: { canonical: "/e-learning/trial/thanks" },
  robots: "noindex",
};

export default function ELearningTrialThanksPage() {
  return (
    <>
      <BizHeader docHref="/doc-e" />
      <main className="ct-page tr-page">
        <div className="tr-inner">
          <section className="tr-card tr-thanks">
            <p className="tr-eyebrow">THANK YOU</p>
            <h1 className="tr-title">無料トライアルの<br />お申し込みを受け付けました</h1>
            <p className="tr-lead">
              お申し込みいただき、ありがとうございます。<br />
              担当者より、ご入力いただいたメールアドレス宛にトライアルの開始方法をご案内します。
            </p>
            <div className="tr-thanks__links">
              <Link className="tr-submit tr-thanks__btn" href="/e-learning" prefetch={false}>
                eラーニングのページへ戻る
              </Link>
              <a className="tr-thanks__sub" href="/doc-e">研修タイプ比較ガイドをダウンロード →</a>
            </div>
          </section>
        </div>
      </main>
      <BizFooter />
    </>
  );
}
