// 予約枠(action=slots)の取得を Google Apps Script に直接投げると TTFB が実測3〜4秒
// （悪いときは20秒超）かかり、カレンダーがそのぶん表示されない。GAS 側は触れないため
// Route Handler でラップし、Vercel の CDN にキャッシュさせる。
//
// 各ルートで force-static + revalidate を宣言して ISR にする（レスポンスに
// s-maxage / stale-while-revalidate が付く）。lp_type ごとに枠が違うので、
// ルートを分けてキャッシュエントリを分離している。
export const GAS_URL =
  "https://script.google.com/macros/s/AKfycbzFK2HDxL3BwTfK2DBR8flrCIll2lr5ZyOB1W9Vy5s6V5EcAIhNc_plwDu-lFMCU__1fg/exec";

export const SLOTS_REVALIDATE = 30;

// GAS は Vercel のビルド環境から叩くと 404 を返すことがある（ローカルからは 200）。
// ビルド中のプリレンダで throw するとビルド全体が落ちてデプロイできなくなるため、
// ビルド時だけ空枠にフォールバックする。実行時は従来どおり throw して
// ISR の直前成功レスポンスを配り続ける。
const IS_BUILD = process.env.NEXT_PHASE === "phase-production-build";
const EMPTY_SLOTS = { success: true, slots: [] };

export async function fetchSlots(lpType?: string) {
  const query = lpType
    ? `?action=slots&lp_type=${encodeURIComponent(lpType)}`
    : "?action=slots";

  // 上流が落ちている場合は例外にする。ISR は直前の成功レスポンスを配り続けるので、
  // GAS の一時障害がそのままカレンダー表示不能にならない。
  let upstream = await fetch(`${GAS_URL}${query}`, {
    next: { revalidate: SLOTS_REVALIDATE },
  });
  if (!upstream.ok) {
    // 一時的な 404/5xx を拾うため1回だけリトライ（キャッシュを避けて叩き直す）
    upstream = await fetch(`${GAS_URL}${query}`, { cache: "no-store" });
  }
  if (!upstream.ok) {
    if (IS_BUILD) {
      return new Response(JSON.stringify(EMPTY_SLOTS), {
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }
    throw new Error(`GAS responded ${upstream.status}`);
  }

  // GAS はエラー時に HTML を返すことがある。JSON として妥当なものだけキャッシュに載せる。
  const body = await upstream.text();
  let parsed: unknown;
  try {
    parsed = JSON.parse(body);
  } catch {
    if (IS_BUILD) {
      return new Response(JSON.stringify(EMPTY_SLOTS), {
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }
    throw new Error("GAS returned non-JSON body");
  }

  return new Response(JSON.stringify(parsed), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
