const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    relaseDate: { type: String, required: true }, //not an array

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
