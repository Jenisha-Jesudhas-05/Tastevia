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
  static async createProduct(data: ProductInput) {
    return prisma.product.create({ data });
  }

  static async getAllProducts() {
    const existing = await prisma.product.findMany();
    if (existing.length === 0) {
      await prisma.product.createMany({ data: defaultProducts });
      return prisma.product.findMany();
    }
    return existing;
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
}
