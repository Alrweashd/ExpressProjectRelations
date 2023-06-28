const User = require("../models/User");
const Movie = require("../models/Movie");
const Review = require("../models/Review");
const hashedPassword = require("../utils/auth/hashingPassword");
const generateToken = require("../utils/auth/generateToken");

exports.signin = async (req, res, next) => {
  try {
    // req.use from passport
    const token = generateToken(req.user);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    console.log(req.body);
    if (req.file) {
      req.body.image = `${req.file.path}`;
    }
    const { password } = req.body;
    if (
      !password ||
      !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    ) {
      return next({
        message:
          "Minimum eight characters, at least one uppercase letter, one lowercase letter, and one number",
        status: 400,
      });
    }
    req.body.password = await hashedPassword(password);
    req.body.isStaff = false;
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    console.log(req.user);
    if (req.user.username === "admin") {
      const users = await User.find();
      res.status(201).json(users);
    } else {
      const err = new Error("you are not admin");
      err.status = 404;
      next(err);
    }
  } catch (err) {
    res.status(500).json("Server Error");
  }
};
exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find()
      .populate("actors")
      .populate("genres")
      .populate("reviews");
    console.log(req.user);
    res.status(201).json(movies);
  } catch (err) {
    next(err);
  }
};
exports.createReview = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    if (req.user.isStaff === false) {
      const movie = await Movie.findById(movieId);
      if (!movie) return next({ status: 404, message: "movie not found" });
      const review = await Review.create({
        ...req.body,
        movieId: movieId,
        userId: req.user._id,
      });
      //const updatedMovie =
      await Movie.findByIdAndUpdate(movieId, {
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
    next(err);
  }
};
//createReview if isStaff false. reviewAdd to movie, movieId to review
