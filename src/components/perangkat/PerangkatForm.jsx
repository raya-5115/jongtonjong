"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  createPerangkatAction,
  updatePerangkatAction,
} from "@/actions/perangkat.action";

import { perangkatSchema } from "@/validation/perangkat.validation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PerangkatForm({
  perangkat = null,
}) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(perangkatSchema),

    defaultValues: {
      nama: perangkat?.nama ?? "",
      jabatan: perangkat?.jabatan ?? "",
      nik: perangkat?.nik ?? "",
      pendidikanTerakhir:
        perangkat?.pendidikanTerakhir ?? "",
      foto: perangkat?.foto ?? "",
      masaJabatan:
        perangkat?.masaJabatan ?? "",
      email: perangkat?.email ?? "",
      telepon: perangkat?.telepon ?? "",
      urutan: perangkat?.urutan ?? 0,
    },
  });

  async function onSubmit(data) {
    startTransition(async () => {
      try {
        if (perangkat) {
          await updatePerangkatAction(
            perangkat.id,
            data
          );

          toast.success(
            "Perangkat desa berhasil diperbarui."
          );
        } else {
          await createPerangkatAction(data);

          toast.success(
            "Perangkat desa berhasil ditambahkan."
          );
        }
        router.push("/dashboard/perangkat");
        router.refresh();
      } catch (err) {
        toast.error(err.message);
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >

      <Input
        placeholder="Nama"
        {...register("nama")}
      />

      <Input
        placeholder="Jabatan"
        {...register("jabatan")}
      />

      <Input
        placeholder="NIK"
        {...register("nik")}
      />

      <Input
        placeholder="Pendidikan Terakhir"
        {...register("pendidikanTerakhir")}
      />

      <Input
        placeholder="Masa Jabatan"
        {...register("masaJabatan")}
      />

      <Input
        placeholder="Email"
        {...register("email")}
      />

      <Input
        placeholder="Telepon"
        {...register("telepon")}
      />

      <Input
        placeholder="URL Foto"
        {...register("foto")}
      />

      <Input
        type="number"
        placeholder="Urutan"
        {...register("urutan")}
      />

      <Button
        type="submit"
        disabled={isPending}
      >
        {isPending
          ? "Menyimpan..."
          : "Simpan"}
      </Button>
    </form>
  );
}