const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  textReview: { type: String },
  rating: { type: Number, min: 0, max: 10, default: 0 }, //not an array
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
