"use client";

import { useState } from "react";
import PublicUmkmCard from "./PublicUmkmCard";
import UmkmDetailModal from "./UmkmDetailModal";
import { Search, Store } from "lucide-react";

export default function PublicUmkmGrid({ umkmList = [] }) {
  const [selectedUmkm, setSelectedUmkm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenDetail = (umkm) => {
    setSelectedUmkm(umkm);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUmkm(null);
  };

  const handleContact = (umkm) => {
    if (umkm.phone) {
      let cleaned = umkm.phone.replace(/\D/g, "");
      if (cleaned.startsWith("0")) {
        cleaned = "62" + cleaned.slice(1);
      }
      const waUrl = `https://wa.me/${cleaned}?text=${encodeURIComponent(
        `Halo ${umkm.ownerName || "Pemilik UMKM"}, saya ingin bertanya mengenai produk *${umkm.businessName}* di Desa Tonjong.`
      )}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } else {
      // If no phone number available, open detail modal
      handleOpenDetail(umkm);
    }
  };

  // Filter UMKM based on search
  const filteredList = umkmList.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.businessName.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      (item.ownerName && item.ownerName.toLowerCase().includes(query)) ||
      (item.address && item.address.toLowerCase().includes(query))
    );
  });

  return (
    <div className="w-full">
      {/* Search & Filter Bar */}
      {umkmList.length > 0 && (
        <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari produk atau usaha UMKM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>

          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Menampilkan <span className="font-bold text-[#1b365d]">{filteredList.length}</span> dari {umkmList.length} UMKM
          </p>
        </div>
      )}

      {/* Grid of UMKM Cards */}
      {filteredList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredList.map((item) => (
            <PublicUmkmCard
              key={item.id || item.businessName}
              umkm={item}
              onDetailClick={handleOpenDetail}
              onContactClick={handleContact}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-3xl bg-white border border-slate-100 shadow-sm">
          <div className="p-4 rounded-full bg-indigo-50 text-indigo-500 mb-4">
            <Store className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-bold text-[#1b365d]">
            {searchQuery ? "UMKM Tidak Ditemukan" : "Belum Ada Data UMKM"}
          </h3>
          <p className="text-sm text-slate-500 max-w-sm mt-1">
            {searchQuery
              ? `Tidak ada UMKM yang cocok dengan pencarian "${searchQuery}".`
              : "Saat ini belum ada data usaha UMKM yang terdaftar di sistem."}
          </p>
        </div>
      )}

      {/* Detail Modal */}
      <UmkmDetailModal
        umkm={selectedUmkm}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
