"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, MapPin, User, Phone, Map, Store, MessageCircle } from "lucide-react";
import { getPublicImageUrl } from "@/lib/storage-utils";

export default function UmkmDetailModal({ umkm, isOpen, onClose }) {
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

  if (!isOpen || !umkm) return null;

  const imageUrl = getPublicImageUrl(umkm.productImage);

  const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    let cleaned = phone.replace(/\D/g, "");
    if (cleaned.startsWith("0")) {
      cleaned = "62" + cleaned.slice(1);
    }
    return cleaned;
  };

  const waLink = umkm.phone
    ? `https://wa.me/${formatPhoneNumber(umkm.phone)}?text=${encodeURIComponent(
        `Halo ${umkm.ownerName || "Pemilik UMKM"}, saya ingin bertanya mengenai produk/usaha *${umkm.businessName}* di Desa Tonjong.`
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
            <Store className="w-3.5 h-3.5" />
            <span>Detail UMKM</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Image */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-[#eef2fc] border border-indigo-50 flex items-center justify-center">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={umkm.businessName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-indigo-300">
                <Store className="w-16 h-16 stroke-[1.5] mb-2" />
                <span className="text-sm font-medium">Foto Produk Tidak Tersedia</span>
              </div>
            )}
          </div>

          {/* Title & Info */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b365d] tracking-tight">
              {umkm.businessName}
            </h2>
            <div className="w-full h-[2px] bg-[#dbe5f7] my-3" />
          </div>

          {/* Key Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/80">
            {/* Pemilik */}
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-100/70 text-indigo-700 shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Pemilik Usaha</p>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">
                  {umkm.ownerName || "Tidak dicantumkan"}
                </p>
              </div>
            </div>

            {/* Telepon */}
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-100/70 text-emerald-700 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Nomor Telepon / WA</p>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">
                  {umkm.phone || "Tidak dicantumkan"}
                </p>
              </div>
            </div>

            {/* Alamat */}
            <div className="flex items-start gap-3 sm:col-span-2">
              <div className="p-2.5 rounded-xl bg-amber-100/70 text-amber-700 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Alamat Lengkap</p>
                <p className="text-sm font-semibold text-slate-900 mt-0.5 leading-relaxed">
                  {umkm.address || "Desa Tonjong"}
                </p>
              </div>
            </div>
          </div>

          {/* Deskripsi Usaha */}
          <div>
            <h3 className="text-base font-bold text-[#1b365d] mb-2">
              Deskripsi Produk / Usaha
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line font-normal">
              {umkm.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {waLink && (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm transition-colors shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Hubungi via WhatsApp</span>
              </a>
            )}

            {umkm.googleMapsUrl && (
              <a
                href={umkm.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#e8edfc] hover:bg-[#dae4f9] text-[#1b365d] font-semibold text-sm transition-colors"
              >
                <Map className="w-5 h-5 text-[#1b365d]" />
                <span>Buka Google Maps</span>
              </a>
            )}
          </div>

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
