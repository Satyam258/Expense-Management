import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    // user_id: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   trim: true,
    // },
    company: {
      type:  mongoose.Schema.Types.ObjectId,
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
    role: {
      type: String,
      enum: ['manager', 'employee'],
      required: true,
    },
    manager: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      
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
const User = mongoose.model('User', userSchema);
export default User;