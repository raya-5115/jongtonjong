"use server";

import { revalidatePath } from "next/cache";

import { umkmSchema } from "@/validation/umkm.validation";

import {
  createUmkm,
  updateUmkm,
  deleteUmkm,
} from "@/services/umkm.service";

export async function createUmkmAction(data) {
  const validated = umkmSchema.parse(data);

  await createUmkm(validated);

  revalidatePath("/dashboard/umkm");

  return {
    success: true,
    message: "UMKM berhasil ditambahkan.",
  };
}

export async function updateUmkmAction(id, data) {
  const validated = umkmSchema.parse(data);

  await updateUmkm(id, validated);

  revalidatePath("/dashboard/umkm");

  return {
    success: true,
    message: "UMKM berhasil diperbarui.",
  };
}

export async function deleteUmkmAction(id) {
  await deleteUmkm(id);

  revalidatePath("/dashboard/umkm");

  return {
    success: true,
    message: "UMKM berhasil dihapus.",
  };
}