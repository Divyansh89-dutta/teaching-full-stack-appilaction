import express from "express";
import cors from "cors";
import dontenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"

dontenv.config();
connectDB();

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes 
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });
app.use("/api/auth", authRoutes)

export default app;