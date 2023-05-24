import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    invest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Investment",
      require: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    paymentId: {
      type: String,
    },
    paymentRef: {
      type: String,
    },
    paymentMode: {
      type: String,
    },
  },
  { timestamps: true }
);

// Custom error message for validation
TransactionSchema.post("validate", function (error, doc, next) {
  if (error) {
    const errorMessage = Object.values(error.errors)
      .map((err) => err.message)
      .join(",");
    next(new Error(errorMessage.split(",")[0]));
  } else {
    next();
  }
});

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);

export default Transaction;
