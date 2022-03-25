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
                    expect(err).toBeFalsy();
                    expect(res.status).toBe(404);
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
                        if (err) return done(err);
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
                        if (err) return done(err);
                        expect(res.status).toBe(401);
                        done();
                    });
            });
        });

        describe("given that the token is valid", () => {
            let token: string;
            const payload = {
                email: "islammasraful@gmail.com",
                password: "password",
            };

            beforeEach(async () => {
                try {
                    const res = await request(server)
                        .post("/api/v1/auth/login")
                        .send(payload);
                    token = res.body.data.token;
                } catch (err) {
                    expect(err).toBeFalsy();
                }
            });

            it("should return 200", (done) => {
                request(server)
                    .get(url)
                    .set({
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    })
                    .expect(200, done);
            });

            it("should return user data", (done) => {
                request(server)
                    .get(url)
                    .set({
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    })
                    .end((err, res) => {
                        expect(err).toBeFalsy();
                        const data = res.body.data;
                        expect(data.name).toBeTruthy();
                        expect(data.shops.data).toBeTruthy();
                        expect(data.payments).toBeTruthy();
                        done();
                    });
            });
        });
    });
});
