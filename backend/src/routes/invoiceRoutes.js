import express from "express";
import { downloadInvoice } from "../controller/invoiceController.js";

const router = express.Router();

router.get("/:id", downloadInvoice);

export default router;
