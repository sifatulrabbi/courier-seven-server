"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserMiddleware = void 0;
const lib_1 = require("../../lib");
const services_1 = require("../../services");
async function checkUserMiddleware(req, res, next) {
    const mobile = lib_1.convertMobileNumber(req.body.mobile);
    const user = await services_1.usersService.findOne({ mobile: mobile });
    if (!user)
        return next();
    lib_1.CustomResponse.badRequest(res, 'Mobile number in use, please login', 'Duplicate error');
}
exports.checkUserMiddleware = checkUserMiddleware;
