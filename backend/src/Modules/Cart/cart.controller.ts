import { Request, Response } from "express";
import * as cartService from "./cart.service";

// Add item to cart
export const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = req.body;
    const item = await cartService.addToCart(userId, productId, quantity);
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

// Get cart for a user
export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const cart = await cartService.getCart(userId);
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get cart" });
  }
};

// Update quantity of an item in cart
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = req.body;
    const updatedCart = await cartService.updateCartItem(userId, productId, quantity);
    res.json({ success: true, cart: updatedCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update cart item" });
  }
};

// Remove an item from cart
export const removeCartItem = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;
    const updatedCart = await cartService.removeCartItem(userId, productId);
    res.json({ success: true, cart: updatedCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove cart item" });
  }
};