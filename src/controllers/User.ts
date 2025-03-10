import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { User } from "../UserInterface/UserSchema";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { AppError } from "../utills/appError";
import { fail } from "../utills/httpStatusText";
const prisma = new PrismaClient();
export const getUsers = asyncWrapper(async (req: Request, res: Response) => {
  const users: User[] = await prisma.user.findMany({
    select: {
      FirstName: true,
      LastName: true,
      email: true,
      id: true,
      appointmints: true,
    },
  });
  res.json({ success: true, data: users });
});
export const updateUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { Id } = req.params;
    const { FirstName, LastName, email } = req.body;
    if (!FirstName || !email) {
      const error = new AppError("name or email is reqired", 400, fail);
      return next(error);
    }
    const upUser: User = await prisma.user.update({
      where: { id: Id },
      data: { FirstName, LastName, email },
      include: { appointmints: true },
    });
    if (!upUser) {
      const error = new AppError("User is not found", 404, fail);
      return next(error);
    }

    res.json({ success: true, data: upUser });
  }
);

export const deleteUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { Id } = req.params;

    await prisma.user.delete({
      where: { id: Id },
      include: { appointmints: true },
    });

    res.json({ success: true, message: "User deleted successfully" });
  }
);
