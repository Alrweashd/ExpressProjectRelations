const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const hashedPassword = require("../utils/auth/hashingPassword");
// const  = async (password) => {
//   const saltRounds = 10;
//   const hashPassword = await bcrypt.hash(password, saltRounds);
//   return hashPassword;
// };

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
  };
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: "5h" });
  console.log(token);
  return token;
};

exports.signin = async (req, res) => {
  try {
    // req.use from passport
    const token = generateToken(req.user);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.signup = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.file.path}`;
    }
    const { password } = req.body;
    req.body.password = await hashedPassword(password);
    const newUser = await User.create(req.body);
    const token = await generateToken(req.body);
    console.log(token);
    console.log(req.body);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (req.user.username === "admin") {
      const users = await User.find();
      res.status(201).json(users);
    }
    //.populate("urls");
    else {
      const err = new Error("you are not admin");
      err.status = 404;
      next(err);
    }
  } catch (err) {
    res.status(500).json("Server Error");
  }
};
