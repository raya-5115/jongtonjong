"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { ZodError } from "zod";
import {
  createServiceRequest,
  updateServiceRequest,
  deleteServiceRequest,
  getServiceRequestBySubmissionAndNik,
} from "@/services/serviceRequest.service";
import { uploadDocument, deleteFile } from "@/services/storage.service";
import { generateSubmissionNumber } from "@/lib/generateSubmissionNumber";
import {
  serviceRequestSchema,
  updateRequestSchema,
} from "@/validation/serviceRequest.validation";

function cleanErrorMessage(error) {
  if (error instanceof ZodError) {
    return error.issues.map((issue) => issue.message).join(". ");
  }

  if (typeof error?.message === "string" && error.message.startsWith("[")) {
    try {
      const parsed = JSON.parse(error.message);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((item) => item.message).filter(Boolean).join(". ");
      }
    } catch (e) {
      // Ignore JSON parse error
    }
  }

  return error?.message || "Terjadi kesalahan pada server.";
}

export async function createServiceRequestAction(formData) {
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

  try {
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
    }

    revalidatePath("/dashboard/pengajuan");

    return {
      success: true,
      message: "Pengajuan berhasil dibuat.",
      submissionNumber,
      request,
    };
  } catch (error) {
    throw new Error(cleanErrorMessage(error));
  }
}

export async function checkServiceRequestStatusAction({ submissionNumber, nik }) {
  if (!submissionNumber || !submissionNumber.trim()) {
    throw new Error("Nomor Registrasi / Tiket wajib diisi.");
  }

  if (!nik || !nik.trim()) {
    throw new Error("NIK Pemohon wajib diisi.");
  }

  try {
    const request = await getServiceRequestBySubmissionAndNik(submissionNumber, nik);

    if (!request) {
      return {
        success: false,
        message: "Data pengajuan tidak ditemukan. Mohon periksa kembali Nomor Registrasi dan NIK yang Anda masukkan.",
      };
    }

    return {
      success: true,
      data: request,
    };
  } catch (error) {
    throw new Error(cleanErrorMessage(error));
  }
}

export async function updateServiceRequestAction(id, data) {
  try {
    const validated = updateRequestSchema.parse(data);

    await updateServiceRequest(id, validated);

    revalidatePath("/dashboard/pengajuan");
    revalidatePath(`/dashboard/pengajuan/${id}`);

    return {
      success: true,
      message: "Pengajuan berhasil diperbarui.",
    };
  } catch (error) {
    throw new Error(cleanErrorMessage(error));
  }
}

export async function deleteServiceRequestAction(id) {
  try {
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
  } catch (error) {
    throw new Error(cleanErrorMessage(error));
  }
}
