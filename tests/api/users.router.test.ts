import { server, prepare } from "../../src/server";
import request from "supertest";

beforeAll(async () => {
    await prepare();
});

afterAll((done) => {
    server.close(() => {
        done();
    });
});

describe("get user profile", () => {
    const url = "/api/v1/users/profile";

    describe("given that user did not provide token", () => {
        it("should throw error", (done) => {
            request(server)
                .get(url)
                .end((err, res) => {
                    expect(err).toBeTruthy();
                    done();
                });
        });
    });

    describe("given that user provided the token", () => {
        describe("given that the token is expired", () => {
            it("should return 401", (done) => {
                request(server)
                    .get(url)
                    .set({
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjJiODU4ZmQ3NmYxNzBmYTMyZTgwNjQiLCJlbWFpbCI6ImlzbGFtbWFzcmFmdWxAZ21haWwuY29tIiwiaWF0IjoxNjQ3ODg4ODgzLCJleHAiOjE2NDc5MjQ4ODN9.DIQ-lMHJcXrP4IDlx-JA1446fQJ-kSXBjWnzd5392pA",
                    })
                    .end((err, res) => {
                        expect(res.status).toBe(401);
                        done();
                    });
            });
        });

        describe("given that the token is fake", () => {
            it("should return 401", (done) => {
                request(server)
                    .get(url)
                    .set({
                        Accept: "application/json",
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiIs.eyJzdWIiOiI2MjJiODU4ZmQ3NmYxNzBmYTMy.DIQ-lMHJcXrP4IDlx-JA1446fQJ-kSXBjWnzd7892pA",
                    })
                    .end((err, res) => {
                        expect(res.status).toBe(401);
                        done();
                    });
            });
        });
    });
});
