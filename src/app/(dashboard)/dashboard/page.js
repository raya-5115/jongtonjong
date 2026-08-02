import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Selamat Datang 👋
      </h1>

      <p className="mt-2 text-gray-500">
        Halo, {session.user.name}
      </p>
    </div>
  );
}