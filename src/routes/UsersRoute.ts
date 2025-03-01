import express from "express";
import { getUsers, updateUser, deleteUser } from "../controllers/User";
import { verifyToken } from "../middleware/verfiyToken";
const router = express.Router();
router.get("/", verifyToken, getUsers);
router.patch("/:Id", updateUser);
router.delete("/:Id", deleteUser);
export const UserRouter = router;
