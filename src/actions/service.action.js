"use server";

import { revalidatePath } from "next/cache";
import { serviceSchema } from "@/validation/service.validation";
import { createService } from "@/services/service.service";
import { updateService } from "@/services/service.service";
import { deleteService } from "@/services/service.service";

export async function createServiceAction(data) {
  // Validasi di server
  const validated = serviceSchema.parse(data);

  // Simpan ke database
  await createService(validated);

  // Refresh halaman daftar layanan
  revalidatePath("/dashboard/layanan");

  return {
    success: true,
    message: "Layanan berhasil ditambahkan.",
  };
}

export async function updateServiceAction(id, data) {
  const validated = serviceSchema.parse(data);

  await updateService(id, validated);

  revalidatePath("/dashboard/layanan");

  return {
    success: true,
    message: "Layanan berhasil diperbarui.",
  };
}

export async function deleteServiceAction(id) {
  await deleteService(id);

  revalidatePath("/dashboard/layanan");

  return {
    success: true,
    message: "Layanan berhasil dihapus.",
  };
}