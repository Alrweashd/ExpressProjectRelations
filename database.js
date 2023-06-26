const mongoose = require("mongoose");
require("dotenv").config();
let url = process.env.MONGO_DB_URL;
const connectDB = async () => {
  const conn = await mongoose.connect(url);
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
