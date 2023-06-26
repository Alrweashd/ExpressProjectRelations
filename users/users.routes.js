const express = require("express");

const router = express.Router();
const passport = require("passport");
// const jwtStrategy = require("jwtStrategy");
const { signup, signin, getUsers } = require("./users.controllers");

router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.get("/all", getUsers);
//http://localhost:8000/user/*
module.exports = router;
