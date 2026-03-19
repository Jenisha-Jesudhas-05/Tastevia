import prisma from "../../lib/prisma.js";
import { products as defaultProducts } from "../../data/products.js";

export interface ProductInput {
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  category: string;
}

export class ProductService {
  private static async ensureSeed() {
    const count = await prisma.product.count();
    if (count === 0) {
      await prisma.product.createMany({ data: defaultProducts });
    }
  }

  static async createProduct(data: ProductInput) {
    return prisma.product.create({ data });
  }

  static async getAllProducts(params: { search?: string; category?: string; skip?: number; take?: number }) {
    await this.ensureSeed();

    const { search, category, skip = 0, take = 8 } = params;
    const normalizedCategory = category ? category.trim().toLowerCase() : undefined;

    const where: any = {
      AND: [],
    };
    if (search) {
      where.AND.push({
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      });
    }
    if (normalizedCategory) {
      where.AND.push({ category: { contains: normalizedCategory, mode: "insensitive" } });
    }
    if (where.AND.length === 0) delete where.AND;

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count({ where }),
    ]);

    return { items, total };
  }

  static async getProductById(id: number) {
    return prisma.product.findUnique({ where: { id } });
  }

  static async updateProduct(id: number, data: Partial<ProductInput>) {
    return prisma.product.update({ where: { id }, data });
  }

  static async deleteProduct(id: number) {
    return prisma.product.delete({ where: { id } });
  }

  static async getCategories() {
    await this.ensureSeed();
    const rows = await prisma.product.findMany({
      distinct: ["category"],
      select: { category: true },
    });
    const unique = Array.from(new Set(rows.map((r) => r.category.toLowerCase())));
    return unique.sort();
  }
}
