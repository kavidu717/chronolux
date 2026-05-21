import express from "express";
import { checkout, getMyOrders, getAllOrders, updateOrderStatus } from "../controller/orderController.js";
import { adminOnly, verifyToken, protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/checkout", verifyToken, checkout);
router.get("/my-orders", verifyToken, getMyOrders);


router.get("/admin/all",protect ,adminOnly, getAllOrders
);

router.put(
  "/admin/:id/status", protect,adminOnly, updateOrderStatus
);

export default router;