const express = require("express");

const router = express.Router();
const passport = require("passport");
// const jwtStrategy = require("jwtStrategy");
const { createMovie, getMovies, getUsers } = require("./movies.controllers");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createMovie
);
// router.post(
//   "/signin",
//   passport.authenticate("local", { session: false }),
//   signin
// );
// router.get("/all", getMovies);
//http://localhost:8000/user/*
module.exports = router;
