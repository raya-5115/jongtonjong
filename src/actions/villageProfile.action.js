"use server";

import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { uploadImage, deleteFile } from "@/services/storage.service";
import {
  getVillageProfile,
  updateVillageProfile,
} from "@/services/villageProfile.service";
import { villageProfileSchema } from "@/validation/villageProfile.validation";

function cleanErrorMessage(error) {
  if (error instanceof ZodError) {
    return error.issues.map((issue) => issue.message).join(". ");
  }
  return error?.message || "Terjadi kesalahan pada server.";
}

export async function updateVillageProfileAction(id, formData) {
  try {
    const targetId = typeof id === "string" ? id : formData.get("id");
    const villageName = formData.get("villageName");
    const title = formData.get("title");
    const description = formData.get("description");
    const vision = formData.get("vision");
    const mission = formData.get("mission");
    const image = formData.get("image");

    const validated = villageProfileSchema.parse({
      villageName,
      title,
      description,
      vision,
      mission,
    });

    const currentProfile = await getVillageProfile();
    let imagePath = currentProfile?.image || null;

    const hasNewFile = Boolean(
      image &&
        typeof image === "object" &&
        typeof image.size === "number" &&
        image.size > 0 &&
        Boolean(image.name)
    );

    if (hasNewFile) {
      const newImagePath = await uploadImage({
        file: image,
        folder: "profil",
      });

      if (currentProfile?.image) {
        const oldPath = currentProfile.image.startsWith("/")
          ? currentProfile.image.slice(1)
          : currentProfile.image;

        if (oldPath.startsWith("profil/")) {
          try {
            await deleteFile({
              bucket: "images",
              path: oldPath,
            });
          } catch (err) {
            console.error("Gagal menghapus foto profil lama:", err);
          }
        }
      }

      imagePath = newImagePath;
    }

    const updated = await updateVillageProfile(targetId || currentProfile?.id, {
      ...validated,
      image: imagePath,
    });

    revalidatePath("/");
    revalidatePath("/profil");
    revalidatePath("/dashboard/profil");

    return {
      success: true,
      message: "Profil desa berhasil diperbarui.",
      data: JSON.parse(JSON.stringify(updated)),
    };
  } catch (error) {
    throw new Error(cleanErrorMessage(error));
  }
}
