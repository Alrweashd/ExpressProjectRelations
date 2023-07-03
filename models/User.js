const mongoose = require("mongoose");
const validator = require("validator");
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Please enter a correct email",
    },
    required: true,
    unique: true,
  },
  image: { type: String },
  isStaff: { type: Boolean, default: false }, // true => can create genre, movie, actors
  isAdmin: { type: Boolean, default: false },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
