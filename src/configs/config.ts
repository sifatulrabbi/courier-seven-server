import fs from "fs";
import dotenv from "dotenv";

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

export const config = {
  PROD,
  PORT: parseInt(process.env.PORT || "5000", 10),
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/courier-007-database",
  SESSION_SECRET: process.env.SESSION_SECRET || "KEYBOARD CAT",
  COOKIE_MAX_AGE: parseInt(process.env.COOKIE_MAX_AGE || "10000", 10),
  SMTP_EMAIL: process.env.SMTP_EMAIL,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  OTP_MAX_AGE: parseInt(process.env.OTP_MAX_AGE || "12000", 10),
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
  VONAGE_API_KEY: process.env.VONAGE_API_KEY,
  VONAGE_API_SECRET: process.env.VONAGE_API_SECRET,
};
