import Link from "next/link";
import { ArrowRight, MoreHorizontal } from "lucide-react";
import { getRequestStatus } from "@/lib/requestStatus";

export default function RecentRequestTable({ requests = [] }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Permohonan Layanan Terbaru
          </h3>
          <p className="text-sm text-slate-500">
            Daftar pengajuan yang masuk baru-baru ini
          </p>
        </div>

        <Link
          href="/dashboard/pengajuan"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#00236f]"
        >
          Lihat Semua
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Pemohon
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Jenis Layanan
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Tanggal
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-sm text-slate-500"
                >
                  Belum ada pengajuan.
                </td>
              </tr>
            ) : (
              requests.map((request) => {
                const status = getRequestStatus(request.status);
                const date = new Date(request.createdAt).toLocaleDateString(
                  "id-ID",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  },
                );

                return (
                  <tr
                    key={request.id}
                    className="border-t border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {request.fullName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {request.service?.name || "Layanan"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{date}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
