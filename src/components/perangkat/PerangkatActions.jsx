"use client";

import Link from "next/link";

import { SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";

import DeletePerangkatDialog from "./DeletePerangkatDialog";

export default function PerangkatActions({
  perangkat,
}) {
  return (
    <div className="flex justify-end gap-2">

      <Link href={`/dashboard/perangkat/${perangkat.id}/edit`}>
          <Button size="icon" variant="outline">
            <SquarePen size={18} />
          </Button>
        </Link>

      <DeletePerangkatDialog
        perangkat={perangkat}
      />

    </div>
  );
}