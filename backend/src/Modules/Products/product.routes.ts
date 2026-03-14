import { Router } from "express";
import { ProductController } from "./product.controller";

const router = Router();

router.post("/", ProductController.create);       // Create product
router.get("/", ProductController.getAll);        // Get all products
router.get("/:id", ProductController.getById);    // Get product by id
router.put("/:id", ProductController.update);     // Update product
router.delete("/:id", ProductController.delete);  // Delete product

export default router;