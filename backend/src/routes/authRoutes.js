import express from "express";

import { loginUser, registerUser, blockUser, getAllUsers, unblockUser } from "../controller/authController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";





const router=express.Router()


router.post('/register',registerUser)
router.post('/login',loginUser)



router.put("/block/:id",protect, adminOnly, blockUser);
router.get("/users",protect, adminOnly,getAllUsers);
router.put("/unblock/:id",protect, adminOnly,unblockUser);

export default router