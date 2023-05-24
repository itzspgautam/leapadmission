import mongoose from "mongoose";

const ReferWinthdrawSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Investment",
      required: [true, "Investorment not found"],
    },

    paymentDetail: {
      type: Object,
      required: [true, "Payment Detail required"],
    },

    transaction: {
      type: Object,
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
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
ReferWinthdrawSchema.post("validate", function (error, doc, next) {
  if (error) {
    const errorMessage = Object.values(error.errors)
      .map((err) => err.message)
      .join(",");
    next(new Error(errorMessage.split(",")[0]));
  } else {
    next();
  }
});

export default mongoose.models.RefWithdraw ||
  mongoose.model("RefWithdraw", ReferWinthdrawSchema);
