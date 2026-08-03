import { z } from "zod";

export const serviceSchema = z.object({
  name: z
    .string()
    .min(3, "Nama layanan minimal 3 karakter"),

  description: z.string().optional(),

  requirement: z.string().optional(),

  isActive: z.boolean(),
});