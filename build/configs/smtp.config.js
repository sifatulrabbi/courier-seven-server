"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transportConfig = void 0;
const config_1 = require("./config");
const console_1 = __importDefault(require("console"));
const process_1 = __importDefault(require("process"));
if (!config_1.config.SMTP_EMAIL || !config_1.config.SMTP_PASSWORD) {
    console_1.default.error('SMTP email and SMTP password required');
    process_1.default.exit(1);
}
exports.transportConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config_1.config.SMTP_EMAIL,
        pass: config_1.config.SMTP_PASSWORD,
    },
};
