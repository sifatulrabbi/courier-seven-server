"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showLogs = void 0;
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("../configs/config");
function showLogs(app) {
    if (!config_1.config.PROD) {
        app.use((0, morgan_1.default)('dev'));
    }
}
exports.showLogs = showLogs;
