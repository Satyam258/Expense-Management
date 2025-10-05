import express from "express";
import cors from "cors";
import companyAdminRoutes from "./src/routes/adminCompanyRoutes.js";
import userRoutes from "./src/routes/userRouter.js";

const app = express();

// Apply CORS before any routes
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*', // allow frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Routes
app.use("/api/company-admin", companyAdminRoutes);
app.use("/api/users", userRoutes);

app.use("/api/receipts", receiptRoutes);
app.use("/api/company-admin",companyAdminRoutes)
app.use("/api/users",userRoutes);

export {app};
