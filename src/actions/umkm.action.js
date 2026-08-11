"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uploadImage, deleteFile } from "@/services/storage.service";
import { umkmSchema } from "@/validation/umkm.validation";

function isFileObject(file) {
  return Boolean(
    file &&
      typeof file === "object" &&
      typeof file.size === "number" &&
      file.size > 0 &&
      Boolean(file.name)
  );
}

export async function createUmkmAction(formData) {
  let imagePath = null;
  const image = formData.get("image");

  try {
    const businessName = formData.get("businessName");
    const ownerName = formData.get("ownerName");
    const description = formData.get("description");
    const address = formData.get("address");
    const phone = formData.get("phone");
    const googleMapsUrl = formData.get("googleMapsUrl") || null;

    const validated = umkmSchema.parse({
      businessName,
      ownerName,
      description,
      address,
      phone,
      googleMapsUrl: googleMapsUrl || undefined,
    });

    if (isFileObject(image)) {
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
      data: JSON.parse(JSON.stringify(umkm)),
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
      message: error?.message || "Gagal menambahkan UMKM.",
    };
  }
}

export async function updateUmkmAction(id, formData) {
  try {
    if (!id) {
      return {
        success: false,
        message: "ID UMKM tidak ditemukan.",
      };
    }

    const existing = await prisma.umkm.findUnique({
      where: { id },
    });

    if (!existing) {
      return {
        success: false,
        message: "Data UMKM tidak ditemukan.",
      };
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

    if (isFileObject(image)) {
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
      data: JSON.parse(JSON.stringify(umkm)),
    };
  } catch (error) {
    return {
      success: false,
      message: error?.message || "Gagal memperbarui UMKM.",
    };
  }
}

export async function deleteUmkmAction(id) {
  try {
    if (!id) {
      return {
        success: false,
        message: "ID UMKM tidak ditemukan.",
      };
    }

    const existing = await prisma.umkm.findUnique({
      where: { id },
    });

    if (!existing) {
      return {
        success: false,
        message: "Data UMKM tidak ditemukan.",
      };
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
  } catch (error) {
    return {
      success: false,
      message: error?.message || "Gagal menghapus UMKM.",
    };
  }
}