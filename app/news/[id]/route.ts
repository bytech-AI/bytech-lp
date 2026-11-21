import { getNewsById, SCHOOL_NEWS } from "@/lib/microcms";
import { renderedHtmlResponse } from "@/lib/static-html-response";
import { renderNewsDetail } from "../_render";

export const runtime = "nodejs";
export const revalidate = 300;

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = /^[A-Za-z0-9_-]+$/.test(id) ? await getNewsById(id, SCHOOL_NEWS) : null;
  if (!item) {
    return new Response("Not Found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
  }
  return renderedHtmlResponse(renderNewsDetail(item), { key: "news" });
}
