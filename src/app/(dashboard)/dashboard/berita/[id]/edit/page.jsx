import { notFound } from "next/navigation";

import NewsForm from "@/components/news/NewsForm";

import {
  getNewsById,
} from "@/services/news.service";

export default async function EditNewsPage({
  params,
}) {
  const news = await getNewsById(params.id);

  if (!news) {
    notFound();
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          Edit Berita
        </h1>

      </div>

      <NewsForm news={news} />

    </div>
  );
}