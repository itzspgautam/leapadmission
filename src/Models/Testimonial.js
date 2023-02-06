const mongoose = require("mongoose");

let Testimonial;

if (!mongoose.models.Testimonial) {
  const testimonialSchema = new mongoose.Schema(
    {
      avatarURL: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        default: "draft",
      },
    },
    {
      timestamps: true,
      useCreateIndex: true,
    }
  );

  Testimonial = mongoose.model("Testimonial", testimonialSchema);
} else {
  Testimonial = mongoose.model("Testimonial");
}

module.exports = Testimonial;
