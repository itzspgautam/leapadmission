const mongoose = require("mongoose");

let Contact;

if (!mongoose.models.Contact) {
  const ContactSchema = new mongoose.Schema({
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
  Contact = mongoose.model("Contact", ContactSchema);
} else {
  Contact = mongoose.model("Contact");
}

module.exports = Contact;
