import { auth } from "@/auth";
import UserMenu from "./UserMenu";

export default async function Header() {
  const session = await auth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur md:px-8">
      <div>
        <p className="text-sm font-medium text-slate-500">
          Dashboard / Overview
        </p>
        <h2 className="text-lg font-semibold text-slate-900">
          Dashboard Admin
        </h2>
      </div>

      <UserMenu user={session.user} />
    </header>
  );
}
