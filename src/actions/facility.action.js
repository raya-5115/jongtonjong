"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  uploadImage,
  deleteFile,
} from "@/services/storage.service";

function isFileObject(file) {
  return Boolean(
    file &&
      typeof file === "object" &&
      typeof file.size === "number" &&
      file.size > 0 &&
      Boolean(file.name)
  );
}

export async function createFacilityAction(formData) {
  let imagePath = null;
  const image = formData.get("image");

  try {
    const name = formData.get("name");
    const category = formData.get("category");
    const description = formData.get("description");
    const address = formData.get("address");
    const phone = formData.get("phone");

    if (!name || !category) {
      return {
        success: false,
        message: "Nama dan kategori fasilitas wajib diisi.",
      };
    }

    if (isFileObject(image)) {
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
      data: JSON.parse(JSON.stringify(facility)),
    };
  } catch (error) {
    if (imagePath) {
      await deleteFile({
        bucket: "images",
        path: imagePath,
      });
    }
    return {
      success: false,
      message: error?.message || "Gagal menambahkan fasilitas.",
    };
  }
}

export async function updateFacilityAction(id, formData) {
  try {
    if (!id) {
      return {
        success: false,
        message: "ID fasilitas tidak ditemukan.",
      };
    }

    const existing = await prisma.facility.findUnique({
      where: { id },
    });

    if (!existing) {
      return {
        success: false,
        message: "Fasilitas tidak ditemukan.",
      };
    }

    const name = formData.get("name");
    const category = formData.get("category");
    const description = formData.get("description");
    const address = formData.get("address");
    const phone = formData.get("phone");
    const image = formData.get("image");

    if (!name || !category) {
      return {
        success: false,
        message: "Nama dan kategori fasilitas wajib diisi.",
      };
    }

    let imagePath = existing.image;

    if (isFileObject(image)) {
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
      data: JSON.parse(JSON.stringify(facility)),
    };
  } catch (error) {
    return {
      success: false,
      message: error?.message || "Gagal memperbarui fasilitas.",
    };
  }
}

export async function deleteFacilityAction(id) {
  try {
    if (!id) {
      return {
        success: false,
        message: "ID fasilitas tidak ditemukan.",
      };
    }

    const facility = await prisma.facility.findUnique({
      where: { id },
    });

    if (!facility) {
      return {
        success: false,
        message: "Fasilitas tidak ditemukan.",
      };
    }

    await prisma.facility.delete({
      where: { id },
    });

    if (facility.image) {
      await deleteFile({
        bucket: "images",
        path: facility.image,
      });
    }

    revalidatePath("/dashboard/fasilitas");
    revalidatePath("/fasilitas");

    return {
      success: true,
      message: "Fasilitas berhasil dihapus.",
    };
  } catch (error) {
    return {
      success: false,
      message: error?.message || "Gagal menghapus fasilitas.",
    };
  }
}