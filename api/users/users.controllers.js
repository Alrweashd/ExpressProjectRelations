const User = require("../../models/User");
const Movie = require("../../models/Movie");

const hashedPassword = require("../../utils/auth/hashingPassword");
const generateToken = require("../../utils/auth/generateToken");

exports.signin = async (req, res, next) => {
  try {
    // req.use from passport
    const token = generateToken(req.user);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    console.log(req.body);
    if (req.file) {
      req.body.image = `${req.file.path}`;
    }
    const { password } = req.body;
    if (
      !password ||
      !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    ) {
      return next({
        message:
          "Minimum eight characters, at least one uppercase letter, one lowercase letter, and one number",
        status: 400,
      });
    }
    req.body.password = await hashedPassword(password);
    req.body.isStaff = false;
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    console.log(req.user);
    if (req.user.username === "admin") {
      const users = await User.find();
      res.status(201).json(users);
    } else {
      const err = new Error("you are not admin");
      err.status = 404;
      next(err);
    }
  } catch (err) {
    res.status(500).json("Server Error");
  }
};
exports.deleteUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (req.user.username === "admin") {
      const user = await User.findById({ _id: userId });
      if (!user) return next({ status: 404, message: "User doesn't exist" });

      await User.deleteOne({ _id: userId });
      res.status(201).json({
        message: `User with username: ${user.username} has been deleted successfully!!`,
      });
    } else {
      next({ status: 404, message: "You aren't an admin" });
    }
  } catch (error) {
    next(error);
  }
};
