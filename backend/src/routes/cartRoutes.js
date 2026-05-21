import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart
} from "../controller/cartController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", verifyToken, addToCart);
router.get("/", verifyToken, getCart);
router.post("/remove", verifyToken, removeFromCart);

export default router;