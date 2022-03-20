import { Request, Response, NextFunction } from "express";
import { authService } from "../../services";
import { CustomResponse } from "../../lib";
import { RESPONSES } from "../../lib/constants";
// import { IUser } from '../../interfaces';
// import passport from 'passport';

const { ok, internal, created, unauthorized, badRequest, notFound } =
    CustomResponse;

class AuthController {
    registerGet(req: Request, res: Response, next: NextFunction) {
        // const mobile = convertMobileNumber(req.body.mobile);
        const email = req.body.email; // using email instead of mobile verification
        if (!email)
            return badRequest(
                res,
                "Email address is required",
                "Email address not found",
            );
        authService.sendVerificationOtp(email, (err, otp) => {
            if (err) return next(err);
            if (!otp) return next(new Error("Unable to create OTP"));
            ok(res, RESPONSES.otpSent, [
                {
                    token: otp.token,
                    verification_key: otp.verificationKey,
                },
            ]);
        });
    }

    registerPost(req: Request, res: Response, next: NextFunction) {
        const data = req.body;
        authService.verifyRegistration(data, (err, user) => {
            if (err) return next(err);
            if (!user) {
                return internal(res, "Unable to create user", null);
            }
            created(res, "User registered", [user]);
        });
    }

    loginPost(req: Request, res: Response, next: NextFunction) {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            return badRequest(
                res,
                "Email address and password should be provided",
                "invalid email and password field",
            );
        }
        authService.verifyLogin(email, password, (err, user) => {
            if (err) return next(err);
            if (!user) {
                return notFound(
                    res,
                    "User not found",
                    "not user with the email and password",
                );
            }
            ok(res, "Login successful", [user]);
        });
    }

    loginGet(req: Request, res: Response /*, next: NextFunction */) {
        // const mobile = convertMobileNumber(req.body.mobile);
        // authService.sendVerificationOtp(mobile, (err) => {
        //   if (err) return next(err);
        //   CustomResponse.ok(res, 'OTP sent to the mobile number');
        // });
        unauthorized(res, RESPONSES.loginFailed, null);
    }

    logoutPost(req: Request, res: Response) {
        req.logout();
        ok(res, "Logout successful", []);
    }
}

export const authController = new AuthController();
