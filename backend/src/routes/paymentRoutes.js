import express from "express";
import {
  createCheckoutSession,
  paymentSuccess
} from "../controller/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-checkout-session", protect, createCheckoutSession);
router.post("/success", protect, paymentSuccess);

export default router;
