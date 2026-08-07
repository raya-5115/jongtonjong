import FacilityForm from "@/components/facility/FacilityForm";

export default function CreateFacilityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Tambah Fasilitas
        </h1>

        <p className="text-muted-foreground">
          Tambahkan fasilitas baru ke data Desa Tonjong.
        </p>
      </div>

      <FacilityForm />
    </div>
  );
}