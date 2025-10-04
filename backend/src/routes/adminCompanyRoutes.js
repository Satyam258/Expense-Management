import express from 'express';
import companyAdminController from '../controllers/adminController.js';
const router = express.Router();
router.post('/create', companyAdminController.createCompanyAndAdmin);

export default router;
