const User = require("../models/User");
const Movie = require("../models/Movie");
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
    req.body.password = await hashedPassword(password);
    req.body.isStaff = false;
    const newUser = await User.create(req.body, { isValidate: true });
    const token = generateToken(req.body);
    console.log(token);
    console.log(req.body);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
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
    const movies = await Movie.find().populate("actors").populate("genres");
    console.log(req.user);
    res.status(201).json(movies);
  } catch (err) {
    next(err);
  }
};
//createReview if isStaff false. reviewAdd to movie, movieId to review
