import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: { appointmints: true },
    });
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};
export const getUser = async (req: Request, res: Response) => {
  try {
    const { Id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: Id },
      include: { appointmints: true },
    });

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch user" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email) {
      res
        .status(400)
        .json({ success: false, message: "Name and email are required" });
      return;
    }

    const newUser = await prisma.user.create({
      data: { name, email, password },
    });

    res.status(201).json({ success: true, data: newUser });
  } catch (error: any) {
    if (error.code === "P2002") {
      res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Failed to create user" });
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { Id } = req.params;
    const { name, email } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: Id },
      data: { name, email },
      include: { appointmints: true },
    });

    res.json({ success: true, data: updatedUser });
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(404).json({ success: false, message: "User not found" });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Failed to update user" });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { Id } = req.params;
    await prisma.user.delete({
      where: { id: Id },
      include: { appointmints: true },
    });

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(404).json({ success: false, message: "User not found" });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Failed to delete user" });
    }
  }
};
