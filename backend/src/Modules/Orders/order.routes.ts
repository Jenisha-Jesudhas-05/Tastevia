import express from "express";
import {
  createOrder,
  createPaymentIntent,
  getOrderById,
  getOrdersByUserId,
} from "./order.controller.js";

const router = express.Router();

router.post("/payment-intent", createPaymentIntent);
router.post("/", createOrder);
router.get("/", getOrdersByUserId);
router.get("/:id", getOrderById);

export default router;
