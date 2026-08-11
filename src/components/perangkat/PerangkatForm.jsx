"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Upload, X, User } from "lucide-react";

import {
  createPerangkatAction,
  updatePerangkatAction,
} from "@/actions/perangkat.action";
import { getPublicImageUrl } from "@/lib/storage-utils";
import DeletePerangkatDialog from "./DeletePerangkatDialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PerangkatForm({
  perangkat = null,
  showDelete = false,
}) {
  const router = useRouter();
  const isEdit = Boolean(perangkat);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nama: perangkat?.nama ?? "",
    jabatan: perangkat?.jabatan ?? "",
    nip: perangkat?.nip ?? "",
    pendidikanTerakhir: perangkat?.pendidikanTerakhir ?? "",
    masaJabatan: perangkat?.masaJabatan ?? "",
    telepon: perangkat?.telepon ?? "",
    urutan: perangkat?.urutan ?? 0,
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    perangkat?.foto ? getPublicImageUrl(perangkat.foto) : null
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
      formData.append("nama", form.nama);
      formData.append("jabatan", form.jabatan);
      formData.append("nip", form.nip);
      formData.append("pendidikanTerakhir", form.pendidikanTerakhir);
      formData.append("masaJabatan", form.masaJabatan);
      formData.append("telepon", form.telepon);
      formData.append("urutan", form.urutan.toString());

      if (imageFile) {
        formData.append("foto", imageFile);
      }

      let result;
      if (isEdit) {
        result = await updatePerangkatAction(perangkat.id, formData);
      } else {
        result = await createPerangkatAction(formData);
      }

      toast.success(result.message);
      router.push("/dashboard/perangkat");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        error?.message || "Terjadi kesalahan saat menyimpan data perangkat desa."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {/* Upload Foto Perangkat Desa */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Foto Perangkat Desa</label>
        {previewUrl ? (
          <div className="relative aspect-[3/4] max-w-[200px] overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-xs">
            <Image
              src={previewUrl}
              alt="Preview Foto Perangkat"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1.5 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition shadow cursor-pointer"
              title="Hapus foto"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full max-w-[200px] h-52 border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-xl cursor-pointer bg-slate-50/50 hover:bg-emerald-50/30 transition group">
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <div className="p-3 bg-white group-hover:bg-emerald-100 rounded-full border border-slate-200 group-hover:border-emerald-300 shadow-xs mb-2 transition">
                <Upload className="w-5 h-5 text-slate-500 group-hover:text-emerald-600" />
              </div>
              <p className="text-xs font-medium text-slate-700 group-hover:text-emerald-700">
                Klik untuk upload foto
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                JPG, PNG, WebP (Maks 5MB)
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
        <label htmlFor="nama" className="text-sm font-medium">
          Nama Lengkap <span className="text-red-500">*</span>
        </label>
        <Input
          id="nama"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          placeholder="Contoh: Isep Firdaos, S.IP"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="jabatan" className="text-sm font-medium">
          Jabatan <span className="text-red-500">*</span>
        </label>
        <Input
          id="jabatan"
          name="jabatan"
          value={form.jabatan}
          onChange={handleChange}
          placeholder="Contoh: KEPALA DESA / SEKRETARIS DESA"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="nip" className="text-sm font-medium">
          NIP (Opsional)
        </label>
        <Input
          id="nip"
          name="nip"
          value={form.nip}
          onChange={handleChange}
          placeholder="Nomor Induk Pegawai"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="pendidikanTerakhir" className="text-sm font-medium">
            Pendidikan Terakhir
          </label>
          <Input
            id="pendidikanTerakhir"
            name="pendidikanTerakhir"
            value={form.pendidikanTerakhir}
            onChange={handleChange}
            placeholder="Contoh: S1 Ilmu Pemerintahan"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="masaJabatan" className="text-sm font-medium">
            Masa Jabatan
          </label>
          <Input
            id="masaJabatan"
            name="masaJabatan"
            value={form.masaJabatan}
            onChange={handleChange}
            placeholder="Contoh: 2021 - 2027"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="telepon" className="text-sm font-medium">
            Nomor Telepon
          </label>
          <Input
            id="telepon"
            name="telepon"
            value={form.telepon}
            onChange={handleChange}
            placeholder="Contoh: 081234567890"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="urutan" className="text-sm font-medium">
            Urutan Tampilan
          </label>
          <Input
            id="urutan"
            name="urutan"
            type="number"
            value={form.urutan}
            onChange={handleChange}
            placeholder="0"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        {showDelete && perangkat ? (
          <DeletePerangkatDialog perangkat={perangkat} />
        ) : (
          <div />
        )}

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/perangkat")}
            disabled={loading}
          >
            Batal
          </Button>

          <Button type="submit" disabled={loading}>
            {loading
              ? "Menyimpan..."
              : isEdit
              ? "Simpan Perubahan"
              : "Tambah Perangkat"}
          </Button>
        </div>
      </div>
    </form>
  );
}
