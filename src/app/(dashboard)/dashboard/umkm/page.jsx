import Link from "next/link";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { getUmkm } from "@/services/umkm.service";

import UmkmTable from "@/components/umkm/UmkmTable";

export default async function UmkmPage() {
  const umkm = await getUmkm();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            UMKM
          </h1>

          <p className="text-muted-foreground">
            Kelola data UMKM Desa Tonjong.
          </p>
        </div>

        <Link href="/dashboard/umkm/tambah">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tambah UMKM
          </Button>
        </Link>
      </div>

      <UmkmTable data={umkm} />
    </div>
  );
}