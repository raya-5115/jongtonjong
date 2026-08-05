import { z } from "zod";

export const newsSchema = z.object({
  title: z
    .string()
    .min(5, "Judul minimal 5 karakter"),

  content: z
    .string()
    .min(20, "Konten terlalu pendek"),

  image: z.string().optional(),

  status: z.enum([
    "DRAFT",
    "PUBLISHED",
  ]),
});