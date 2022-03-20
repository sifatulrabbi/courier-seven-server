import request from "supertest";
import { prepare, server } from "../../src/server";
import type { ICreateUserDto } from "../../src/interfaces/users.interface";

beforeAll((done) => {
    prepare();
    done();
});

afterAll((done) => {
    server.close(() => {
        done();
    });
});

describe("user login", () => {
    const url = "/api/v1/auth/login";

    describe("given that the email was unregistered", () => {
        it("should return 404", (done) => {
            const payload = {
                email: "example@email.com",
                password: "password",
            };
            request(server).post(url).send(payload).expect(404, done);
        });
    });

    describe("given that the credentials are incorrect", () => {
        it("should return 400", (done) => {
            const payload = {
                email: "islammasraful@gmail.com",
                password: "incorrect password",
            };
            request(server).post(url).send(payload).expect(400, done);
        });
    });

    describe("given that the credentials are correct", () => {
        it("should return 200", (done) => {
            const payload = {
                email: "islammasraful@gmail.com",
                password: "password",
            };
            request(server).post(url).send(payload).expect(200, done);
        });
    });
});

describe("user registration", () => {
    describe("register step 1", () => {
        const url = "/api/v1/auth/register";

        describe("given that the email is not provided/invalid", () => {
            it("should return 400", (done) => {
                request(server).post(url).send({ email: "" }).expect(400, done);
            });

            it("should response with status code 400", (done) => {
                const payload = {
                    email: "example.com",
                    password: "12345678",
                };
                request(server).post(url).send(payload).expect(400, done);
            });
        });

        describe("given that the email was provided", () => {
            it("should return 200", (done) => {
                const email = "example@email.com";
                request(server).post(url).send({ email }).expect(200, done);
            });

            it("should return a token and opt", (done) => {
                request(server)
                    .post(url)
                    .send({ email: "example@email.com" })
                    .end((err, res) => {
                        if (err) {
                            done(new Error(err.message));
                            return;
                        }
                        const data = res.body.data[0];
                        data.token && data.verification_key
                            ? done()
                            : done(
                                  new Error(
                                      "no token or verification_key found",
                                  ),
                              );
                    });
            });
        });
    });

    describe("registration step 2", () => {
        const url1 = "/api/v1/auth/register";
        const url2 = "/api/v1/auth/register/final";
        const payload = {
            email: "example@example.com",
        };
        const mockData: ICreateUserDto = {
            name: { first: "first", last: "last" },
            account_type: "diamond",
            email: payload.email,
            password: "password",
            confirm_password: "password",
            mobile: "01234567890",
            address: {
                division: "division",
                district: "district",
                area: "area",
                upazila: "upazila",
                street: "street",
                house: "house",
            },
            verification_key: "abcdefgh",
            token: "123456",
        };

        beforeEach(async () => {
            try {
                const res = await request(server).post(url1).send(payload);
                mockData.token = res.body.data[0].token;
                mockData.verification_key = res.body.data[0].verification_key;
                expect(mockData.token).toBeTruthy();
                expect(mockData.verification_key).toBeTruthy();
            } catch (err) {
                expect(err).toBeFalsy();
            }
        });

        describe("given that the otp token was invalid", () => {
            it("should return 400", async () => {
                const newMockData = {
                    ...mockData,
                    token: "123456",
                };
                try {
                    const res = await request(server)
                        .post(url2)
                        .send(newMockData);
                    expect(res.status).toBe(400);
                } catch (err) {
                    expect(err).toBeFalsy();
                }
            });
        });

        // describe("given that the otp and verification_key is valid", () => {
        //     let userId: string;

        //     afterEach(async () => {
        //         try {
        //             const res = await request(server).delete(
        //                 `/api/v1/users/:${userId.toString()}`,
        //             );
        //             expect(res.status).toBe(200);
        //         } catch (err) {
        //             expect(err).toBeFalsy();
        //         }
        //     });

        //     it("should return 200", async () => {
        //         try {
        //             const res = await request(server).post(url2).send(mockData);
        //             expect(res.status).toBe(201);
        //             userId = res.body.data[0]._id.toString();
        //         } catch (err) {
        //             expect(err).toBeFalsy();
        //         }
        //     });

        //     it("should return user object", async () => {
        //         try {
        //             const res = await request(server).post(url2).send(mockData);
        //             expect(res.body.data[0].name.first).toBe("first");
        //             userId = res.body.data[0]._id.toString();
        //         } catch (err) {
        //             expect(err).toBeFalsy();
        //         }
        //     });
        // });
    });
});
