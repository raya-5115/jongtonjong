"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  createPerangkatAction,
  updatePerangkatAction,
} from "@/actions/perangkat.action";
import DeletePerangkatDialog from "./DeletePerangkatDialog";

import { perangkatSchema } from "@/validation/perangkat.validation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PerangkatForm({
  perangkat = null,
  showDelete = false,
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { register, handleSubmit, setValue, watch } = useForm({
    resolver: zodResolver(perangkatSchema),

    defaultValues: {
      nama: perangkat?.nama ?? "",
      jabatan: perangkat?.jabatan ?? "",
      nik: perangkat?.nik ?? "",
      pendidikanTerakhir: perangkat?.pendidikanTerakhir ?? "",
      foto: perangkat?.foto ?? "",
      masaJabatan: perangkat?.masaJabatan ?? "",
      telepon: perangkat?.telepon ?? "",
      urutan: perangkat?.urutan ?? 0,
    },
  });

  async function onSubmit(data) {
    startTransition(async () => {
      try {
        if (perangkat) {
          const res = await updatePerangkatAction(perangkat.id, data);

          toast.success(res.message);
        } else {
          const res = await createPerangkatAction(data);

          toast.success(res.message);
        }
        router.push("/dashboard/perangkat");
        router.refresh();
      } catch (err) {
        toast.error(err.message);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input placeholder="Nama" {...register("nama")} />

      <Input placeholder="Jabatan" {...register("jabatan")} />

      <Input placeholder="NIK" {...register("nik")} />

      <Input
        placeholder="Pendidikan Terakhir"
        {...register("pendidikanTerakhir")}
      />

      <Input placeholder="Masa Jabatan" {...register("masaJabatan")} />

      <Input placeholder="Telepon" {...register("telepon")} />

      <Input placeholder="URL Foto" {...register("foto")} />

      <Input type="number" placeholder="Urutan" {...register("urutan")} />

      <div className="flex justify-between">
        {showDelete ? <DeletePerangkatDialog perangkat={perangkat} /> : <div />}

        <Button type="submit" disabled={isPending}>
          {isPending ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </form>
  );
}
