import { Request, Response, NextFunction } from 'express';
import { CustomResponse } from '../../libs';

export function authGuard(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && req.user) return next();
  CustomResponse.unauthorized(res, false, null);
}
