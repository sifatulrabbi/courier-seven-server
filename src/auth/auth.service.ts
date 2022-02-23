import type { IUser, IDone } from "../interfaces";
import { usersModel } from "../models";
import { usersService, emailService, otpService } from "../services";

interface IGetOtp {
  mobile: string;
  email: string;
}

interface IRegister {
  mobile: string;
  first_name: string;
  last_name: string;
  otp: string;
  hash: string;
}

class AuthService {
  async getOtp(mobile: string, done: IDone<string>) {
    try {
      const otp = await otpService.generateOtp(mobile);
      done(null, otp.hash);
    } catch (err: any) {
      done(err);
    }
  }

  async register(
    { mobile, first_name, last_name, otp, hash }: IRegister,
    done: IDone<IUser>
  ) {
    if (!mobile || !otp || !hash) {
      return done(new Error("mobile, email, otp, hash is required"));
    }

    try {
      await otpService.compareOtp(otp, mobile, hash, (err, success) => {
        if (err) return done(err);
        if (!success) return done(new Error("Unable to verify OTP"));
        usersService.createUser({ mobile, first_name, last_name }, done);
      });
    } catch (err: any) {
      done(err);
    }
  }

  async verifyUser(
    mobile: string,
    otp: string,
    hash: string,
    done: (err: any, user?: IUser | false) => void
  ) {
    try {
      await otpService.compareOtp(otp, mobile, hash, (err, success) => {
        if (err) return done(err);
        if (!success) return done(new Error("Unable to verify OTP"));

        usersModel.findOne({ mobile }, (err: any, user?: IUser) => {
          if (err) return done(err);
          if (!user) {
            return done(new Error("User not found"), false);
          }
          done(null, user);
        });
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
      usersService.findUser({ id: userId }, done);
    } catch (err) {
      done(err);
    }
  }
}

export const authService = new AuthService();
