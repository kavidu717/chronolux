import express from "express";

import { getChatbotResponse } from "../controller/chatController.js";

const router = express.Router();


router.post("/", getChatbotResponse);

export default router;