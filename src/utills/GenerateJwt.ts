import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_KEY as string;
export const GenerateJwt = async (payload: any) => {
  const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: "1m" });

  return token;
};
