import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_KEY as string;
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    res
      .status(403)
      .json({ success: false, message: "Access denied. No token provided." });
    return;
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    res.status(403).json({ success: false, message: "Invalid token format." });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.body.user = decoded;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
    return;
  }
};
