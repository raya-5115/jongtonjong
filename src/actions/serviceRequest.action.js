"use server";

import { revalidatePath } from "next/cache";

import {
  createServiceRequest,
  updateServiceRequest,
  deleteServiceRequest,
} from "@/services/serviceRequest.service";

import { generateSubmissionNumber } from "@/lib/generateSubmissionNumber";

import {
  serviceRequestSchema,
  updateRequestSchema,
} from "@/validation/serviceRequest.validation";

export async function createServiceRequestAction(data) {
  const validated = serviceRequestSchema.parse(data);

  const submissionNumber = await generateSubmissionNumber();

  const request = await createServiceRequest({
    ...validated,
    submissionNumber,
  });

  revalidatePath("/dashboard/pengajuan");

  return {
    success: true,
    message: "Pengajuan berhasil dibuat.",
    submissionNumber,
    request,
  };
}

export async function updateServiceRequestAction(id, data) {
  const validated = updateRequestSchema.parse(data);

  await updateServiceRequest(id, validated);

  revalidatePath("/dashboard/pengajuan");
  revalidatePath(`/dashboard/pengajuan/${id}`);

  return {
    success: true,
    message: "Pengajuan berhasil diperbarui.",
  };
}

export async function deleteServiceRequestAction(id) {
  await deleteServiceRequest(id);

  revalidatePath("/dashboard/pengajuan");

  return {
    success: true,
    message: "Pengajuan berhasil dihapus.",
  };
}

