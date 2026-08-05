export function getRequestStatus(status) {
  switch (status) {
    case "PENDING":
      return {
        label: "Pending",
        className: "bg-yellow-100 text-yellow-700",
      };

    case "PROCESS":
      return {
        label: "Diproses",
        className: "bg-blue-100 text-blue-700",
      };

    case "FINISHED":
    case "APPROVED":
    case "COMPLETED":
      return {
        label: "Selesai",
        className: "bg-green-100 text-green-700",
      };

    case "REJECTED":
      return {
        label: "Ditolak",
        className: "bg-red-100 text-red-700",
      };

    default:
      return {
        label: status,
        className: "",
      };
  }
}
