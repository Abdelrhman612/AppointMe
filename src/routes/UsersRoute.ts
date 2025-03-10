import express from "express";
import * as user from "../controllers/User";
import { verifyToken } from "../middleware/verfiyToken";
const router = express.Router();
router.get("/", verifyToken, user.getUsers);
router.patch("/:Id", user.updateUser);
router.delete("/:Id", user.deleteUser);
export const UserRouter = router;
