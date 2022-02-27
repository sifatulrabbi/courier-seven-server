"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const lib_1 = require("../lib");
const otp_service_1 = require("./otp.service");
const users_service_1 = require("./users.service");
const console_1 = __importDefault(require("console"));
class AuthService {
    async sendVerificationOtp(mobile, done) {
        try {
            const otp = await otp_service_1.otpService.generateOtp(mobile);
            if (!otp)
                return done(new Error('Unable to create token'));
            done(null, otp);
            console_1.default.log(otp.token);
        }
        catch (err) {
            done(err);
        }
    }
    async verifyRegistration(data, done) {
        if (data.password !== data.confirm_password) {
            done(new Error("Password: passwords don't match"));
            return;
        }
        try {
            const verify = await otp_service_1.otpService.verifyOtp(data.mobile, data.token, data.verification_key);
            if (!verify)
                return done(new Error('Unable to verify user'));
            await users_service_1.usersService.create(data, done);
        }
        catch (err) {
            done(err);
        }
    }
    async verifyLogin(mobile, password, done) {
        try {
            const user = await users_service_1.usersService.findOne({
                mobile: (0, lib_1.convertMobileNumber)(mobile),
            });
            if (!user)
                return done(null);
            if (!(await user.comparePassword(password))) {
                return done(new Error('Incorrect password'));
            }
            done(null, user);
        }
        catch (err) {
            done(err);
        }
    }
    async serializer(user, done) {
        try {
            const data = user;
            if (!user)
                return done(new Error('User not found'));
            done(null, data._id);
        }
        catch (err) {
            done(err);
        }
    }
    async deserializer(userId, done) {
        try {
            if (!userId)
                return done(null, false);
            const user = await users_service_1.usersService.findOne({ id: userId });
            if (!user)
                return done(null);
            done(null, user);
        }
        catch (err) {
            done(err);
        }
    }
}
exports.authService = new AuthService();
