"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthRouter = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const services_1 = require("../../services");
const lib_1 = require("../../lib");
const middlewares_1 = require("../middlewares");
const router = express_1.Router();
router
    .route('/register')
    // send registration otp to the user
    .get(middlewares_1.verifyMobileMiddleware, middlewares_1.checkUserMiddleware, async (req, res) => {
    const mobile = lib_1.convertMobileNumber(req.body.mobile);
    await services_1.authService.sendVerificationOtp(mobile, (err, otp) => {
        if (err)
            return lib_1.CustomResponse.badRequest(res, err.message, err);
        if (!otp)
            return lib_1.CustomResponse.badRequest(res, 'Unable to create OTP', null);
        lib_1.CustomResponse.ok(res, 'OTP sent to the mobile number', [
            {
                token: otp.token,
                verification_key: otp.verificationKey,
            },
        ]);
    });
})
    // create user account with all the information
    .post(middlewares_1.verifyMobileMiddleware, middlewares_1.checkUserMiddleware, async (req, res) => {
    const data = req.body;
    data.mobile = lib_1.convertMobileNumber(req.body.mobile);
    services_1.authService.verifyRegistration(data, (err, user) => {
        if (err)
            return lib_1.CustomResponse.badRequest(res, err.message, err);
        if (!user) {
            return lib_1.CustomResponse.internal(res, 'Unable to create user', null);
        }
        lib_1.CustomResponse.created(res, 'User registered', [user]);
    });
});
router
    .route('/login')
    .get(middlewares_1.verifyMobileMiddleware, (req, res) => {
    // const mobile = convertMobileNumber(req.body.mobile);
    // authService.sendVerificationOtp(mobile, (err) => {
    //   if (err) return CustomResponse.badRequest(res, err.message, err);
    //   CustomResponse.ok(res, "OTP sent to the mobile number");
    // });
    lib_1.CustomResponse.unauthorized(res, 'User mobile and password to login', null);
})
    // login
    .post(middlewares_1.verifyMobileMiddleware, passport_1.default.authenticate('local', { failureRedirect: '/api/auth/login' }), (req, res) => {
    if (!req.isAuthenticated()) {
        return lib_1.CustomResponse.unauthorized(res, 'Use mobile and password to login', null);
    }
    const user = req.user;
    res.redirect(`/api/v1/users/${user._id}`);
});
function useAuthRouter(app) {
    app.use('/api/v1/auth', router);
}
exports.useAuthRouter = useAuthRouter;
