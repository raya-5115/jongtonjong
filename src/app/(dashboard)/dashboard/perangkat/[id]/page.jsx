import { redirect } from "next/navigation";

export default async function PerangkatIdPage({ params }) {
  const { id } = await params;
  redirect(`/dashboard/perangkat/${id}/edit`);
}
