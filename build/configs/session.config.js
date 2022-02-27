"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareSession = void 0;
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const express_session_1 = __importDefault(require("express-session"));
const config_1 = require("./config");
const sessionConfig = {
    secret: config_1.config.SESSION_SECRET,
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: config_1.config.COOKIE_MAX_AGE,
        httpOnly: true,
    },
    store: new connect_mongo_1.default({
        collectionName: 'user-sessions',
        mongoUrl: config_1.config.MONGODB_URI,
        ttl: config_1.config.COOKIE_MAX_AGE,
        autoRemove: 'native',
    }),
};
function prepareSession(app) {
    app.use((0, express_session_1.default)(sessionConfig));
}
exports.prepareSession = prepareSession;
