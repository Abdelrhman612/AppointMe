import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Appointmints } from "../UserInterface/UserSchema";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { AppError } from "../utills/appError";
import { fail } from "../utills/httpStatusText";
const prisma = new PrismaClient();

export const getAppointments = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const appointments: Appointmints[] = await prisma.appointmints.findMany();
    res.json({ success: true, data: appointments });
  }
);

export const getAppointment = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const appointment = await prisma.appointmints.findUnique({ where: { id } });

    if (!appointment) {
      const error = new AppError("user is not found", 404, fail);
      next(error);
    }
    res.json({ success: true, data: appointment });
  }
);
export const createAppointment = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { date, userId, service } = req.body;
    const newAppointment: Appointmints = await prisma.appointmints.create({
      data: { date, userId, service },
    });
    if (!userId) {
      const error = new AppError("userId is required", 400, fail);
      next(error);
    }
    res.status(201).json({ success: true, data: newAppointment });
  }
);
export const updateAppointment = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { date, service, status } = req.body;
    const updatedAppointment: Appointmints = await prisma.appointmints.update({
      where: { id },
      data: { date, service, status },
    });
    if (!updatedAppointment) {
      const error = new AppError("Appointment not found ", 404, fail);
      next(error);
    }
    res.json({ success: true, data: updatedAppointment });
  }
);
export const deleteAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.appointmints.delete({
    where: { id },
  });
  res.json({ success: true, message: "Appointment deleted successfully" });
};
