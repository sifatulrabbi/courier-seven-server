"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omitUserData = void 0;
function omitUserData(data) {
    const newData = {
        _id: data._id,
        mobile: data.mobile,
        name: data.name,
        email: data.email,
        account_type: data.account_type,
        addresses: data.addresses,
    };
    return newData;
}
exports.omitUserData = omitUserData;
