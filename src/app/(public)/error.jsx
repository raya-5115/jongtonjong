"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PublicError({ error, reset }) {
  useEffect(() => {
    console.error("Public Route Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center p-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/80 shadow-sm mb-6">
        <AlertTriangle className="h-8 w-8 stroke-[1.75]" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0c183a] tracking-tight">
        Gagal Memuat Halaman
      </h2>

      <p className="mt-3 max-w-md text-sm sm:text-base text-slate-600 leading-relaxed">
        Terjadi kendala saat memuat data dari server. Silakan coba muat ulang halaman atau kembali ke Beranda.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button
          onClick={() => reset()}
          size="lg"
          className="gap-2 bg-[#0c183a] hover:bg-[#152a60] text-white font-semibold rounded-xl"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Coba Lagi</span>
        </Button>

        <Button
          asChild
          variant="outline"
          size="lg"
          className="gap-2 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold"
        >
          <Link href="/">
            <Home className="h-4 w-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
