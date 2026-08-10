import PublicFacilityGrid from "@/components/facility/PublicFacilityGrid";
import { getFacilities } from "@/services/facility.service";

export const metadata = {
  title: "Fasilitas Desa Tonjong | Website Resmi Desa Tonjong",
  description:
    "Direktori Sarana dan Fasilitas Umum (Pendidikan, Kesehatan, Keagamaan, Olahraga, Pemerintahan, Sosial) di Desa Tonjong, Kecamatan Palabuhanratu, Kabupaten Sukabumi.",
};

export default async function FasilitasPage() {
  let facilityData = [];

  try {
    const data = await getFacilities();
    if (data && data.length > 0) {
      facilityData = data;
    } else {
      facilityData = [];
    }
  } catch (error) {
    console.error("Gagal mengambil data fasilitas dari database:", error);
    facilityData = [];
  }

  return (
    <div className="w-full bg-slate-50 min-h-screen pt-8 pb-20 sm:pt-12 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Title Section with Mockup-matching Line */}
        <div className="relative mb-8 sm:mb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b365d] tracking-tight whitespace-nowrap">
              Fasilitas Desa Tonjong
            </h1>
            <div className="h-[3px] bg-[#dbe5f7] flex-1 rounded-full hidden sm:block mt-2" />
          </div>
          <div className="h-[2px] bg-[#dbe5f7] w-full rounded-full block sm:hidden mt-3" />
        </div>

        {/* Public Facility Grid with Enum Filter & Search */}
        <PublicFacilityGrid facilityList={facilityData} />

      </div>
    </div>
  );
}
