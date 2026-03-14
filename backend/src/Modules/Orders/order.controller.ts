import { Request, Response } from "express";
import * as orderService from "./order.service.js";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      userId,
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
      !userId ||
      !Array.isArray(items) ||
      !items.length ||
      !customerName ||
      !customerEmail ||
      !shippingAddress ||
      !phone
    ) {
      return res.status(400).json({ error: "Missing required order fields" });
    }

    const order = await orderService.createOrder({
      userId: Number(userId),
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
    const order = await orderService.getOrderById(Number(req.params.id));

    if (!order) {
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
    const userId = Number(req.query.userId);

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const orders = await orderService.getOrdersByUserId(userId);
    return res.json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch order history" });
  }
};

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await orderService.createPaymentIntent(
      Number(amount),
      currency
    );

    return res.json(paymentIntent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create payment intent" });
  }
};
