import express from "express";
import cors from "cors";
import dontenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import payementRoutes from "./routes/paymentRoutes.js";
import addressRoute from"./routes/addressRoutes.js";
import wishlistRoutes from "./routes/wishlistRoute.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dontenv.config();
connectDB();

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes 
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", payementRoutes);
app.use("/api/address", addressRoute);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/notifications", notificationRoutes);

export default app;