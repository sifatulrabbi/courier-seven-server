import { NextFunction, Request, Response } from 'express';
import { CustomResponse } from '../../lib';

export function handleError(
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!err) return next();
  CustomResponse.badRequest(res, err.message, err);
}
