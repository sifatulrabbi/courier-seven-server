import type { IUser, IDone, ICreateUserDto, JWTPayload } from "../interfaces";
import { /* convertMobileNumber, */ omitUserData } from "../lib";
import { otpService } from "./otp.service";
import { emailService } from "./email.service";
import { usersService } from "./users.service";

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

    async verifyLogin(
        email: string,
        password: string,
        done: IDone<Omit<IUser, "password">>,
    ) {
        try {
            const user = await usersService.findOne({
                // mobile: convertMobileNumber(mobile),
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

    async serializer(user: unknown, done: IDone<string>) {
        try {
            const data = user as IUser;
            if (!user) return done(new Error("User not found"));
            done(null, data._id);
        } catch (err: any) {
            done(err);
        }
    }

    async deserializer(userId: string, done: IDone<IUser | false>) {
        try {
            if (!userId) return done(null, false);
            const user = await usersService.findOne({ id: userId });
            if (!user) return done(null, false);
            done(null, user);
        } catch (err: unknown) {
            done(err);
        }
    }
}

export const authService = new AuthService();
