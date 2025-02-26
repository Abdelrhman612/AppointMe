import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await prisma.appointmints.findMany();
    res.json({ success: true, data: appointments });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch appointments" });
  }
};

export const getAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const appointment = await prisma.appointmints.findUnique({ where: { id } });

    if (!appointment) {
      res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
      return;
    }

    res.json({ success: true, data: appointment });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch appointment" });
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { date, userId, service } = req.body;

    if (!date || !service) {
      res.status(400).json({
        success: false,
        message: "Date, userId, and service are required",
      });
      return;
    }

    const newAppointment = await prisma.appointmints.create({
      data: { date, userId, service },
    });

    res.status(201).json({ success: true, data: newAppointment });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create appointment" });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { date, service, status } = req.body;

    const updatedAppointment = await prisma.appointmints.update({
      where: { id },
      data: { date, service, status },
    });

    res.json({ success: true, data: updatedAppointment });
  } catch (error: any) {
    if (error.code === "P2025") {
      res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Failed to update appointment" });
    }
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.appointmints.delete({
      where: { id },
    });

    res.json({ success: true, message: "Appointment deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Failed to delete appointment" });
    }
  }
};
