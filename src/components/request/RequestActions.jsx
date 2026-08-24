"use client";

import Link from "next/link";

import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function RequestActions({ request }) {
  return (
    <Link href={`/dashboard/pengajuan/${request.id}`}>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-xl border-blue-400 text-blue-500 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-2xs"
        title="Lihat Detail Pengajuan"
      >
        <Eye size={18} />
      </Button>
    </Link>
  );
}