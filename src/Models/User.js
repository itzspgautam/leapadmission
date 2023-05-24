import mongoose from "mongoose";

function generateUniqueID() {
  const alphanumeric = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let id = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * alphanumeric.length);
    id += alphanumeric[randomIndex];
  }
  return id;
}

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: [50, "Please enter valid name"],
      minLength: [4, "Please enter valid name"],
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (value) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
        },
        message: "Please enter a valid email",
      },
    },
    phone: {
      type: String,
      unique: true,
      validate: {
        validator: function (value) {
          // Regular expression for phone number validation
          return /^\+?[0-9]{1,3}[ ]?\(?[0-9]{1,3}\)?[ ]?[0-9]{3}[ ]?[0-9]{4}$/.test(
            value
          );
        },
        message: "Please enter valid phone number",
      },
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

// Generate a unique 6-digit alphanumeric userId
UserSchema.pre("save", async function (next) {
  try {
    const uniqueId = generateUniqueID();

    // Check if the userId already exists in the database
    const existingUser = await this.constructor.findOne({ userId: uniqueId });
    // If the userId exists, generate a new one
    if (existingUser) {
      generateUniqueID();
    } else {
      this.userId = uniqueId;
      next();
    }
  } catch (error) {
    next(error);
  }
});

// Custom error message for validation
UserSchema.post("validate", function (error, doc, next) {
  if (error) {
    const errorMessage = Object.values(error.errors)
      .map((err) => err.message)
      .join(",");
    next(new Error(errorMessage.split(",")[0]));
  } else {
    next();
  }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
