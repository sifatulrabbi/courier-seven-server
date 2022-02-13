import type { IUser, IDone } from "../interfaces";
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
            if (!mobile || !email)
                return done(new Error("mobile email is required"));
            const otp = await otpService.generateOtp(mobile);
            await emailService.sendOtpMail(email, otp.key);
            done(null, "And OTP has been sent to the email");
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
        done: (
            err: any,
            user?: IUser | false,
            info?: { message: string }
        ) => void
    ) {}

    async serializer(user: any, done: IDone<string>) {}

    async deserializer(userId: string, done: IDone<IUser>) {}
}

export const authService = new AuthService();
