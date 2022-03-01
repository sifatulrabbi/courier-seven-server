import { Request, Response, NextFunction } from 'express';
import { /* convertMobileNumber, */ CustomResponse } from '../../lib';
import { usersService } from '../../services';

export async function checkUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // const mobile = convertMobileNumber(req.body.mobile);
  const email = req.body.email; // using email instead of mobile verification
  const user = await usersService.findOne({ email }); // using email instead of mobile verification

  if (!user) return next();

  CustomResponse.badRequest(
    res,
    'Mobile number in use, please login',
    'Duplicate error',
  );
}
