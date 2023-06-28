const express = require("express");
const router = express.Router();
const passport = require("passport");
const uploader = require("../middlewares/uploader");
const {
  signup,
  signin,
  getUsers,
  getMovies,
  createReview,
} = require("./users.controllers");

router.post("/signup", uploader.single("image"), signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

router.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  getMovies
);

router.get("/all", passport.authenticate("jwt", { session: false }), getUsers);

//add review
router.post(
  "/review/:movieId",
  passport.authenticate("jwt", { session: false }),
  createReview
);
//http://localhost:8000/users/*
module.exports = router;
