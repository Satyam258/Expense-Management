import express from "express";
import { addUserByAdmin } from "../controllers/userController.js";

const router = express.Router();

router.post("/", addUserByAdmin);

export default router;
