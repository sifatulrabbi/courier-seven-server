"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpStrategy = void 0;
const passport_custom_1 = __importDefault(require("passport-custom"));
const auth_service_1 = require("../services/auth.service");
exports.otpStrategy = new passport_custom_1.default.Strategy(function (req, done) {
    const { mobile, otp } = req.body;
    if (!mobile || !otp) {
        return done(new Error('mobile, email, and otp is required'));
    }
    auth_service_1.authService.verifyLogin(mobile, otp, done);
});
