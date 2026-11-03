import type { MicroCmsNews } from "@/lib/microcms";

// microCMS の geek-news API の「種別」セレクトと同じ並び・表記にする
export const GEEK_NEWS_CATEGORIES = ["お知らせ", "メディア掲載"];

export function formatNewsDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 10);
  // 表示は日本時間で揃える（サーバーはUTCで動くため、深夜公開の記事が前日にずれる）
  return new Intl.DateTimeFormat("ja-JP", { timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit" })
    .format(date)
    .replace(/\//g, ".");
}

// サムネ未設定の記事は geek の OGP 画像で埋める（biz の既定画像にしない）
export function geekNewsThumbnail(news: MicroCmsNews) {
  const image = news.thumbnail || news.eyecatch;
  return (typeof image === "string" ? image : image?.url) || "/geek-static/files/ogp.jpg";
}
