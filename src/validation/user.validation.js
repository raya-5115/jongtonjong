import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),

  email: z.email("Email tidak valid"),

  password: z.string().min(6, "Password minimal 6 karakter"),

  role: z.enum([
    "SUPER_ADMIN",
    "ADMIN",
  ]),

});

export const updateUserSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),

  email: z.email("Email tidak valid"),

  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .or(z.literal("")),

  role: z.enum([
    "SUPER_ADMIN",
    "ADMIN",
  ]),

});