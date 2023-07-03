const Actor = require("../../models/Actor");
//createActor post
exports.createActor = async (req, res, next) => {
  try {
    //console.log(req.user);
    if (req.user.isStaff) {
      const actor = await Actor.create({
        ...req.body,
        createdBy: req.user._id,
      });
      res.status(201).json(actor);
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
exports.getActors = async (req, res, next) => {
  try {
    //console.log(req.user);
    if (req.user.isStaff) {
      const actors = await Actor.find();
      res.status(201).json(actors);
    } else {
      const err = new Error("You arent a staff member");
      err.status = 404;
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
