"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserShopMiddleware = void 0;
const lib_1 = require("../../lib");
const services_1 = require("../../services");
const { badRequest, unauthorized } = lib_1.CustomResponse;
function verifyUserShopMiddleware(req, res, next) {
    const user = req.user;
    services_1.shopsService.findUsersShop({ userId: user._id }, (err, shop) => {
        if (err)
            return badRequest(res, err.message, err);
        if (!shop)
            return unauthorized(res, 'Please create a shop first', null);
        next();
    });
}
exports.verifyUserShopMiddleware = verifyUserShopMiddleware;
