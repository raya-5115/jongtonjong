import FeaturedNewsSlider from "@/components/berita/FeaturedNewsSlider";
import NewsGrid from "@/components/berita/NewsGrid";
import { getNews } from "@/services/news.service";

export const metadata = {
  title: "Berita Desa Tonjong | Website Resmi Desa Tonjong",
  description:
    "Berita dan Informasi Kegiatan Warga Desa Tonjong, Kecamatan Palabuhanratu, Kabupaten Sukabumi.",
};

export default async function BeritaPage() {
  let newsData = [];

  try {
    const data = await getNews();
    if (data && data.length > 0) {
      newsData = data;
    } else {
      newsData = [];
    }
  } catch (error) {
    console.error("Failed to fetch news data:", error);
  }

  return (
    <div className="w-full bg-slate-50 pt-10 pb-16 sm:pt-14 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Page Title Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0c183a] sm:text-4xl lg:text-5xl">
            Berita Desa Tonjong
          </h1>
          <div className="mx-auto mt-4 h-[3px] w-full max-w-2xl bg-indigo-200/80 rounded-full" />
        </div>

        {/* Featured News Hero Slider */}
        <FeaturedNewsSlider news={newsData} />

        {/* Remaining / All News Grid */}
        <NewsGrid newsList={newsData} />

      </div>
    </div>
  );
}
