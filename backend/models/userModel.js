const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female", "transgender"],
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userModel);
module.exports = User;
