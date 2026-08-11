"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  createServiceRequest,
  updateServiceRequest,
  deleteServiceRequest,
} from "@/services/serviceRequest.service";
import { uploadDocument, deleteFile } from "@/services/storage.service";
import { generateSubmissionNumber } from "@/lib/generateSubmissionNumber";
import {
  serviceRequestSchema,
  updateRequestSchema,
} from "@/validation/serviceRequest.validation";

export async function createServiceRequestAction(formData) {
  // Support both FormData and plain object fallback
  let fullName, phone, nik, address, serviceId, description, files = [];

  if (formData instanceof FormData) {
    fullName = formData.get("fullName");
    phone = formData.get("phone");
    nik = formData.get("nik");
    address = formData.get("address");
    serviceId = formData.get("serviceId");
    description = formData.get("description") || "";
    files = formData.getAll("files");
  } else {
    fullName = formData.fullName;
    phone = formData.phone;
    nik = formData.nik;
    address = formData.address;
    serviceId = formData.serviceId;
    description = formData.description || "";
  }

  const validated = serviceRequestSchema.parse({
    fullName,
    phone,
    nik,
    address,
    serviceId,
    description,
  });

  const submissionNumber = await generateSubmissionNumber();

  const request = await createServiceRequest({
    ...validated,
    submissionNumber,
  });

  // Handle multiple document attachments upload
  const uploadedPaths = [];

  try {
    for (const file of files) {
      if (file && file instanceof File && file.size > 0) {
        const filePath = await uploadDocument({
          file,
          folder: "dokumen-pengajuan",
        });

        uploadedPaths.push(filePath);

        await prisma.serviceRequestAttachment.create({
          data: {
            serviceRequestId: request.id,
            fileName: file.name,
            fileUrl: filePath,
          },
        });
      }
    }
  } catch (uploadErr) {
    console.error("Gagal mengunggah lampiran:", uploadErr);
    // Silent fail or continue - request is saved
  }

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
  const existing = await prisma.serviceRequest.findUnique({
    where: { id },
    include: { attachments: true },
  });

  if (existing && existing.attachments) {
    for (const file of existing.attachments) {
      if (file.fileUrl) {
        await deleteFile({ bucket: "images", path: file.fileUrl });
      }
    }
  }

  await deleteServiceRequest(id);

  revalidatePath("/dashboard/pengajuan");

  return {
    success: true,
    message: "Pengajuan berhasil dihapus.",
  };
}
