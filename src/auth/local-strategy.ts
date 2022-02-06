import { Strategy } from "passport-local";
import { IUserSession } from "../interfaces";

function verify(
  email: string,
  password: string,
  done: (
    err: any,
    user?: IUserSession | false,
    info?: { message: string }
  ) => void
) {}

export const localStrategy = new Strategy(
  {
    usernameField: "mobile",
    passwordField: "password",
  },
  verify
);
