import Link from "next/link";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { getPerangkat } from "@/services/perangkat.service";

import PerangkatTable from "@/components/perangkat/PerangkatTable";

export default async function PerangkatPage() {
  const perangkat = await getPerangkat();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold">
            Perangkat Desa
          </h1>

          <p className="text-muted-foreground">
            Kelola data perangkat desa.
          </p>
        </div>

        <Link href="/dashboard/perangkat/tambah">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Perangkat
          </Button>
        </Link>

      </div>

      <PerangkatTable perangkat={perangkat} />
    </div>
  );
}