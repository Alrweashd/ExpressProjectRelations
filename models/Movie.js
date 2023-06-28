const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    name: String,
    relaseDate: String, //not an array

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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
