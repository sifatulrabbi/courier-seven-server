import { Request, Response } from 'express';
import { IUser } from '../../interfaces';
import { CustomResponse } from '../../lib';
import { shopsService } from '../../services';

class ShopsController {
  create(req: Request, res: Response) {
    const user = req.user as IUser;
    if (!req.isAuthenticated() && !user) {
      return CustomResponse.forbidden(
        res,
        'Please login to create a shop',
        null,
      );
    }

    const data = req.body;
    data.owner_id = user._id;
    if (!data.mobile) data.mobile = user.mobile;

    shopsService.create(data, (err, shop) => {
      if (err) return CustomResponse.badRequest(res, err.message, err);
      if (!shop) {
        return CustomResponse.notFound(
          res,
          'Unable to create shop please try again',
          null,
        );
      }
      CustomResponse.created(res, 'Shop created', [shop]);
    });
  }

  update(req: Request, res: Response) {
    const user = req.user as IUser;
    const id = req.params.id;
    const data = req.body;
    data.owner_id = user._id;
    shopsService.update(id, data, (err, shop) => {
      if (err) return CustomResponse.badRequest(res, err.message, err);
      if (!shop) {
        return CustomResponse.notFound(res, 'Shop not found', null);
      }
      CustomResponse.ok(res, 'Shop updated', [shop]);
    });
  }

  remove(req: Request, res: Response) {
    const user = req.user as IUser;
    const id = req.params.id;
    shopsService.remove(id, user._id, (err, shop) => {
      if (err) return CustomResponse.badRequest(res, err.message, err);
      if (!shop) {
        return CustomResponse.notFound(res, 'Shop not found', null);
      }
      CustomResponse.ok(res, 'Shop removed', [shop]);
    });
  }

  getByUser(req: Request, res: Response) {
    const userId = req.query.user?.toString();

    if (!userId) {
      return CustomResponse.badRequest(
        res,
        'Please provide user id and/or invoice id',
        null,
      );
    }

    shopsService.findUsersShop({ userId }, (err, shops) => {
      if (err) return CustomResponse.badRequest(res, err.message, err);
      if (!shops) {
        return CustomResponse.notFound(
          res,
          'Unable to create shop please try again',
          null,
        );
      }
      CustomResponse.ok(res, 'Shops found', shops);
    });
  }

  getAll(req: Request, res: Response) {
    shopsService.allShops((err, shops) => {
      if (err) return CustomResponse.badRequest(res, err.message, err);
      if (!shops) {
        return CustomResponse.notFound(res, 'User not found', null);
      }
      CustomResponse.ok(res, false, shops);
    });
  }

  getOne(req: Request, res: Response) {
    const id = req.params.id;
    shopsService.findShop(id, (err, shop) => {
      if (err) return CustomResponse.badRequest(res, err.message, err);
      if (!shop) {
        return CustomResponse.notFound(res, 'User not found', null);
      }
      CustomResponse.ok(res, false, [shop]);
    });
  }
}

export const shopsController = new ShopsController();
