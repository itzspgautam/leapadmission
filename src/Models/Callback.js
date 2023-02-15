const mongoose = require("mongoose");

let Callback;

if (!mongoose.models.Callback) {
  const CallbackSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      default: "new",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  Callback = mongoose.model("Callback", CallbackSchema);
} else {
  Callback = mongoose.model("Callback");
}

module.exports = Callback;
