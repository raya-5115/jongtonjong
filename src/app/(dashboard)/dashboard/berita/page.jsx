import Link from "next/link";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { getNews } from "@/services/news.service";

import NewsTable from "@/components/news/NewsTable";

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            Berita
          </h1>

          <p className="text-muted-foreground">
            Kelola berita desa.
          </p>

        </div>

        <Link href="/dashboard/berita/tambah">

          <Button>

            <Plus className="mr-2 h-4 w-4" />

            Tambah Berita

          </Button>

        </Link>

      </div>

      <NewsTable news={news} />

    </div>
  );
}