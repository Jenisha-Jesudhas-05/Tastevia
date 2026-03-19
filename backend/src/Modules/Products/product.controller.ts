import { Request, Response } from "express";
import { ProductService } from "./product.service.js";
import { successResponse, errorResponse } from "../../utils/apiResponse.js";

export class ProductController {
  static async create(req: Request, res: Response) {
    try {
      const { name, description, price, imageUrls, category } = req.body;

      if (!name || !description || !price || !imageUrls || !category) {
        return res.status(400).json(errorResponse("All fields are required"));
      }

      const product = await ProductService.createProduct({ name, description, price, imageUrls, category });
      res.status(201).json(successResponse(product, "Product created successfully"));
    } catch (error) {
      console.error(error);
      res.status(500).json(errorResponse("Internal server error"));
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const search = typeof req.query.search === "string" ? req.query.search : undefined;
      const category = typeof req.query.category === "string" ? req.query.category : undefined;
      const skip = Math.max(0, Number(req.query.skip) || 0);
      const take = Math.min(50, Math.max(1, Number(req.query.take) || 8));

      const { items, total } = await ProductService.getAllProducts({ search, category, skip, take });
      res.json(successResponse({ items, total }, "Products fetched successfully"));
    } catch (error) {
      console.error(error);
      res.status(500).json(errorResponse("Internal server error"));
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const product = await ProductService.getProductById(id);

      if (!product) return res.status(404).json(errorResponse("Product not found"));

      res.json(successResponse(product));
    } catch (error) {
      console.error(error);
      res.status(500).json(errorResponse("Internal server error"));
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const product = await ProductService.updateProduct(id, req.body);
      res.json(successResponse(product, "Product updated successfully"));
    } catch (error) {
      console.error(error);
      res.status(500).json(errorResponse("Internal server error"));
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await ProductService.deleteProduct(id);
      res.json(successResponse(null, "Product deleted successfully"));
    } catch (error) {
      console.error(error);
      res.status(500).json(errorResponse("Internal server error"));
    }
  }

  static async getCategories(_req: Request, res: Response) {
    try {
      const categories = await ProductService.getCategories();
      res.json(successResponse(categories, "Categories fetched successfully"));
    } catch (error) {
      console.error(error);
      res.status(500).json(errorResponse("Internal server error"));
    }
  }
}
