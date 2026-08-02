"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardMenu } from "@/lib/dashboard-menu";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-xl font-bold text-green-700">Desa Tonjong</h1>

        <p className="text-sm text-gray-500">Admin Panel</p>
      </div>

      <nav className="p-3">
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
                "mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition",
                active ? "bg-green-600 text-white" : "hover:bg-gray-100",
              )}
            >
              <Icon size={18} />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
