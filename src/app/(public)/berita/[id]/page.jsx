import NewsDetailContent from "@/components/berita/NewsDetailContent";
import { getNewsByIdOrSlug } from "@/services/news.service";

const FALLBACK_ARTICLES = {
  "1": {
    id: "1",
    title: "BULAT (Buah Olah Tepat)",
    slug: "bulat-buah-olah-tepat",
    image: "/hero-bg.png",
    content: `Program BULAT (Buah Olah Tepat) merupakan salah satu program inovasi unggulan Pemerintah Desa Tonjong yang bertujuan untuk mengoptimalkan potensi hasil pertanian buah-buahan lokal. Melalui program ini, masyarakat diajarkan teknik pengolahan hasil panen menjadi produk olahan bernilai jual tinggi.

Dengan adanya pendampingan dan pelatihan berkala dari dinas terkait, kelompok tani dan ibu-ibu PKK Desa Tonjong berhasil memproduksi aneka olahan buah yang higienis, tahan lama, dan dikemas secara modern.

Diharapkan program ini dapat terus mendorong kemandirian ekonomi warga desa serta memperluas jangkauan pemasaran produk UMKM lokal Desa Tonjong hingga ke luar daerah.`,
    createdAt: new Date().toISOString(),
    views: 45,
  },
  "bulat-buah-olah-tepat": {
    id: "1",
    title: "BULAT (Buah Olah Tepat)",
    slug: "bulat-buah-olah-tepat",
    image: "/hero-bg.png",
    content: `Program BULAT (Buah Olah Tepat) merupakan salah satu program inovasi unggulan Pemerintah Desa Tonjong yang bertujuan untuk mengoptimalkan potensi hasil pertanian buah-buahan lokal. Melalui program ini, masyarakat diajarkan teknik pengolahan hasil panen menjadi produk olahan bernilai jual tinggi.

Dengan adanya pendampingan dan pelatihan berkala dari dinas terkait, kelompok tani dan ibu-ibu PKK Desa Tonjong berhasil memproduksi aneka olahan buah yang higienis, tahan lama, dan dikemas secara modern.

Diharapkan program ini dapat terus mendorong kemandirian ekonomi warga desa serta memperluas jangkauan pemasaran produk UMKM lokal Desa Tonjong hingga ke luar daerah.`,
    createdAt: new Date().toISOString(),
    views: 45,
  },
  "2": {
    id: "2",
    title: "TASTE (Tonjong Atasi)",
    slug: "taste-tonjong-atasi",
    image: "/kantor-desa.png",
    content: `Program TASTE (Tonjong Atasi) menggiatkan kesadaran gotong royong warga masyarakat Desa Tonjong dalam menjaga kebersihan lingkungan dan penataan fasilitas publik.

Kegiatan ini dilaksanakan secara berkala setiap akhir pekan bersama seluruh elemen masyarakat, perangkat desa, serta tokoh pemuda setempat. Fokus utama gerakan ini adalah penataan drainase, pembersihan area pemukiman, dan penghijauan.

Kepala Desa Tonjong menyampaikan apresiasi setinggi-tingginya kepada seluruh warga yang berpartisipasi aktif menjaga lingkungan desa tetap bersih, sehat, dan nyaman bagi semua.`,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    views: 38,
  },
  "taste-tonjong-atasi": {
    id: "2",
    title: "TASTE (Tonjong Atasi)",
    slug: "taste-tonjong-atasi",
    image: "/kantor-desa.png",
    content: `Program TASTE (Tonjong Atasi) menggiatkan kesadaran gotong royong warga masyarakat Desa Tonjong dalam menjaga kebersihan lingkungan dan penataan fasilitas publik.

Kegiatan ini dilaksanakan secara berkala setiap akhir pekan bersama seluruh elemen masyarakat, perangkat desa, serta tokoh pemuda setempat. Fokus utama gerakan ini adalah penataan drainase, pembersihan area pemukiman, dan penghijauan.

Kepala Desa Tonjong menyampaikan apresiasi setinggi-tingginya kepada seluruh warga yang berpartisipasi aktif menjaga lingkungan desa tetap bersih, sehat, dan nyaman bagi semua.`,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    views: 38,
  },
  "3": {
    id: "3",
    title: "Tonjong Update: Pembangunan Infrastruktur dan Pelayanan Administrasi",
    slug: "tonjong-update",
    image: "/hero-bg.png",
    content: `Pemerintah Desa Tonjong terus berkomitmen untuk memberikan pelayanan publik terbaik dan mempercepat pembangunan sarana prasarana desa demi kenyamanan seluruh masyarakat.

Dalam laporan Tonjong Update kali ini, disampaikan perkembangan perbaikan akses jalan lingkungan dan peningkatan fasilitas kantor desa untuk mempermudah pengurusan administrasi warga.

Warga diimbau untuk dapat memanfaatkan fasilitas pengajuan layanan secara daring melalui portal resmi website Desa Tonjong.`,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    views: 52,
  },
  "tonjong-update": {
    id: "3",
    title: "Tonjong Update: Pembangunan Infrastruktur dan Pelayanan Administrasi",
    slug: "tonjong-update",
    image: "/hero-bg.png",
    content: `Pemerintah Desa Tonjong terus berkomitmen untuk memberikan pelayanan publik terbaik dan mempercepat pembangunan sarana prasarana desa demi kenyamanan seluruh masyarakat.

Dalam laporan Tonjong Update kali ini, disampaikan perkembangan perbaikan akses jalan lingkungan dan peningkatan fasilitas kantor desa untuk mempermudah pengurusan administrasi warga.

Warga diimbau untuk dapat memanfaatkan fasilitas pengajuan layanan secara daring melalui portal resmi website Desa Tonjong.`,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    views: 52,
  },
  "4": {
    id: "4",
    title: "BULAT (Buah Olah Tepat) - Sosialisasi Pemasaran Digital",
    slug: "bulat-buah-olah-tepat-2",
    image: "/hero-bg.png",
    content: `Melanjutkan sukses program BULAT (Buah Olah Tepat), Pemerintah Desa Tonjong menggelar pelatihan dan sosialisasi pengemasan serta pemasaran digital produk olahan buah lokal.

Melalui pelatihan ini, para pelaku usaha mikro diajarkan pembuatan foto produk yang menarik, pendaftaran izin edar, hingga penjualan daring melalui media sosial dan marketplace.`,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    views: 64,
  },
  "bulat-buah-olah-tepat-2": {
    id: "4",
    title: "BULAT (Buah Olah Tepat) - Sosialisasi Pemasaran Digital",
    slug: "bulat-buah-olah-tepat-2",
    image: "/hero-bg.png",
    content: `Melanjutkan sukses program BULAT (Buah Olah Tepat), Pemerintah Desa Tonjong menggelar pelatihan dan sosialisasi pengemasan serta pemasaran digital produk olahan buah lokal.

Melalui pelatihan ini, para pelaku usaha mikro diajarkan pembuatan foto produk yang menarik, pendaftaran izin edar, hingga penjualan daring melalui media sosial dan marketplace.`,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    views: 64,
  },
  "5": {
    id: "5",
    title: "TASTE (Tonjong Atasi) - Pelatihan Pengelolaan Sampah Mandiri",
    slug: "taste-tonjong-atasi-2",
    image: "/kantor-desa.png",
    content: `Dalam rangka menjaga keberlanjutan kebersihan lingkungan desa, program TASTE memfasilitasi pelatihan pemilahan sampah organik dan anorganik di tingkat rukun tetangga (RT).

Diharapkan warga dapat memanfaatkan sampah organik menjadi pupuk kompost dan sampah anorganik melalui bank sampah desa.`,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    views: 41,
  },
  "taste-tonjong-atasi-2": {
    id: "5",
    title: "TASTE (Tonjong Atasi) - Pelatihan Pengelolaan Sampah Mandiri",
    slug: "taste-tonjong-atasi-2",
    image: "/kantor-desa.png",
    content: `Dalam rangka menjaga keberlanjutan kebersihan lingkungan desa, program TASTE memfasilitasi pelatihan pemilahan sampah organik dan anorganik di tingkat rukun tetangga (RT).

Diharapkan warga dapat memanfaatkan sampah organik menjadi pupuk kompost dan sampah anorganik melalui bank sampah desa.`,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    views: 41,
  },
  "6": {
    id: "6",
    title: "Tonjong Update: Penyaluran Bantuan & Peningkatan Layanan Publik",
    slug: "tonjong-update-2",
    image: "/hero-bg.png",
    content: `Pemerintah Desa Tonjong telah menyalurkan bantuan sosial tahap terbaru kepada keluarga penerima manfaat secara tertib dan akuntabel.

Selain itu, gedung balai desa juga dilengkapi sarana ruang tunggu dan pojok informasi digital demi kenyamanan warga saat mengurus surat administrasi.`,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    views: 59,
  },
  "tonjong-update-2": {
    id: "6",
    title: "Tonjong Update: Penyaluran Bantuan & Peningkatan Layanan Publik",
    slug: "tonjong-update-2",
    image: "/hero-bg.png",
    content: `Pemerintah Desa Tonjong telah menyalurkan bantuan sosial tahap terbaru kepada keluarga penerima manfaat secara tertib dan akuntabel.

Selain itu, gedung balai desa juga dilengkapi sarana ruang tunggu dan pojok informasi digital demi kenyamanan warga saat mengurus surat administrasi.`,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    views: 59,
  },
};

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
      article = FALLBACK_ARTICLES[idOrSlug];
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
