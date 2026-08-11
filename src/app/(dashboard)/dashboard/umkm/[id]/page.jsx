import { redirect } from "next/navigation";

export default async function UmkmIdPage({ params }) {
  const { id } = await params;
  redirect(`/dashboard/umkm/${id}/edit`);
}
