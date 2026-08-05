"use client";

import Link from "next/link";

import { SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";

import DeleteNewsDialog from "./DeleteNewsDialog";

export default function NewsActions({
  news,
}) {
  return (
    <div className="flex justify-end gap-2">

      <Link
        href={`/dashboard/berita/${news.id}/edit`}
      >
        <Button
          size="icon"
          variant="outline"
        >
          <SquarePen size={18} />
        </Button>
      </Link>

      <DeleteNewsDialog news={news} />

    </div>
  );
}