import PublicUmkmGrid from "@/components/umkm/PublicUmkmGrid";
import { getUmkm } from "@/services/umkm.service";

// Fallback data matching the mockup cards if database has 0 records initially
const FALLBACK_UMKM = [
  {
    id: "fb-1",
    businessName: "BULAT (Buah Olah Tepat)",
    ownerName: "Ibu Nurhayati",
    productImage: null,
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    address: "Kedung Halang, RT 02/RW 03, Desa Tonjong",
    phone: "081234567890",
    googleMapsUrl: "https://maps.google.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fb-2",
    businessName: "TASTE (Tonjong Atasi)",
    ownerName: "Pak Suhendra",
    productImage: null,
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    address: "Kampung Tonjong Tengah, RT 01/RW 01, Desa Tonjong",
    phone: "081298765432",
    googleMapsUrl: "https://maps.google.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fb-3",
    businessName: "Tonjong Update",
    ownerName: "Koperasi Warga Tonjong",
    productImage: null,
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    address: "Jl. Raya Tonjong No. 45, Desa Tonjong",
    phone: "085712345678",
    googleMapsUrl: "https://maps.google.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fb-4",
    businessName: "BULAT (Buah Olah Tepat)",
    ownerName: "Ibu Siti Aisyah",
    productImage: null,
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    address: "Dusun II, RT 04/RW 02, Desa Tonjong",
    phone: "081345678901",
    googleMapsUrl: "https://maps.google.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fb-5",
    businessName: "TASTE (Tonjong Atasi)",
    ownerName: "Pak Mulyana",
    productImage: null,
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    address: "Kampung Suka Maju, RT 03/RW 04, Desa Tonjong",
    phone: "082198765432",
    googleMapsUrl: "https://maps.google.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fb-6",
    businessName: "Tonjong Update",
    ownerName: "BUMDes Tonjong Mandiri",
    productImage: null,
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    address: "Jl. Balai Desa Tonjong No. 01, Desa Tonjong",
    phone: "087812345678",
    googleMapsUrl: "https://maps.google.com",
    createdAt: new Date().toISOString(),
  },
];

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
      umkmData = FALLBACK_UMKM;
    }
  } catch (error) {
    console.error("Gagal mengambil data UMKM dari database:", error);
    umkmData = FALLBACK_UMKM;
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
