import { notFound } from "next/navigation";

import UserForm from "@/components/user/UserForm";

import { getUserById } from "@/services/user.service";

export default async function EditUserPage({
  params,
}) {
  const { id } = await params;

  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          Edit User
        </h1>

      </div>

      <UserForm user={user} />

    </div>
  );
}