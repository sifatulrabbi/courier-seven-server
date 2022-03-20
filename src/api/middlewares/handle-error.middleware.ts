import { NextFunction, Request, Response } from "express";
import { CustomResponse, runOnDevMode } from "../../lib";

export function handleError(
    err: any,
    _req: Request,
    res: Response,
    next: NextFunction,
): void {
    if (!err) return next();
    runOnDevMode(() => {
        console.error(err);
    });
    CustomResponse.badRequest(res, err.message, err);
}
