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

      <AlertDialogTrigger>
        <Trash2 className="h-4 w-4" />
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