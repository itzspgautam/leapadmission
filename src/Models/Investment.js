import mongoose from "mongoose";

const InvestmentSchema = new mongoose.Schema(
  {
    investor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Investor not found"],
    },
    transactions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
    ],
    amount: {
      type: Number,
      min: [10000, "Minimun investment ammouint is 10000"],
      required: [true, "Amount is required"],
    },
    duration: {
      type: Number,
      required: [true, "Investment duration is required."],
    },
    emiDuration: {
      type: Number,
      enum: {
        values: [1, 2, 3, 4],
        message:
          "The minimum and maximum EMI duration should be 1 and 4 months respectively.",
      },
      required: [true, "Please provide emi duration"],
    },

    intrest: {
      type: Number,
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["full", "emi"],
      default: "full",
    },

    status: {
      type: String,
      enum: ["created", "success", "failed"],
      default: "created",
    },

    withdraw: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Withdraw",
    },
  },
  { timestamps: true }
);

// Custom error message for validation
InvestmentSchema.post("validate", function (error, doc, next) {
  if (error) {
    const errorMessage = Object.values(error.errors)
      .map((err) => err.message)
      .join(",");
    next(new Error(errorMessage.split(",")[0]));
  } else {
    next();
  }
});

export default mongoose.models.Investment ||
  mongoose.model("Investment", InvestmentSchema);
