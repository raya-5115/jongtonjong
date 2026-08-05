"use client";

import Link from "next/link";

import { SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NewsActions({ news }) {
  return (
    <div className="flex justify-end">

      <Link
        href={`/dashboard/berita/${news.id}/edit`}
      >
        <Button
          variant="outline"
          size="icon"
        >
          <SquarePen className="h-4 w-4" />
        </Button>
      </Link>

    </div>
  );
}