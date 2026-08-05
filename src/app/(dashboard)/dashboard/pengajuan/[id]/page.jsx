import { notFound } from "next/navigation";

import { getServiceRequestById } from "@/services/serviceRequest.service";

import RequestDetail from "@/components/request/RequestDetail";

export default async function RequestDetailPage({ params }) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const request = await getServiceRequestById(id);

  if (!request) {
    notFound();
  }

  return <RequestDetail request={request} />;
}
