import type { Express } from "express";
import passport from "passport";
import { otpStrategy, authService } from "../auth";

export function preparePassport(app: Express) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use("otp-strategy", otpStrategy);
  passport.serializeUser<string>(authService.serializer);
  passport.deserializeUser<string>(authService.deserializer);
}
