import { Request, Response, NextFunction } from "express";
import { convertMobileNumber, CustomResponse } from "../../libs";
import { usersService } from "../../services";

export async function checkUserMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const mobile = convertMobileNumber(req.body.mobile);
    const user = await usersService.findOne({ mobile: mobile });

    if (!user) return next();
    CustomResponse.badRequest(
        res,
        "Mobile number in use, please login",
        "Duplicate error"
    );
}
