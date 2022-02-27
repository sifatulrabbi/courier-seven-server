"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preparePassport = void 0;
const passport_1 = __importDefault(require("passport"));
const auth_1 = require("../auth");
const services_1 = require("../services");
function preparePassport(app) {
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    passport_1.default.use(auth_1.localStrategy);
    passport_1.default.serializeUser(services_1.authService.serializer);
    passport_1.default.deserializeUser(services_1.authService.deserializer);
}
exports.preparePassport = preparePassport;
