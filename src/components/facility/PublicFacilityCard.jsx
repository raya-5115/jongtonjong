"use client";

import Image from "next/image";
import { Eye, Phone, Building2 } from "lucide-react";

export const CATEGORY_LABELS = {
  PENDIDIKAN: "Pendidikan",
  KESEHATAN: "Kesehatan",
  KEAGAMAAN: "Keagamaan",
  OLAHRAGA: "Olahraga",
  PEMERINTAHAN: "Pemerintahan",
  SOSIAL: "Sosial",
  LAINNYA: "Lainnya",
};

export default function PublicFacilityCard({ facility, onDetailClick, onContactClick }) {
  const { name, category, description, image } = facility;

  const categoryLabel = CATEGORY_LABELS[category] || category || "Fasilitas";

  return (
    <div className="flex flex-col h-full rounded-2xl bg-white p-4 sm:p-5 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group">
      
      {/* Facility Image Box */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#eef2fc] flex items-center justify-center mb-4 border border-indigo-50/50">
        
        {/* Category Badge on Top Left (Matching Mockup) */}
        <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm border border-slate-100 text-slate-800 font-semibold text-xs tracking-tight">
          {categoryLabel}
        </div>

        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-indigo-400/70 p-4 text-center">
            <Building2 className="w-12 h-12 stroke-[1.5] mb-1 text-indigo-300" />
            <span className="text-xs font-medium text-indigo-300/80">Foto Fasilitas</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1">
        {/* Facility Name */}
        <h3 className="text-xl sm:text-2xl font-bold text-[#1b365d] tracking-tight leading-snug">
          {name}
        </h3>

        {/* Horizontal Divider Line */}
        <div className="w-full h-[1.5px] bg-[#dbe5f7] my-3" />

        {/* Short Description */}
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed line-clamp-3 mb-6 flex-1 font-normal">
          {description || "Informasi fasilitas umum Desa Tonjong."}
        </p>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <button
            type="button"
            onClick={() => onDetailClick(facility)}
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-[#e8edfc] hover:bg-[#dae4f9] active:bg-[#c9d8f6] text-[#1b365d] font-semibold text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer"
          >
            <Eye className="w-4 h-4 stroke-[2.2] text-[#1b365d]" />
            <span>Detail</span>
          </button>

          <button
            type="button"
            onClick={() => onContactClick(facility)}
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-[#e8edfc] hover:bg-[#dae4f9] active:bg-[#c9d8f6] text-[#1b365d] font-semibold text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer"
          >
            <Phone className="w-4 h-4 stroke-[2.2] text-[#1b365d]" />
            <span>Hubungi</span>
          </button>
        </div>
      </div>

    </div>
  );
}
