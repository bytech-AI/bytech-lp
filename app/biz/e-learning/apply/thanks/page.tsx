import Link from "next/link";
import { BizFooter, BizHeader } from "../../../_chrome/BizChrome";
import "../../../_course/course.css";
import "../../e-learning.css";
import "../../trial/trial.css";

// eラーニングプラン申込の完了ページ（formrun 管理画面の送信後リダイレクト先に設定する）
export const metadata = {
  title: "eラーニングプランのお申し込みを受け付けました｜バイテック法人AI研修",
  alternates: { canonical: "/e-learning/apply/thanks" },
  robots: "noindex",
};

export default function ELearningApplyThanksPage() {
  return (
    <>
      <BizHeader docHref="/doc-e" />
      <main className="ct-page tr-page">
        <div className="tr-inner">
          <section className="tr-card tr-thanks">
            <p className="tr-eyebrow">THANK YOU</p>
            <h1 className="tr-title">eラーニングプランの<br />お申し込みを受け付けました</h1>
            <p className="tr-lead">
              お申し込みいただき、ありがとうございます。<br />
              担当者より、ご入力いただいたメールアドレス宛にご契約内容とお見積もりをお送りします。<br />
              内容をご確認いただいたうえで、正式なご契約となります。
            </p>
            <div className="tr-thanks__links">
              <Link className="tr-submit tr-thanks__btn" href="/e-learning" prefetch={false}>
                eラーニングのページへ戻る
              </Link>
              <a className="tr-thanks__sub" href="/doc-an">eラーニングのサービス概要資料をダウンロード →</a>
            </div>
          </section>
        </div>
      </main>
      <BizFooter />
    </>
  );
}
