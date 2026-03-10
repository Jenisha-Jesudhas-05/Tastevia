import { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import {
  setAuthCookies,
  clearAuthCookies,
  verifyRefreshToken
} from "../utils/jwt.js";


export const signup = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.signup(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


export const login = async (req: Request, res: Response) => {
  try {

    const { email, password } = req.body;

    const { user, accessToken, refreshToken } =
      await AuthService.login(email, password);

    setAuthCookies(res, accessToken, refreshToken);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: user
    });

  } catch (error: any) {

    res.status(401).json({
      success: false,
      message: error.message
    });

  }
};


export const refresh = async (req: Request, res: Response) => {
  try {

    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No refresh token"
      });
    }

    const decoded: any = verifyRefreshToken(token);

    const { accessToken, refreshToken } =
      await AuthService.refresh(decoded.userId);

    setAuthCookies(res, accessToken, refreshToken);

    res.status(200).json({
      success: true,
      message: "Token refreshed"
    });

  } catch (error) {

    res.status(403).json({
      success: false,
      message: "Session expired"
    });

  }
};


export const logout = async (_req: Request, res: Response) => {
  try {

    // Since refreshToken is not stored in DB
    // we only clear cookies

    clearAuthCookies(res);

    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Logout failed"
    });

  }
};