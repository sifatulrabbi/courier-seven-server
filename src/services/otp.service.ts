import { IOtp } from "../interfaces";
import { otpModel } from "../models";
import { createHmac } from "crypto";

class OtpService {
  private hashOtp(secret: string, otp: IOtp): string {
    const hash = createHmac("sha256", secret)
      .update(
        String({
          _id: otp._id,
          key: otp.key,
          created_at: otp.created_at,
          expiries_at: otp.expires_at,
        })
      )
      .digest("hex");
    return hash;
  }

  private generateKey(): string {
    const numbers = "0123456789";
    let key: string = "";

    for (let i = 0; i < 6; i++) {
      key = key + numbers[Math.floor(Math.random() * numbers.length)];
    }
    return key;
  }

  async generateOtp(mobile: string) {
    try {
      const otpDoc = new otpModel({ key: this.generateKey(), mobile });
      const otp = await otpDoc.save();
      console.log("OTP key is %s", otp.key);

      const hash = this.hashOtp(mobile, otp);
      return hash;
    } catch (err) {
      throw new Error(String(err));
    }
  }

  async compareOtp(otp: string, mobile: string, hash: string) {
    const otpObj = await otpModel.findOne({ otp });
    if (!otpObj) return false;

    const otpHash = this.hashOtp(mobile, otpObj);

    if (!otpObj.isValid()) return false;
    if (otpHash !== hash) return false;

    await otpModel.deleteMany({});
    return true;
  }
}

export const otpService = new OtpService();
