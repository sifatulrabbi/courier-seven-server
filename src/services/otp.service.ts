import { otpModel } from "../models";
import { hash, compare } from "bcrypt";
import otpGenerator from "otp-generator";

interface IVerifyObj {
    email: string; // using email instead of mobile verification
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

    async generateOtp(
        email: string /* using email instead of mobile verification */,
    ) {
        const token: string = otpGenerator.generate(6, {
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
            email,
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

    async verifyOtp(
        email: string /* using email instead of mobile verification */,
        token: string,
        key: string,
    ) {
        console.log(email, token, key);
        const otpDoc = await otpModel.findOne({
            token,
            key: String(key),
        });
        if (!otpDoc) {
            throw new Error("Invalid OTP");
        }
        if (key !== otpDoc.verification_key) {
            throw new Error("Identity error: verification failed");
        }
        if (otpDoc.expires_at.getTime() < new Date().getTime()) {
            throw new Error("OTP invalid");
        }
        if (
            !(await this.verifyVerificationKey(
                {
                    email, // using email instead of mobile verification
                    token,
                    created_at: otpDoc.created_at,
                    expires_at: otpDoc.expires_at,
                },
                key,
            ))
        ) {
            return false;
        }
        otpModel.findByIdAndRemove(otpDoc._id);
        return true;
    }
}

export const otpService = new OtpService();
