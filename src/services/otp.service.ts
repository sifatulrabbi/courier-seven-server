import { IOtp } from "../interfaces";
import { otpModel } from "../models";
import { createHmac } from "crypto";
import { config } from "../configs";

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
            const created_at = new Date();
            const expires_at = new Date(
                created_at.getTime() + config.OTP_MAX_AGE
            );
            const key = this.generateKey();

            const otpDoc = new otpModel({ key, created_at, expires_at });
            const otp = await otpDoc.save();
            console.log("OTP: %s", otp.key);

            const hash = this.hashOtp(mobile, otp);
            return { key: otp.key, hash };
        } catch (err) {
            throw new Error(String(err));
        }
    }

    async compareOtp(otp: string, secret: string, hash: string) {
        const otpObj = await otpModel.findOne({ key: otp });
        if (!otpObj) throw new Error("Invalid OTP");

        const valid = otpObj.expires_at > new Date();
        const otpHash = this.hashOtp(secret, otpObj);

        if (!valid) throw new Error("Your OTP has been expired");
        if (otpHash !== hash) throw new Error("Identity error");

        await otpModel.deleteMany({});
        return true;
    }
}

export const otpService = new OtpService();
