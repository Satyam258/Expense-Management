// utils/ocr.js
import { createWorker } from "tesseract.js";

let worker;

// Initialize Tesseract worker once
(async () => {
  worker = await createWorker();
  await worker.reinitialize("eng");
  console.log("✅ Tesseract worker ready");
})();

// Heuristic parser: only return items if needed
export function parseReceipt(text) {
  const lines = text
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l.length > 0);

  // Only include item lines (numbers but not totals or taxes)
  const items = lines.filter(
    l => /[0-9]\s|[\d]{1,3}[.,]\d{2}/.test(l) &&
         !/total|subtotal|grand total|amount|tax|gst/i.test(l)
  );

  return { items, rawText: text };
}

// OCR function
export async function processReceipt(buffer) {
  const { data } = await worker.recognize(buffer);
  return parseReceipt(data.text || "");
}
