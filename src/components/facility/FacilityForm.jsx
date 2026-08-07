"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createFacilityAction } from "@/actions/facility.action";
import { updateFacilityAction } from "@/actions/facility.action";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  {
    value: "PENDIDIKAN",
    label: "Pendidikan",
  },
  {
    value: "KESEHATAN",
    label: "Kesehatan",
  },
  {
    value: "KEAGAMAAN",
    label: "Keagamaan",
  },
  {
    value: "OLAHRAGA",
    label: "Olahraga",
  },
  {
    value: "PEMERINTAHAN",
    label: "Pemerintahan",
  },
  {
    value: "SOSIAL",
    label: "Sosial",
  },
  {
    value: "LAINNYA",
    label: "Lainnya",
  },
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
    image: facility?.image ?? "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);

      let result;

      if (isEdit) {
        result = await updateFacilityAction(
          facility.id,
          form
        );
      } else {
        result = await createFacilityAction(form);
      }

      toast.success(result.message);

      router.push("/dashboard/fasilitas");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.message ||
          "Terjadi kesalahan saat menyimpan fasilitas."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-6"
    >
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm font-medium"
        >
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
        <label
          htmlFor="category"
          className="text-sm font-medium"
        >
          Kategori
        </label>

        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none"
          required
        >
          {categories.map((category) => (
            <option
              key={category.value}
              value={category.value}
            >
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="text-sm font-medium"
        >
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
        <label
          htmlFor="address"
          className="text-sm font-medium"
        >
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
        <label
          htmlFor="phone"
          className="text-sm font-medium"
        >
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

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Menyimpan..."
            : isEdit
              ? "Simpan Perubahan"
              : "Tambah Fasilitas"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            router.push("/dashboard/fasilitas")
          }
          disabled={loading}
        >
          Batal
        </Button>
      </div>
    </form>
  );
}