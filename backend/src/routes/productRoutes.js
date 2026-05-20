import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { createProduct } from "../controller/productController.js";
import upload  from "../middleware/upload.js";


const router = express.Router();






router.post("/", protect, adminOnly, upload.single("image"), createProduct);



export default router