import { z } from "zod";

const requestStatusSchema = z
  .enum(["PENDING", "PROCESS", "FINISHED", "REJECTED", "APPROVED", "COMPLETED"])
  .transform((status) => {
    if (status === "APPROVED" || status === "COMPLETED") {
      return "FINISHED";
    }

    return status;
  });

export const serviceRequestSchema = z.object({
  serviceId: z.string().min(1, "Layanan wajib dipilih"),

  fullName: z.string().min(3, "Nama minimal 3 karakter"),

  nip: z
    .string()
    .length(16, "NIP harus 16 digit")
    .regex(/^\d+$/, "NIP hanya boleh berisi angka"),

  phone: z.string().min(10, "Nomor HP tidak valid"),

  address: z.string().min(5, "Alamat terlalu pendek"),

  description: z.string().optional(),
});

export const updateRequestSchema = z.object({
  status: requestStatusSchema,

  note: z.string().optional(),
});
