"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { serviceSchema } from "@/validation/service.validation";

import { createServiceAction } from "@/actions/service.action";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ServiceForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(serviceSchema),

    defaultValues: {
      name: "",
      description: "",
      requirement: "",
      isActive: true,
    },
  });

  async function onSubmit(values) {
    const result = await createServiceAction(values);

    if (result.success) {
      toast.success(result.message);

      router.push("/dashboard/layanan");

      router.refresh();
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <Input
          placeholder="Nama Layanan"
          {...register("name")}
        />

        <p className="text-sm text-red-500 mt-1">
          {errors.name?.message}
        </p>
      </div>

      <Textarea
        placeholder="Deskripsi"
        {...register("description")}
      />

      <Textarea
        placeholder="Persyaratan"
        {...register("requirement")}
      />

      <Button
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting
          ? "Menyimpan..."
          : "Simpan"}
      </Button>
    </form>
  );
}