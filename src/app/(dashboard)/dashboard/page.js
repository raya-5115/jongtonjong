import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Selamat Datang 
        </h1>

        <p className="text-gray-500">
          Halo, {session.user.name}
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          Dashboard Website Desa Tonjong
        </CardContent>
      </Card>
    </div>
  );
}