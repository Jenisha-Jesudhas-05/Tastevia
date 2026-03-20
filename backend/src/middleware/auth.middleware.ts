import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "access_secret";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res
      .status(401)
      .json({ error: "Unauthorized: missing auth token" });
  }

  try {
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET) as {
      userId: number;
    };
    req.userId = Number(payload.userId);
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Unauthorized: invalid or expired token" });
  }
};
