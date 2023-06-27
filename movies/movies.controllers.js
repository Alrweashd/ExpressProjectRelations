const Movie = require("../models/Movie");

exports.createMovie = async (req, res, next) => {
  // create url code

  try {
    // const movie = await Movie.findOne({ urlCode: req.params.code });
    console.log(req.user);
    // console.log(req.user.isStaff);
    if (req.user.isStaff === true) {
      //req.user._id from the token
      console.log("heree", req.user);
      const movie = await Movie.create(req.body);
      res.status(201).json(movie);
    } else {
      return res.status(404).json("You arent a staff member");
    }
  } catch (err) {
    next(err);
  }
};
