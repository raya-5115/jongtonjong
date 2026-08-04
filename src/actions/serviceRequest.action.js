"use server";

import { revalidatePath } from "next/cache";

import { serviceRequestSchema } from "@/validation/serviceRequest.validation";

import {
  createServiceRequest,
  updateServiceRequest,
  deleteServiceRequest,
} from "@/services/serviceRequest.service";

import { generateSubmissionNumber } from "@/lib/generateSubmissionNumber";

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
  await updateServiceRequest(id, data);

  revalidatePath("/dashboard/pengajuan");

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