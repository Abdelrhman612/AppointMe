import express from "express";
const router = express.Router();
import { register, Login } from "../AutheController/AuthUsers";
router.post("/register", register);
router.get("/Login", Login);
export const AuthRouter = router;
