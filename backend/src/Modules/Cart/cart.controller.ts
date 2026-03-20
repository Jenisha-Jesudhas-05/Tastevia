import { Request, Response } from "express";
import * as cartService from "./cart.service.js";


export const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    await cartService.addToCart(userId, productId, quantity);
    const cart = await cartService.getCart(userId);
    res.json({ success: true, cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
};


export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const cart = await cartService.getCart(userId);
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get cart" });
  }
};


export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const updatedCart = await cartService.updateCartItem(userId, productId, quantity);
    res.json({ success: true, cart: updatedCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update cart item" });
  }
};


export const removeCartItem = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const updatedCart = await cartService.removeCartItem(userId, productId);
    res.json({ success: true, cart: updatedCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove cart item" });
  }
};
