import express from "express";
import {
  createOrder,
  getOrderById,
  getOrdersByUserId,
} from "./order.controller.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrdersByUserId);
router.get("/:id", getOrderById);

export default router;
