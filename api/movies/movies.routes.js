const express = require("express");

const router = express.Router();
const passport = require("passport");
// const jwtStrategy = require("jwtStrategy");
const {
  createMovie,
  fetchMovie,
  genreAdd,
  actorAdd,
  getMovieById,
  createReview,
  getMovies,
  getReview,
} = require("./movies.controllers");

router.param("movieId", async (req, res, next, movieId) => {
  try {
    const movie = await fetchMovie(movieId);
    if (!movie) return next({ status: 404, message: "movie not found" });
    req.movie = movie;
    next();
  } catch (error) {
    return next(error);
  }
});

router.post("/", passport.authenticate("jwt", { session: false }), createMovie);
router.get("/", passport.authenticate("jwt", { session: false }), getMovies);

//add review
router.post(
  "/:movieId/review",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    console.log("Inside route");
    next();
  },
  createReview
);

//get reviews
router.get(
  "/review",
  passport.authenticate("jwt", { session: false }),
  getReview
);
//for relations
router.put(
  "/:movieId/:actorId",
  passport.authenticate("jwt", { session: false }),
  actorAdd
);

router.post(
  "/:movieId/:genreId",
  passport.authenticate("jwt", { session: false }),
  genreAdd
);
router.get(
  "/:movieId",
  passport.authenticate("jwt", { session: false }),
  getMovieById
);

//http://localhost:8000/movies/*
module.exports = router;
