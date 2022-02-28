import { Request, Response } from 'express';
import { authService } from '../../services';
import { convertMobileNumber, CustomResponse } from '../../lib';
import { IUser } from '../../interfaces';

class AuthController {
  registerGet(req: Request, res: Response) {
    const mobile = convertMobileNumber(req.body.mobile);

    authService.sendVerificationOtp(mobile, (err, otp) => {
      if (err) return CustomResponse.badRequest(res, err.message, err);
      if (!otp)
        return CustomResponse.badRequest(res, 'Unable to create OTP', null);

      CustomResponse.ok(res, 'OTP sent to the mobile number', [
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
        return CustomResponse.internal(res, 'Unable to create user', null);
      }

      CustomResponse.created(res, 'User registered', [user]);
    });
  }

  loginPost(req: Request, res: Response) {
    const data = req.body;
    data.mobile = convertMobileNumber(req.body.mobile);

    authService.verifyRegistration(data, (err, user) => {
      if (err) return CustomResponse.badRequest(res, err.message, err);
      if (!user) {
        return CustomResponse.internal(res, 'Unable to create user', null);
      }

      CustomResponse.created(res, 'User registered', [user]);
    });
  }

  loginGet(req: Request, res: Response) {
    // const mobile = convertMobileNumber(req.body.mobile);
    // authService.sendVerificationOtp(mobile, (err) => {
    //   if (err) return CustomResponse.badRequest(res, err.message, err);
    //   CustomResponse.ok(res, "OTP sent to the mobile number");
    // });
    CustomResponse.unauthorized(res, 'User mobile and password to login', null);
  }

  logoutPost(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      return CustomResponse.unauthorized(
        res,
        'Use mobile and password to login',
        null,
      );
    }
    const user = req.user as IUser;
    res.redirect(`/api/v1/users/${user._id}`);
  }
}

export const authController = new AuthController();
