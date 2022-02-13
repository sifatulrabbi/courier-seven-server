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
  const done: IDone<IUser> = (err: any, user?: IUser) => {
    if (err) {
      return CustomResponse.badRequest(res, "Unable to register", err.message);
    }
    CustomResponse.ok(res, "And OTP was sent to the mobile number");
  };

  const { mobile, email } = req.body;
  usersService.register({ mobile, email }, done);
});
// router.post(
//   "/register",
//   checkUserMiddleware,
//   async (req: Request, res: Response) => {
//     try {
//       const { mobile, email } = req.body;
//       if (!mobile || !email) {
//         CustomResponse.badRequest(res, "Mobile and Email required", null);
//       }

//       const convertedMobile = convertMobileNumber(mobile);
//       const { hash, key } = await otpService.generateOtp(convertedMobile);

//       res.cookie(COOKIES.otpAuth, hash, {
//         maxAge: config.COOKIE_MAX_AGE,
//       });
//       emailService.sendOtpMail(email, key);
//       // messageService.sendOtp(mobile, key);
//       CustomResponse.ok(res, "An OTP has been sent to the mobile number");
//     } catch (err: any) {
//       CustomResponse.internal(res, false, err.message);
//     }
//   }
// );

/**
 * @route /register
 * @method POST
 * @controller gets the otp from the user and verifies it
 */
router.post("/register", (req: Request, res: Response) => {
  const done: IDone<IUser> = (err, result) => {
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
  };

  const { mobile, email, otp } = req.body;
  const hash = req.cookies[COOKIES.otpAuth];
  authService.register({ mobile, email, otp, hash }, done);
});
// router.post("/otp", async (req: Request, res: Response) => {
//   try {
//     const hash = req.cookies[COOKIES.otpAuth];
//     const { mobile, email, otp } = req.body;

//     const compare = await otpService.compareOtp(otp, mobile, hash);
//     if (!compare) return CustomResponse.unauthorized(res, "OTP invalid", null);

//     res.clearCookie(COOKIES.otpAuth, { path: "/" });
//     const user = await usersService.register({ mobile, email });
//     CustomResponse.ok(res, "User registered", [user]);
//   } catch (err: any) {
//     CustomResponse.unauthorized(res, false, err.message);
//   }
// });

/**
 * @route /login
 * @method POST
 * @controller login user and redirect to user profile
 */
// router.post(
//   "/login",
//   passport.authenticate("local"),
//   (req: Request, res: Response, next: NextFunction) => {
//     CustomResponse.ok(res, "Authenticated", [req.user]);
//   }
// );

/**
 * @route /logout
 * @method POST
 * @controller logout current user and redirect to login
 */
// router.post("/logout", (req: Request, res: Response, next: NextFunction) => {
//   req.logOut();
//   CustomResponse.ok(res, "Logout successful");
// });

export function userAuthRouter(app: Express) {
  app.use("/api/v1/auth", router);
}
