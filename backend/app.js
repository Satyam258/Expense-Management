import express from "express";
import cors from 'cors'
import companyAdminRoutes from  "./src/routes/adminCompanyRoutes.js"
import userRoutes from  "./src/routes/userRouter.js"
const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json())

app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))


app.use("/api/company-admin",companyAdminRoutes)
app.use("/api/users",userRoutes);

export {app};