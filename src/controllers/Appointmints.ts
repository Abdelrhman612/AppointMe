import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAppointments = async (req: Request, res: Response) => {
  const appointments = await prisma.appointmints.findMany();
  res.json({ success: true, data: appointments });
};

export const getAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const appointment = await prisma.appointmints.findUnique({ where: { id } });

  if (!appointment) {
    res.status(404).json({ success: false, message: "Appointment not found" });
    return;
  }
  res.json({ success: true, data: appointment });
};
export const createAppointment = async (req: Request, res: Response) => {
  const { date, userId, service } = req.body;
  const newAppointment = await prisma.appointmints.create({
    data: { date, userId, service },
  });
  if (!date || !service) {
    res.status(400).json({
      success: false,
      message: "Date, userId, and service are required",
    });
    return;
  }
  res.status(201).json({ success: true, data: newAppointment });
};
export const updateAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { date, service, status } = req.body;
  const updatedAppointment = await prisma.appointmints.update({
    where: { id },
    data: { date, service, status },
  });
  if (!updatedAppointment) {
    res.status(404).json({ success: false, message: "Appointment not found" });
    return;
  }
  res.json({ success: true, data: updatedAppointment });
};
export const deleteAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.appointmints.delete({
    where: { id },
  });
  res.json({ success: true, message: "Appointment deleted successfully" });
};
