import { Express, Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import { authService } from "../../auth";
import { CustomResponse } from "../../libs";
import { COOKIES } from "../../libs/constants";
import { checkUserMiddleware } from "../middlewares";

const router = Router();

/**
 * @route /get-otp
 * @method POST
 * @controller send otp to the given mobile number
 */
router.route("/get-otp").post((req: Request, res: Response) => {
    const { mobile } = req.body;
    authService.getOtp(mobile, (err, hash) => {
        if (err) {
            CustomResponse.badRequest(res, false, err.message);
            return;
        }
        if (!hash) return CustomResponse.internal(res, false, err.message);
        res.cookie(COOKIES.otpAuth, hash);
        CustomResponse.ok(res, "An OTP has been sent to the email");
    });
});

/**
 * @route /register
 * @method POST
 * @controller gets the otp from the user and verifies it
 */
router.route("/register").post((req: Request, res: Response) => {
    const { mobile, otp } = req.body;
    const hash = req.cookies[COOKIES.otpAuth];
    authService.register({ mobile, otp, hash }, (err, result) => {
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
router
    .route("/login")
    .post(
        passport.authenticate("otp-strategy"),
        (req: Request, res: Response) => {
            if (!req.isAuthenticated()) {
                return CustomResponse.unauthorized(res, false, null);
            }
            CustomResponse.ok(res, "Log in successful", [req.user]);
        }
    )
    .get((req: Request, res: Response) => {
        CustomResponse.ok(res, false, [
            { message: "Enter your email, mobile and otp to login" },
        ]);
    });

/**
 * @route /logout
 * @method POST
 * @controller logout current user and redirect to login
 */
router.route("/logout").post((req: Request, res: Response) => {});

export function userAuthRouter(app: Express) {
    app.use("/api/v1/auth", router);
}
