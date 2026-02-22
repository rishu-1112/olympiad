import express from "express";
import {
  sendOtp,
  verifyOtp,
  createOrder,
  verifyPayment,
} from "../controllers/registrationController.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);

export default router;