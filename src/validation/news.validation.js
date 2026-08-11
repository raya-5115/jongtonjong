import { z } from "zod";

export const newsSchema = z.object({
  title: z
    .string()
    .min(5, "Judul minimal 5 karakter"),

  slug: z
    .string()
    .optional(),

  content: z
    .string()
    .min(10, "Isi berita minimal 10 karakter"),

  image: z.string().optional(),
});