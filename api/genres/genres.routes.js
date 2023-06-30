const express = require("express");
const router = express.Router();
const passport = require("passport");
const { createGenre, getGenre } = require("./genres.controllers");

router.post("/", passport.authenticate("jwt", { session: false }), createGenre);

router.get("/", passport.authenticate("jwt", { session: false }), getGenre);

//http://localhost:8000/genres/*
module.exports = router;
