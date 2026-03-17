import { Request, Response } from "express";
import { subscribe } from "./newsletter.service.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const handleSubscribe = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return res.status(400).json({ error: "A valid email is required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    await subscribe(normalizedEmail);

    return res.json({ success: true, message: "You're on the list!" });
  } catch (error) {
    console.error("Newsletter subscribe failed", error);
    return res
      .status(500)
      .json({ error: "Unable to save your subscription right now." });
  }
};
