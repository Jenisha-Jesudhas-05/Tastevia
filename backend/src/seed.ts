import "dotenv/config";
import prisma from "./lib/prisma.js";
import { products } from "./data/products.js";

const forceRefresh =
  process.argv.includes("--refresh") || process.env.FORCE_SEED === "true";

async function main() {
  const count = await prisma.product.count();
  if (!forceRefresh && count >= products.length) {
    console.log("Seed skipped: products already present.");
    return;
  }

  console.log(
    forceRefresh
      ? "Force refreshing seed data for products..."
      : "Refreshing seed data for products..."
  );

  await prisma.orderItem.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.product.createMany({ data: products });
  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
