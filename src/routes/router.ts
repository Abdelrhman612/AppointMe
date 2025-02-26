import express from "express";
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/User";
const router = express.Router();
router.get("/", getUsers);
router.get("/:Id", getUser);
router.patch("/:Id", updateUser);
router.delete("/:Id", deleteUser);
router.post("/", createUser);

export const UserRouter = router;
