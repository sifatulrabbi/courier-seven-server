import { Schema, model } from "mongoose";
import { IOtp } from "../interfaces";

const otpSchema = new Schema<IOtp>({
    token: { type: String, required: true },
    verification_key: { type: String, required: true, unique: true },
    created_at: { type: Date, required: true },
    expires_at: { type: Date, required: true },
});

export const otpModel = model<IOtp>("otp", otpSchema);
