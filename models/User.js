const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  image: { type: String },
  isStaff: { type: Boolean, required: true }, // true => can create genre, movie, actors
  // urls: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Url',
  //   },
  // ],
});

module.exports = mongoose.model("User", UserSchema);
