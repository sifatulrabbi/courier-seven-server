import { Strategy } from "passport-local";
import { IUserSession } from "../interfaces";
import { usersService } from "../services";
import { trimUser } from "../libs";

async function verify(
  mobile: string,
  password: string,
  done: (
    err: any,
    user?: IUserSession | false,
    info?: { message: string }
  ) => void
) {
  const user = await usersService.find({ mobile });

  if (!user) {
    done(new Error("User not found"), false, { message: "User not found" });
    return;
  }

  if (!(await user.comparePassword(password))) {
    done(new Error("Incorrect password"), false, {
      message: "Incorrect password",
    });
    return;
  }

  done(null, trimUser(user));
}

export const localStrategy = new Strategy(
  {
    usernameField: "mobile",
    passwordField: "password",
  },
  verify
);
