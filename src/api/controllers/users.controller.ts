import type { IUser } from "../../interfaces";
import { Request, Response, NextFunction } from "express";
import { CustomResponse, omitUserData } from "../../lib";
import { usersService, profilesService } from "../../services";

const { ok, notFound, forbidden } = CustomResponse;

class UserController {
    getAll(req: Request, res: Response, next: NextFunction) {
        usersService.all((err, users) => {
            if (err) return next(err);
            if (!users) return notFound(res, "No users found", null);
            ok(res, false, users);
        });
    }

    getOne(req: Request, res: Response, next: NextFunction) {
        const user = req.user as IUser;
        if (!user._id) {
            return forbidden(res, false, "Incorrect identity");
        }

        profilesService.getProfile(user._id, (err, profile) => {
            if (err) return next(err);
            if (!profile) return notFound(res, "User not found", null);
            ok(res, false, [profile]);
        });
    }

    update(req: Request, res: Response, next: NextFunction) {
        const user = req.user as IUser;
        if (!user._id) {
            return forbidden(res, false, "Incorrect identity");
        }

        const data = req.body;
        usersService.update(user._id.toString(), data, (err, result) => {
            if (err) return next(err);
            if (!result) return notFound(res, false, null);
            ok(res, "User info updated", [omitUserData(result)]);
        });
    }

    remove(req: Request, res: Response, next: NextFunction) {
        const user = req.user as IUser;
        if (!user._id) {
            return forbidden(res, false, "Incorrect identity");
        }

        usersService.remove(user._id.toString(), (err, result) => {
            if (err) return next(err);
            if (!result) return notFound(res, false, null);
            req.logout();
            ok(res, result, []);
        });
    }
}

export const usersController = new UserController();
