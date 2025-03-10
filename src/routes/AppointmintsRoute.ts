import express from "express";
import * as Appoint from "../controllers/Appointmints";
const router = express.Router();
router.get("/", Appoint.getAppointments);
router.post("/", Appoint.createAppointment);
router.get("/:id", Appoint.getAppointment);
router.patch("/:id", Appoint.updateAppointment);
router.delete("/:id", Appoint.deleteAppointment);

export const AppointmintsRouter = router;
