const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  image: String,
  isStaff: Boolean, // true => can create genre, movie, actors
  // urls: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Url',
  //   },
  // ],
});

module.exports = mongoose.model("User", UserSchema);
