import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", AuthController.register); //creates user, setTokens
router.post("/login", AuthController.login); //verify user, setTokens
router.post("/logout", AuthController.logout); // clear auth cookies
router.get("/me", requireAuth, AuthController.me); // returns current user

export default router;
