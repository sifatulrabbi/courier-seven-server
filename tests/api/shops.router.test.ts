import request from "supertest";
import { prepare, server } from "../../src/server";
import type { ICreateShopDto } from "../../src/interfaces";
import { usersService } from "../../src/services/users.service";

const url = "/api/v1/shops";

beforeAll(async () => {
    await prepare();
});

afterAll((done) => {
    server.close(() => {
        done();
    });
});

describe("Create user shop", () => {
    describe("given that the user isn't logged in", () => {
        it("should return 404", async () => {
            try {
                const res = await request(server).post(url);
                expect(res.status).toBe(404);
            } catch (err) {}
        });
    });

    describe("given that the user is logged in", () => {
        let userId: string;
        let token: string;
        let shopId: string;
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
                const user = await usersService.findOne({
                    email: res.body.data.email,
                });
                if (user) userId = user._id.toString();
            } catch (err) {
                expect(err).toBeFalsy();
            }
        });

        describe("given that the credentials are incorrect", () => {
            it("should return 404", async () => {
                try {
                    const res = await request(server).post(url).send({});
                    expect(res.status).toBe(404);
                } catch (err) {
                    expect(err).toBeFalsy();
                }
            });
        });

        describe("given that the credentials are correct", () => {
            const mockShopData: ICreateShopDto = {
                owner_id: userId,
                name: "Mock shop",
                email: "mock.shop@test.com",
                mobile: "0100000000",
                address: {
                    district: "mock",
                    area: "mock",
                    upazila: "mock",
                    street: "mock",
                    house: "mock",
                },
            };

            it("POST / should create a shop", async () => {
                try {
                    const res = await request(server)
                        .post(url)
                        .set({
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        })
                        .send(mockShopData);
                    expect(res.status).toBe(201);
                    if (!res.body.data) throw new Error("Shop not found");
                    shopId = res.body.data._id.toString();
                } catch (err) {
                    expect(err).toBeFalsy();
                }
            });

            it("DELETE / should delete the shop", async () => {
                try {
                    const res = await request(server)
                        .delete(`/api/v1/shops/${shopId}`)
                        .set({
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        });
                    expect(res.status).toBe(200);
                } catch (err) {
                    expect(err).toBeFalsy();
                }
            });
        });
    });
});
