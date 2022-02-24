import { otpModel } from "../models";
import { hash, compare } from "bcrypt";
const otpGenerator = require("otp-generator");

interface IVerifyObj {
    mobile: string;
    token: string;
    created_at: Date;
    expires_at: Date;
}

class OtpService {
    private addMinutes(date: Date, minutes: number) {
        return new Date(date.getTime() + minutes * 60000);
    }

    private async genVerificationKey(verifyObj: IVerifyObj) {
        const verificationKey = await hash(JSON.stringify(verifyObj), 10);
        return verificationKey;
    }

    private async verifyVerificationKey(verifyObj: IVerifyObj, key: string) {
        const string = JSON.stringify(verifyObj);
        const verify = await compare(string, key);
        return verify;
    }

    async generateOtp(mobile: string) {
        const token: string = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        const created_at = new Date();
        const expires_at = this.addMinutes(created_at, 3);
        const verificationKey = await this.genVerificationKey({
            mobile,
            token,
            created_at,
            expires_at,
        });

        const otpDoc = new otpModel({
            token,
            created_at,
            expires_at,
            verification_key: verificationKey,
        });
        await otpDoc.save();

        return { token, verificationKey };
    }

    async verifyOtp(mobile: string, token: string, key: string) {
        const otpDoc = await otpModel.findOne({ token, key });

        if (!otpDoc) {
            throw new Error("Invalid OTP");
        }
        if (key !== otpDoc.verification_key) {
            throw new Error("Identity error: verification failed");
        }
        if (otpDoc.expires_at.getTime() < new Date().getTime()) {
            console.log(otpDoc.expires_at > new Date());
            throw new Error("OTP invalid");
        }
        if (
            !(await this.verifyVerificationKey(
                {
                    mobile,
                    token,
                    created_at: otpDoc.created_at,
                    expires_at: otpDoc.expires_at,
                },
                key
            ))
        ) {
            return false;
        }

        otpModel.findByIdAndRemove(otpDoc._id);
        return true;
    }
}

export const otpService = new OtpService();
