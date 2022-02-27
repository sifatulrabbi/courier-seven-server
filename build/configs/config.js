"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const process_1 = __importDefault(require("process"));
const console_1 = __importDefault(require("console"));
const PROD = process_1.default.env.NODE_ENV === 'production';
function loadEnvFile() {
    if (PROD) {
        return;
    }
    if (fs_1.default.existsSync('.env')) {
        dotenv_1.default.config({ path: '.env' });
    }
    else if (fs_1.default.existsSync('.env.example')) {
        dotenv_1.default.config({ path: '.env.example' });
    }
    else {
        console_1.default.error('ENV file not found');
        process_1.default.exit(1);
    }
}
loadEnvFile();
exports.config = {
    PROD,
    PORT: parseInt(process_1.default.env.PORT || '5000', 10),
    MONGODB_URI: process_1.default.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/courier-007-database',
    SESSION_SECRET: process_1.default.env.SESSION_SECRET || 'KEYBOARD CAT',
    COOKIE_MAX_AGE: parseInt(process_1.default.env.COOKIE_MAX_AGE || '10000', 10),
    SMTP_EMAIL: process_1.default.env.SMTP_EMAIL,
    SMTP_PASSWORD: process_1.default.env.SMTP_PASSWORD,
    OTP_MAX_AGE: parseInt(process_1.default.env.OTP_MAX_AGE || '12000', 10),
    TWILIO_ACCOUNT_SID: process_1.default.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process_1.default.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER: process_1.default.env.TWILIO_PHONE_NUMBER,
    VONAGE_API_KEY: process_1.default.env.VONAGE_API_KEY,
    VONAGE_API_SECRET: process_1.default.env.VONAGE_API_SECRET,
};
