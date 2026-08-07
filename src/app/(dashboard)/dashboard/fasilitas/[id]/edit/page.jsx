import { notFound } from "next/navigation";

import { getFacilityById } from "@/services/facility.service";

import FacilityForm from "@/components/facility/FacilityForm";

export default async function EditFacilityPage({ params }) {
  const { id } = await params;

  const facility = await getFacilityById(id);

  if (!facility) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Edit Fasilitas
        </h1>

        <p className="text-muted-foreground">
          Perbarui informasi fasilitas.
        </p>
      </div>

      <FacilityForm facility={facility} />
    </div>
  );
}