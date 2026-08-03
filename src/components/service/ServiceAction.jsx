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
    <div className="flex justify-end gap-1">
      <Link href={`/dashboard/layanan/${service.id}/edit`}>
        <Button
          size="icon"
          variant="outline"
          className="border-blue-500 text-blue-600 hover:border-blue-400 hover:bg-blue-100 hover:text-blue-700"
        >
          <SquarePen size={18} />
        </Button>
      </Link>

      <AlertDialog>
        <AlertDialogTrigger className="inline-flex size-8 items-center justify-center rounded-lg border border-red-500 bg-background text-red-600 transition-colors hover:border-rose-300 hover:bg-rose-100 hover:text-red-700 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none">
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
