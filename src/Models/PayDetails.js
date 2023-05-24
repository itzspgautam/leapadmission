const mongoose = require("mongoose");

const paymentDetailsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User not found"],
    },

    paymentType: {
      type: String,
      enum: ["UPI", "BANK"],
      required: [true, "Please select payment type."],
    },

    upiId: {
      type: String,
      validate: {
        validator: function (v) {
          // regular expression to validate the format of the UPI ID
          const regex =
            /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}|[0-9]{10}|[0-9]{10}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}|[a-zA-Z0-9]{5,32}@[a-zA-Z]{2,6})$/;
          return regex.test(v);
        },
        message: (props) => `${props.value} is not a valid UPI ID`,
      },
      required: [
        function () {
          return this.paymentType === "UPI";
        },
        "Please Enter UPI ID",
      ],
    },

    accountNumber: {
      type: String,
      required: [
        function () {
          return this.paymentType === "BANK";
        },
        "Please Enter Account Number",
      ],
    },

    IFSCCode: {
      type: String,
      required: [
        function () {
          return this.paymentType === "BANK";
        },
        "Please Enter IFSC Code",
      ],
    },

    accountHolder: {
      type: String,
      required: [
        function () {
          return this.paymentType === "BANK";
        },
        "Please Enter Account Holder Name",
      ],
    },

    bankName: {
      type: String,
      required: [
        function () {
          return this.paymentType === "BANK";
        },
        "Please Enter Bank",
      ],
    },
  },
  { timestamps: true }
);

// Custom error message for validation
paymentDetailsSchema.post("validate", function (error, doc, next) {
  if (error) {
    const errorMessage = Object.values(error.errors)
      .map((err) => err.message)
      .join(",");
    next(new Error(errorMessage.split(",")[0]));
  } else {
    next();
  }
});

export default mongoose.models.PaymentDetail ||
  mongoose.model("PaymentDetail", paymentDetailsSchema);
