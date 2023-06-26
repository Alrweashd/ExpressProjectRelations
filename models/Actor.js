const mongoose = require("mongoose");

const ActorSchema = new mongoose.Schema({
  name: String,
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

module.exports = mongoose.model("Actor", ActorSchema);
