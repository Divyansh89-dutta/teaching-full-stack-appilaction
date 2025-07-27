import express from "express";
import { register, login } from "../controllers/authController.js";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";

const routes = express.Router();

routes.post("/register", register);
routes.post("/login", login);

export default routes;