import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { UserRouter } from "./routes/UsersRoute";
import { AppointmintsRouter } from "./routes/AppointmintsRoute";
import { AuthRouter } from "./routes/AutheUserRoute";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
connectDB();
app.use(express.json());
app.use("/api/users", UserRouter);
app.use("/api/Appointmints", AppointmintsRouter);
app.use("/api/users", AuthRouter);
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
