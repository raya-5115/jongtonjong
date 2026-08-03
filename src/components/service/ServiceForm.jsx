"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema } from "@/validation/service.validation";
import {
  createServiceAction,
  updateServiceAction,
} from "@/actions/service.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function ServiceForm({ service }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(serviceSchema),

    defaultValues: {
      name: service?.name ?? "",
      description: service?.description ?? "",
      requirement: service?.requirement ?? "",
      isActive: service?.isActive ?? true,
    },
  });

  async function onSubmit(values) {
    const result = service
      ? await updateServiceAction(service.id, values)
      : await createServiceAction(values);

    if (result.success) {
      toast.success(result.message);

      router.push("/dashboard/layanan");

      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label>Nama Layanan</Label>

        <Input {...register("name")} placeholder="Contoh: Surat Domisili" />

        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Deskripsi</Label>

        <Textarea
          {...register("description")}
          placeholder="Deskripsi layanan..."
        />
      </div>

      <div className="space-y-2">
        <Label>Persyaratan</Label>

        <Textarea {...register("requirement")} placeholder="KTP, KK, dll" />
      </div>

      <div className="flex items-center gap-3">
        <Switch
          defaultChecked
          onCheckedChange={(checked) => setValue("isActive", checked)}
        />

        <Label>Aktif</Label>
      </div>

      <div className="flex justify-between pt-6">
        <div />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Menyimpan..." : service ? "Update" : "Simpan"}
        </Button>
      </div>
    </form>
  );
}
