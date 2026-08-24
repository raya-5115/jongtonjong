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
        <Button
          size="icon"
          variant="outline"
          className="h-9 w-9 rounded-xl border-blue-400 text-blue-500 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-2xs"
          title="Edit Perangkat"
        >
          <SquarePen size={18} />
        </Button>
      </Link>

      <DeletePerangkatDialog
        perangkat={perangkat}
      />

    </div>
  );
}