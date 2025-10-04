// routes/receiptRoutes.js
import express from "express";
import multer from "multer";
import { uploadReceipt } from "../controllers/recipentController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload-receipt", upload.single("receipt"), uploadReceipt);

export default router;
