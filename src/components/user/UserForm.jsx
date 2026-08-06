"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  createUserAction,
  updateUserAction,
} from "@/actions/user.action";

import {
  createUserSchema,
  updateUserSchema,
} from "@/validation/user.validation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserForm({
  user = null,
}) {
  const router = useRouter();
  const [isPending, startTransition] =
    useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(
      user
        ? updateUserSchema
        : createUserSchema
    ),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      password: "",
      role: user?.role ?? "ADMIN",
    },
  });

  const role = watch("role");

  function onSubmit(data) {
    startTransition(async () => {
      try {
        if (user) {
          await updateUserAction(
            user.id,
            data
          );

          toast.success(
            "User berhasil diperbarui."
          );
        } else {
          await createUserAction(data);

          toast.success(
            "User berhasil ditambahkan."
          );
        }
        
        router.push("/dashboard/users");
        router.refresh();
      } catch (err) {
        toast.error(err.message);
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >

      <Input
        placeholder="Nama"
        {...register("name")}
      />

      <Input
        placeholder="Email"
        type="email"
        {...register("email")}
      />

      <Input
        placeholder={
          user
            ? "Password baru (opsional)"
            : "Password"
        }
        type="password"
        {...register("password")}
      />

      <Select
        value={role}
        onValueChange={(value) =>
          setValue("role", value)
        }
      >

        <SelectTrigger>

          <SelectValue />

        </SelectTrigger>

        <SelectContent>

          <SelectItem value="ADMIN">
            Admin
          </SelectItem>

          <SelectItem value="SUPER_ADMIN">
            Super Admin
          </SelectItem>

        </SelectContent>

      </Select>

      <Button
        type="submit"
        disabled={isPending}
      >
        {isPending
          ? "Menyimpan..."
          : "Simpan"}
      </Button>

    </form>
  );
}