"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parcelsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const parcelsSchema = new mongoose_1.default.Schema({
    invoice_id: { type: String, required: true },
    shop: {
        shop_id: { type: String, required: true },
        name: { type: String, required: true },
        mobile: { type: String, required: true },
        owner: { type: String, required: true },
        email: { type: String },
        address: {
            district: { type: String, required: true },
            sub_district: { type: String, required: true },
            area: { type: String, required: true },
            street: { type: String, required: true },
            house: { type: String, required: true },
        },
    },
    customer: {
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
    },
    product: {
        price: { type: Number, required: true },
        weight: { type: Number, required: true },
        type: { type: String, required: true },
    },
    collection_amount: { type: Number, required: true },
    notes: { type: String, required: true },
}, {
    timestamps: true,
    autoCreate: false,
});
exports.parcelsModel = mongoose_1.default.model('parcels', parcelsSchema);
