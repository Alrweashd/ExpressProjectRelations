const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema({
  name: String,
  relaseDate: Number, //not an array
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

module.exports = mongoose.model("Genre", GenreSchema);
