"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uploadImage, deleteFile } from "@/services/storage.service";
import { perangkatSchema } from "@/validation/perangkat.validation";

export async function createPerangkatAction(formData) {
  const nama = formData.get("nama");
  const jabatan = formData.get("jabatan");
  const nip = formData.get("nip") || null;
  const telepon = formData.get("telepon") || null;
  const pendidikanTerakhir = formData.get("pendidikanTerakhir") || null;
  const masaJabatan = formData.get("masaJabatan") || null;
  const urutanRaw = formData.get("urutan") || "0";
  const image = formData.get("foto");

  const validated = perangkatSchema.parse({
    nama,
    jabatan,
    nip: nip || undefined,
    telepon: telepon || undefined,
    pendidikanTerakhir: pendidikanTerakhir || undefined,
    masaJabatan: masaJabatan || undefined,
    urutan: Number(urutanRaw),
  });

  let imagePath = null;

  try {
    if (image && image instanceof File && image.size > 0) {
      imagePath = await uploadImage({
        file: image,
        folder: "perangkat",
      });
    }

    const perangkat = await prisma.perangkatDesa.create({
      data: {
        ...validated,
        foto: imagePath,
      },
    });

    revalidatePath("/dashboard/perangkat");
    revalidatePath("/profil/perangkat-desa");
    revalidatePath("/");

    return {
      success: true,
      message: "Perangkat desa berhasil ditambahkan.",
      data: perangkat,
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

export async function updatePerangkatAction(id, formData) {
  if (!id) {
    throw new Error("ID perangkat desa tidak ditemukan.");
  }

  const existing = await prisma.perangkatDesa.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Data perangkat desa tidak ditemukan.");
  }

  const nama = formData.get("nama");
  const jabatan = formData.get("jabatan");
  const nip = formData.get("nip") || null;
  const telepon = formData.get("telepon") || null;
  const pendidikanTerakhir = formData.get("pendidikanTerakhir") || null;
  const masaJabatan = formData.get("masaJabatan") || null;
  const urutanRaw = formData.get("urutan") || "0";
  const image = formData.get("foto");

  const validated = perangkatSchema.parse({
    nama,
    jabatan,
    nip: nip || undefined,
    telepon: telepon || undefined,
    pendidikanTerakhir: pendidikanTerakhir || undefined,
    masaJabatan: masaJabatan || undefined,
    urutan: Number(urutanRaw),
  });

  let imagePath = existing.foto;

  if (image && image instanceof File && image.size > 0) {
    const newImagePath = await uploadImage({
      file: image,
      folder: "perangkat",
    });

    if (existing.foto) {
      await deleteFile({
        bucket: "images",
        path: existing.foto,
      });
    }

    imagePath = newImagePath;
  }

  const perangkat = await prisma.perangkatDesa.update({
    where: { id },
    data: {
      ...validated,
      foto: imagePath,
    },
  });

  revalidatePath("/dashboard/perangkat");
  revalidatePath(`/dashboard/perangkat/${id}/edit`);
  revalidatePath("/profil/perangkat-desa");
  revalidatePath("/");

  return {
    success: true,
    message: "Perangkat desa berhasil diperbarui.",
    data: perangkat,
  };
}

export async function deletePerangkatAction(id) {
  if (!id) {
    throw new Error("ID perangkat desa tidak ditemukan.");
  }

  const existing = await prisma.perangkatDesa.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Data perangkat desa tidak ditemukan.");
  }

  await prisma.perangkatDesa.delete({
    where: { id },
  });

  if (existing.foto) {
    await deleteFile({
      bucket: "images",
      path: existing.foto,
    });
  }

  revalidatePath("/dashboard/perangkat");
  revalidatePath("/profil/perangkat-desa");
  revalidatePath("/");

  return {
    success: true,
    message: "Perangkat desa berhasil dihapus.",
  };
}