"use client";

import Link from "next/link";

import { SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function PerangkatActions({
  perangkat,
}) {
  return (
    <div className="flex justify-end">

      <Button
        asChild
        size="icon"
        variant="outline"
      >
        <Link
          href={`/dashboard/perangkat/${perangkat.id}/edit`}
        >
          <SquarePen className="h-4 w-4" />
        </Link>
      </Button>

    </div>
  );
}