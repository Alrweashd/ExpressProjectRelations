const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  name: String,
  relaseDate: Number, //not an array

  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  actors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Actor",
    },
  ],
  genres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
  ],
});

module.exports = mongoose.model("Movie", MovieSchema);
