const Movie = require("../models/Movie");
const Actor = require("../models/Actor");
const Genre = require("../models/Genre");

//fetch movie
exports.fetchMovie = async (movieId) => {
  const movie = await Movie.findById(movieId);
  return movie;
};

exports.createMovie = async (req, res, next) => {
  try {
    console.log(req.user);
    if (req.user.isStaff === true) {
      //req.user._id from the token
      console.log("heree", req.user);
      const movie = await Movie.create(req.body);
      res.status(201).json(movie);
    } else {
      const err = new Error("You arent a staff member");
      err.status = 404;
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

exports.actorAdd = async (req, res, next) => {
  try {
    console.log(actorId);
    const { actorId } = req.params;
    if (req.user.isStaff === true) {
      const actor = await Actor.findById(actorId);
      if (!actor) return next({ status: 404, message: "actor not found" });
      const updatedMovie = await Movie.findByIdAndUpdate(req.movie._id, {
        $push: { actors: actor._id },
      });
      //pushing movie id to actor
      const updatedActor = await Actor.findByIdAndUpdate(actorId, {
        $push: { movies: req.movie._id },
      });
      res.status(201).end();
    } else {
      const err = new Error("You arent a staff member");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
exports.genreAdd = async (req, res, next) => {
  try {
    //you cannot add a tag without having a post before hand
    const { genreId } = req.params;
    console.log(req.user);
    if (req.user.isStaff === true) {
      const genre = await Genre.findById(genreId);
      if (!genre) return next({ status: 404, message: "genre not found" });
      const updatedMovie = await Movie.findByIdAndUpdate(req.movie._id, {
        $push: { genres: genre._id },
      });

      //pushing movie id to Genre
      const updatedGenre = await Genre.findByIdAndUpdate(genreId, {
        $push: { movies: req.movie._id },
      });
      res.status(201).end();
    } else {
      const err = new Error("You arent a staff member");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
