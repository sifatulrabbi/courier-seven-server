import type { IUser } from '../../interfaces';
import { Request, Response, NextFunction } from 'express';
import { CustomResponse } from '../../lib';
import { shopsService } from '../../services';

const { forbidden, ok, created, notFound } = CustomResponse;

class ShopsController {
    create(req: Request, res: Response, next: NextFunction) {
        const user = req.user as IUser;
        if (!req.isAuthenticated() && !user) {
            return forbidden(res, 'Please login to create a shop', null);
        }

        const data = req.body;
        data.owner_id = user._id;
        if (!data.mobile) data.mobile = user.mobile;

        shopsService.create(data, (err, shop) => {
            if (err) return next(err);
            if (!shop) {
                return notFound(
                    res,
                    'Unable to create shop please try again',
                    null,
                );
            }
            created(res, 'Shop created', [shop]);
        });
    }

    update(req: Request, res: Response, next: NextFunction) {
        const user = req.user as IUser;
        const id = req.params.id;
        const data = req.body;
        data.owner_id = user._id;
        shopsService.update(id, data, (err, shop) => {
            if (err) return next(err);
            if (!shop) {
                return notFound(res, 'Shop not found', null);
            }
            ok(res, 'Shop updated', [shop]);
        });
    }

    remove(req: Request, res: Response, next: NextFunction) {
        const user = req.user as IUser;
        const id = req.params.id;
        shopsService.remove(id, user._id, (err, shop) => {
            if (err) return next(err);
            if (!shop) {
                return notFound(res, 'Shop not found', null);
            }
            ok(res, 'Shop removed', [shop]);
        });
    }

    getByUser(req: Request, res: Response, next: NextFunction) {
        const userId = req.query.user?.toString();

        if (!userId) {
            return next(new Error('Please provide user id and/or invoice id'));
        }

        shopsService.findUsersShop({ userId }, (err, shops) => {
            if (err) return next(err);
            if (!shops) {
                return notFound(
                    res,
                    'Unable to create shop please try again',
                    null,
                );
            }
            ok(res, 'Shops found', shops);
        });
    }

    getAll(req: Request, res: Response, next: NextFunction) {
        shopsService.allShops((err, shops) => {
            if (err) return next(err);
            if (!shops) {
                return notFound(res, 'User not found', null);
            }
            ok(res, false, shops);
        });
    }

    getOne(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        shopsService.findShop(id, (err, shop) => {
            if (err) return next(err);
            if (!shop) {
                return notFound(res, 'User not found', null);
            }
            ok(res, false, [shop]);
        });
    }
}

export const shopsController = new ShopsController();
