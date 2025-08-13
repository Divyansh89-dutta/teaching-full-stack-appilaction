import express from "express";
import {
  getProfile,
  updateProfile,
  listUsers,
  getUserById,
  updateUserByAdmin,
  deleteUser,
} from "../controllers/userController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Current user profile
router.route("/profile").get(protect, getProfile).put(protect, updateProfile);

// Admin user management
router.route("/").get(protect, adminOnly, listUsers); // GET /api/users
router
  .route("/:id")
  .get(protect, adminOnly, getUserById)
  .put(protect, adminOnly, updateUserByAdmin)
  .delete(protect, adminOnly, deleteUser);

export default router;
