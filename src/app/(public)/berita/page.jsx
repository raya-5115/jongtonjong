import FeaturedNewsSlider from "@/components/berita/FeaturedNewsSlider";
import NewsGrid from "@/components/berita/NewsGrid";
import { getNews } from "@/services/news.service";

const FALLBACK_NEWS = [
  {
    id: "1",
    title: "BULAT (Buah Olah Tepat)",
    slug: "bulat-buah-olah-tepat",
    content: "Program inovasi pengolahan hasil pertanian dan buah lokal Desa Tonjong untuk meningkatkan nilai ekonomi dan kesejahteraan warga.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "TASTE (Tonjong Atasi)",
    slug: "taste-tonjong-atasi",
    content: "Kegiatan gotong royong dan aksi penanganan lingkungan bersih serta penataan fasilitas publik Desa Tonjong secara terpadu.",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    title: "Tonjong Update",
    slug: "tonjong-update",
    content: "Pembaruan informasi terkini mengenai agenda rutin pelayanan administrasi publik dan pembangunan infrastruktur desa.",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    title: "BULAT (Buah Olah Tepat)",
    slug: "bulat-buah-olah-tepat-2",
    content: "Sosialisasi cara mengolah dan mengemas produk olahan pangan lokal agar memiliki daya saing tinggi di pasar digital.",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    title: "TASTE (Tonjong Atasi)",
    slug: "taste-tonjong-atasi-2",
    content: "Pelatihan sanitasi dan pengelolaan sampah rumah tangga untuk mewujudkan kawasan desa asri dan ramah lingkungan.",
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    title: "Tonjong Update",
    slug: "tonjong-update-2",
    content: "Penyaluran bantuan program sosial serta penguatan kapasitas aparatur desa demi pelayanan masyarakat yang lebih profesional.",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default async function BeritaPage() {
  let newsData = [];

  try {
    const data = await getNews();
    if (data && data.length > 0) {
      newsData = data;
    } else {
      newsData = FALLBACK_NEWS;
    }
  } catch (error) {
    console.error("Failed to fetch news data:", error);
    newsData = FALLBACK_NEWS;
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
