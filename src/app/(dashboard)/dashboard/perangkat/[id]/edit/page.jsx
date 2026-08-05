import { notFound } from "next/navigation";

import PerangkatForm from "@/components/perangkat/PerangkatForm";

import {
  getPerangkatById,
} from "@/services/perangkat.service";

export default async function EditPerangkatPage({
  params,
}) {
  const perangkat = await getPerangkatById(
    params.id
  );

  if (!perangkat) {
    notFound();
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          Edit Perangkat Desa
        </h1>

      </div>

      <PerangkatForm
        perangkat={perangkat}
      />

    </div>
  );
}