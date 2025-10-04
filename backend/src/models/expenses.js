import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    // expense_id: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   trim: true,
    // },
    employee: {
      type:  mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      
    },
    amount: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    converted_amount: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    receipt_url: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    current_setup: {
      type: Number,
      default:0
    }
  },
  {
    timestamps: true 
  }
);

module.exports = mongoose.model('Expense', expenseSchema);
