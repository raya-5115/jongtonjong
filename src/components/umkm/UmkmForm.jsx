"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";

import { createUmkmAction, updateUmkmAction } from "@/actions/umkm.action";
import { getPublicImageUrl } from "@/lib/storage-utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function UmkmForm({ umkm = null }) {
  const router = useRouter();
  const isEdit = Boolean(umkm);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    businessName: umkm?.businessName ?? "",
    ownerName: umkm?.ownerName ?? "",
    description: umkm?.description ?? "",
    address: umkm?.address ?? "",
    phone: umkm?.phone ?? "",
    googleMapsUrl: umkm?.googleMapsUrl ?? "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    umkm?.productImage ? getPublicImageUrl(umkm.productImage) : null
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar (JPG, PNG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB.");
      return;
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleRemoveImage() {
    setImageFile(null);
    setPreviewUrl(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("businessName", form.businessName);
      formData.append("ownerName", form.ownerName);
      formData.append("description", form.description);
      formData.append("address", form.address);
      formData.append("phone", form.phone);
      formData.append("googleMapsUrl", form.googleMapsUrl);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      let result;
      if (isEdit) {
        result = await updateUmkmAction(umkm.id, formData);
      } else {
        result = await createUmkmAction(formData);
      }

      toast.success(result.message);
      router.push("/dashboard/umkm");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        error?.message || "Terjadi kesalahan saat menyimpan data UMKM."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {/* Upload Foto Produk UMKM */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Foto Produk UMKM</label>
        {previewUrl ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <Image
              src={previewUrl}
              alt="Preview foto produk UMKM"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-3 right-3 p-1.5 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition shadow cursor-pointer"
              title="Hapus foto"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-xl cursor-pointer bg-slate-50/50 hover:bg-emerald-50/30 transition group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <div className="p-3 bg-white group-hover:bg-emerald-100 rounded-full border border-slate-200 group-hover:border-emerald-300 shadow-xs mb-2 transition">
                <Upload className="w-5 h-5 text-slate-500 group-hover:text-emerald-600" />
              </div>
              <p className="text-sm font-medium text-slate-700 group-hover:text-emerald-700">
                Klik untuk upload foto produk UMKM
              </p>
              <p className="text-xs text-slate-400 mt-1">
                JPG, PNG, WebP (Maksimal 5MB)
              </p>
            </div>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="businessName" className="text-sm font-medium">
          Nama Usaha
        </label>
        <Input
          id="businessName"
          name="businessName"
          value={form.businessName}
          onChange={handleChange}
          placeholder="Contoh: Keripik Singkong Mbok Darmi"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="ownerName" className="text-sm font-medium">
          Nama Pemilik
        </label>
        <Input
          id="ownerName"
          name="ownerName"
          value={form.ownerName}
          onChange={handleChange}
          placeholder="Contoh: Ibu Sudarmi"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Deskripsi Produk / Usaha
        </label>
        <Textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Jelaskan produk atau keunggulan usaha UMKM ini..."
          rows={5}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="address" className="text-sm font-medium">
          Alamat Lengkap Usaha
        </label>
        <Textarea
          id="address"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Contoh: RT 02 / RW 01, Desa Tonjong"
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">
          Nomor Telepon / WhatsApp
        </label>
        <Input
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Contoh: 081234567890"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="googleMapsUrl" className="text-sm font-medium">
          Link Google Maps (Opsional)
        </label>
        <Input
          id="googleMapsUrl"
          name="googleMapsUrl"
          value={form.googleMapsUrl}
          onChange={handleChange}
          placeholder="https://maps.app.goo.gl/..."
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={loading}>
          {loading
            ? "Menyimpan..."
            : isEdit
            ? "Simpan Perubahan"
            : "Tambah UMKM"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/umkm")}
          disabled={loading}
        >
          Batal
        </Button>
      </div>
    </form>
  );
}
