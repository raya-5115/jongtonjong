import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash(
    process.env.ADMIN_PASSWORD,
    10
  );
  await prisma.user.upsert({
    where: {
      email: "kkntonjong@gmail.com",
    },
  
    update: {
      name: "KKN IPB",
      passwordHash: password,
      role: UserRole.SUPER_ADMIN,
    },
  
    create: {
      name: "KKN IPB",
      email: "kkntonjong@gmail.com",
      passwordHash: password,
      role: UserRole.SUPER_ADMIN,
    },
  });

  console.log("✅ Super Admin berhasil dibuat");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });