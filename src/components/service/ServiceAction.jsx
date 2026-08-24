"use client";

import { useTransition } from "react";
import Link from "next/link";
import { SquarePen, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteServiceAction } from "@/actions/service.action";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ServiceActions({ service }) {
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteServiceAction(service.id);

      if (result.success) {
        toast.success(result.message);
      }
    });
  };

  return (
    <div className="flex justify-end gap-2">
      <Link href={`/dashboard/layanan/${service.id}/edit`}>
        <Button
          size="icon"
          variant="outline"
          className="h-9 w-9 rounded-xl border-blue-400 text-blue-500 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-2xs"
          title="Edit Layanan"
        >
          <SquarePen size={18} />
        </Button>
      </Link>

      <AlertDialog>
        <AlertDialogTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-400 bg-white text-red-500 hover:border-red-500 hover:bg-red-50 hover:text-red-600 transition-colors shadow-2xs cursor-pointer outline-none" title="Hapus Layanan">
          <Trash2 size={18} />
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus layanan?</AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>

            <AlertDialogAction disabled={pending} onClick={handleDelete}>
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
