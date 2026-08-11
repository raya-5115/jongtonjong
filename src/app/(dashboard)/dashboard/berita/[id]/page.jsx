import { redirect } from "next/navigation";

export default async function NewsIdPage({ params }) {
  const { id } = await params;
  redirect(`/dashboard/berita/${id}/edit`);
}
