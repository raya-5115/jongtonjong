import prisma from "@/lib/prisma";

export async function generateSubmissionNumber() {
  const today = new Date();

  const date =
    today.getFullYear().toString() +
    String(today.getMonth() + 1).padStart(2, "0") +
    String(today.getDate()).padStart(2, "0");

  const total = await prisma.serviceRequest.count();

  const number = String(total + 1).padStart(4, "0");

  return `${date}-${number}`;
}