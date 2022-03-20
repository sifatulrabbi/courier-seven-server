import { verifyMobileNumber } from '../../src/lib';

describe('Testing verifyMobileNumber function', function () {
    it('should show error if given a string of length less than 11', function () {
        const result = verifyMobileNumber('0123456789');
        expect(result).toBe(false);
    });

    it('should show error if given a string of length bigger than 11', function () {
        const result = verifyMobileNumber('012345678901');
        expect(result).toBe(false);
    });

    it('should show error if given a string does start with 0', function () {
        const result = verifyMobileNumber('112345678901');
        expect(result).toBe(false);
    });

    it('should return true for a perfect mobile number', function () {
        const result = verifyMobileNumber('01234567890');
        expect(result).toBe(true);
    });
});
