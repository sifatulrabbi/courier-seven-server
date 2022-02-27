"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMobileNumber = void 0;
function verifyMobileNumber(mobile) {
    if (mobile.length < 11 || mobile.length > 11 || mobile[0] !== '0') {
        return false;
    }
    return true;
}
exports.verifyMobileNumber = verifyMobileNumber;
