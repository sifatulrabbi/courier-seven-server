import { Request, Response, NextFunction } from "express";
import { CustomResponse } from "../../libs";
import { usersService } from "../../services";

export async function checkUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await usersService.find({ mobile: req.body.mobile });
    if (!user) return next();
    CustomResponse.badRequest(res, false, "User already registered");
  } catch (err: any) {
    CustomResponse.internal(res, false, err.message);
  }
}
