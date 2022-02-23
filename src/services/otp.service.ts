import { IDone, IOtp } from "../interfaces";
import { otpModel } from "../models";
import { createHmac } from "crypto";
import { config } from "../configs";
import { totp } from "otplib";
import { hash } from "bcrypt";

class OtpService {
  totpLib = totp;

  constructor() {
    this.totpLib.options = { digits: 6, step: 45 };
  }

  async generateOtp(mobile: string) {
    const secret = await hash(mobile, 10);
    const token = this.totpLib.generate(secret);
    return token;
  }

  async verifyOtp(mobile: string, token: string) {
    const secret = await hash(String(mobile), 10);
    return this.totpLib.verify({ token, secret });
  }
}

export const otpService = new OtpService();
