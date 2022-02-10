import { Express, Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import { config } from "../../configs";
import { CustomResponse } from "../../libs";
import { otpService } from "../../services";

const router = Router();

/**
 * @route /login
 * @method POST
 * @controller login user and redirect to user profile
 */
router.post(
  "/login",
  passport.authenticate("local"),
  (req: Request, res: Response, next: NextFunction) => {
    CustomResponse.ok(res, "Authenticated", [req.user]);
  }
);

/**
 * @route /logout
 * @method POST
 * @controller logout current user and redirect to login
 */
router.post("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logOut();
  CustomResponse.ok(res, "Logout successful");
});

/**
 * @route /register
 * @method POST
 * @controller send otp to the given mobile number
 */
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { mobile } = req.body;
    const hash = await otpService.generateOtp(mobile);
    res.cookie("authentication_header", hash, {
      maxAge: config.COOKIE_MAX_AGE,
    });
    CustomResponse.ok(res, false);
  } catch (err: any) {
    CustomResponse.internal(res, false, err.message);
  }
});

/**
 * @route /otp
 * @method POST
 * @controller gets the otp from the user and verifies it
 */
router.post("/otp", async (req: Request, res: Response) => {
  const { authentication_header } = req.cookies;
  const { mobile, otp } = req.body;
  const compare = await otpService.compareOtp(
    otp,
    mobile,
    authentication_header
  );
  if (!compare) return CustomResponse.unauthorized(res, "OTP invalid", null);
  CustomResponse.ok(res, "OTP verified");
});

export function userAuthRouter(app: Express) {
  app.use("/api/v1/auth", router);
}
