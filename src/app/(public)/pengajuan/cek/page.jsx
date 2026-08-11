import { redirect } from "next/navigation";

export default async function RedirectPengajuanCek({ searchParams }) {
  const params = await searchParams;
  const ticket = params?.ticket || "";
  const nik = params?.nik || "";

  if (ticket && nik) {
    redirect(`/layanan/cek?ticket=${encodeURIComponent(ticket)}&nik=${encodeURIComponent(nik)}`);
  }

  redirect("/layanan/cek");
}
