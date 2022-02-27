"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localStrategy = void 0;
const passport_local_1 = require("passport-local");
const services_1 = require("../services");
exports.localStrategy = new passport_local_1.Strategy({
    usernameField: 'mobile',
    passwordField: 'password',
}, services_1.authService.verifyLogin);
