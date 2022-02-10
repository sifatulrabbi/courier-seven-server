import { Schema, model } from "mongoose";
import { IOtp, IOtpModel } from "../interfaces";

const otpSchema = new Schema<IOtp, IOtpModel>({
  key: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  created_at: { type: Date, default: new Date() },
  expires_at: { type: Date },
});

otpSchema.pre("save", function (this: IOtp, next) {
  this.expires_at = new Date(this.created_at.getTime() + 180000);
  next();
});

otpSchema.methods.isValid = function (this: IOtp) {
  const date = new Date();
  return this.expires_at.getTime() > date.getTime();
};

export const otpModel = model<IOtp, IOtpModel>("otp", otpSchema);
