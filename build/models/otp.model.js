"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpModel = void 0;
const mongoose_1 = require("mongoose");
const otpSchema = new mongoose_1.Schema({
    token: { type: String, required: true },
    verification_key: { type: String, required: true, unique: true },
    created_at: { type: Date, required: true },
    expires_at: { type: Date, required: true },
});
exports.otpModel = (0, mongoose_1.model)('otp', otpSchema);
