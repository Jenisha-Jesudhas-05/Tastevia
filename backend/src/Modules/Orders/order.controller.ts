import { Request, Response } from "express";
import * as orderService from "./order.service.js";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      items,
      totalAmount,
      customerName,
      customerEmail,
      shippingAddress,
      phone,
      status,
      paymentStatus,
      paymentMethod,
      paymentReference,
    } = req.body;

    if (
      !Array.isArray(items) ||
      !items.length ||
      !customerName ||
      !customerEmail ||
      !shippingAddress ||
      !phone
    ) {
      return res.status(400).json({ error: "Missing required order fields" });
    }

    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const order = await orderService.createOrder({
      userId,
      items,
      totalAmount: Number(totalAmount),
      customerName,
      customerEmail,
      shippingAddress,
      phone,
      status,
      paymentStatus,
      paymentMethod,
      paymentReference,
    });

    return res.status(201).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create order" });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const order = await orderService.getOrderById(Number(req.params.id));

    if (!order || order.userId !== userId) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch order details" });
  }
};

export const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const orders = await orderService.getOrdersByUserId(userId);
    return res.json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch order history" });
  }
};

export const createStripePaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount, currency } = req.body;
    const intent = await orderService.createStripePaymentIntent(
      Number(amount),
      currency
    );
    return res.json(intent);
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : "Failed to start Stripe payment";
    const statusCode =
      message === "Amount must be greater than zero" ||
      message === "Stripe is not configured"
        ? 400
        : 500;
    return res.status(statusCode).json({ error: message });
  }
};
