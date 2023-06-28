const express = require("express");

const router = express.Router();
const passport = require("passport");
// const jwtStrategy = require("jwtStrategy");
const {
  createMovie,
  fetchMovie,
  genreAdd,
  actorAdd,
} = require("./movies.controllers");
router.param("movieId", async (req, res, next, movieId) => {
  const movie = await fetchMovie(movieId, next);
  if (movie) {
    req.movie = movie;
    next();
  } else {
    const err = new Error("Post Not Found");
    err.status = 404;
    next(err);
  }
});

router.post("/", passport.authenticate("jwt", { session: false }), createMovie);

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

//http://localhost:8000/movies/*
module.exports = router;
