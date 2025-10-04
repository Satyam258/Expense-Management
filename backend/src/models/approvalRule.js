import mongoose from "mongoose";

const approvalRuleSchema = new mongoose.Schema(
  {
    // company_id: {
    //   type: String,
    //   ref: 'Company',
    //   required: true,
    //   trim: true,
    // },
    type: {
      type: String,
      enum: ['sequential', 'percentage', 'specific', 'hybrid'], 
      required: true,
      trim: true,
    },
    threshold_per: {
      type: Number,
      default: null,
    },
    specific_approver: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      
    },
    sequence_json: {
      type: Object,
      required: true,
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('ApprovalRule', approvalRuleSchema);
