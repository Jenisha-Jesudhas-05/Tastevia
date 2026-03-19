import express from "express";
import { addToCart, getCart, updateCartItem, removeCartItem } from "./cart.controller.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/:userId", getCart);
router.patch("/update", updateCartItem);
router.delete("/remove", removeCartItem);

export default router;
