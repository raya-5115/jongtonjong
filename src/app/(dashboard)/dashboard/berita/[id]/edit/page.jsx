import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NewsForm from "@/components/news/NewsForm";

import { getNewsById } from "@/services/news.service";

export default async function EditNewsPage({ params }) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const news = await getNewsById(id);

  if (!news) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Berita</h1>
      </div>

      <NewsForm news={news} />

      <Link href="/dashboard">
        <Button>Dashboard</Button>
      </Link>
    </div>
  );
}
