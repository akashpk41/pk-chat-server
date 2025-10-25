// dependencies
import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./lib/db.js";

// configuration
dotenv.config({ quiet: true });
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())

const PORT = process.env.PORT || 3000;

// routes middleware
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server Is Running On Port: ${PORT}🔥`);
  connectDB();
});
