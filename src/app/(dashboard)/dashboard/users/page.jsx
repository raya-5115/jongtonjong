import Link from "next/link";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import UserTable from "@/components/user/UserTable";

import { getUsers } from "@/services/user.service";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            Users
          </h1>

          <p className="text-muted-foreground">
            Kelola akun administrator.
          </p>

        </div>

        <Link href="/dashboard/users/tambah">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tambah User
          </Button>
        </Link>

      </div>

      <UserTable users={users} />

    </div>
  );
}