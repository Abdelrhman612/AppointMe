import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { UserRouter } from "./routes/router";
import { AppointmintsRouter } from "./routes/Appointmints";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
connectDB();
app.use(express.json());
app.use("/api/users", UserRouter);
app.use("/api/Appointmints", AppointmintsRouter);
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
