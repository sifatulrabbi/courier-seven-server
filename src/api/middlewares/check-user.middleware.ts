import { Request, Response, NextFunction } from "express";
import { CustomResponse } from "../../libs";
import { usersService } from "../../services";

export async function checkUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { mobile } = req.body;
  usersService.findUser({ mobile: mobile }, (err, user) => {
    if (err) return CustomResponse.badRequest(res, err.message, err);
    if (user) {
      return CustomResponse.badRequest(
        res,
        false,
        "User already exists please login"
      );
    }
    next();
  });
}
