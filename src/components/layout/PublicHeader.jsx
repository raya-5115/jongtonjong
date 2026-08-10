"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Profil Desa", href: "/profil" },
  { label: "Berita", href: "/berita" },
  { label: "UMKM Desa", href: "/umkm" },
  { label: "Fasilitas", href: "/fasilitas" },
  { label: "Pengajuan Layanan", href: "/layanan" },
];

export default function PublicHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0c183a] text-white shadow-md border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 md:px-8">

        {/* Brand & Logo Section */}
        <Link
          href="/"
          className="flex items-center gap-3 group transition-transform duration-200 hover:opacity-95"
        >
          <div className="relative h-14 w-64 sm:h-16 sm:w-80 md:h-20 md:w-[420px] shrink-0">
            <Image
              src="/logo-sukabumi.png"
              alt="Logo Desa Tonjong"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 lg:gap-8 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative py-1 text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "text-white after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[2px] after:bg-white after:rounded-full"
                    : "text-slate-200 hover:text-white hover:opacity-100"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-200 hover:bg-white/10 hover:text-white focus:outline-none lg:hidden"
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#0c183a] px-4 pt-3 pb-5 lg:hidden">
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-base font-semibold transition-colors",
                    isActive
                      ? "bg-white/15 text-white font-bold"
                      : "text-slate-200 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
