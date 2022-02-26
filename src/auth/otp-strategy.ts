import type { IDone, IUser } from '../interfaces';
import { Request } from 'express';
import passportCustom from 'passport-custom';
import { authService } from '../services/auth.service';

export const otpStrategy = new passportCustom.Strategy(function (
  req: Request,
  done: IDone<IUser>,
) {
  const { mobile, otp } = req.body;

  if (!mobile || !otp) {
    return done(new Error('mobile, email, and otp is required'));
  }

  authService.verifyLogin(mobile, otp, done);
});
