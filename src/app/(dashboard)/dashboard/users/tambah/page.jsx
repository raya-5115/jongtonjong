import UserForm from "@/components/user/UserForm";

export default function CreateUserPage() {
  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          Tambah User
        </h1>

        <p className="text-muted-foreground">
          Tambahkan akun administrator baru.
        </p>

      </div>

      <UserForm />

    </div>
  );
}