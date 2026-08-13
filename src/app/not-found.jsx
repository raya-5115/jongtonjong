"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import {
  Home,
  ArrowLeft,
  Search,
  FileText,
  Newspaper,
  Building2,
  ShoppingBag,
  Info,
  MapPinOff,
  Compass,
} from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  const quickLinks = [
    {
      title: "Layanan & Surat",
      desc: "Pengajuan surat & administrasi desa",
      href: "/layanan",
      icon: FileText,
      color: "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100/70",
    },
    {
      title: "Berita Desa",
      desc: "Kabar & pengumuman terbaru",
      href: "/berita",
      icon: Newspaper,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100/70",
    },
    {
      title: "Cek Status Pengajuan",
      desc: "Lacak posisi permohonan surat Anda",
      href: "/layanan/cek",
      icon: Search,
      color: "bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100/70",
    },
    {
      title: "Profil Desa",
      desc: "Struktur perangkat & sejarah desa",
      href: "/profil",
      icon: Info,
      color: "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100/70",
    },
    {
      title: "UMKM Tonjong",
      desc: "Produk lokal & usaha warga",
      href: "/umkm",
      icon: ShoppingBag,
      color: "bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100/70",
    },
    {
      title: "Fasilitas Publik",
      desc: "Sarana & tempat umum desa",
      href: "/fasilitas",
      icon: Building2,
      color: "bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100/70",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans">
      <PublicHeader />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl text-center">
          {/* Visual Hero Section */}
          <div className="relative mx-auto flex flex-col items-center justify-center">
            {/* Soft Ambient Glow */}
            <div className="absolute -top-6 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-[#00236f]/10 blur-3xl -z-10" />

            {/* Icon Badge */}
            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-xl shadow-slate-200/60 border border-slate-200/80 mb-6 group hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00236f]/5 to-indigo-500/10" />
              <MapPinOff className="h-10 w-10 text-[#00236f] stroke-[1.75]" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500"></span>
              </span>
            </div>

            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50/80 px-3.5 py-1 text-xs font-semibold text-rose-700 shadow-xs mb-4">
              <Compass className="h-3.5 w-3.5" />
              <span>404 • Halaman Tidak Ditemukan</span>
            </div>

            {/* Title & Description */}
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-2xl">
              Waduh! Halaman yang Kamu Cari Tak Ada di Sini
            </h1>
            <p className="mt-4 max-w-xl text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              Mungkin tautan yang diakses salah ketik, telah dihapus, atau sedang dalam pembaruan oleh tim Desa Tonjong.
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 rounded-2xl bg-[#00236f] hover:bg-[#001a54] text-white px-6 py-3.5 text-sm sm:text-base font-bold shadow-lg shadow-[#00236f]/25 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Home className="h-5 w-5" />
                <span>Kembali ke Beranda</span>
              </Link>

              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex items-center gap-2.5 rounded-2xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 px-6 py-3.5 text-sm sm:text-base font-bold shadow-xs transition-all duration-200 cursor-pointer"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Halaman Sebelumnya</span>
              </button>
            </div>
          </div>

          {/* Quick Nav Grid */}
          <div className="mt-16 text-left border-t border-slate-200/80 pt-10">
            <h2 className="text-center text-sm font-bold tracking-wider text-slate-500 uppercase mb-6">
              Atau Jelajahi Menu Populer Desa Tonjong
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative flex items-start gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200"
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${item.color} transition-transform duration-200 group-hover:scale-105`}
                    >
                      <Icon className="h-5.5 w-5.5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#00236f] transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
