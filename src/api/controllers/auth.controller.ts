import { Request, Response, NextFunction } from "express";
import { authService } from "../../services";
import { CustomResponse } from "../../lib";
import { RESPONSES } from "../../lib/constants";
import passport from "passport";
import { IUser } from "../../interfaces";

const { ok, internal, created, unauthorized, badRequest } = CustomResponse;

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
        passport.authenticate(
            "local",
            { session: false },
            (err: any, user: Omit<IUser, "password">) => {
                if (err) {
                    return unauthorized(res, err.message, err);
                }

                req.login(user, (error: any) => {
                    if (error) return unauthorized(res, error.message, error);
                    authService.customLogin(user, (e, token) => {
                        if (e) return internal(res, e.message, e);
                        if (!token) return internal(res, false, null);
                        ok(res, "Login successful", [{ token }]);
                    });
                });
            },
        )(req, res, next);
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
