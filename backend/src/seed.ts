import "dotenv/config";
import prisma from "./lib/prisma.js";

const products = [
  {
    name: "Creamy Alfredo Pasta",
    description:
      "Silky parmesan cream sauce tossed with fettuccine and fresh herbs.",
    price: 12.49,
    category: "pasta",
    imageUrls: [
      "https://images.unsplash.com/photo-1604908176997-1251882d90f4",
      "https://images.unsplash.com/photo-1473093226795-af9932fe5856",
    ],
  },
  {
    name: "Fire-Grilled Chicken",
    description: "Marinated overnight, flame-grilled, served with roasted veggies.",
    price: 14.99,
    category: "grill",
    imageUrls: [
      "https://images.unsplash.com/photo-1604908177520-4025a5a19c1b",
      "https://images.unsplash.com/photo-1604908176819-5f7f1dfb4320",
    ],
  },
  {
    name: "Spicy Ramen Bowl",
    description: "Slow-simmered broth, springy noodles, soy egg, and chili oil.",
    price: 11.5,
    category: "noodles",
    imageUrls: [
      "https://images.unsplash.com/photo-1546069901-eacef0df6022",
      "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83",
    ],
  },
  {
    name: "Garden Power Salad",
    description: "Crunchy greens, avocado, quinoa, citrus vinaigrette.",
    price: 9.75,
    category: "salad",
    imageUrls: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      "https://images.unsplash.com/photo-1458642849426-cfb724f15ef7",
    ],
  },
  {
    name: "Stone-Fired Margherita",
    description: "Charred crust, San Marzano tomatoes, fresh mozzarella, basil.",
    price: 13.25,
    category: "pizza",
    imageUrls: [
      "https://images.unsplash.com/photo-1548365328-8b7c8cde1475",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd",
    ],
  },
  {
    name: "Smoked BBQ Burger",
    description: "Double patty, smoked cheddar, crispy onions, house BBQ sauce.",
    price: 12.95,
    category: "burger",
    imageUrls: [
      "https://images.unsplash.com/photo-1550547660-d9450f859349",
      "https://images.unsplash.com/photo-1550547660-1b231e21ee9b",
    ],
  },
];

async function main() {
  const count = await prisma.product.count();
  if (count > 0) {
    console.log("Seed skipped: products already exist.");
    return;
  }

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
