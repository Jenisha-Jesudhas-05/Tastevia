import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import { generateTokens } from "../utils/jwt.js";

export class AuthService {

  // SIGNUP
  static async signup(userData: any) {

    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email }
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 12);

    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    return user;
  }


  // LOGIN
  static async login(email: string, password: string) {

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const { accessToken, refreshToken } = generateTokens(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      accessToken,
      refreshToken
    };
  }


  // REFRESH TOKEN
  static async refresh(userId: number) {

    const tokens = generateTokens(userId);

    return tokens;
  }


  // LOGOUT
  static async logout() {
    return { message: "Logged out successfully" };
  }

}