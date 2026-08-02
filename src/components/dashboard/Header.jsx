import { auth } from "@/auth";
import UserMenu from "./UserMenu";

export default async function Header() {
  const session = await auth();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">
      <div>
        <h2 className="text-lg font-semibold">
          Dashboard
        </h2>
      </div>

      <UserMenu user={session.user} />
    </header>
  );
}