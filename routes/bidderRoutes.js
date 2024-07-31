import express from "express";
import {
  login,
  register,
  setUserCredentials,
  verifyUserOtp,
} from "../controllers/bidderAuthController.js";
const router = express.Router();
router.post("/register", register);
router.post("/verify-otp", verifyUserOtp);
router.post("/set-credentials", setUserCredentials);
router.post("/login", login);

export default router;
