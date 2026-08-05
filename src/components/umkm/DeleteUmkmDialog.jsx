"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

import { deleteUmkmAction } from "@/actions/umkm.action";

export default function DeleteUmkmDialog({
  open,
  onOpenChange,
  umkm,
}) {
  const [isPending, startTransition] =
    useTransition();

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteUmkmAction(umkm.id);

        toast.success("UMKM berhasil dihapus.");

        onOpenChange(false);
      } catch (err) {
        toast.error(err.message);
      }
    });
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>
            Hapus UMKM
          </AlertDialogTitle>

          <AlertDialogDescription>
            Yakin ingin menghapus UMKM
            <strong> {umkm.businessName}</strong>?
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>
            Batal
          </AlertDialogCancel>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending
              ? "Menghapus..."
              : "Hapus"}
          </Button>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}