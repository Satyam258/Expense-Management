import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    // admin_id: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   trim: true,
    // },
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

module.exports = mongoose.model('Admin', adminSchema);
