import PublicHeader from "@/components/layout/PublicHeader";

export default function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <PublicHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}

