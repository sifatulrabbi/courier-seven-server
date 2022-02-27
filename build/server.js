"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const configs_1 = require("./configs");
const lib_1 = require("./lib");
const app_1 = require("./api/app");
const console_1 = __importDefault(require("console"));
const server = http_1.default.createServer(app_1.app);
server.listen(configs_1.config.PORT, () => {
    lib_1.connectDb();
    if (!configs_1.config.PROD) {
        console_1.default.log(`Server is running on http://localhost:${configs_1.config.PORT}`);
    }
});
