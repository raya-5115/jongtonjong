"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";

import { createFacilityAction, updateFacilityAction } from "@/actions/facility.action";
import { getPublicImageUrl } from "@/lib/storage-utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  { value: "PENDIDIKAN", label: "Pendidikan" },
  { value: "KESEHATAN", label: "Kesehatan" },
  { value: "KEAGAMAAN", label: "Keagamaan" },
  { value: "OLAHRAGA", label: "Olahraga" },
  { value: "PEMERINTAHAN", label: "Pemerintahan" },
  { value: "SOSIAL", label: "Sosial" },
  { value: "LAINNYA", label: "Lainnya" },
];

export default function FacilityForm({ facility }) {
  const router = useRouter();
  const isEdit = Boolean(facility);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: facility?.name ?? "",
    category: facility?.category ?? "PENDIDIKAN",
    description: facility?.description ?? "",
    address: facility?.address ?? "",
    phone: facility?.phone ?? "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    facility?.image ? getPublicImageUrl(facility.image) : null
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
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("address", form.address);
      formData.append("phone", form.phone);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      let result;
      if (isEdit) {
        result = await updateFacilityAction(facility.id, formData);
      } else {
        result = await createFacilityAction(formData);
      }

      toast.success(result.message);
      router.push("/dashboard/fasilitas");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        error?.message || "Terjadi kesalahan saat menyimpan fasilitas."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {/* Upload Foto Fasilitas */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Foto Fasilitas</label>
        {previewUrl ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <Image
              src={previewUrl}
              alt="Preview foto fasilitas"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-3 right-3 p-1.5 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition shadow"
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
                Klik untuk upload foto fasilitas
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
        <label htmlFor="name" className="text-sm font-medium">
          Nama Fasilitas
        </label>
        <Input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Contoh: Posyandu Melati"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium">
          Kategori
        </label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus:ring-2 focus:ring-emerald-500"
          required
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Deskripsi
        </label>
        <Textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Deskripsi fasilitas..."
          rows={5}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="address" className="text-sm font-medium">
          Alamat
        </label>
        <Textarea
          id="address"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Alamat fasilitas..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">
          Kontak
        </label>
        <Input
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Contoh: 081234567890"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={loading}>
          {loading
            ? "Menyimpan..."
            : isEdit
            ? "Simpan Perubahan"
            : "Tambah Fasilitas"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/fasilitas")}
          disabled={loading}
        >
          Batal
        </Button>
      </div>
    </form>
  );
}