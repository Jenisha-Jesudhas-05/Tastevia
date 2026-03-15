import express from "express";
import {
  createOrder,
  getOrderById,
  getOrdersByUserId,
  createStripePaymentIntent,
} from "./order.controller.js";

const router = express.Router();

router.post("/stripe/create-intent", createStripePaymentIntent);
router.post("/", createOrder);
router.get("/", getOrdersByUserId);
router.get("/:id", getOrderById);

export default router;
