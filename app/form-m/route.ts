import { staticHtmlResponse } from "@/lib/static-html-response";

export const runtime = "nodejs";
export const dynamic = "force-static";

// メールマーケ配信用の予約フォーム。/counseling の複製で、カレンダー計測パラメータ
// (SOURCE / ROUTE_ID) のみ差し替え。アセットは /counseling-static/files を共用。
export async function GET() {
  return staticHtmlResponse("form-m-static/index.html");
}
