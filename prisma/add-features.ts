import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Setting up features...");

  // Create or get system user
  let systemUser = await prisma.user.findFirst({
    where: { email: "system@jemamilk.local" },
  });

  if (!systemUser) {
    systemUser = await prisma.user.create({
      data: {
        email: "system@jemamilk.local",
        name: "System",
        password: "system-password",
        role: "ADMIN",
        is_active: true,
        last_seen: new Date(),
      },
    });
    console.log("Created system user");
  }

  const features = await prisma.features.createMany({
    data: [
      {
        name: "Stock Management",
        url: "/dashboard/stock",
        addedby: systemUser.id,
        roles: ["ADMIN", "VENDOR"],
      },
      {
        name: "Record ",
        url: "/dashboard/stock",
        addedby: systemUser.id,
        roles: ["ADMIN", "VENDOR"],
      },
    ],
    skipDuplicates: true,
  });

  console.log(`Added ${features.count} features`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
