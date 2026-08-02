import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import ServiceActions from "./ServiceAction";

export default function ServiceTable({ services }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Persyaratan</TableHead>
          <TableHead>Dibuat</TableHead>
          <TableHead className="w-16"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {services.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Belum ada layanan.
            </TableCell>
          </TableRow>
        ) : (
          services.map((service) => (
            <TableRow key={service.id}>
              <TableCell className="font-medium">{service.name}</TableCell>

              <TableCell>
                <Badge variant={service.isActive ? "default" : "secondary"}>
                  {service.isActive ? "Aktif" : "Nonaktif"}
                </Badge>
              </TableCell>

              <TableCell>{service.requirement || "-"}</TableCell>

              <TableCell>
                {new Date(service.createdAt).toLocaleDateString("id-ID")}
              </TableCell>

              <TableCell>
                <ServiceActions service={service} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
