import { notFound } from "next/navigation";

import ServiceForm from "@/components/service/ServiceForm";
import { getServiceById } from "@/services/service.service";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function EditServicePage({ params }) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const service = await getServiceById(id);

  if (!service) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Layanan</CardTitle>
      </CardHeader>

      <CardContent>
        <ServiceForm service={service} />
      </CardContent>
    </Card>
  );
}
