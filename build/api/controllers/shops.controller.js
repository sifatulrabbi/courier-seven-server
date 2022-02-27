"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useShopsController = void 0;
const express_1 = require("express");
const lib_1 = require("../../lib");
const services_1 = require("../../services");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
// get all the shops
router.route('/all').get((_req, res) => {
    services_1.shopsService.allShops((err, shops) => {
        if (err)
            return lib_1.CustomResponse.badRequest(res, err.message, err);
        if (!shops) {
            return lib_1.CustomResponse.notFound(res, 'User not found', null);
        }
        lib_1.CustomResponse.ok(res, false, shops);
    });
});
router
    .route('/:id')
    // get a shop with shop id
    .get(middlewares_1.authGuard, (req, res) => {
    const id = req.params.id;
    services_1.shopsService.findShop(id, (err, shop) => {
        if (err)
            return lib_1.CustomResponse.badRequest(res, err.message, err);
        if (!shop) {
            return lib_1.CustomResponse.notFound(res, 'User not found', null);
        }
        lib_1.CustomResponse.ok(res, false, [shop]);
    });
})
    // update a shop with shop id
    .put(middlewares_1.authGuard, (req, res) => {
    const user = req.user;
    const id = req.params.id;
    const data = req.body;
    data.owner_id = user._id;
    services_1.shopsService.update(id, data, (err, shop) => {
        if (err)
            return lib_1.CustomResponse.badRequest(res, err.message, err);
        if (!shop) {
            return lib_1.CustomResponse.notFound(res, 'Shop not found', null);
        }
        lib_1.CustomResponse.ok(res, 'Shop updated', [shop]);
    });
})
    // remove a shop with id
    .delete(middlewares_1.authGuard, (req, res) => {
    const user = req.user;
    const id = req.params.id;
    services_1.shopsService.remove(id, user._id, (err, shop) => {
        if (err)
            return lib_1.CustomResponse.badRequest(res, err.message, err);
        if (!shop) {
            return lib_1.CustomResponse.notFound(res, 'Shop not found', null);
        }
        lib_1.CustomResponse.ok(res, 'Shop removed', [shop]);
    });
});
router
    .route('/')
    // find shops with user id
    .get(middlewares_1.authGuard, (req, res) => {
    var _a;
    const userId = (_a = req.query.user) === null || _a === void 0 ? void 0 : _a.toString();
    if (!userId) {
        return lib_1.CustomResponse.badRequest(res, 'Please provide user id and/or invoice id', null);
    }
    services_1.shopsService.findUsersShop({ userId }, (err, shops) => {
        if (err)
            return lib_1.CustomResponse.badRequest(res, err.message, err);
        if (!shops) {
            return lib_1.CustomResponse.notFound(res, 'Unable to create shop please try again', null);
        }
        lib_1.CustomResponse.ok(res, 'Shops found', shops);
    });
})
    // create shop
    .post(middlewares_1.authGuard, (req, res) => {
    const user = req.user;
    if (!req.isAuthenticated() && !user) {
        return lib_1.CustomResponse.forbidden(res, 'Please login to create a shop', null);
    }
    const data = req.body;
    data.owner_id = user._id;
    if (!data.mobile)
        data.mobile = user.mobile;
    services_1.shopsService.create(data, (err, shop) => {
        if (err)
            return lib_1.CustomResponse.badRequest(res, err.message, err);
        if (!shop) {
            return lib_1.CustomResponse.notFound(res, 'Unable to create shop please try again', null);
        }
        lib_1.CustomResponse.created(res, 'Shop created', [shop]);
    });
});
function useShopsController(app) {
    app.use('/api/v1/shops', router);
}
exports.useShopsController = useShopsController;
