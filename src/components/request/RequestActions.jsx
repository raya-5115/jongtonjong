"use client";

import Link from "next/link";

import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function RequestActions({ request }) {
  return (
    <Link
      href={`/dashboard/pengajuan/${request.id}`}
    >
      <Button
        variant="outline"
        size="icon"
      >
        <Eye size={18} />
      </Button>
    </Link>
  );
}