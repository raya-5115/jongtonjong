import PublicUmkmGrid from "@/components/umkm/PublicUmkmGrid";
import { getUmkm } from "@/services/umkm.service";

export const metadata = {
  title: "UMKM Desa Tonjong | Website Resmi Desa Tonjong",
  description:
    "Direktori Produk dan Usaha Mikro Kecil dan Menengah (UMKM) Warga Desa Tonjong, Kecamatan Palabuhanratu, Kabupaten Sukabumi.",
};

export default async function UMKMPage() {
  let umkmData = [];

  try {
    const data = await getUmkm();
    if (data && data.length > 0) {
      umkmData = data;
    } else {
      umkmData = [];
    }
  } catch (error) {
    console.error("Gagal mengambil data UMKM dari database:", error);
    umkmData = [];
  }

  return (
    <div className="w-full bg-slate-50 min-h-screen pt-8 pb-20 sm:pt-12 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Title Section with Mockup-matching Line */}
        <div className="relative mb-10 sm:mb-14">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b365d] tracking-tight whitespace-nowrap">
              UMKM Desa Tonjong
            </h1>
            <div className="h-[3px] bg-[#dbe5f7] flex-1 rounded-full hidden sm:block mt-2" />
          </div>
          <div className="h-[2px] bg-[#dbe5f7] w-full rounded-full block sm:hidden mt-3" />
        </div>

        {/* UMKM Cards Grid Component */}
        <PublicUmkmGrid umkmList={umkmData} />

      </div>
    </div>
  );
}
