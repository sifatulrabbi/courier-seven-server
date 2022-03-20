import { Strategy, ExtractJwt } from "passport-jwt";
import type { StrategyOptions } from "passport-jwt";
import { authService } from "../services";
import { config } from "../configs";

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "SECRET",
    ignoreExpiration: false,
    jsonWebTokenOptions: {
        maxAge: config.JWT_MAX_AGE,
    },
};

export const jwtStrategy = new Strategy(options, authService.verifyJwt);
