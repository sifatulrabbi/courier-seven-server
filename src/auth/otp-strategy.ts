import type { IDone, IUser } from "../interfaces";
import { Request } from "express";
import passportCustom from "passport-custom";
import { authService } from "../services/auth.service";
import { COOKIES } from "../libs/constants";

export const otpStrategy = new passportCustom.Strategy(function (
  req: Request,
  done: IDone<IUser>
) {
  const { mobile, otp } = req.body;
  const hash = req.cookies[COOKIES.otpAuth];

  if (!mobile || !otp) {
    return done(new Error("mobile, email, and otp is required"));
  }

  authService.verifyUser(mobile, otp, hash, done);
});
