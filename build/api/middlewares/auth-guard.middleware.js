"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
const lib_1 = require("../../lib");
function authGuard(req, res, next) {
    if (req.isAuthenticated() && req.user)
        return next();
    lib_1.CustomResponse.unauthorized(res, false, null);
}
exports.authGuard = authGuard;
