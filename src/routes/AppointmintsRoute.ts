import express from "express";
import {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controllers/Appointmints";

const router = express.Router();
router.get("/", getAppointments);
router.post("/", createAppointment);
router.get("/:id", getAppointment);
router.patch("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export const AppointmintsRouter = router;
