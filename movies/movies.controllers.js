const Movie = require("../models/Movie");
const Actor = require("../models/Actor");
const Genre = require("../models/Genre");
const Review = require("../models/Review");
//fetch movie
exports.fetchMovie = async (movieId) => {
  const movie = await Movie.findById(movieId);
  return movie;
};

exports.createMovie = async (req, res, next) => {
  try {
    console.log(req.user);
    if (req.user.isStaff) {
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
    const { actorId } = req.params;
    if (req.user.isStaff) {
      const actor = await Actor.findById(actorId);
      if (!actor) return next({ status: 404, message: "actor not found" });
      //updatedMovie
      await Movie.findByIdAndUpdate(
        req.movie._id,
        {
          $push: { actors: actor._id },
        },
        { runValidators: true }
      );
      //pushing movie id to actor updatedActor
      await Actor.findByIdAndUpdate(
        actorId,
        {
          $push: { movies: req.movie._id },
        },
        { runValidators: true }
      );
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
    if (req.user.isStaff) {
      const genre = await Genre.findById(genreId);
      if (!genre) return next({ status: 404, message: "genre not found" });
      //updatedMovie
      await Movie.findByIdAndUpdate(
        req.movie._id,
        {
          $push: { genres: genre._id },
        },
        { runValidators: true }
      );
      //pushing movie id to Genre updatedGenre
      await Genre.findByIdAndUpdate(
        genreId,
        {
          $push: { movies: req.movie._id },
        },
        { runValidators: true }
      );
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
exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find()
      .populate("actors")
      .populate("genres")
      .populate("reviews")
      .select("-_id -updatedAt -__v");
    console.log(req.user);
    res.status(201).json(movies);
  } catch (err) {
    next(err);
  }
};

exports.getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.movie._id)
      .populate("actors")
      .populate("genres")
      .populate("reviews")
      .select("-_id -updatedAt -__v");
    console.log(req.user);
    res.status(201).json(movie);
  } catch (err) {
    next(err);
  }
};
exports.createReview = async (req, res, next) => {
  try {
    const movieId = req.movie._id;

    if (!req.user.isStaff) {
      let reviewed = false;
      for (let i = 0; i <= req.movie.reviews.length - 1; i++) {
        let { userId } = await Review.findById(req.movie.reviews[i]);
        if (userId.equals(req.user._id)) {
          reviewed = true;
        }
      }
      if (reviewed) {
        const err = new Error(
          `movie '${req.movie.name}' already review by the user '${req.user.username}'`
        );
        err.status = 404;
        next(err);
      }
      // const reviewedByUser = await Review.
      const review = await Review.create({
        ...req.body,
        movieId: movieId,
        userId: req.user._id,
      });
      //const updatedMovie =
      await req.movie.updateOne({
        $push: { reviews: review._id },
      });
      //pushing movie id to actor
      res.status(201).end();
    } else {
      const err = new Error("You arent a user, you cannt post a review");
      err.status = 404;
      next(err);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
exports.getReview = async (req, res, next) => {
  try {
    if (!req.user.isStaff) {
      //find review for a user where userId =  req.user._id
      const review = await Review.find({ userId: req.user._id });
      res.status(200).json(review);
    } else {
      const err = new Error("You arent a user, you cannt post a review");
      err.status = 404;
      next(err);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
