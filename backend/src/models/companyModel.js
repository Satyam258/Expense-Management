import mongoose from "mongoose";


const companySchema = new mongoose.Schema(
  {
    // company_id: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   trim: true,
    // },
    name: {
      type: String,
      required: true,
      trim: true,
      unique:true
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    default_currency: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Company', companySchema);
