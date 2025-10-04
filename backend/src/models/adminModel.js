import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Company',
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    is_first_login: {
      type: Boolean,
      default: true,
    },
    password_changed_at: {
      type: Date,
      default: null,
    }
  },
  {
    timestamps: true 
  }
);

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
