import { Request, Response } from 'express';
import { authService } from '../../services';
import { convertMobileNumber, CustomResponse } from '../../lib';
import { IUser } from '../../interfaces';
import { RESPONSES } from '../../lib/constants';
import passport from 'passport';

const { ok, badRequest, internal, created } = CustomResponse;

class AuthController {
  registerGet(req: Request, res: Response) {
    // const mobile = convertMobileNumber(req.body.mobile);
    const email = req.body.email; // using email instead of mobile verification

    authService.sendVerificationOtp(email, (err, otp) => {
      if (err) return CustomResponse.badRequest(res, err.message, err);
      if (!otp) return badRequest(res, 'Unable to create OTP', null);

      ok(res, RESPONSES.otpSent, [
        {
          token: otp.token,
          verification_key: otp.verificationKey,
        },
      ]);
    });
  }

  registerPost(req: Request, res: Response) {
    const data = req.body;
    data.mobile = convertMobileNumber(req.body.mobile);

    authService.verifyRegistration(data, (err, user) => {
      if (err) return CustomResponse.badRequest(res, err.message, err);
      if (!user) {
        return internal(res, 'Unable to create user', null);
      }

      created(res, 'User registered', [user]);
    });
  }

  loginPost(req: Request, res: Response) {
    const authRet = passport.authenticate('local');
    authRet(req, res, (err: any) => {
      if (err) return badRequest(res, err.message, err);

      if (!req.isAuthenticated()) {
        return CustomResponse.unauthorized(res, RESPONSES.loginFailed, null);
      }

      const user = req.user as IUser;
      ok(res, 'Login successful', [user]);
    });
  }

  loginGet(req: Request, res: Response) {
    // const mobile = convertMobileNumber(req.body.mobile);
    // authService.sendVerificationOtp(mobile, (err) => {
    //   if (err) return CustomResponse.badRequest(res, err.message, err);
    //   CustomResponse.ok(res, "OTP sent to the mobile number");
    // });

    CustomResponse.unauthorized(res, RESPONSES.loginFailed, null);
  }

  logoutPost(req: Request, res: Response) {
    req.logout();
    ok(res, 'Logout successful', []);
  }
}

export const authController = new AuthController();
