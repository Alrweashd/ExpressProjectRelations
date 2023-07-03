const Genre = require("../../models/Genre");
//createGenre
exports.createGenre = async (req, res, next) => {
  try {
    console.log(req.user);
    if (req.user.isStaff) {
      const genre = await Genre.create({
        ...req.body,
        createdBy: req.user._id,
      });
      res.status(201).json(genre);
    } else {
      const err = new Error("You arent a staff member");
      err.status = 404;
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
//find all actors
exports.getGenre = async (req, res, next) => {
  try {
    console.log(req.user);
    if (req.user.isStaff) {
      const genres = await Genre.find();
      res.status(201).json(genres);
    } else {
      const err = new Error("You arent a staff member");
      err.status = 404;
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
