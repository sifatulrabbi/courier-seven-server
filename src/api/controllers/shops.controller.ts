import { Express, Router } from 'express';
import { IUser } from '../../interfaces';
import { CustomResponse } from '../../lib';
import { shopsService } from '../../services';
import { authGuard } from '../middlewares';

const router = Router();

// get all the shops
router.route('/all').get((_req, res) => {
  shopsService.allShops((err, shops) => {
    if (err) return CustomResponse.badRequest(res, err.message, err);
    if (!shops) {
      return CustomResponse.notFound(res, 'User not found', null);
    }
    CustomResponse.ok(res, false, shops);
  });
});

router
  .route('/:id')
  // get a shop with shop id
  .get(authGuard, (req, res) => {
    const id = req.params.id;
    shopsService.findShop(id, (err, shop) => {
      if (err) return CustomResponse.badRequest(res, err.message, err);
      if (!shop) {
        return CustomResponse.notFound(res, 'User not found', null);
      }
      CustomResponse.ok(res, false, [shop]);
    });
  })
  // update a shop with shop id
  .put(authGuard, (req, res) => {
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
  })
  // remove a shop with id
  .delete(authGuard, (req, res) => {
    const user = req.user as IUser;
    const id = req.params.id;
    shopsService.remove(id, user._id, (err, shop) => {
      if (err) return CustomResponse.badRequest(res, err.message, err);
      if (!shop) {
        return CustomResponse.notFound(res, 'Shop not found', null);
      }
      CustomResponse.ok(res, 'Shop removed', [shop]);
    });
  });

router
  .route('/')
  // find shops with user id
  .get(authGuard, (req, res) => {
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
  })
  // create shop
  .post(authGuard, (req, res) => {
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
  });

export function useShopsController(app: Express) {
  app.use('/api/v1/shops', router);
}
