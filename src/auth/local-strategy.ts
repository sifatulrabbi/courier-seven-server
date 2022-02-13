import { Strategy } from "passport-local";
import { authService } from "./auth.service";

export const localStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "mobile",
  },
  authService.verifyUser
);
