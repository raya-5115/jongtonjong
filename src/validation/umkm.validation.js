import { z } from "zod";

export const umkmSchema = z.object({
  businessName: z
    .string()
    .min(3, "Nama usaha minimal 3 karakter"),

  ownerName: z
    .string()
    .min(3, "Nama pemilik wajib diisi"),

  description: z
    .string()
    .min(10, "Deskripsi minimal 10 karakter"),

  address: z
    .string()
    .min(5, "Alamat wajib diisi"),

  phone: z
    .string()
    .min(10, "Nomor telepon tidak valid"),

  productImage: z
    .string()
    .optional(),

  googleMapsUrl: z
    .string()
    .optional(),
});