import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { UserRouter } from "./routes/UsersRoute";
import { AppointmintsRouter } from "./routes/AppointmintsRoute";
import { AuthRouter } from "./routes/AutheUserRoute";
import { error, fail } from "./utills/httpStatusText";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
connectDB();
app.use(express.json());
app.use("/api/users", UserRouter);
app.use("/api/Appointmints", AppointmintsRouter);
app.use("/api/users", AuthRouter);

app.all("*", (req, res) => {
  res.status(404).json({ success: error, message: "Route is not found" });
});
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res
    .status(err.statusCode || 500)
    .json({ status: err.statusText, message: err.message });
});
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
