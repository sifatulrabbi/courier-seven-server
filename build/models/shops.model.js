"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const shopsSchema = new mongoose_1.default.Schema({
    owner_id: { type: String, required: true },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String },
    address: {
        district: { type: String, required: true },
        sub_district: { type: String, required: true },
        area: { type: String, required: true },
        street: { type: String, required: true },
        house: { type: String, required: true },
    },
});
exports.shopsModel = mongoose_1.default.model('user-shops', shopsSchema);
