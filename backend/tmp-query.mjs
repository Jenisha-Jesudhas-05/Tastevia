import prisma from "./dist/src/lib/prisma.js";

const run = async () => {
  const data = await prisma.product.findMany({ select: { id: true, name: true, imageUrls: true } });
  console.log(JSON.stringify(data, null, 2));
  await prisma.$disconnect();
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
