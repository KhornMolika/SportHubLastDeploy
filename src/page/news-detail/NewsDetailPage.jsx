import React, { useEffect } from "react";
import NewsCompomentDetail from "../../components/newsComponent/NewsCompomentDetail";
import { useLocation } from "react-router-dom";

export default function NewsDetailPage() {
  const location = useLocation();
  const news = location.state;

  if (!news) {
    return <div>No news item found.</div>;
  }

  return (
    <>
      <section className="flex justify-center items-center h-auto mx-auto px-10 w-11/12 mb-20">
        <NewsCompomentDetail
          id={news.id}
          image={news.thumbnail}
          title={news.title}
          released_date={news.updated_at}
          view={news.view_count}
          body={news.body}
        />
      </section>
    </>
  );
}
