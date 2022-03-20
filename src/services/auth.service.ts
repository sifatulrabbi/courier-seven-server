import type { IUser, IDone, ICreateUserDto, JWTPayload } from "../interfaces";
import { /* convertMobileNumber, */ omitUserData } from "../lib";
import { otpService } from "./otp.service";
import { emailService } from "./email.service";
import { usersService } from "./users.service";
import jwt from "jsonwebtoken";
import { config } from "../configs";

class AuthService {
    async sendVerificationOtp(
        email: string, // using email registration instead of mobile verification
        done: IDone<{ token: string; verificationKey: string }>,
    ) {
        try {
            const otp = await otpService.generateOtp(email);
            if (!otp) return done(new Error("Unable to create token"));

            const sent = await emailService.sendOtpMail(email, otp.token);
            if (!sent) return done(new Error("Unable to send the OPT"));
            done(null, otp);
            console.log(otp.token);
        } catch (err: any) {
            done(err);
        }
    }

    async verifyRegistration(
        data: ICreateUserDto,
        done: IDone<Omit<IUser, "password">>,
    ) {
        if (data.password !== data.confirm_password) {
            done(new Error("Password: passwords don't match"));
            return;
        }
        try {
            const verify = await otpService.verifyOtp(
                data.email, // using email instead of mobile verification
                data.token,
                data.verification_key,
            );
            if (!verify) return done(new Error("Unable to verify user"));
            await usersService.create(data, done);
        } catch (err: unknown) {
            done(err);
        }
    }

    async verifyLocal(
        email: string,
        password: string,
        done: IDone<Omit<IUser, "password">>,
    ) {
        try {
            const user = await usersService.findOne({
                email,
            });
            if (!user) return done(null);
            if (!(await user.comparePassword(password))) {
                return done(new Error("Incorrect password"));
            }
            done(null, omitUserData(user));
        } catch (err: any) {
            done(err);
        }
    }

    async customLogin(user: Omit<IUser, "password">, done: IDone<string>) {
        try {
            const payload = {
                sub: user._id,
                email: user.email,
            };
            const token = jwt.sign(payload, config.JWT_SECRET, {
                expiresIn: config.JWT_MAX_AGE,
            });
            done(null, token);
        } catch (err: any) {
            done(err);
        }
    }

    async verifyJwt(payload: JWTPayload, done: IDone<IUser | false>) {
        try {
            const userId = payload.sub;
            const user = await usersService.findOne({ id: userId });
            if (!user) return done(null, false);
            done(null, user);
        } catch (err) {
            done(err);
        }
    }
}

export const authService = new AuthService();
