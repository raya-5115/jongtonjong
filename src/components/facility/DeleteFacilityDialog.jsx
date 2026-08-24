"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

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

import { Button } from "@/components/ui/button";

import { deleteFacilityAction } from "@/actions/facility.action";

export default function DeleteFacilityDialog({ facility }) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      const result = await deleteFacilityAction(facility.id);

      toast.success(result.message);
    } catch (error) {
      console.error(error);

      toast.error("Gagal menghapus fasilitas.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-400 bg-white text-red-500 hover:border-red-500 hover:bg-red-50 hover:text-red-600 transition-colors shadow-2xs cursor-pointer outline-none" title="Hapus Fasilitas">
        <Trash2 size={18} />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Hapus fasilitas?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Fasilitas{" "}
            <strong>{facility.name}</strong>{" "}
            akan dihapus secara permanen.
            Tindakan ini tidak dapat dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            Batal
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Menghapus..." : "Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}