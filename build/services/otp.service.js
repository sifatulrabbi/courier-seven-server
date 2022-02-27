"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpService = void 0;
const models_1 = require("../models");
const bcrypt_1 = require("bcrypt");
const otp_generator_1 = __importDefault(require("otp-generator"));
class OtpService {
    addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    }
    async genVerificationKey(verifyObj) {
        const verificationKey = await bcrypt_1.hash(JSON.stringify(verifyObj), 10);
        return verificationKey;
    }
    async verifyVerificationKey(verifyObj, key) {
        const string = JSON.stringify(verifyObj);
        const verify = await bcrypt_1.compare(string, key);
        return verify;
    }
    async generateOtp(mobile) {
        const token = otp_generator_1.default.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const created_at = new Date();
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const expires_at = this.addMinutes(created_at, 3);
        const verificationKey = await this.genVerificationKey({
            mobile,
            token,
            created_at,
            expires_at,
        });
        const otpDoc = new models_1.otpModel({
            token,
            created_at,
            expires_at,
            verification_key: verificationKey,
        });
        await otpDoc.save();
        return { token, verificationKey };
    }
    async verifyOtp(mobile, token, key) {
        const otpDoc = await models_1.otpModel.findOne({ token, key });
        if (!otpDoc) {
            throw new Error('Invalid OTP');
        }
        if (key !== otpDoc.verification_key) {
            throw new Error('Identity error: verification failed');
        }
        if (otpDoc.expires_at.getTime() < new Date().getTime()) {
            throw new Error('OTP invalid');
        }
        if (!(await this.verifyVerificationKey({
            mobile,
            token,
            created_at: otpDoc.created_at,
            expires_at: otpDoc.expires_at,
        }, key))) {
            return false;
        }
        models_1.otpModel.findByIdAndRemove(otpDoc._id);
        return true;
    }
}
exports.otpService = new OtpService();
