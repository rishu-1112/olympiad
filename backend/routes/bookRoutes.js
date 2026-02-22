import express from "express";
import {
  createBookOrder,
  verifyBookPayment
} from "../controllers/bookController.js";

const router = express.Router();

router.post("/create-book-order", createBookOrder);
router.post("/verify-book-payment", verifyBookPayment);

export default router;