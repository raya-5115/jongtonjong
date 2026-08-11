import { z } from "zod";

export const villageProfileSchema = z.object({
  villageName: z
    .string()
    .min(1, "Nama desa tidak boleh kosong.")
    .max(100, "Nama desa terlalu panjang."),
  title: z
    .string()
    .min(1, "Judul tidak boleh kosong.")
    .max(150, "Judul terlalu panjang."),
  description: z
    .string()
    .min(10, "Deskripsi desa minimal 10 karakter."),
  vision: z
    .string()
    .min(5, "Visi desa minimal 5 karakter."),
  mission: z
    .string()
    .min(5, "Misi desa minimal 5 karakter."),
});
