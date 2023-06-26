const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  textReview: String,
  rating: Number, //not an array
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
