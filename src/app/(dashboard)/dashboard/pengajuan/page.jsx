import { getServiceRequests } from "@/services/serviceRequest.service";

import RequestTable from "@/components/request/RequestTable";

export default async function RequestPage() {
  const requests = await getServiceRequests();

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

      <RequestTable requests={requests} />
    </div>
  );
}