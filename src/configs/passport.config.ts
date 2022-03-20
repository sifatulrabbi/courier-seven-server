import type { Application } from "express";
import passport from "passport";
import { localStrategy, jwtStrategy } from "../auth";
import { authService } from "../services";

export function preparePassport(app: Application) {
    app.use(passport.initialize());

    passport.use(localStrategy);
    passport.use(jwtStrategy);
    passport.serializeUser((_user, done) => {
        done(null, true);
    });
}
