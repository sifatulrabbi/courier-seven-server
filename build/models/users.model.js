"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfilesModel = exports.usersModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const usersSchema = new mongoose_1.Schema({
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: {
        first: { type: String, required: true },
        last: { type: String, required: true },
    },
    account_type: { type: String, require: true },
    addresses: {
        permanent: {
            district: { type: String, required: true },
            sub_district: { type: String, required: true },
            area: { type: String, required: true },
            street: { type: String, require: true },
            house: { type: String, required: true },
        },
        present: {
            district: { type: String, required: true },
            sub_district: { type: String, required: true },
            area: { type: String, required: true },
            street: { type: String, require: true },
            house: { type: String, required: true },
        },
    },
}, {
    timestamps: true,
    autoCreate: false,
});
usersSchema.pre('save', async function (next) {
    const hash = await bcrypt_1.default.hash(this.password, 10);
    this.password = hash;
    next();
});
usersSchema.methods.comparePassword = async function (password) {
    const compare = await bcrypt_1.default.compare(password, this.password);
    return compare;
};
exports.usersModel = (0, mongoose_1.model)('users', usersSchema);
exports.userProfilesModel = (0, mongoose_1.model)('users', usersSchema);
