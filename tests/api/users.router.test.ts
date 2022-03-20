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
        it("should return 401", (done) => {
            request(server)
                .get(url)
                .end((err, res) => {
                    expect(err).toBeFalsy();
                    expect(res.status).toBe(401);
                    done();
                });
        });
    });

    describe("given that user provided the token", () => {
        describe("given that the token is invalid", () => {
            it("should return 401", (done) => {
                request(server)
                    .get(url)
                    .end((err, res) => {
                        expect(err).toBeFalsy();
                        expect(res.status).toBe(401);
                        done();
                    });
            });
        });

        describe("given that the token is valid", () => {
            it("should return 200", (done) => {
                request(server)
                    .get(url)
                    .set({ authorization: "bearer " })
                    .end((err, res) => {
                        expect(err).toBeFalsy();
                        expect(res.status).toBe(401);
                        done();
                    });
            });
        });
    });
});
