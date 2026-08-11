import { redirect } from "next/navigation";

export default async function FacilityIdPage({ params }) {
  const { id } = await params;
  redirect(`/dashboard/fasilitas/${id}/edit`);
}
