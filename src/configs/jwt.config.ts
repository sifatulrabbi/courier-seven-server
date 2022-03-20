import type { SignOptions } from "jsonwebtoken";
import { config } from "./config";

export const jwtOptions: SignOptions = {
    algorithm: "ES256",
    expiresIn: config.JWT_MAX_AGE,
};
