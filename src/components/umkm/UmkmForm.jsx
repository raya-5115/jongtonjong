"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { umkmSchema } from "@/validation/umkm.validation";
import { createUmkmAction, updateUmkmAction } from "@/actions/umkm.action";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function UmkmForm({ umkm = null }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(umkmSchema),
    defaultValues: {
      businessName: umkm?.businessName ?? "",
      ownerName: umkm?.ownerName ?? "",
      productImage: umkm?.productImage ?? "",
      description: umkm?.description ?? "",
      address: umkm?.address ?? "",
      phone: umkm?.phone ?? "",
      googleMapsUrl: umkm?.googleMapsUrl ?? "",
      isActive: umkm?.isActive ?? true,
    },
  });

  async function onSubmit(data) {
    startTransition(async () => {
      try {
        if (umkm) {
          await updateUmkmAction(umkm.id, data);

          toast.success("UMKM berhasil diperbarui.");
        } else {
          await createUmkmAction(data);

          toast.success("UMKM berhasil ditambahkan.");
        }

        router.push("/dashboard/umkm");
        router.refresh();
      } catch (err) {
        toast.error(err.message);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="text-sm font-medium">Nama Usaha</label>

        <Input {...register("businessName")} />
      </div>

      <div>
        <label className="text-sm font-medium">Nama Pemilik</label>

        <Input {...register("ownerName")} />
      </div>

      <div>
        <label className="text-sm font-medium">Foto Produk</label>

        <Input {...register("productImage")} placeholder="https://..." />
      </div>

      <div>
        <label className="text-sm font-medium">Deskripsi Produk</label>

        <Textarea rows={5} {...register("description")} />
      </div>

      <div>
        <label className="text-sm font-medium">Alamat</label>

        <Textarea rows={3} {...register("address")} />
      </div>

      <div>
        <label className="text-sm font-medium">Nomor Telepon</label>

        <Input {...register("phone")} />
      </div>

      <div>
        <label className="text-sm font-medium">Link Google Maps</label>

        <Input
          {...register("googleMapsUrl")}
          placeholder="https://maps.app.goo.gl/..."
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
}
