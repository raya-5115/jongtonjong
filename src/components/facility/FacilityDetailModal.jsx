"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, MapPin, Phone, Building2, Tag } from "lucide-react";
import { CATEGORY_LABELS } from "./PublicFacilityCard";
import { getPublicImageUrl } from "@/lib/storage-utils";

export default function FacilityDetailModal({ facility, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !facility) return null;

  const categoryLabel = CATEGORY_LABELS[facility.category] || facility.category || "Fasilitas";
  const imageUrl = getPublicImageUrl(facility.image);

  const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    let cleaned = phone.replace(/\D/g, "");
    if (cleaned.startsWith("0")) {
      cleaned = "62" + cleaned.slice(1);
    }
    return cleaned;
  };

  const waLink = facility.phone
    ? `https://wa.me/${formatPhoneNumber(facility.phone)}?text=${encodeURIComponent(
        `Halo, saya ingin bertanya mengenai pengelola/fasilitas *${facility.name}* di Desa Tonjong.`
      )}`
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-100 z-10 text-slate-800">
        
        {/* Header with Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-md border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            <Building2 className="w-3.5 h-3.5" />
            <span>Detail Fasilitas</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Image Box */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-[#eef2fc] border border-indigo-50 flex items-center justify-center">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={facility.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-indigo-300">
                <Building2 className="w-16 h-16 stroke-[1.5] mb-2" />
                <span className="text-sm font-medium">Foto Fasilitas Tidak Tersedia</span>
              </div>
            )}
          </div>

          {/* Title & Info */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
              <Tag className="w-3.5 h-3.5" />
              <span>{categoryLabel}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b365d] tracking-tight">
              {facility.name}
            </h2>
            <div className="w-full h-[2px] bg-[#dbe5f7] my-3" />
          </div>

          {/* Key Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/80">
            
            {/* Kategori */}
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-100/70 text-indigo-700 shrink-0">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Kategori Fasilitas</p>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">
                  {categoryLabel}
                </p>
              </div>
            </div>

            {/* Telepon */}
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-100/70 text-emerald-700 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Kontak / Pengelola</p>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">
                  {facility.phone || "Tidak dicantumkan"}
                </p>
              </div>
            </div>

            {/* Alamat */}
            <div className="flex items-start gap-3 sm:col-span-2">
              <div className="p-2.5 rounded-xl bg-amber-100/70 text-amber-700 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Alamat / Lokasi</p>
                <p className="text-sm font-semibold text-slate-900 mt-0.5 leading-relaxed">
                  {facility.address || "Desa Tonjong"}
                </p>
              </div>
            </div>
          </div>

          {/* Deskripsi Fasilitas */}
          <div>
            <h3 className="text-base font-bold text-[#1b365d] mb-2">
              Deskripsi & Informasi Fasilitas
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line font-normal">
              {facility.description || "Fasilitas umum untuk melayani kebutuhan warga Desa Tonjong."}
            </p>
          </div>

          {/* Action Buttons */}
          {waLink && (
            <div className="pt-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm transition-colors shadow-md shadow-emerald-600/20"
              >
                <Phone className="w-5 h-5" />
                <span>Hubungi Pengelola Fasilitas</span>
              </a>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end rounded-b-3xl">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium text-sm transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
