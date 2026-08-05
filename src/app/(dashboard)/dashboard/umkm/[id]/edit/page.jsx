import { notFound } from "next/navigation";

import UmkmForm from "@/components/umkm/UmkmForm";

import { getUmkmById } from "@/services/umkm.service";

export default async function EditUmkmPage({
  params,
}) {
  const umkm = await getUmkmById(params.id);

  if (!umkm) {
    notFound();
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Edit UMKM
        </h1>

        <p className="text-muted-foreground">
          Perbarui informasi UMKM.
        </p>
      </div>

      <UmkmForm umkm={umkm} />

    </div>
  );
}