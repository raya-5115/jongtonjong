import { getVillageProfile } from "@/services/villageProfile.service";
import AboutSection from "@/components/profil/AboutSection";
import VisiMisiSection from "@/components/profil/VisiMisiSection";
import PerangkatDesaSection from "@/components/profil/PerangkatDesaSection";

export default async function ProfilPage() {
  const profile = await getVillageProfile();

  return (
    <div className="flex w-full flex-col min-h-screen bg-slate-50">
      <AboutSection profile={profile} />
      <VisiMisiSection profile={profile} />
      <PerangkatDesaSection />
    </div>
  );
}
