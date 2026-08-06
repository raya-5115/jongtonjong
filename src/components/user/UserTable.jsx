import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import UserActions from "./UserActions";

export default function UserTable({ users }) {
  return (
    <Table>

      <TableHeader>

        <TableRow>

          <TableHead>Nama</TableHead>

          <TableHead>Email</TableHead>

          <TableHead>Role</TableHead>

          <TableHead className="text-right">
            Aksi
          </TableHead>

        </TableRow>

      </TableHeader>

      <TableBody>

        {users.length === 0 ? (
          <TableRow>

            <TableCell
              colSpan={5}
              className="text-center py-8 text-muted-foreground"
            >
              Belum ada user.
            </TableCell>

          </TableRow>
        ) : (
          users.map((user) => (
            <TableRow key={user.id}>

              <TableCell>
                {user.name}
              </TableCell>

              <TableCell>
                {user.email}
              </TableCell>

              <TableCell>

                <Badge
                  variant={
                    user.role === "SUPER_ADMIN"
                      ? "default"
                      : "secondary"
                  }
                >
                  {user.role}
                </Badge>

              </TableCell>

              <TableCell className="text-right">

                <UserActions user={user} />

              </TableCell>

            </TableRow>
          ))
        )}

      </TableBody>

    </Table>
  );
}