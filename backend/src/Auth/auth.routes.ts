import { Router } from "express";
import { AuthController } from "./auth.controller.js";

//create an isolated router instance.
const router = Router();

router.post("/signup", AuthController.register); //creates user, setTokens
router.post("/login", AuthController.login); //verify user, setTokens
router.post("/logout", AuthController.logout); // clear auth cookies

export default router;
