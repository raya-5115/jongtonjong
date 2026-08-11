import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Sidebar from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({ children }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-[#f8fafc] text-slate-900">
      <Sidebar user={session?.user} />

      <div className="flex flex-1 flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
