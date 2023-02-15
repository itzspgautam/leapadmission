const mongoose = require("mongoose");

let Preps;

if (!mongoose.models.Preps) {
  const PrepsSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    credit: {
      type: String,
      required: true,
    },
    timestamp: [
      {
        time: {
          type: Number,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  Preps = mongoose.model("Preps", PrepsSchema);
} else {
  Preps = mongoose.model("Preps");
}

module.exports = Preps;
