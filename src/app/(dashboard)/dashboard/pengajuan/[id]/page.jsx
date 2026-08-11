import { notFound } from "next/navigation";

import { getServiceRequestById } from "@/services/serviceRequest.service";

import RequestDetail from "@/components/request/RequestDetail";

export default async function RequestDetailPage({ params }) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  let request = null;

  try {
    request = await getServiceRequestById(id);
  } catch (error) {
    console.error(`Gagal mengambil detail pengajuan ID ${id}:`, error);
  }

  if (!request) {
    notFound();
  }

  return <RequestDetail request={request} />;
}
