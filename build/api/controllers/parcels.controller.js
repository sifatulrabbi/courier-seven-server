"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useParcelsController = void 0;
const express_1 = require("express");
const lib_1 = require("../../lib");
const services_1 = require("../../services");
const middlewares_1 = require("../middlewares");
const router = express_1.Router();
const { badRequest, notFound, ok, created } = lib_1.CustomResponse;
router //
    .route('/')
    // get parcels
    .get(middlewares_1.authGuard, middlewares_1.verifyUserShopMiddleware, (req, res) => {
    var _a, _b;
    // by shop and invoice
    const shopId = (_a = req.query.shop) === null || _a === void 0 ? void 0 : _a.toString();
    const invoiceId = (_b = req.query.invoice) === null || _b === void 0 ? void 0 : _b.toString();
    if (shopId && invoiceId) {
        return services_1.parcelsService.findByShop(shopId, invoiceId, (err, parcels) => {
            if (err)
                return badRequest(res, err.message, err);
            if (!parcels)
                return notFound(res, false, null);
            ok(res, false, parcels);
        });
    }
    // by shop
    if (shopId && !invoiceId) {
        return services_1.parcelsService.findByShop(shopId, null, (err, parcels) => {
            if (err)
                return badRequest(res, err.message, err);
            if (!parcels)
                return notFound(res, 'Parcel not found', null);
            ok(res, 'Parcel found', parcels);
        });
    }
    // all
    services_1.parcelsService.all(
    /* admin auth guard needed */ (err, parcels) => {
        if (err)
            return badRequest(res, err.message, err);
        if (!parcels)
            return notFound(res, false, null);
        ok(res, false, parcels);
    });
})
    // create parcel
    .post(middlewares_1.authGuard, middlewares_1.verifyUserShopMiddleware, (req, res) => {
    const user = req.user;
    const data = req.body;
    data.user_name = user.name.first + ' ' + user.name.last;
    services_1.parcelsService.create(data, (err, parcel) => {
        if (err)
            return badRequest(res, err.message, err);
        if (!parcel)
            return notFound(res, false, null);
        created(res, false, [parcel]);
    });
});
router
    .route('/:id')
    // get parcel with id
    .get(middlewares_1.authGuard, middlewares_1.verifyUserShopMiddleware, middlewares_1.verifyShopParcelMiddleware, (req, res) => {
    services_1.parcelsService.findOne(req.params.id, (err, parcel) => {
        if (err)
            return badRequest(res, err.message, err);
        if (!parcel)
            return notFound(res, false, null);
        ok(res, false, [parcel]);
    });
})
    // update parcel
    .put(middlewares_1.authGuard, middlewares_1.verifyUserShopMiddleware, middlewares_1.verifyShopParcelMiddleware, (req, res) => {
    const data = req.body;
    services_1.parcelsService.update(req.params.id, data, (err, parcel) => {
        if (err)
            return badRequest(res, err.message, err);
        if (!parcel)
            return notFound(res, false, null);
        ok(res, false, [parcel]);
    });
})
    // remove parcel;
    .delete(middlewares_1.authGuard, middlewares_1.verifyUserShopMiddleware, middlewares_1.verifyShopParcelMiddleware, (req, res) => {
    services_1.parcelsService.remove(req.params.id, (err, parcel) => {
        if (err)
            return badRequest(res, err.message, err);
        if (!parcel)
            return notFound(res, 'Parcel not found', null);
        ok(res, 'Parcel removed', [parcel]);
    });
});
function useParcelsController(app) {
    app.use('/api/v1/parcels', router);
}
exports.useParcelsController = useParcelsController;
