import User from "../models/userModel.js"; 
import { generateRandomPassword, hashPassword } from "../utils/passwordGenerator.js";



 import nodemailer from "nodemailer";

// Define transporter (Gmail with App Password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aspirent885@gmail.com',   // your Gmail address
    pass: 'rjaf loyb osbg hugm'   // ⚠️ use Gmail App Password, not your real password
  }
});

// Function to send email with password
const sendEmailWithPassword = async (email, name, password) => {
  const mailOptions = {
    from: 'aspirant885@gmail.com',
    to: email,
    subject: 'Your Account Credentials',
    text: `Hello ${name},\n\nYour account has been created.\n\nTemporary Password: ${password}\n\n⚠️ Please change your password after first login.\n\nThanks!`
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return { success: true };
  } catch (err) {
    console.error('Email error:', err);
    return { success: false, error: err };
  }
};

export const addUserByAdmin = async (req, res) => {
  try {
    const { companyId, name, email, role, managerId } = req.body;

    if (!companyId || !name || !email || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    
    if (!["manager", "employee"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }

   
    const randomPassword = generateRandomPassword();
    const hashedPassword = await hashPassword(randomPassword);

    const newUser = new User({
      company: companyId,
      name,
      email,
      password: hashedPassword,
      role,
      manager: managerId || null,
      is_first_login: true,
      password_changed_at: null,
    });

    await newUser.save();


    await sendEmailWithPassword(email, name,randomPassword);

    return res.status(201).json({
      message: `${role} created successfully`,
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
