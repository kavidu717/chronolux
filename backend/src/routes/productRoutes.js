import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { createProduct, getProducts, deleteProduct, updateProduct, getProductById, getFilterOptions } from "../controller/productController.js";
import upload  from "../middleware/upload.js";


const router = express.Router();






router.post("/", protect, adminOnly, upload.single("image"), createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);



router.get("/filters", getFilterOptions);

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/filters", getFilterOptions);


export default router