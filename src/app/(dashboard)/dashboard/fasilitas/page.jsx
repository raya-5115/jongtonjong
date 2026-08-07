import Link from "next/link";

import { getFacilities } from "@/services/facility.service";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import FacilityTable from "@/components/facility/FacilityTable";

export default async function FacilityPage() {
  const facilities = await getFacilities();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Fasilitas Desa
          </h1>

          <p className="text-muted-foreground">
            Kelola fasilitas yang tersedia di Desa Tonjong.
          </p>
        </div>

        <Link href="/dashboard/fasilitas/tambah">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Fasilitas
          </Button>
        </Link>
      </div>

      <FacilityTable facilities={facilities} />
    </div>
  );
}