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

      <AlertDialogTrigger>

        <Button
          size="icon"
          variant="destructive"
        >
          <Trash2 size={18} />
        </Button>

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