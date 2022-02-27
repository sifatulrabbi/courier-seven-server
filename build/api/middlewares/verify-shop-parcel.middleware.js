"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyShopParcelMiddleware = void 0;
const services_1 = require("../../services");
const lib_1 = require("../../lib");
const { badRequest, unauthorized, notFound } = lib_1.CustomResponse;
function verifyShopParcelMiddleware(req, res, next) {
    const user = req.user;
    const parcelId = req.params.id;
    services_1.parcelsService.findOne(parcelId, (err, parcel) => {
        if (err)
            return badRequest(res, err.message, err);
        if (!parcel)
            return notFound(res, 'Parcel not found', null);
        services_1.shopsService.findShop(parcel.shop.shop_id, (error, shop) => {
            if (error)
                return badRequest(res, error.message, error);
            if (!shop)
                return notFound(res, 'Parcel not found', null);
            if (shop.owner_id !== user._id) {
                return unauthorized(res, 'Please login to interact with parcels', null);
            }
        });
    });
    next();
}
exports.verifyShopParcelMiddleware = verifyShopParcelMiddleware;
