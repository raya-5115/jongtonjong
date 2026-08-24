"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { deletePerangkatAction } from "@/actions/perangkat.action";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DeletePerangkatDialog({
  perangkat,
}) {
  const [isPending, startTransition] =
    useTransition();

  function handleDelete() {
    startTransition(async () => {
      try {
        const result =
          await deletePerangkatAction(
            perangkat.id
          );

        toast.success(result.message);
      } catch (err) {
        toast.error(err.message);
      }
    });
  }

  return (
    <AlertDialog>

      <AlertDialogTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-400 bg-white text-red-500 hover:border-red-500 hover:bg-red-50 hover:text-red-600 transition-colors shadow-2xs cursor-pointer outline-none" title="Hapus Perangkat">
        <Trash2 size={18} />
      </AlertDialogTrigger>

      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>
            Hapus Perangkat Desa?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Data{" "}
            <strong>{perangkat.nama}</strong>{" "}
            akan dihapus secara permanen.
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>
            Batal
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending
              ? "Menghapus..."
              : "Hapus"}
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>
  );
}