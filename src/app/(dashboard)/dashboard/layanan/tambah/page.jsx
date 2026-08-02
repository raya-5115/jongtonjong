import ServiceForm from "@/components/service/ServiceForm";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TambahServicePage() {
  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Tambah Layanan
        </CardTitle>

      </CardHeader>

      <CardContent>

        <ServiceForm />

      </CardContent>

    </Card>
  );
}