import mongoose from "mongoose";


const approvalFlowSchema = new mongoose.Schema(
  {
    // flow_id: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   trim: true,
    // },
    expense: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'Expense', 
      required: true,
      
    },
    approver: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
     
    },
    sequence_order: {
      type: Number,
      required: true,
    },
    decision: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    comments: {
      type: String,
      trim: true,
       default:''
    },
    decided_at: {
      type: Date,
      default: null,
     
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('ApprovalFlow', approvalFlowSchema);
