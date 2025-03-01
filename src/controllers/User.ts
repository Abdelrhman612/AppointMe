import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      FirstName: true,
      LastName: true,
      email: true,
      appointmints: true,
    },
  });
  res.json({ success: true, data: users });
};
export const updateUser = async (req: Request, res: Response) => {
  const { Id } = req.params;
  const { FirstName, LastName, email } = req.body;
  const upUser = await prisma.user.update({
    where: { id: Id },
    data: { FirstName, LastName, email },
    include: { appointmints: true },
  });
  if (!upUser) {
    res.status(404).json({ success: false, message: "User not found" });
    return;
  }

  res.json({ success: true, data: upUser });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { Id } = req.params;
  const deleuser = await prisma.user.delete({
    where: { id: Id },
    include: { appointmints: true },
  });
  if (!deleuser) {
    res.status(404).json({ success: false, message: "User not found" });
    return;
  }
  res.json({ success: true, message: "User deleted successfully" });
};
