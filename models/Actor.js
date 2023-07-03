const mongoose = require("mongoose");

const ActorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Actor", ActorSchema);
