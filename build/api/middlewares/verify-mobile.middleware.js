"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMobileMiddleware = void 0;
const lib_1 = require("../../lib");
function verifyMobileMiddleware(req, res, next) {
    if (!lib_1.verifyMobileNumber(req.body.mobile)) {
        return lib_1.CustomResponse.badRequest(res, 'Mobile number invalid', null);
    }
    next();
}
exports.verifyMobileMiddleware = verifyMobileMiddleware;
