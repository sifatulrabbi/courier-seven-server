import { Request, Response, NextFunction } from 'express';
import { verifyMobileNumber, CustomResponse } from '../../lib';

export function verifyMobileMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (!verifyMobileNumber(req.body.mobile)) {
        return CustomResponse.badRequest(res, 'Mobile number invalid', null);
    }
    next();
}
