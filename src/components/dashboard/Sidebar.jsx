"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutGrid, LogOut, Menu, X } from "lucide-react";
import { dashboardMenu } from "@/lib/dashboard-menu";
import { cn } from "@/lib/utils";

export default function Sidebar({ user }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "K";
  const roleText = user?.role ? user.role.replace("_", " ") : "SUPER ADMIN";

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between p-4">
      <div className="flex flex-col gap-5 overflow-hidden">
        {/* Brand Header */}
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#dce1ff] text-[#00236f]">
            <LayoutGrid className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-base font-bold text-[#00236f]">
              Desa Tonjong
            </h1>
            <p className="text-xs font-medium text-slate-500">Village Admin</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-250px)] pr-1">
          {dashboardMenu.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                pathname.startsWith(item.href + "/"));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-150",
                  active
                    ? "bg-[#dce1ff] text-[#00236f] shadow-xs"
                    : "text-slate-600 hover:bg-white hover:text-slate-900"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile & Logout Bottom Card */}
      <div className="mt-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00236f] text-white font-bold text-base shadow-xs">
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name || "User Avatar"}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              initial
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-bold text-slate-900 leading-tight">
              {user?.name || "Admin Desa"}
            </h2>
            <p className="text-[11px] font-bold tracking-wider text-[#00236f] uppercase mt-0.5">
              {roleText}
            </p>
          </div>
        </div>

        <div className="my-3 border-t border-slate-100" />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login", redirectTo: "/login" })}
            className="flex items-center gap-2 rounded-2xl bg-[#fff0f0] hover:bg-rose-100 text-rose-600 px-4 py-2 text-sm font-semibold transition-colors duration-150 cursor-pointer"
          >
            <LogOut className="h-4 w-4 stroke-[2.2]" />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-[#f8fafc] md:block h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Top Navbar with Menu Toggle */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden w-full">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#dce1ff] text-[#00236f]">
            <LayoutGrid className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-[#00236f]">Desa Tonjong</h1>
            <p className="text-[11px] font-medium text-slate-500">Dashboard Admin</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 w-72 max-w-[80vw] bg-[#f8fafc] h-full shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
