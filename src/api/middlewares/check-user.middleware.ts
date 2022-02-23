import { Request, Response, NextFunction } from "express";
import { CustomResponse } from "../../libs";
import { usersService } from "../../services";

export async function checkUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { mobile } = req.body;
    usersService.find({ mobile: mobile }, (err, user) => {
      if (user) {
        return CustomResponse.badRequest(
          res,
          false,
          "User already exists please login"
        );
      }
    });
    next();
  } catch (err: any) {
    CustomResponse.badRequest(res, false, err.message);
  }
}
