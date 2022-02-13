import { Schema, model } from "mongoose";
import { IOtp, IOtpModel } from "../interfaces";

const otpSchema = new Schema<IOtp, IOtpModel>({
    key: { type: String, required: true, unique: true },
    created_at: { type: Date, required: true },
    expires_at: { type: Date, required: true },
});

export const otpModel = model<IOtp, IOtpModel>("otp", otpSchema);
