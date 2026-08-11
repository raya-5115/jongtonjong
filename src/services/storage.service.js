import "server-only";

import { supabaseStorage } from "@/lib/supabase-storage";
import crypto from "crypto";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/pjpeg",
  "image/png",
  "image/webp",
];

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

export function validateImage(file) {
  if (!file || file.size === 0) {
    throw new Error("Gambar belum dipilih.");
  }

  const isAllowedType =
    ALLOWED_IMAGE_TYPES.includes(file.type) ||
    /\.(jpg|jpeg|png|webp)$/i.test(file.name);

  if (!isAllowedType) {
    throw new Error(
      "Format gambar harus JPG, JPEG, PNG, atau WebP."
    );
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error(
      "Ukuran gambar maksimal 5 MB."
    );
  }
}

export async function uploadImage({
  file,
  folder,
}) {
  validateImage(file);

  const extension = getExtension(file);
  const fileName = `${crypto.randomUUID()}.${extension}`;
  const path = `${folder}/${fileName}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { data, error } = await supabaseStorage.storage
    .from("images")
    .upload(path, buffer, {
      contentType: file.type || "image/jpeg",
      upsert: true,
    });

  if (error) {
    throw new Error(
      `Gagal upload gambar: ${error.message}`
    );
  }

  return data.path;
}

export async function uploadDocument({
  file,
  folder = "dokumen-pengajuan",
}) {
  if (!file || file.size === 0) {
    throw new Error("File dokumen tidak valid.");
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error(`Ukuran file "${file.name}" melebihi batas 10 MB.`);
  }

  const rawExt = file.name.split(".").pop() || "bin";
  const fileName = `${crypto.randomUUID()}.${rawExt}`;
  const path = `${folder}/${fileName}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { data, error } = await supabaseStorage.storage
    .from("images")
    .upload(path, buffer, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

  if (error) {
    throw new Error(
      `Gagal upload dokumen "${file.name}": ${error.message}`
    );
  }

  return data.path;
}

export async function deleteFile({
  bucket = "images",
  path,
}) {
  if (!path) {
    return;
  }

  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // Don't attempt to delete local public static assets
  if (!cleanPath.includes("/")) {
    return;
  }

  try {
    const { error } = await supabaseStorage.storage
      .from(bucket)
      .remove([cleanPath]);

    if (error) {
      console.error("Gagal menghapus file dari storage:", error.message);
    }
  } catch (err) {
    console.error("Error saat menghapus file storage:", err);
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

function getExtension(file) {
  if (file && file.name) {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext) return ext;
  }

  const extensions = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/pjpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };

  return extensions[file?.type] || "jpg";
}