import prisma from "@/lib/prisma";

export async function generateSubmissionNumber() {
  const now = new Date();

  const date =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");

  const latest = await prisma.serviceRequest.findFirst({
    where: {
      submissionNumber: {
        startsWith: `TON-${date}`,
      },
    },
    orderBy: {
      submissionNumber: "desc",
    },
  });

  let nextNumber = 1;

  if (latest) {
    const lastNumber = Number(
      latest.submissionNumber.split("-")[2]
    );

    nextNumber = lastNumber + 1;
  }

  return `TON-${date}-${String(nextNumber).padStart(4, "0")}`;
}