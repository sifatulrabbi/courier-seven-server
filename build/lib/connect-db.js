"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../configs/config");
const console_1 = __importDefault(require("console"));
const process_1 = __importDefault(require("process"));
async function connectDb() {
    try {
        await mongoose_1.default.connect(config_1.config.MONGODB_URI);
        console_1.default.log('Connected to MongoDB');
    }
    catch (err) {
        console_1.default.error('unable to connect to the MongoDB', err);
        process_1.default.exit(1);
    }
}
exports.connectDb = connectDb;
