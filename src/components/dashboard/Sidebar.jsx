"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid } from "lucide-react";
import { dashboardMenu } from "@/lib/dashboard-menu";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-[#f8fafc] px-4 py-5 md:flex">
      <div className="mb-8 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-3 py-3 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dce1ff] text-[#00236f]">
          <LayoutGrid className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-[18px] font-semibold text-[#00236f]">
            Desa Tonjong
          </h1>
          <p className="text-sm text-slate-500">Village Admin</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
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
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                active
                  ? "bg-[#dce1ff] text-[#00236f] shadow-sm"
                  : "text-slate-600 hover:bg-white hover:text-slate-900",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
