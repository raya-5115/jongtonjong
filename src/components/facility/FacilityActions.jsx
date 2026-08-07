"use client";

import Link from "next/link";

import { SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";

import DeleteFacilityDialog from "./DeleteFacilityDialog";

export default function FacilityActions({ facility }) {
  return (
    <div className="flex justify-end gap-2">
      <Link
        href={`/dashboard/fasilitas/${facility.id}/edit`}
      >
        <Button
          size="icon"
          variant="outline"
        >
          <SquarePen size={18} />
        </Button>
      </Link>

      <DeleteFacilityDialog facility={facility} />
    </div>
  );
}