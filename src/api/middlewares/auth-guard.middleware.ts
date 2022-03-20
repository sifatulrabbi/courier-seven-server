import { Request, Response, NextFunction } from "express";
import { CustomResponse } from "../../lib";

export function authGuard(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated() && req.user) return next();
    CustomResponse.unauthorized(res, false, null);
}
