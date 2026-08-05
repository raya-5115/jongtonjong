"use server";

import { revalidatePath } from "next/cache";

import { perangkatSchema } from "@/validation/perangkat.validation";

import {
  createPerangkat,
  updatePerangkat,
  deletePerangkat,
} from "@/services/perangkat.service";

export async function createPerangkatAction(data) {
  const validated = perangkatSchema.parse(data);

  await createPerangkat(validated);

  revalidatePath("/dashboard/perangkat");

  return {
    success: true,
    message: "Perangkat desa berhasil ditambahkan.",
  };
}

export async function updatePerangkatAction(id, data) {
  const validated = perangkatSchema.parse(data);

  await updatePerangkat(id, validated);

  revalidatePath("/dashboard/perangkat");

  return {
    success: true,
    message: "Perangkat desa berhasil diperbarui.",
  };
}

export async function deletePerangkatAction(id) {
  await deletePerangkat(id);

  revalidatePath("/dashboard/perangkat");

  return {
    success: true,
    message: "Perangkat desa berhasil dihapus.",
  };
}