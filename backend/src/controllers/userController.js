import User from "../models/userModel.js"; 
import { generateRandomPassword, hashPassword } from "../utils/passwordGenerator.js";


const sendEmailWithPassword = async (email, password) => {

  console.log(`Send email to ${email} with password: ${password}`);
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


    await sendEmailWithPassword(email, randomPassword);

    return res.status(201).json({
      message: `${role} created successfully`,
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
