"use client";

import Link from "next/link";

import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import DeleteServiceDialog from "./DeleteServiceDialog";

export default function ServiceActions({
  service,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
        >
          <MoreHorizontal size={18} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">

        <DropdownMenuItem asChild>
          <Link
            href={`/dashboard/layanan/${service.id}/edit`}
          >
            Edit
          </Link>
        </DropdownMenuItem>

        <DeleteServiceDialog
          service={service}
        />

      </DropdownMenuContent>
    </DropdownMenu>
  );
}