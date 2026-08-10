import ServiceRequestForm from "@/components/request/ServiceRequestForm";
import { getServices } from "@/services/service.service";

// Fallback active services if database table is currently empty
const FALLBACK_SERVICES = [
  { id: "srv-1", name: "Surat Keterangan Usaha (SKU)", isActive: true },
  { id: "srv-2", name: "Surat Keterangan Tidak Mampu (SKTM)", isActive: true },
  { id: "srv-3", name: "Surat Keterangan Domisili Warga", isActive: true },
  { id: "srv-4", name: "Surat Pengantar Pembuatan KTP / KK", isActive: true },
  { id: "srv-5", name: "Surat Keterangan Belum Menikah", isActive: true },
  { id: "srv-6", name: "Surat Keterangan Kelahiran / Kematian", isActive: true },
];

export const metadata = {
  title: "Pengajuan Layanan | Website Resmi Desa Tonjong",
  description:
    "Formulir pengajuan online surat keterangan dan dokumen administrasi kependudukan warga Desa Tonjong, Kecamatan Palabuhanratu, Kabupaten Sukabumi.",
};

export default async function LayananPage() {
  let servicesData = [];

  try {
    const data = await getServices();
    if (data && data.length > 0) {
      // Filter active services
      const active = data.filter((s) => s.isActive !== false);
      servicesData = active.length > 0 ? active : FALLBACK_SERVICES;
    } else {
      servicesData = FALLBACK_SERVICES;
    }
  } catch (error) {
    console.error("Gagal mengambil data jenis layanan dari database:", error);
    servicesData = FALLBACK_SERVICES;
  }

  return (
    <div className="w-full bg-slate-50 min-h-screen pt-8 pb-20 sm:pt-12 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Title Section with Mockup-matching Line */}
        <div className="relative mb-8 sm:mb-12">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b365d] tracking-tight whitespace-nowrap">
              Pengajuan Layanan
            </h1>
            <div className="h-[3px] bg-[#dbe5f7] flex-1 rounded-full hidden sm:block mt-2" />
          </div>
          <div className="h-[2px] bg-[#dbe5f7] w-full rounded-full block sm:hidden mt-3" />
        </div>

        {/* Form Component */}
        <ServiceRequestForm servicesList={servicesData} />

      </div>
    </div>
  );
}
