import request from "supertest";
import { prepare, server } from "../../../src/server";
import type { ICreateUserDto } from "../../../src/interfaces/users.interface";

beforeAll((done) => {
    prepare();
    done();
});

afterAll((done) => {
    server.close(() => {
        done();
    });
});

describe("authRouter /api/v1/auth", () => {
    it("should return 401 if GET /login", (done) => {
        request(server).get("/api/v1/auth/login").expect(401, done);
    });

    describe("user login", () => {
        describe("login with unregistered email", () => {
            const url = "/api/v1/auth/login";

            it("should return 404 for unregistered user", (done) => {
                const payload = {
                    email: "example@email.com",
                    password: "password",
                };
                request(server).post(url).send(payload).expect(404, done);
            });

            it("should return 400 for incorrect password", (done) => {
                const payload = {
                    email: "islammasraful@gmail.com",
                    password: "incorrect password",
                };
                request(server).post(url).send(payload).expect(400, done);
            });

            it("should return 200 for correct credentials", (done) => {
                const payload = {
                    email: "islammasraful@gmail.com",
                    password: "password",
                };
                request(server).post(url).send(payload).expect(200, done);
            });
        });
    });

    describe("registering user", () => {
        describe("register step 1", () => {
            const url = "/api/v1/auth/register";
            it("should respond with 400 if no email is given", (done) => {
                request(server).post(url).send({ email: "" }).expect(400, done);
            });

            it("should respond with 200 if email is given", (done) => {
                const email = "example@email.com";
                request(server).post(url).send({ email }).expect(200, done);
            });

            it("should send a token and opt if an email is given", (done) => {
                request(server)
                    .post(url)
                    .send({ email: "example@email.com" })
                    .end((err, res) => {
                        if (err) {
                            done(new Error(err.message));
                            return;
                        }
                        const data = res.body.data[0];
                        if (data.token && data.verification_key) {
                            done();
                        } else done(data);
                    });
            });

            describe("while the email addresses is invalid", () => {
                it("should response with status code 400", (done) => {
                    const payload = {
                        email: "example.com",
                        password: "12345678",
                    };
                    request(server).post(url).send(payload).expect(400, done);
                });
            });
        });

        describe("registration step 2", () => {
            describe("given the otp token is invalid", () => {
                const url1 = "/api/v1/auth/register";
                const url2 = "/api/v1/auth/register/final";
                const payload = {
                    email: "example@example.com",
                };
                let token: string = "123456",
                    verification_key: string = "key";

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
                    verification_key,
                    token,
                };

                beforeEach(async () => {
                    try {
                        const res = await request(server)
                            .post(url1)
                            .send(payload);
                        token = res.body.data[0].token;
                        verification_key = res.body.data[0].verification_key;
                        expect(token).toBeTruthy();
                        expect(verification_key).toBeTruthy();
                    } catch (err) {
                        expect(err).toBeFalsy();
                    }
                });

                it("should response with status code 400", async () => {
                    mockData.token = "123456";
                    try {
                        const res = await request(server)
                            .post(url2)
                            .send(mockData);
                        expect(res.status).toBe(400);
                    } catch (err) {
                        expect(err).toBeFalsy();
                    }
                });
            });
        });
    });
});
