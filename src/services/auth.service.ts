import type { IUser, IDone } from "../interfaces";
import { convertMobileNumber } from "../libs";
import { usersModel } from "../models";
import { otpService } from "./otp.service";
import { usersService } from "./users.service";

class AuthService {
  verifyMobile(mobile: string) {
    if (mobile.length < 11 || mobile.length > 11 || mobile[0] !== "0") {
      return false;
    }
    return true;
  }

  async verifyUser(
    mobile: string,
    otp: string,
    hash: string,
    done: (err: any, user?: IUser) => void
  ) {
    try {
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
      // usersService.findUser({ id: userId }, done);
    } catch (err) {
      done(err);
    }
  }
}

export const authService = new AuthService();
