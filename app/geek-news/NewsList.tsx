"use client";

import { useMemo, useState } from "react";
import type { MicroCmsNews } from "@/lib/microcms";
import { newsCategory, newsPath } from "@/lib/microcms";
import { formatNewsDate, GEEK_NEWS_CATEGORIES, geekNewsThumbnail } from "./news-utils";

const tabs = ["すべて", ...GEEK_NEWS_CATEGORIES];

export function NewsList({ news }: { news: MicroCmsNews[] }) {
  const [selected, setSelected] = useState("すべて");
  const filtered = useMemo(
    () => (selected === "すべて" ? news : news.filter((item) => newsCategory(item) === selected)),
    [news, selected],
  );

  return (
    <>
      <div className="gn-tabs" role="tablist" aria-label="お知らせの種別">
        {tabs.map((tab) => (
          <button
            type="button"
            role="tab"
            aria-selected={selected === tab}
            className="gn-tab"
            key={tab}
            onClick={() => setSelected(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <ul className="gn-list">
          {filtered.map((item) => (
            <li key={item.id}>
              <a className="gn-item" href={newsPath(item)}>
                <span className="gn-item__thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={geekNewsThumbnail(item)} alt="" loading="lazy" />
                </span>
                <span className="gn-item__body">
                  <span className="gn-item__meta">
                    <time dateTime={item.publishedAt || item.revisedAt}>{formatNewsDate(item.publishedAt || item.revisedAt)}</time>
                    <span className="gn-cat">{newsCategory(item)}</span>
                  </span>
                  <span className="gn-item__title">{item.title}</span>
                </span>
                <span className="gn-item__arrow" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="gn-empty">現在公開中のお知らせはありません。</p>
      )}
    </>
  );
}
