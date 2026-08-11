import NewsForm from "@/components/news/NewsForm";

export default function CreateNewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Tambah Berita
        </h1>
        <p className="text-muted-foreground">
          Tambahkan berita baru.
        </p>
      </div>
      <NewsForm />
    </div>
  );
}