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
  serviceId: z.string().min(1, "Jenis Layanan wajib dipilih"),

  fullName: z.string().min(3, "Nama Pemohon minimal 3 karakter"),

  nik: z
    .string()
    .length(16, "NIK harus 16 digit angka")
    .regex(/^\d+$/, "NIK hanya boleh berisi angka"),

  phone: z.string().min(10, "Nomor HP minimal 10 digit"),

  address: z.string().min(5, "Alamat minimal 5 karakter"),

  description: z.string().optional(),
});

export const updateRequestSchema = z.object({
  status: requestStatusSchema,

  note: z.string().optional(),
});
