import express from "express";
import { handleSubscribe } from "./newsletter.controller.js";

const router = express.Router();

router.post("/subscribe", handleSubscribe);

export default router;
