import type { ICreateParcelDto, IUser } from '../../interfaces';
import { Router, Express } from 'express';
import { CustomResponse } from '../../lib';
import { parcelsService } from '../../services';
import {
  authGuard,
  verifyUserShopMiddleware,
  verifyShopParcelMiddleware,
} from '../middlewares';

const router = Router();
const { badRequest, notFound, ok, created } = CustomResponse;
router //
  .route('/')
  // get parcels
  .get(authGuard, verifyUserShopMiddleware, (req, res) => {
    // by shop and invoice
    const shopId = req.query.shop?.toString();
    const invoiceId = req.query.invoice?.toString();

    if (shopId && invoiceId) {
      return parcelsService.findByShop(shopId, invoiceId, (err, parcels) => {
        if (err) return badRequest(res, err.message, err);
        if (!parcels) return notFound(res, false, null);
        ok(res, false, parcels);
      });
    }

    // by shop
    if (shopId && !invoiceId) {
      return parcelsService.findByShop(shopId, null, (err, parcels) => {
        if (err) return badRequest(res, err.message, err);
        if (!parcels) return notFound(res, 'Parcel not found', null);
        ok(res, 'Parcel found', parcels);
      });
    }

    // all
    parcelsService.all(
      /* admin auth guard needed */ (err, parcels) => {
        if (err) return badRequest(res, err.message, err);
        if (!parcels) return notFound(res, false, null);
        ok(res, false, parcels);
      },
    );
  })

  // create parcel
  .post(authGuard, verifyUserShopMiddleware, (req, res) => {
    const user = req.user as IUser;
    const data = req.body;
    data.user_name = user.name.first + ' ' + user.name.last;
    parcelsService.create(data, (err, parcel) => {
      if (err) return badRequest(res, err.message, err);
      if (!parcel) return notFound(res, false, null);
      created(res, false, [parcel]);
    });
  });

router
  .route('/:id')
  // get parcel with id
  .get(
    authGuard,
    verifyUserShopMiddleware,
    verifyShopParcelMiddleware,
    (req, res) => {
      parcelsService.findOne(req.params.id, (err, parcel) => {
        if (err) return badRequest(res, err.message, err);
        if (!parcel) return notFound(res, false, null);
        ok(res, false, [parcel]);
      });
    },
  )

  // update parcel
  .put(
    authGuard,
    verifyUserShopMiddleware,
    verifyShopParcelMiddleware,
    (req, res) => {
      const data = req.body as ICreateParcelDto;
      parcelsService.update(req.params.id, data, (err, parcel) => {
        if (err) return badRequest(res, err.message, err);
        if (!parcel) return notFound(res, false, null);
        ok(res, false, [parcel]);
      });
    },
  )

  // remove parcel;
  .delete(
    authGuard,
    verifyUserShopMiddleware,
    verifyShopParcelMiddleware,
    (req, res) => {
      parcelsService.remove(req.params.id, (err, parcel) => {
        if (err) return badRequest(res, err.message, err);
        if (!parcel) return notFound(res, 'Parcel not found', null);
        ok(res, 'Parcel removed', [parcel]);
      });
    },
  );

export function useParcelsController(app: Express) {
  app.use('/api/v1/parcels', router);
}
