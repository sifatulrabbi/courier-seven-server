import { authService } from "../../src/services/auth.service";
import { connectDb } from "../../src/lib/connect-db";

beforeAll(async () => {
    await connectDb();
});

describe("verification OTP", () => {
    describe("given that the email was invalid", () => {
        const email = "auth.test.com";

        it("should throw an error", (done) => {
            authService.sendVerificationOtp(email, (err, result) => {
                expect(err).toBeTruthy();
                expect(result).toBeFalsy();
                done();
            });
        });
    });

    describe("given that the email was not provided", () => {
        it("should throw an error", (done) => {
            authService.sendVerificationOtp("", (err, result) => {
                expect(err).toBeTruthy();
                expect(result).toBeFalsy();
                done();
            });
        });
    });

    describe("given that email was valid", () => {
        const email = "auth.test@one.com";

        it("should return verification_key", (done) => {
            authService.sendVerificationOtp(email, (err, result) => {
                expect(err).toBeFalsy();
                expect(result).toBeTruthy();
                // @ts-ignore
                expect(result.verificationKey).toBeTruthy();
            });
        });
    });
});
