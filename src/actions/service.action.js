"use server";

import { revalidatePath } from "next/cache";

import { serviceSchema } from "@/validation/service.validation";
import { createService } from "@/services/service.service";

export async function createServiceAction(data) {
  const validated = serviceSchema.parse(data);

  await createService({
    ...validated,
    isActive: true,
  });

  revalidatePath("/dashboard/layanan");

  return {
    success: true,
    message: "Layanan berhasil ditambahkan.",
  };
}