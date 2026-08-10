"use client";

import { useState } from "react";
import PublicFacilityCard, { CATEGORY_LABELS } from "./PublicFacilityCard";
import FacilityDetailModal from "./FacilityDetailModal";
import { Search, Filter, Building2 } from "lucide-react";

export default function PublicFacilityGrid({ facilityList = [] }) {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenDetail = (facility) => {
    setSelectedFacility(facility);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFacility(null);
  };

  const handleContact = (facility) => {
    if (facility.phone) {
      let cleaned = facility.phone.replace(/\D/g, "");
      if (cleaned.startsWith("0")) {
        cleaned = "62" + cleaned.slice(1);
      }
      const waUrl = `https://wa.me/${cleaned}?text=${encodeURIComponent(
        `Halo, saya ingin bertanya mengenai fasilitas *${facility.name}* di Desa Tonjong.`
      )}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } else {
      handleOpenDetail(facility);
    }
  };

  // Filter facilities based on selectedCategory (Prisma enum) and searchQuery
  const filteredList = facilityList.filter((item) => {
    const matchesCategory =
      selectedCategory === "ALL" || item.category === selectedCategory;

    const query = searchQuery.toLowerCase();
    const matchesQuery =
      item.name.toLowerCase().includes(query) ||
      (item.description && item.description.toLowerCase().includes(query)) ||
      (item.address && item.address.toLowerCase().includes(query));

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="w-full">
      
      {/* Controls Header Row: Filter & Search Bar (Matching Mockup Layout) */}
      <div className="mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4">
        
        {/* Filter Dropdown (Prisma FacilityCategory Enum) */}
        <div className="relative inline-flex items-center">
          <div className="absolute left-3 pointer-events-none flex items-center gap-1.5 text-slate-700 font-bold text-sm">
            <Filter className="w-4 h-4 text-slate-700 fill-slate-700/20" />
            <span>Filter</span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto appearance-none pl-20 pr-10 py-2 rounded-xl border border-slate-200 bg-[#eef2fc] text-[#1b365d] text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 cursor-pointer transition-colors"
          >
            <option value="ALL">Semua Kategori</option>
            {Object.entries(CATEGORY_LABELS).map(([enumKey, label]) => (
              <option key={enumKey} value={enumKey}>
                {label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 pointer-events-none text-slate-500 text-xs">
            ▼
          </div>
        </div>

        {/* Search Input Box */}
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari fasilitas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2 rounded-xl border border-slate-200 bg-[#eef2fc] text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all shadow-sm"
          />
        </div>

      </div>

      {/* Grid of Facility Cards */}
      {filteredList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredList.map((item) => (
            <PublicFacilityCard
              key={item.id || item.name}
              facility={item}
              onDetailClick={handleOpenDetail}
              onContactClick={handleContact}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-3xl bg-white border border-slate-100 shadow-sm">
          <div className="p-4 rounded-full bg-indigo-50 text-indigo-500 mb-4">
            <Building2 className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-bold text-[#1b365d]">
            Fasilitas Tidak Ditemukan
          </h3>
          <p className="text-sm text-slate-500 max-w-sm mt-1">
            {searchQuery || selectedCategory !== "ALL"
              ? "Tidak ada fasilitas yang cocok dengan filter atau kata kunci pencarian."
              : "Saat ini belum ada data fasilitas publik yang terdaftar."}
          </p>
        </div>
      )}

      {/* Detail Modal */}
      <FacilityDetailModal
        facility={selectedFacility}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
