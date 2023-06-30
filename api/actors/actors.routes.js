const express = require("express");
const router = express.Router();
const passport = require("passport");
const { createActor, getActors } = require("./actors.controllers");

router.post("/", passport.authenticate("jwt", { session: false }), createActor);

router.get("/", passport.authenticate("jwt", { session: false }), getActors);

//http://localhost:8000/actors/*
module.exports = router;
