import { getNews, SCHOOL_NEWS } from "@/lib/microcms";
import { renderedHtmlResponse } from "@/lib/static-html-response";
import { renderNewsList } from "./_render";

// bytech.jp/news（バイテックAIスクールのお知らせ）。記事は microCMS の bytech-blog サービスの news API。
// biz.bytech.jp・geek.bytech.jp の /news は proxy.ts でそれぞれのルートへリライトされるため、ここに来るのは apex だけ。
export const runtime = "nodejs";
export const revalidate = 300;

export async function GET() {
  const news = await getNews(100, SCHOOL_NEWS);
  return renderedHtmlResponse(renderNewsList(news), { key: "news" });
}
