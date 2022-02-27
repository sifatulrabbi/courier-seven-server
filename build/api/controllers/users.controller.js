"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserRouter = void 0;
const express_1 = require("express");
// import { IUser } from '../../interfaces';
// import { CustomResponse } from '../../lib';
// import { usersService } from '../../services';
const router = (0, express_1.Router)();
// router
//   .route('/')
//   .get((req, res) => {})
//   .post((req, res) => {});
// // find user with id
// router.route('/:id').get((req, res) => {});
// // login user
// router
//   .route('/profile')
//   .get((req, res) => {})
//   .put((req, res) => {})
//   .delete((req, res) => {});
function useUserRouter(app) {
    app.use('/api/v1/users', router);
}
exports.useUserRouter = useUserRouter;
