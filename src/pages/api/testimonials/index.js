const DbConnect = require("../../../Config/dbConfig");
const Testimonial = require("../../../Models/Testimonial");
const testimonial = async (req, res) => {
  await DbConnect();
  switch (req.method) {
    case "POST":
      const { avatarURL, author, message, description } = req.body;
      const testimonialData = {
        avatarURL,
        author,
        message,
        description,
      };

      try {
        const newTestimonial = new Testimonial(testimonialData);
        const savedTestimonial = await newTestimonial.save();
        return res.status(201).json({
          message: "Testimonial created successfully",
          testimonial: savedTestimonial,
        });
      } catch (error) {
        return res.status(400).json({
          message: "Testimonial creation failed",
          error,
        });
      }
    case "GET":
      try {
        const testimonials = await Testimonial.find({ status: "published" });
        return res
          .status(200)
          .json({ total: testimonials.length, testimonials });
      } catch (error) {
        return res.status(500).json({ error });
      }
  }
};

export default testimonial;
