"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function DashboardError({ error, reset }) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error("Dashboard Error Boundary caught error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center bg-white rounded-xl border border-slate-200 shadow-sm my-6">
      <div className="p-3 bg-amber-100 text-amber-600 rounded-full mb-4">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h2 className="text-xl font-semibold text-slate-800 mb-2">
        Terjadi Kesalahan Halaman Admin
      </h2>

      <p className="text-sm text-slate-500 max-w-md mb-6">
        {error?.message ||
          "Gagal memuat komponen Server Components. Silakan coba muat ulang halaman."}
      </p>

      <div className="flex items-center gap-3">
        <Button
          onClick={() => reset()}
          className="inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Coba Lagi</span>
        </Button>
      </div>
    </div>
  );
}
