"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, FileText, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Profil Desa", href: "/profil" },
  { label: "Berita", href: "/berita" },
  { label: "UMKM Desa", href: "/umkm" },
  { label: "Fasilitas", href: "/fasilitas" },
];

const LAYANAN_SUBITEMS = [
  {
    label: "Pengajuan Layanan",
    href: "/layanan",
    desc: "Formulir online pengajuan surat & kependudukan",
    icon: FileText,
  },
  {
    label: "Cek Status Pengajuan",
    href: "/layanan/cek",
    desc: "Lacak status pengajuan via tiket & NIK",
    icon: Search,
  },
];

export default function PublicHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileLayananOpen, setMobileLayananOpen] = useState(true);
  const dropdownRef = useRef(null);

  const isLayananActive = pathname.startsWith("/layanan") || pathname.startsWith("/pengajuan");

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0c183a] text-white shadow-md border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 md:px-8">

        {/* Brand & Logo Section */}
        <Link
          href="/"
          className="flex items-center gap-3 group transition-transform duration-200 hover:opacity-95"
        >
          <div className="relative h-10 w-64 sm:h-12 sm:w-80 md:h-14 md:w-[420px] shrink-0">
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
        <nav className="hidden items-center gap-5 lg:gap-7 lg:flex">
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

          {/* Layanan Dropdown Menu */}
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={cn(
                "relative flex items-center gap-1.5 py-1 text-sm font-semibold transition-all duration-200 cursor-pointer",
                isLayananActive
                  ? "text-white after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[2px] after:bg-white after:rounded-full"
                  : "text-slate-200 hover:text-white hover:opacity-100"
              )}
            >
              <span>Layanan</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  dropdownOpen && "rotate-180"
                )}
              />
            </button>

            {/* Dropdown Card */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="rounded-2xl bg-[#0c183a] p-2 shadow-2xl border border-white/15 backdrop-blur-md">
                  {LAYANAN_SUBITEMS.map((sub) => {
                    const SubIcon = sub.icon;
                    const isSubActive = pathname === sub.href;

                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setDropdownOpen(false)}
                        className={cn(
                          "flex items-start gap-3 p-3 rounded-xl transition-all duration-150",
                          isSubActive
                            ? "bg-white/20 text-white font-bold"
                            : "hover:bg-white/10 text-slate-200 hover:text-white"
                        )}
                      >
                        <div className="p-2 bg-white/10 rounded-lg text-white shrink-0 mt-0.5">
                          <SubIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold">{sub.label}</div>
                          <div className="text-[11px] text-slate-300 font-normal leading-tight mt-0.5">
                            {sub.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
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
        <div className="border-t border-white/10 bg-[#0c183a] px-4 pt-3 pb-5 lg:hidden space-y-1">
          <nav className="flex flex-col gap-1">
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

            {/* Mobile Layanan Accordion Sub-Menu */}
            <div className="pt-2 border-t border-white/10 mt-1">
              <button
                type="button"
                onClick={() => setMobileLayananOpen(!mobileLayananOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-base font-bold text-white rounded-md hover:bg-white/10"
              >
                <span>Layanan Desa</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 transition-transform duration-200",
                    mobileLayananOpen && "rotate-180"
                  )}
                />
              </button>

              {mobileLayananOpen && (
                <div className="pl-3 pr-1 pt-1 flex flex-col gap-1">
                  {LAYANAN_SUBITEMS.map((sub) => {
                    const SubIcon = sub.icon;
                    const isSubActive = pathname === sub.href;

                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                          isSubActive
                            ? "bg-white/20 text-white font-bold"
                            : "text-slate-300 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        <SubIcon className="w-4 h-4 text-indigo-300 shrink-0" />
                        <span>{sub.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
