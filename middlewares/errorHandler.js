const mongoose = require("mongoose");

const errorHandler = (err, req, res, next) => {
  return res
    .status(err.status || 500)
    .json({ message: err.message } || { message: "Internal Server Error" });
};
module.exports = errorHandler;
