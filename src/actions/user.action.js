"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

import { userSchema } from "@/validation/user.validation";

import {
  createUser,
  updateUser,
  deleteUser,
} from "@/services/user.service";

import {
  createUserSchema,
  updateUserSchema,
} from "@/validation/user.validation";

export async function createUserAction(data) {
  const validated =
  createUserSchema.parse(data);

  const passwordHash =
    await bcrypt.hash(
      validated.password,
      10
    );

  await createUser({
    name: validated.name,
    email: validated.email,
    role: validated.role,
    isActive: validated.isActive,
    passwordHash,
  });
}


export async function updateUserAction(
  id,
  data
) {
  const validated =
    updateUserSchema.parse(data);

  const updateData = {
    name: validated.name,
    email: validated.email,
    role: validated.role,
    isActive: validated.isActive,
  };

  if (validated.password !== "") {
    updateData.passwordHash =
      await bcrypt.hash(
        validated.password,
        10
      );
  }

  await updateUser(
    id,
    updateData
  );

  revalidatePath("/dashboard/users");

  return {
    success: true,
    message: "User berhasil diperbarui.",
  };
}
