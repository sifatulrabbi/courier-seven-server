import { otpService } from "../../src/services/otp.service";
import { connectDb } from "../../src/lib/connect-db";

beforeAll(async () => {
    await connectDb();
});

const email = "example@email.com";
const otpObj = {
    token: "123456",
    verification_key: "abcdefgh",
};

describe("creating an OTP token", () => {
    describe("given that the email is provided", () => {
        it("should return a token", async () => {
            try {
                const data = await otpService.generateOtp(email);
                expect(data.token.length).toBe(6);
            } catch (err) {
                expect(err).toBeFalsy();
            }
        });

        it("should return a verification_key", async () => {
            try {
                const data = await otpService.generateOtp(email);
                expect(data.verificationKey).toBeTruthy();
            } catch (err) {
                expect(err).toBeFalsy();
            }
        });
    });
});

describe("validating an otp token", () => {
    beforeEach(async () => {
        const data = await otpService.generateOtp(email);
        otpObj.token = data.token;
        otpObj.verification_key = data.verificationKey;
    });

    describe("given that the information was incorrect", () => {
        it("should throw an error if the token is incorrect", async () => {
            try {
                const success = await otpService.verifyOtp(
                    email,
                    "012345",
                    otpObj.verification_key,
                );
                expect(success).toBeFalsy();
            } catch (err) {
                expect(err).toBeTruthy();
            }
        });

        it("should throw an error if the key is changed", async () => {
            try {
                const success = await otpService.verifyOtp(
                    email,
                    otpObj.token,
                    "abcdef",
                );
                expect(success).toBeFalsy();
            } catch (err) {
                expect(err).toBeTruthy();
            }
        });
    });

    describe("given than the email and opt is correct", () => {
        it("should return true for correct email, token and key", async () => {
            try {
                const success = await otpService.verifyOtp(
                    email,
                    otpObj.token,
                    otpObj.verification_key,
                );
                expect(success).toBeTruthy();
            } catch (err) {
                expect(err).toBeFalsy();
            }
        });
    });

    describe("given that the otp have already been used", () => {
        it("should throw an error", async () => {
            try {
                const success = await otpService.verifyOtp(
                    email,
                    otpObj.token,
                    otpObj.verification_key,
                );
                expect(success).toBeFalsy();
            } catch (err) {
                expect(err).toBeTruthy();
            }
        });
    });
});
