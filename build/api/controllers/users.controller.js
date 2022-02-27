"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserRouter = void 0;
const express_1 = require("express");
const lib_1 = require("../../lib");
const services_1 = require("../../services");
const middlewares_1 = require("../middlewares");
const router = express_1.Router();
const { ok, badRequest, notFound, forbidden } = lib_1.CustomResponse;
router
    .route('/')
    // get all users
    .get((req, res) => {
    services_1.usersService.all((err, users) => {
        if (err)
            return badRequest(res, err.message, err);
        if (!users)
            return notFound(res, 'No users found', null);
        ok(res, false, users);
    });
});
router
    .route('/:id')
    // find user with id
    .get(middlewares_1.authGuard, (req, res) => {
    const user = req.user;
    const id = req.params.id;
    if (user._id.toString() !== id) {
        return forbidden(res, false, 'Incorrect identity');
    }
    services_1.usersService.findOne({ id }, (err, result) => {
        if (err)
            return badRequest(res, err.message, err);
        if (!result)
            return notFound(res, 'User not found', null);
        ok(res, false, [lib_1.omitUserData(result)]);
    });
})
    .put(middlewares_1.authGuard, (req, res) => {
    const user = req.user;
    const id = req.params.id;
    if (user._id.toString() !== id) {
        return forbidden(res, false, 'Incorrect identity');
    }
    const data = req.body;
    services_1.usersService.update(id, data, (err, result) => {
        if (err)
            return badRequest(res, err.message, err);
        if (!result)
            return notFound(res, false, null);
        ok(res, 'User info updated', [lib_1.omitUserData(result)]);
    });
})
    .delete(middlewares_1.authGuard, (req, res) => {
    const user = req.user;
    const id = req.params.id;
    if (user._id.toString() !== id) {
        return forbidden(res, false, 'Incorrect identity');
    }
    services_1.usersService.remove(id, (err, result) => {
        if (err)
            return badRequest(res, err.message, err);
        if (!result)
            return notFound(res, false, null);
        req.logout();
        ok(res, result, []);
    });
});
function useUserRouter(app) {
    app.use('/api/v1/users', router);
}
exports.useUserRouter = useUserRouter;
