const mongoose = require("mongoose");

const ReferSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User not found"],
    },

    referId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User not found"],
    },
    status: {
      type: String,
      enum: [
        "pending",
        ,
        "rewarded",
        "withdraw requested",
        "withdrawn",
        "failed",
      ],
      default: "pending",
    },
    amount: {
      type: Number,
      required: [true, "Reward amount is required"],
    },
  },
  { timestamps: true }
);

// Custom error message for validation
ReferSchema.post("validate", function (error, doc, next) {
  if (error) {
    const errorMessage = Object.values(error.errors)
      .map((err) => err.message)
      .join(",");
    next(new Error(errorMessage.split(",")[0]));
  } else {
    next();
  }
});

export default mongoose.models.Refer || mongoose.model("Refer", ReferSchema);
