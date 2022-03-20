import { NextFunction, Request, Response } from "express";

export function setHeaders(req: Request, res: Response, next: NextFunction) {
    res.set({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    });
    next();
}
