"use server";

import { revalidatePath } from "next/cache";

import {
  createFacility,
  updateFacility,
  deleteFacility,
} from "@/services/facility.service";

import { facilitySchema } from "@/validation/facility.validation";

export async function createFacilityAction(data) {
  const validated = facilitySchema.parse(data);

  await createFacility(validated);

  revalidatePath("/dashboard/fasilitas");

  return {
    success: true,
    message: "Fasilitas berhasil ditambahkan.",
  };
}

export async function updateFacilityAction(id, data) {
  const validated = facilitySchema.parse(data);

  await updateFacility(id, validated);

  revalidatePath("/dashboard/fasilitas");

  return {
    success: true,
    message: "Fasilitas berhasil diperbarui.",
  };
}

export async function deleteFacilityAction(id) {
  await deleteFacility(id);

  revalidatePath("/dashboard/fasilitas");

  return {
    success: true,
    message: "Fasilitas berhasil dihapus.",
  };
}