import { getVillageProfile } from "@/services/villageProfile.service";
import AboutSection from "@/components/profil/AboutSection";
import VisiMisiSection from "@/components/profil/VisiMisiSection";
import PerangkatDesaSection from "@/components/profil/PerangkatDesaSection";

export const metadata = {
  title: "Profil Desa Tonjong | Website Resmi Desa Tonjong",
  description:
    "Profil Lengkap, Sejarah, Visi Misi, dan Perangkat Desa Tonjong, Kecamatan Palabuhanratu, Kabupaten Sukabumi.",
};

export default async function ProfilPage() {
  let profile = null;

  try {
    profile = await getVillageProfile();
  } catch (error) {
    console.error("Gagal mengambil data profil desa:", error);
  }

  return (
    <div className="flex w-full flex-col min-h-screen bg-slate-50">
      <AboutSection profile={profile} />
      <VisiMisiSection profile={profile} />
      <PerangkatDesaSection />
    </div>
  );
}
