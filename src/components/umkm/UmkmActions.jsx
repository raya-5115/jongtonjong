"use client";

import { useState } from "react";
import Link from "next/link";

import { SquarePen, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import DeleteUmkmDialog from "./DeleteUmkmDialog";

export default function UmkmActions({ umkm }) {
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <div className="flex justify-end gap-2">

        <Link href={`/dashboard/umkm/${umkm.id}/edit`}>
          <Button
            size="icon"
            variant="outline"
            className="h-9 w-9 rounded-xl border-blue-400 text-blue-500 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-2xs"
            title="Edit UMKM"
          >
            <SquarePen size={18} />
          </Button>
        </Link>

        <Button
          size="icon"
          variant="outline"
          className="h-9 w-9 rounded-xl border-red-400 text-red-500 hover:border-red-500 hover:bg-red-50 hover:text-red-600 transition-colors shadow-2xs"
          onClick={() => setOpenDelete(true)}
          title="Hapus UMKM"
        >
          <Trash2 size={18} />
        </Button>

      </div>

      <DeleteUmkmDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        umkm={umkm}
      />
    </>
  );
}