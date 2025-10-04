// controllers/receiptController.js
import { processReceipt } from "../utils/ocr.js";

export const uploadReceipt = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  try {
    const parsed = await processReceipt(req.file.buffer);
    res.json({ success: true, parsed });
  } catch (err) {
    console.error("OCR error:", err);
    res.status(500).json({ success: false, error: "OCR failed", details: err.message });
  }
};
