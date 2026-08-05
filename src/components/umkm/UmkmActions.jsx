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
          <Button size="icon" variant="outline">
            <SquarePen size={18} />
          </Button>
        </Link>

        <Button
          size="icon"
          variant="destructive"
          onClick={() => setOpenDelete(true)}
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