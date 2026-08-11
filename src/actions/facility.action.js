"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  uploadImage,
  deleteFile,
} from "@/services/storage.service";

export async function createFacilityAction(formData) {
  const name = formData.get("name");
  const category = formData.get("category");
  const description = formData.get("description");
  const address = formData.get("address");
  const phone = formData.get("phone");
  const image = formData.get("image");

  if (!name || !category) {
    throw new Error("Nama dan kategori fasilitas wajib diisi.");
  }

  let imagePath = null;

  try {
    if (image && image instanceof File && image.size > 0) {
      imagePath = await uploadImage({
        file: image,
        folder: "fasilitas",
      });
    }

    const facility = await prisma.facility.create({
      data: {
        name,
        category,
        description: description || null,
        address: address || null,
        phone: phone || null,
        image: imagePath,
      },
    });

    revalidatePath("/dashboard/fasilitas");
    revalidatePath("/fasilitas");

    return {
      success: true,
      message: "Fasilitas berhasil ditambahkan.",
      data: facility,
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

export async function updateFacilityAction(id, formData) {
  const existing = await prisma.facility.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Fasilitas tidak ditemukan.");
  }

  const name = formData.get("name");
  const category = formData.get("category");
  const description = formData.get("description");
  const address = formData.get("address");
  const phone = formData.get("phone");
  const image = formData.get("image");

  if (!name || !category) {
    throw new Error("Nama dan kategori fasilitas wajib diisi.");
  }

  let imagePath = existing.image;

  if (image && image instanceof File && image.size > 0) {
    const newImagePath = await uploadImage({
      file: image,
      folder: "fasilitas",
    });

    if (existing.image) {
      await deleteFile({
        bucket: "images",
        path: existing.image,
      });
    }

    imagePath = newImagePath;
  }

  const facility = await prisma.facility.update({
    where: { id },
    data: {
      name,
      category,
      description: description || null,
      address: address || null,
      phone: phone || null,
      image: imagePath,
    },
  });

  revalidatePath("/dashboard/fasilitas");
  revalidatePath(`/dashboard/fasilitas/${id}/edit`);
  revalidatePath("/fasilitas");

  return {
    success: true,
    message: "Fasilitas berhasil diperbarui.",
    data: facility,
  };
}

export async function deleteFacilityAction(id) {
  const existing = await prisma.facility.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Fasilitas tidak ditemukan.");
  }

  if (existing.image) {
    await deleteFile({
      bucket: "images",
      path: existing.image,
    });
  }

  await prisma.facility.delete({
    where: { id },
  });

  revalidatePath("/dashboard/fasilitas");
  revalidatePath("/fasilitas");

  return {
    success: true,
    message: "Fasilitas berhasil dihapus.",
  };
}