"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uploadImage, deleteFile } from "@/services/storage.service";
import { umkmSchema } from "@/validation/umkm.validation";

export async function createUmkmAction(formData) {
  const businessName = formData.get("businessName");
  const ownerName = formData.get("ownerName");
  const description = formData.get("description");
  const address = formData.get("address");
  const phone = formData.get("phone");
  const googleMapsUrl = formData.get("googleMapsUrl") || null;
  const image = formData.get("image");

  const validated = umkmSchema.parse({
    businessName,
    ownerName,
    description,
    address,
    phone,
    googleMapsUrl: googleMapsUrl || undefined,
  });

  let imagePath = null;

  try {
    if (image && image instanceof File && image.size > 0) {
      imagePath = await uploadImage({
        file: image,
        folder: "umkm",
      });
    }

    const umkm = await prisma.umkm.create({
      data: {
        ...validated,
        productImage: imagePath,
      },
    });

    revalidatePath("/dashboard/umkm");
    revalidatePath("/umkm");

    return {
      success: true,
      message: "UMKM berhasil ditambahkan.",
      data: umkm,
    };
  } catch (error) {
    if (imagePath) {
      await deleteFile({
        bucket: "images",
        path: imagePath,
      });
    }
    throw error;
  }
}

export async function updateUmkmAction(id, formData) {
  if (!id) {
    throw new Error("ID UMKM tidak ditemukan.");
  }

  const existing = await prisma.umkm.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Data UMKM tidak ditemukan.");
  }

  const businessName = formData.get("businessName");
  const ownerName = formData.get("ownerName");
  const description = formData.get("description");
  const address = formData.get("address");
  const phone = formData.get("phone");
  const googleMapsUrl = formData.get("googleMapsUrl") || null;
  const image = formData.get("image");

  const validated = umkmSchema.parse({
    businessName,
    ownerName,
    description,
    address,
    phone,
    googleMapsUrl: googleMapsUrl || undefined,
  });

  let imagePath = existing.productImage;

  if (image && image instanceof File && image.size > 0) {
    const newImagePath = await uploadImage({
      file: image,
      folder: "umkm",
    });

    if (existing.productImage) {
      await deleteFile({
        bucket: "images",
        path: existing.productImage,
      });
    }

    imagePath = newImagePath;
  }

  const umkm = await prisma.umkm.update({
    where: { id },
    data: {
      ...validated,
      productImage: imagePath,
    },
  });

  revalidatePath("/dashboard/umkm");
  revalidatePath(`/dashboard/umkm/${id}/edit`);
  revalidatePath("/umkm");

  return {
    success: true,
    message: "UMKM berhasil diperbarui.",
    data: umkm,
  };
}

export async function deleteUmkmAction(id) {
  if (!id) {
    throw new Error("ID UMKM tidak ditemukan.");
  }

  const existing = await prisma.umkm.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Data UMKM tidak ditemukan.");
  }

  await prisma.umkm.delete({
    where: { id },
  });

  if (existing.productImage) {
    await deleteFile({
      bucket: "images",
      path: existing.productImage,
    });
  }

  revalidatePath("/dashboard/umkm");
  revalidatePath("/umkm");

  return {
    success: true,
    message: "UMKM berhasil dihapus.",
  };
}