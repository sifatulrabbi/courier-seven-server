import { Express, Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import { authService } from "../../auth";
import { config } from "../../configs";
import type { IDone, IUser } from "../../interfaces";
import { CustomResponse, convertMobileNumber } from "../../libs";
import { COOKIES } from "../../libs/constants";
import {
    otpService,
    emailService,
    usersService,
    messageService,
} from "../../services";
import { checkUserMiddleware } from "../middlewares";

const router = Router();

/**
 * @route /get-otp
 * @method POST
 * @controller send otp to the given mobile number
 */
router.post("/get-otp", checkUserMiddleware, (req: Request, res: Response) => {
    const { mobile, email } = req.body;
    authService.getOtp({ mobile, email }, (err, hash) => {
        if (err) {
            return CustomResponse.badRequest(res, false, err.message);
        }
        if (!hash) return CustomResponse.internal(res, false, null);
        res.cookie(COOKIES.otpAuth, hash);
        CustomResponse.ok(res, "An OTP has been sent to the email");
    });
});

/**
 * @route /register
 * @method POST
 * @controller gets the otp from the user and verifies it
 */
router.post("/register", (req: Request, res: Response) => {
    const { mobile, email, otp } = req.body;
    const hash = req.cookies[COOKIES.otpAuth];
    authService.register({ mobile, email, otp, hash }, (err, result) => {
        if (err) {
            return CustomResponse.badRequest(
                res,
                "Unable to register user",
                err.message
            );
        }

        if (!result) {
            return CustomResponse.notFound(
                res,
                "Unable to register user",
                err.message
            );
        }

        CustomResponse.created(res, "User registered", [result]);
    });
});

/**
 * @route /login
 * @method POST
 * @controller login user and redirect to user profile
 */

/**
 * @route /logout
 * @method POST
 * @controller logout current user and redirect to login
 */

export function userAuthRouter(app: Express) {
    app.use("/api/v1/auth", router);
}
