export function verifyMobileNumber(mobile: string) {
    if (mobile.length < 11 || mobile.length > 11 || mobile[0] !== "0") {
        return false;
    }
    return true;
}
