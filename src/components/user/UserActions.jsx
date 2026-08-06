"use client";

import Link from "next/link";

import { SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function UserActions({ user }) {
  return (
    <div className="flex justify-end gap-2">

      <Link
        href={`/dashboard/users/${user.id}/edit`}
      >
        <Button
          size="icon"
          variant="outline"
        >
          <SquarePen className="h-4 w-4" />
        </Button>
      </Link>

    </div>
  );
}