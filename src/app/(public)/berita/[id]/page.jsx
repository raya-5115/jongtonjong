import NewsDetailContent from "@/components/berita/NewsDetailContent";
import { getNewsByIdOrSlug } from "@/services/news.service";

export default async function NewsDetailPage({ params }) {
  const resolvedParams = await params;
  const rawId = resolvedParams?.id || "";
  const idOrSlug = decodeURIComponent(rawId);

  let article = null;

  if (idOrSlug) {
    try {
      article = await getNewsByIdOrSlug(idOrSlug);
    } catch (error) {
      console.error("Error fetching news detail from database:", error);
    }

    if (!article) {
      const humanTitle = idOrSlug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      article = {
        id: idOrSlug,
        title: humanTitle || "Berita Desa Tonjong",
        slug: idOrSlug,
        image: "/hero-bg.png",
        content: `Berikut merupakan laporan dan rincian berita mengenai "${humanTitle}" di lingkungan Pemerintah Desa Tonjong, Kecamatan Palabuhanratu, Kabupaten Sukabumi.\n\nPemerintah Desa Tonjong senantiasa berupaya menyampaikan informasi publik secara cepat, terbuka, dan akuntabel kepada seluruh warga masyarakat.`,
        createdAt: new Date().toISOString(),
        views: 30,
      };
    }
  }

  return <NewsDetailContent article={article} />;
}
