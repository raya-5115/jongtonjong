import { getServiceRequests } from "@/services/serviceRequest.service";

import RequestTable from "@/components/request/RequestTable";

export default async function RequestPage() {
  let requests = [];
  let errorMsg = null;

  try {
    requests = await getServiceRequests();
  } catch (error) {
    console.error("Gagal mengambil data pengajuan layanan:", error);
    errorMsg = "Gagal memuat data pengajuan. Silakan periksa koneksi database atau coba lagi nanti.";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Pengajuan Layanan
        </h1>

        <p className="text-muted-foreground">
          Daftar seluruh pengajuan layanan masyarakat.
        </p>
      </div>

      {errorMsg ? (
        <div className="p-4 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
          {errorMsg}
        </div>
      ) : (
        <RequestTable requests={requests} />
      )}
    </div>
  );
}