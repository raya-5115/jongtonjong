import { auth } from "@/auth";

export default async function Header() {
  const session = await auth();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">
      <h2 className="font-semibold">
        Dashboard
      </h2>

      <div>
        Halo, {session?.user?.name}
      </div>
    </header>
  );
}