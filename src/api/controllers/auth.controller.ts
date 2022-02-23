import { Express, Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import { authService, otpService } from "../../services";
import { CustomResponse, verifyMobileNumber } from "../../libs";
import { COOKIES } from "../../libs/constants";
import { checkUserMiddleware } from "../middlewares";

const router = Router();

router
  .route("/otp/:mobile")
  .get(async (req, res) => {
    if (!verifyMobileNumber(req.params.mobile)) {
      return CustomResponse.badRequest(res, "Mobile number invalid", null);
    }

    try {
      const token = await otpService.generateOtp(req.params.mobile);
      CustomResponse.ok(res, "OTP token was sent to your mobile", [{ token }]);
    } catch (err: any) {
      CustomResponse.internal(res, err.message, err);
    }
  })
  .post(async (req, res) => {
    if (!verifyMobileNumber(req.params.mobile)) {
      return CustomResponse.badRequest(res, "Mobile number invalid", null);
    }

    try {
      const isValid = await otpService.verifyOtp(
        req.params.mobile,
        req.body.token
      );
      if (!isValid) {
        return CustomResponse.badRequest(res, "Invalid otp token", null);
      }

      CustomResponse.ok(res, "Verified");
    } catch (err: any) {
      CustomResponse.internal(res, err.message, err);
    }
  });

export function userAuthRouter(app: Express) {
  app.use("/api/v1/auth", router);
}
