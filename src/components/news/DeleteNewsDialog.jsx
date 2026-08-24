"use client";

import { useTransition } from "react";

import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

import { Trash2 } from "lucide-react";

import { deleteNewsAction } from "@/actions/news.action";

export default function DeleteNewsDialog({
  news,
}) {
  const [isPending, startTransition] =
    useTransition();

  function handleDelete() {
    startTransition(async () => {
      try {
        const res =
          await deleteNewsAction(news.id);

        toast.success(res.message);
      } catch (err) {
        toast.error(err.message);
      }
    });
  }

  return (
    <AlertDialog>

      <AlertDialogTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-400 bg-white text-red-500 hover:border-red-500 hover:bg-red-50 hover:text-red-600 transition-colors shadow-2xs cursor-pointer outline-none" title="Hapus Berita">
        <Trash2 size={18} />
      </AlertDialogTrigger>

      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>
            Hapus Berita?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Berita ini akan dihapus permanen.
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>
            Batal
          </AlertDialogCancel>

          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            Hapus
          </Button>

        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>
  );
}