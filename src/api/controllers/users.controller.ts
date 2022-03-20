import type { IUser } from '../../interfaces';
import { Request, Response, NextFunction } from 'express';
import { CustomResponse, omitUserData } from '../../lib';
import { usersService } from '../../services';

const { ok, notFound, forbidden } = CustomResponse;

class UserController {
    getAll(req: Request, res: Response, next: NextFunction) {
        usersService.all((err, users) => {
            if (err) return next(err);
            if (!users) return notFound(res, 'No users found', null);
            ok(res, false, users);
        });
    }

    getOne(req: Request, res: Response, next: NextFunction) {
        const user = req.user as IUser;
        const id = req.params.id;
        if (user._id.toString() !== id) {
            return forbidden(res, false, 'Incorrect identity');
        }

        usersService.findOne({ id }, (err, result) => {
            if (err) return next(err);
            if (!result) return notFound(res, 'User not found', null);
            ok(res, false, [omitUserData(result)]);
        });
    }

    update(req: Request, res: Response, next: NextFunction) {
        const user = req.user as IUser;
        const id = req.params.id;
        if (user._id.toString() !== id) {
            return forbidden(res, false, 'Incorrect identity');
        }

        const data = req.body;
        usersService.update(id, data, (err, result) => {
            if (err) return next(err);
            if (!result) return notFound(res, false, null);
            ok(res, 'User info updated', [omitUserData(result)]);
        });
    }

    remove(req: Request, res: Response, next: NextFunction) {
        const user = req.user as IUser;
        const id = req.params.id;
        if (user._id.toString() !== id) {
            return forbidden(res, false, 'Incorrect identity');
        }

        usersService.remove(id, (err, result) => {
            if (err) return next(err);
            if (!result) return notFound(res, false, null);
            req.logout();
            ok(res, result, []);
        });
    }
}

export const usersController = new UserController();
