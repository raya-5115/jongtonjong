import UmkmForm from "@/components/umkm/UmkmForm";

export default function CreateUmkmPage() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Tambah UMKM
        </h1>

        <p className="text-muted-foreground">
          Tambahkan data UMKM baru.
        </p>
      </div>

      <UmkmForm />

    </div>
  );
}