import type { IUser, IDone } from "../interfaces";
import { usersModel } from "../models";
import { usersService, emailService, otpService } from "../services";

interface IGetOtp {
    mobile: string;
    email: string;
}

interface IRegister {
    mobile: string;
    email: string;
    otp: string;
    hash: string;
}

class AuthService {
    async getOtp({ mobile, email }: IGetOtp, done: IDone<string>) {
        try {
            if (!mobile || !email) {
                done(new Error("mobile email is required"));
                return;
            }

            const otp = await otpService.generateOtp(mobile);
            await emailService.sendOtpMail(email, otp.key);
            done(null, otp.hash);
        } catch (err: any) {
            done(new Error(err.message));
        }
    }

    async register(
        { mobile, email, otp, hash }: IRegister,
        done: IDone<IUser>
    ) {
        try {
            if (!mobile || !email || !otp || !hash) {
                return done(new Error("mobile, email, otp, hash is required"));
            }

            const verify = await otpService.compareOtp(otp, mobile, hash);
            if (!verify) return done(new Error("Unable to verify OTP"));
            usersService.createUser({ mobile, email }, done);
        } catch (err: any) {
            done(new Error(String(err.message)));
        }
    }

    async verifyUser(
        email: string,
        mobile: string,
        otp: string,
        hash: string,
        done: (err: any, user?: IUser | false) => void
    ) {
        try {
            const verify = await otpService.compareOtp(otp, mobile, hash);
            if (!verify) return done(new Error("Unable to verify OTP"));

            usersModel.findOne({ email, mobile }, (err: any, result: IUser) => {
                if (err) return done(new Error(err.message));
                if (!result) {
                    return done(new Error("User not found"), false);
                }
                done(null, result);
            });
        } catch (err) {
            done(err);
        }
    }

    async serializer(user: any, done: IDone<string>) {
        try {
            if (!user) return done(new Error("User not found"));
            done(null, user._id);
        } catch (err) {
            done(err);
        }
    }

    async deserializer(userId: string, done: IDone<IUser>) {
        try {
            usersService.find({ id: userId }, done);
        } catch (err) {
            done(err);
        }
    }
}

export const authService = new AuthService();
