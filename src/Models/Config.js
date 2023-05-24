import mongoose from "mongoose";

const ConfigSchema = new mongoose.Schema(
  {
    invest: {
      minAmount: {
        type: Number,
        required: [true, "Amount is required"],
      },
      minDuration: {
        type: Number,
        required: [true, "Duration is required"],
      },
      maxDuration: {
        type: Number,
        required: [true, "Maximim duration is required"],
      },
      FullIntrest: {
        type: Number,
        required: [true, "Intrest % of full payment is required"],
      },
      EmiIntrest: {
        type: Number,
        required: [true, "Intrest & of EMI payment is required"],
      },
      MaxEmiMonth: {
        type: Number,
        required: [true, "Maximum duration & of EMI is required"],
      },
      MinEmiMonth: {
        type: Number,
        required: [true, "Minimum duration & of EMI is required"],
      },

      MinWithdrawMonth: {
        type: Number,
        required: [true, "Minimum withdrawal month is required"],
      },
      PreDurationWithdrawIntrest: {
        type: Number,
        required: [true, "Pre Duration withdrawal intrest is required"],
      },
    },
  },
  { timestamps: true }
);

// Custom error message for validation
ConfigSchema.post("validate", function (error, doc, next) {
  if (error) {
    const errorMessage = Object.values(error.errors)
      .map((err) => err.message)
      .join(",");
    next(new Error(errorMessage.split(",")[0]));
  } else {
    next();
  }
});

export default mongoose.models.Config || mongoose.model("Config", ConfigSchema);
