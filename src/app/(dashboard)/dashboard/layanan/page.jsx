import Link from "next/link";

import { getServices } from "@/services/service.service";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import ServiceTable from "@/components/service/ServiceTable";

export default async function ServicePage() {
  const services = await getServices();

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Jenis Layanan
          </h1>
          <p className="text-muted-foreground">
            Kelola layanan desa.
          </p>
        </div>
        
        <Link href="/dashboard/layanan/tambah">
          <Button>
            Tambah Layanan
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Daftar Layanan
          </CardTitle>
          <CardDescription>
            Total {services.length} layanan
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ServiceTable
            services={services}
          />
        </CardContent>
      </Card>
    </div>
  );
}