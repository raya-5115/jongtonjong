"use client";

import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function DeleteServiceDialog() {
  return (
    <DropdownMenuItem
      className="text-red-500"
    >
      Hapus
    </DropdownMenuItem>
  );
}