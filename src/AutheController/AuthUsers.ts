import { NextFunction, Request, Response } from "express";
import { PrismaClient, user } from "@prisma/client";
import bcrypt from "bcrypt";
import { GenerateJwt } from "../utills/GenerateJwt";
import { AppError } from "../utills/appError";
import { fail } from "../utills/httpStatusText";
import { asyncWrapper } from "../middleware/asyncWrapper";
const prisma = new PrismaClient();
export const register = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { FirstName, LastName, email, password } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      const error = new AppError("User already exists", 400, fail);
      return next(error);
    }
    const HashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        FirstName,
        LastName,
        email,
        password: HashedPassword,
      },
      select: {
        FirstName: true,
        LastName: true,
        email: true,
      },
    });
    const token = await GenerateJwt({ email: newUser.email });
    res.status(201).json({
      status: 201,
      success: true,
      data: newUser,
      token: { StringToken: token },
      message: "User registered successfully",
    });
  }
);
export const Login = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new AppError("email or password is required", 400, fail);
      return next(error);
    }
    const OneUser = await prisma.user.findUnique({ where: { email: email } });
    if (!OneUser) {
      res.status(404).json({ success: false, message: "user is not found" });
      return;
    }
    const matchedPassword = await bcrypt.compare(password, OneUser.password);
    if (!matchedPassword) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }
    const token = await GenerateJwt({ email: OneUser.email });
    res.status(200).json({
      success: true,
      data: { token: token },
    });
  }
);
