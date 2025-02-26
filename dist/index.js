"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const router_1 = require("./routes/router");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
(0, db_1.connectDB)();
app.use(express_1.default.json());
app.use("/api/users", router_1.UserRouter);
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
