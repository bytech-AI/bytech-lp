import Image from "next/image";
import Link from "next/link";

export default function EstimateThanksPage() {
  return (
    <>
      <style>{`
        body { margin: 0; background: #f4f6f9; color: #16202e; font-family: var(--font-noto-jp), "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif; }
        .et-header { background: #fff; border-bottom: 1px solid #e2e8f0; }
        .et-header__inner { max-width: 1100px; margin: 0 auto; padding: 14px 24px; }
        .et-header img { display: block; height: 26px; filter: brightness(0) saturate(100%) invert(15%) sepia(30%) saturate(1500%) hue-rotate(190deg) brightness(90%); }
        .et-main { max-width: 1040px; margin: 0 auto; padding: 72px 24px 96px; }
        .et-card { box-sizing: border-box; min-height: 560px; padding: 112px min(12vw, 192px); border-radius: 12px; background: #fff; }
        /* 見出し14文字がどの幅でも1行に収まるサイズ（カードの左右パディング分を差し引いて算出） */
        .et-title { margin: 0; font-size: clamp(17px, 4.8vw, 37px); line-height: 1.35; letter-spacing: .03em; }
        .et-copy { margin: 46px 0 0; font-size: 17px; font-weight: 600; line-height: 2; }
        .et-notice { margin: 28px 0 0; padding: 28px 32px; border-radius: 10px; background: #f1f6f8; }
        .et-notice h2 { margin: 0; font-size: 20px; }
        .et-notice p { margin: 16px 0 0; font-size: 15px; font-weight: 600; line-height: 1.9; }
        .et-link { display: inline-flex; align-items: center; gap: 12px; margin-top: 44px; padding: 14px 26px; border: 1px solid #cad5df; border-radius: 999px; color: #16202e; font-size: 15px; font-weight: 800; text-decoration: none; }
        .et-link:hover { border-color: #1a6fb5; color: #1a6fb5; }
        .et-link span { display: grid; width: 20px; height: 20px; place-items: center; border-radius: 50%; background: #1a6fb5; color: #fff; line-height: 1; }
        @media (max-width: 640px) { .et-main { padding: 24px 14px 48px; } .et-card { min-height: auto; padding: 48px 24px; } .et-copy { margin-top: 30px; font-size: 15px; } .et-notice { padding: 22px; } }
      `}</style>
      <header className="et-header">
        <div className="et-header__inner">
          <Link href="/" aria-label="バイテック法人AI研修 トップページ">
            <Image src="/biz/assets/img/wp/グループ-16110.svg" alt="バイテック法人AI研修" width={152} height={26} priority />
          </Link>
        </div>
      </header>
      <main className="et-main">
        <section className="et-card" aria-labelledby="estimate-thanks-title">
          <h1 className="et-title" id="estimate-thanks-title">お見積もり依頼を受け付けました</h1>
          <p className="et-copy">
            お見積もりをご依頼いただき、ありがとうございます。<br />
            ご入力いただいたメールアドレス宛に、内容確認のメールをお送りします。
          </p>
          <aside className="et-notice">
            <h2>今後のご案内</h2>
            <p>ご希望の研修内容を確認のうえ、担当より正式なお見積もりをご案内します。通常、数営業日以内にご連絡します。</p>
          </aside>
          <Link className="et-link" href="/">トップページへ戻る <span aria-hidden="true">→</span></Link>
        </section>
      </main>
    </>
  );
}
