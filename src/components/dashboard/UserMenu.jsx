"use client";

import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserMenu({ user }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border px-4 py-2">
        {user.name}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/login", redirectTo: "/login" })}
          className="text-red-500"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}