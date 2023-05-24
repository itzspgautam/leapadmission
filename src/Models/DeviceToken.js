const mongoose = require("mongoose");

const deviceTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User not found"],
    },

    deviceToken: {
      type: String,
      required: [true, "Device token is required."],
    },
  },
  { timestamps: true }
);

// Custom error message for validation
deviceTokenSchema.post("validate", function (error, doc, next) {
  if (error) {
    const errorMessage = Object.values(error.errors)
      .map((err) => err.message)
      .join(",");
    next(new Error(errorMessage.split(",")[0]));
  } else {
    next();
  }
});

export default mongoose.models.DeviceToken ||
  mongoose.model("DeviceToken", deviceTokenSchema);
