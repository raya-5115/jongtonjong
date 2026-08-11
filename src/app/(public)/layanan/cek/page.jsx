import { Suspense } from "react";
import CheckStatusForm from "@/components/request/CheckStatusForm";
import { Loader2 } from "lucide-react";

export const metadata = {
  title: "Cek Status Pengajuan | Website Resmi Desa Tonjong",
  description:
    "Lacak dan cek status pengajuan surat keterangan atau dokumen kependudukan Anda di Desa Tonjong menggunakan Nomor Registrasi/Tiket dan NIK Pemohon.",
};

export default function CekStatusPage() {
  return (
    <div className="w-full bg-slate-50 min-h-screen pt-8 pb-20 sm:pt-12 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="relative mb-8 sm:mb-12">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b365d] tracking-tight whitespace-nowrap">
              Cek Status Pengajuan
            </h1>
            <div className="h-[3px] bg-[#dbe5f7] flex-1 rounded-full hidden sm:block mt-2" />
          </div>
          <div className="h-[2px] bg-[#dbe5f7] w-full rounded-full block sm:hidden mt-3" />
        </div>

        {/* Suspense Wrapper for Client SearchParams */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20 text-slate-500 gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
              <span>Memuat halaman pencarian...</span>
            </div>
          }
        >
          <CheckStatusForm />
        </Suspense>

      </div>
    </div>
  );
}
