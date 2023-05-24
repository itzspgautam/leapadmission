import mongoose from "mongoose";

const WinthdrawSchema = new mongoose.Schema(
  {
    investment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Investment",
      required: [true, "Investorment not found"],
    },

    paymentDetail: {
      type: Object,
      required: [true, "Payment Detail required"],
    },

    amount: {
      type: Number,
      min: [10000, "Minimun investment ammouint is 10000"],
      required: [true, "Amount is required"],
    },

    intrest: {
      type: Number,
      required: true,
    },
    profit: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["created", "success", "failed"],
      default: "created",
    },
    message: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Custom error message for validation
WinthdrawSchema.post("validate", function (error, doc, next) {
  if (error) {
    const errorMessage = Object.values(error.errors)
      .map((err) => err.message)
      .join(",");
    next(new Error(errorMessage.split(",")[0]));
  } else {
    next();
  }
});

export default mongoose.models.Withdraw ||
  mongoose.model("Withdraw", WinthdrawSchema);
