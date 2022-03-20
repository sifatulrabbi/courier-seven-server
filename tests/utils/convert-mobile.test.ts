import { convertMobileNumber } from "../../src/lib/convert-mobile-number";

describe("convert mobile number", () => {
    describe("given that length is less than 11", () => {
        it("should throw error", () => {
            try {
                convertMobileNumber("0123456789");
            } catch (err) {
                expect(err).toBeTruthy();
            }
        });
    });

    describe("given that length is bigger than 11", () => {
        it("should throw error", () => {
            try {
                convertMobileNumber("012345678909");
            } catch (err) {
                expect(err).toBeTruthy();
            }
        });
    });

    describe("given that length 11", () => {
        it("should return a number as string", () => {
            try {
                const str = convertMobileNumber("01234567890");
                expect(str).toBeTruthy();
            } catch (err) {
                expect(err).toBeFalsy();
            }
        });

        it("should return a number staring with +88", () => {
            try {
                const str = convertMobileNumber("01234567890");
                expect(str[0]).toBe("+");
                expect(str[1]).toBe("8");
                expect(str[2]).toBe("8");
            } catch (err) {
                expect(err).toBeFalsy();
            }
        });
    });
});
