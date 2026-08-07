import { z } from "zod";

export const facilitySchema = z.object({
  name: z
    .string()
    .min(1, "Nama fasilitas wajib diisi"),

  category: z.enum([
    "PENDIDIKAN",
    "KESEHATAN",
    "KEAGAMAAN",
    "OLAHRAGA",
    "PEMERINTAHAN",
    "SOSIAL",
    "LAINNYA",
  ]),

  description: z
    .string()
    .optional()
    .or(z.literal("")),

  address: z
    .string()
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .optional()
    .or(z.literal("")),

  image: z
    .string()
    .optional()
    .or(z.literal("")),
});