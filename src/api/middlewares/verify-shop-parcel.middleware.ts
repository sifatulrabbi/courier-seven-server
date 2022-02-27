import { Request, Response, NextFunction } from 'express';
import { IUser } from '../../interfaces';
import { parcelsService, shopsService } from '../../services';
import { CustomResponse } from '../../lib';

const { badRequest, unauthorized, notFound } = CustomResponse;

export function verifyShopParcelMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const user = req.user as IUser;
  const parcelId = req.params.id;
  parcelsService.findOne(parcelId, (err, parcel) => {
    if (err) return badRequest(res, err.message, err);
    if (!parcel) return notFound(res, 'Parcel not found', null);

    shopsService.findShop(parcel.shop.shop_id, (error, shop) => {
      if (error) return badRequest(res, error.message, error);
      if (!shop) return notFound(res, 'Parcel not found', null);
      if (shop.owner_id !== user._id) {
        return unauthorized(res, 'Please login to interact with parcels', null);
      }
    });
  });
  next();
}
