"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Save, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPublicImageUrl } from "@/lib/storage-utils";
import { updateVillageProfileAction } from "@/actions/villageProfile.action";

export default function VillageProfileForm({ profile }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [villageName, setVillageName] = useState(
    profile?.villageName || "Desa Tonjong"
  );
  const [title, setTitle] = useState(
    profile?.title || "Mengenal Desa Tonjong"
  );
  const [description, setDescription] = useState(profile?.description || "");
  const [vision, setVision] = useState(profile?.vision || "");
  const [mission, setMission] = useState(profile?.mission || "");

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    profile?.image ? getPublicImageUrl(profile.image) : "/kantor-desa.png"
  );

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("villageName", villageName);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("vision", vision);
    formData.append("mission", mission);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    startTransition(async () => {
      try {
        const res = await updateVillageProfileAction(formData);
        if (res.success) {
          toast.success(res.message || "Profil desa berhasil diperbarui.");
          if (res.data?.image) {
            setPreviewUrl(getPublicImageUrl(res.data.image));
          }
          setSelectedFile(null);
          router.refresh();
        } else {
          toast.error(res.message || "Gagal memperbarui profil desa.");
        }
      } catch (err) {
        toast.error(err.message || "Gagal memperbarui profil desa.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Gambar & Identitas Utama */}
      <Card>
        <CardHeader>
          <CardTitle>Foto & Judul Halaman Profil</CardTitle>
          <CardDescription>
            Atur foto sampul/kantor desa dan judul utama yang tampil di halaman profil publik.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Image Preview & File Input */}
          <div className="space-y-3">
            <Label>Foto Profil / Kantor Desa</Label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative h-44 w-full sm:w-72 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm shrink-0">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Preview Profil Desa"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-400">
                    <ImageIcon className="h-10 w-10" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="cursor-pointer max-w-xs"
                />
                <p className="text-xs text-muted-foreground">
                  Format gambar JPG, PNG, atau WEBP. Maksimal 5MB.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="villageName">Nama Desa</Label>
              <Input
                id="villageName"
                value={villageName}
                onChange={(e) => setVillageName(e.target.value)}
                placeholder="Contoh: Desa Tonjong"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Judul Halaman Profil</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Mengenal Desa Tonjong"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deskripsi / Sejarah */}
      <Card>
        <CardHeader>
          <CardTitle>Deskripsi & Tentang Desa</CardTitle>
          <CardDescription>
            Jelaskan gambaran umum, sejarah singkat, dan komitmen Pemerintah Desa.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi Lengkap</Label>
            <Textarea
              id="description"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tuliskan deskripsi mengenai Desa Tonjong..."
              required
            />
            <p className="text-xs text-muted-foreground">
              Gunakan baris baru (Enter) untuk memisahkan antar paragraf.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Visi & Misi */}
      <Card>
        <CardHeader>
          <CardTitle>Visi & Misi Desa</CardTitle>
          <CardDescription>
            Rumusan visi dan misi pembangunan desa.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="vision">Visi Desa</Label>
            <Textarea
              id="vision"
              rows={3}
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              placeholder="Tuliskan visi desa..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mission">Misi Desa</Label>
            <Textarea
              id="mission"
              rows={4}
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              placeholder="Tuliskan poin-poin misi desa..."
              required
            />
            <p className="text-xs text-muted-foreground">
              Tuliskan poin-poin misi desa secara jelas.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="min-w-[180px] gap-2"
        >
          {isPending ? (
            "Menyimpan..."
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Simpan Perubahan</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
