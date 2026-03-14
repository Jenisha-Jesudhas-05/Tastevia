import express from "express";
import { addToCart, getCart, updateCartItem, removeCartItem } from "./cart.controller";

const router = express.Router();

// Add item to cart
router.post("/add", addToCart);

// Get cart for a user
router.get("/:userId", getCart);

// Update quantity of an item in cart
router.patch("/update", updateCartItem);

// Remove an item from cart
router.delete("/remove", removeCartItem);

export default router;