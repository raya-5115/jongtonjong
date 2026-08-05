import PerangkatForm from "@/components/perangkat/PerangkatForm";

export default function CreatePerangkatPage() {
  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          Tambah Perangkat Desa
        </h1>

        <p className="text-muted-foreground">
          Tambahkan data perangkat desa baru.
        </p>

      </div>

      <PerangkatForm />

    </div>
  );
}