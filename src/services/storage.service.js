import "server-only";

import { supabaseStorage } from "@/lib/supabase-storage";
import crypto from "crypto";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

export function validateImage(file) {
  if (!file || file.size === 0) {
    throw new Error("Gambar belum dipilih.");
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(
      "Format gambar harus JPG, PNG, atau WebP.",
    );
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error(
      "Ukuran gambar maksimal 5 MB.",
    );
  }
}

export async function uploadImage({
  file,
  folder,
}) {
  validateImage(file);

  const extension = getExtension(file.type);

  const fileName = `${crypto.randomUUID()}.${extension}`;

  const path = `${folder}/${fileName}`;

  const { data, error } = await supabaseStorage.storage
    .from("images")
    .upload(path, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(
      `Gagal upload gambar: ${error.message}`,
    );
  }

  return data.path;
}

export async function deleteFile({
  bucket,
  path,
}) {
  if (!path) {
    return;
  }

  const { error } = await supabaseStorage.storage
    .from(bucket)
    .remove([path]);

  if (error) {
    throw new Error(
      `Gagal menghapus file: ${error.message}`,
    );
  }
}

export function getPublicImageUrl(path) {
  if (!path) {
    return null;
  }

  const { data } = supabaseStorage.storage
    .from("images")
    .getPublicUrl(path);

  return data.publicUrl;
}

function getExtension(contentType) {
  const extensions = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };

  return extensions[contentType];
}