const mongoose = require("mongoose");
const { MONGODB_URI } = require("../configs/config");

async function connectDb() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("unable to connect to the MongoDB", err);
    process.exit(1);
  }
}

module.exports = connectDb;
