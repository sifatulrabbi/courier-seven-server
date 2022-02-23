import type { IUser } from "../interfaces";
import { Request } from "express";
import passportCustom from "passport-custom";
import { authService } from "./auth.service";
import { COOKIES } from "../libs/constants";

export const otpStrategy = new passportCustom.Strategy(function (
  req: Request,
  done: (err: any, user?: IUser | false) => void
) {
  const { mobile, email, otp } = req.body;
  const hash = req.cookies[COOKIES.otpAuth];

  if (!mobile || !email || !otp) {
    return done(new Error("mobile, email, and otp is required"));
  }

  authService.verifyUser(email, mobile, otp, hash, done);
});
