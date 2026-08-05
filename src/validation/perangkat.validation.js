import { z } from "zod";

export const perangkatSchema = z.object({
  nama: z.string().min(3, "Nama minimal 3 karakter"),

  jabatan: z.string().min(3, "Jabatan wajib diisi"),

  nik: z.string().optional(),

  pendidikanTerakhir: z.string().optional(),

  foto: z.string().optional(),

  masaJabatan: z.string().optional(),

  telepon: z.string().optional(),

  urutan: z.coerce.number().min(0),

  isActive: z.boolean(),
});