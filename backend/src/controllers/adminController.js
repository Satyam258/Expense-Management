import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import Admin from '../models/adminModel.js';
import Company from '../models/companyModel.js';

const createCompanyAndAdmin = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { companyName, country, default_currency, adminName, adminEmail, adminPassword } = req.body;

    if (!companyName || !country || !default_currency || !adminName || !adminEmail || !adminPassword) {
      return res.status(400).json({
        success: false,
        message: 'All company and admin fields are required.',
      });
    }

    // 1. Check if a company already exists for the country
    const existingCompany = await Company.findOne({ country }).session(session);
    if (existingCompany) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({
        success: false,
        message: `A company already exists for the country '${country}'.`,
      });
    }

    // 2. Check if admin email already exists globally
    const existingAdmin = await Admin.findOne({ email: adminEmail }).session(session);
    if (existingAdmin) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({
        success: false,
        message: 'Admin with this email already exists.',
      });
    }

    // 3. Create the company
    const newCompany = new Company({
      name: companyName,
      country,
      default_currency,
    });

    await newCompany.save({ session });

    // 4. Hash the admin password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // 5. Create the admin linked to the new company
    const newAdmin = new Admin({
      company: newCompany._id, // ObjectId reference
      name: adminName,
      email: adminEmail.toLowerCase(),
      password: hashedPassword,
      is_first_login: true,
      password_changed_at: null,
    });

    await newAdmin.save({ session });

    // 6. Commit transaction
    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: 'Company and admin created successfully.',
      company: {
        _id: newCompany._id,
        name: newCompany.name,
        country: newCompany.country,
        default_currency: newCompany.default_currency,
      },
      admin: {
        _id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        company: newAdmin.company,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error('Error creating company and admin:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while creating company and admin.',
    });
  }
};

export default { createCompanyAndAdmin };
