const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  //not an array
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

module.exports = mongoose.model("Genre", GenreSchema);
