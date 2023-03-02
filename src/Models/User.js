const mongoose = require("mongoose");
let User;
if (!mongoose.models.User) {
  const userSchema = new mongoose.Schema(
    {
      displayName: {
        type: String,
      },
      email: {
        type: String,
      },
      photoURL: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
      providerId: {
        type: String,
        required: true,
      },
      uid: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        default: "user",
      },
    },
    {
      timestamps: true,
      useCreateIndex: true,
    }
  );

  User = mongoose.model("User", userSchema);
} else {
  User = mongoose.model("User");
}

module.exports = User;
