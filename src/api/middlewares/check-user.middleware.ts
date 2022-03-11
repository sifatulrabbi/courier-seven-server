import { Request, Response, NextFunction } from 'express';
import { convertMobileNumber, CustomResponse } from '../../lib';
import { usersService } from '../../services';

export async function checkUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const mobile = req.body.mobile || null;
  const email = req.body.email;
  let user = await usersService.findOne({ email });
  if (!user) {
    user = await usersService.findOne({ mobile: convertMobileNumber(mobile) });
  }
  if (!user) return next();
  CustomResponse.badRequest(
    res,
    'Mobile/Email in use, please login',
    'Duplicate error',
  );
}
