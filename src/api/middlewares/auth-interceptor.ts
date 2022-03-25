import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { config } from "../../configs";
import jwt from "jsonwebtoken";
import { CustomResponse } from "../../lib";

const { unauthorized, notFound } = CustomResponse;

export function authInterceptor(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const auth = passport.authenticate("jwt", { session: false });
        const token = req.headers.authorization?.split(" ")[1] || null;
        if (!token) return notFound(res, "Token not found", null);
        const payload = jwt.verify(token, config.JWT_SECRET, {
            ignoreExpiration: false,
            maxAge: config.JWT_MAX_AGE,
        });
        if (payload) return auth(req, res, next);
        res.status(401).json({ message: "Invalid JWT token" });
    } catch (err: any) {
        unauthorized(res, err.message, err);
    }
}
