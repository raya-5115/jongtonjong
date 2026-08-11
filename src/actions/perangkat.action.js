"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uploadImage, deleteFile } from "@/services/storage.service";
import { perangkatSchema } from "@/validation/perangkat.validation";

function isFileObject(file) {
  return Boolean(
    file &&
      typeof file === "object" &&
      typeof file.size === "number" &&
      file.size > 0 &&
      Boolean(file.name)
  );
}

export async function createPerangkatAction(formData) {
  let imagePath = null;
  const image = formData.get("foto");

  try {
    const nama = formData.get("nama");
    const jabatan = formData.get("jabatan");
    const nip = formData.get("nip") || null;
    const telepon = formData.get("telepon") || null;
    const pendidikanTerakhir = formData.get("pendidikanTerakhir") || null;
    const masaJabatan = formData.get("masaJabatan") || null;
    const urutanRaw = formData.get("urutan") || "0";

    const validated = perangkatSchema.parse({
      nama,
      jabatan,
      nip: nip || undefined,
      telepon: telepon || undefined,
      pendidikanTerakhir: pendidikanTerakhir || undefined,
      masaJabatan: masaJabatan || undefined,
      urutan: Number(urutanRaw),
    });

    if (isFileObject(image)) {
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
      data: JSON.parse(JSON.stringify(perangkat)),
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
      message: error?.message || "Gagal menambahkan perangkat desa.",
    };
  }
}

export async function updatePerangkatAction(id, formData) {
  try {
    if (!id) {
      return {
        success: false,
        message: "ID perangkat desa tidak ditemukan.",
      };
    }

    const existing = await prisma.perangkatDesa.findUnique({
      where: { id },
    });

    if (!existing) {
      return {
        success: false,
        message: "Data perangkat desa tidak ditemukan.",
      };
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

    if (isFileObject(image)) {
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
      data: JSON.parse(JSON.stringify(perangkat)),
    };
  } catch (error) {
    return {
      success: false,
      message: error?.message || "Gagal memperbarui perangkat desa.",
    };
  }
}

export async function deletePerangkatAction(id) {
  try {
    if (!id) {
      return {
        success: false,
        message: "ID perangkat desa tidak ditemukan.",
      };
    }

    const existing = await prisma.perangkatDesa.findUnique({
      where: { id },
    });

    if (!existing) {
      return {
        success: false,
        message: "Data perangkat desa tidak ditemukan.",
      };
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
  } catch (error) {
    return {
      success: false,
      message: error?.message || "Gagal menghapus perangkat desa.",
    };
  }
}