const fs = require("fs");
const dotenv = require("dotenv");

const PROD = process.env.NODE_ENV === "production";

function loadEnvFile() {
  if (PROD) {
    return;
  }

  if (fs.existsSync(".env")) {
    dotenv.config({ path: ".env" });
  } else if (fs.existsSync(".env.example")) {
    dotenv.config({ path: ".env.example" });
  } else {
    console.error("ENV file not found");
    process.exit(1);
  }
}
loadEnvFile();

module.exports = {
  PROD,
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  SESSION_SECRET: process.env.SESSION_SECRET,
  COOKIE_MAX_AGE: process.env.COOKIE_MAX_AGE,
};
