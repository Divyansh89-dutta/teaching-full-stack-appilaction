import express from "express";
import { register, login } from "../controllers/authController.js";
import passport from "passport";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

//Google OAuth 
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"]}));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    // redirect to frontend with JWT token
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  }
);

export default router;