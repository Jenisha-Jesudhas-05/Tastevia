import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { generateTokens } from "../utils/jwt.js"; // your JWT util

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export class AuthService {
  static async register({ name, email, password }: RegisterInput) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new Error("Email already registered");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const tokens = generateTokens(user.id);
    return { user, ...tokens };
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const tokens = generateTokens(user.id);
    return { user, ...tokens };
  }
}
