const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
  };
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: "5h" });
  console.log(token);
  return token;
};
