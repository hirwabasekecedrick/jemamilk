
import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.FeaturesCreateInput[] = [
  {
    name: "Stock",
    url: "/stock",
    roles: ['FARMER','VENDOR','ADMIN'],
    added_by: {
        connect: {id: "71d4a08b-3212-487f-a41d-099e3ebf0f2c"}
    }
  }
];

export async function main() {
  for (const u of userData) {
    await prisma.features.create({ data: u });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });