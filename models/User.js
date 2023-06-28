const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  image: { type: String },
  isStaff: { type: Boolean, default: false }, // true => can create genre, movie, actors
});

module.exports = mongoose.model("User", UserSchema);
