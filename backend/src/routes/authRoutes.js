import express from "express";

import { loginUser, registerUser, blockUser, getAllUsers, unblockUser, getProfile, updateProfile } from "../controller/authController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { verifyToken } from "../middleware/authMiddleware.js";





const router=express.Router()


router.post('/register',registerUser)
router.post('/login',loginUser)

router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);


router.put("/block/:id",protect, adminOnly, blockUser);
router.get("/users",protect, adminOnly,getAllUsers);
router.put("/unblock/:id",protect, adminOnly,unblockUser);

export default router