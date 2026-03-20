import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
 
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';


export const generateTokens = (userId: number) => {

  const accessToken = jwt.sign(
    { userId },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};
 
export const setAuthCookies = (
  req: Request,
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  const isProduction = process.env.NODE_ENV === "production";
  // Keep secure flag only in production to avoid dev HTTP/localhost drops.
  const secure = isProduction;

  const cookieOptions = {
    httpOnly: true,
    secure,
    sameSite: (secure ? "none" : "lax") as const,
  };
 
  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000 // 15 mins
  });
 
  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};
 
export const clearAuthCookies = (res: Response) => {
  res.clearCookie("accessToken", { httpOnly: true, sameSite: "none", secure: true });
  res.clearCookie("refreshToken", { httpOnly: true, sameSite: "none", secure: true });
};
 
export const verifyRefreshToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as { userId: string };
    return decoded;
  } catch (error) {
    return null;
  }
};
