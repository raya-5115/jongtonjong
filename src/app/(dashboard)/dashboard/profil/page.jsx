import { getVillageProfile } from "@/services/villageProfile.service";
import VillageProfileForm from "@/components/profil/VillageProfileForm";

export default async function AdminProfilPage() {
  const profile = await getVillageProfile();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Pengaturan Profil Desa
        </h1>
        <p className="text-muted-foreground">
          Kelola informasi profil, foto, deskripsi, serta Visi & Misi Desa Tonjong.
        </p>
      </div>

      <VillageProfileForm profile={profile} />
    </div>
  );
}
