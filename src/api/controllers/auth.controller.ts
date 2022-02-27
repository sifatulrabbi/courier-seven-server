import { Express, Router } from 'express';
import passport from 'passport';
import { authService } from '../../services';
import { convertMobileNumber, CustomResponse } from '../../lib';
import { checkUserMiddleware, verifyMobileMiddleware } from '../middlewares';
import { IUser } from '../../interfaces';

const router = Router();

router
  .route('/register')
  // send registration otp to the user
  .get(verifyMobileMiddleware, checkUserMiddleware, async (req, res) => {
    const mobile = convertMobileNumber(req.body.mobile);

    await authService.sendVerificationOtp(mobile, (err, otp) => {
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
  })
  // create user account with all the information
  .post(verifyMobileMiddleware, checkUserMiddleware, async (req, res) => {
    const data = req.body;
    data.mobile = convertMobileNumber(req.body.mobile);

    authService.verifyRegistration(data, (err, user) => {
      if (err) return CustomResponse.badRequest(res, err.message, err);
      if (!user) {
        return CustomResponse.internal(res, 'Unable to create user', null);
      }

      CustomResponse.created(res, 'User registered', [user]);
    });
  });

router
  .route('/login')
  .get(verifyMobileMiddleware, (req, res) => {
    // const mobile = convertMobileNumber(req.body.mobile);
    // authService.sendVerificationOtp(mobile, (err) => {
    //   if (err) return CustomResponse.badRequest(res, err.message, err);
    //   CustomResponse.ok(res, "OTP sent to the mobile number");
    // });
    CustomResponse.unauthorized(res, 'User mobile and password to login', null);
  })

  // login
  .post(
    verifyMobileMiddleware,
    passport.authenticate('local', { failureRedirect: '/api/auth/login' }),
    (req, res) => {
      if (!req.isAuthenticated()) {
        return CustomResponse.unauthorized(
          res,
          'Use mobile and password to login',
          null,
        );
      }
      const user = req.user as IUser;
      res.redirect(`/api/v1/users/${user._id}`);
    },
  );

export function useAuthRouter(app: Express) {
  app.use('/api/v1/auth', router);
}
