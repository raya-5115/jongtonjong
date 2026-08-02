"use server";

import { revalidatePath } from "next/cache";
import { createService } from "@/services/service.service";

export async function createServiceAction(data) {
  await createService(data);

  revalidatePath("/dashboard/layanan");
}