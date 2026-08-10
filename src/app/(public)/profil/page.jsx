import AboutSection from "@/components/profil/AboutSection";
import VisiMisiSection from "@/components/profil/VisiMisiSection";
import PerangkatDesaSection from "@/components/profil/PerangkatDesaSection";

export default function ProfilPage() {
  return (
    <div className="flex w-full flex-col min-h-screen bg-slate-50">
      <AboutSection />
      <VisiMisiSection />
      <PerangkatDesaSection />
    </div>
  );
}
