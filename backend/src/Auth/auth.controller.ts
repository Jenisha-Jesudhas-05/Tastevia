import { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { setAuthCookies, clearAuthCookies } from "../utils/jwt.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password)
        return res.status(400).json(errorResponse("All fields are required"));

      const { user, accessToken, refreshToken } = await AuthService.register({ name, email, password });

      setAuthCookies(res, accessToken, refreshToken);

      res.status(201).json(successResponse({ user }, "User registered successfully"));
    } catch (error: any) {
      res.status(400).json(errorResponse(error.message));
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json(errorResponse("Email and password required"));

      const { user, accessToken, refreshToken } = await AuthService.login(email, password);

      setAuthCookies(res, accessToken, refreshToken);

      res.json(successResponse({ user }, "Login successful"));
    } catch (error: any) {
      res.status(400).json(errorResponse(error.message));
    }
  }

  static logout(req: Request, res: Response) {
    clearAuthCookies(res);
    res.json(successResponse(null, "Logged out successfully"));
  }
}
