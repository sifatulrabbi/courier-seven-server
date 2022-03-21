import request from "supertest";
import { prepare, server } from "../../src/server";
import type {
    ICreateUserDto,
    IAccountTypes,
    IAddress,
} from "../../src/interfaces";
import { usersService } from "../../src/services/users.service";

beforeAll(async () => {
    await prepare();
});

afterAll((done) => {
    server.close();
    done();
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
            request(server).post(url).send(payload).expect(401, done);
        });
    });

    describe("given that the credentials are correct", () => {
        const payload = {
            email: "islammasraful@gmail.com",
            password: "password",
        };

        it("should return 200", (done) => {
            request(server).post(url).send(payload).expect(200, done);
        });

        it("should return a token", async () => {
            try {
                const res = await request(server).post(url).send(payload);
                expect(res.body.data[0].token).toBeTruthy();
            } catch (err) {
                expect(err).toBeFalsy();
            }
        });
    });
});

const url1 = "/api/v1/auth/register";
const url2 = "/api/v1/auth/register/final";
const payload = {
    email: "example@example.com",
};

class MockData implements ICreateUserDto {
    name: { first: string; last: string };
    email: string;
    account_type: IAccountTypes;
    password: string;
    confirm_password: string;
    mobile: string;
    address: IAddress;
    verification_key: string;
    token: string;

    constructor(email: string, verification_key: string, token: string) {
        this.account_type = "diamond";
        this.address = {
            district: "district",
            upazila: "upazila",
            area: "area",
            street: "street",
            house: "house",
        };
        this.name = { first: "first", last: "last" };
        this.email = email;
        this.token = token;
        this.verification_key = verification_key;
        this.mobile = "01234516459";
        this.password = "password";
        this.confirm_password = "password";
    }
}

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
        let mockData: ICreateUserDto;

        beforeEach(async () => {
            try {
                const res = await request(server).post(url1).send(payload);
                const token = res.body.data[0].token;
                const verification_key = res.body.data[0].verification_key;
                mockData = new MockData(payload.email, verification_key, token);
                expect(token).toBeTruthy();
                expect(verification_key).toBeTruthy();
            } catch (err) {
                expect(err).toBeFalsy();
            }
        });

        describe("given that the otp token was invalid", () => {
            it("should return 400", async () => {
                try {
                    const data = { ...mockData, token: "0123456" };
                    const res = await request(server).post(url2).send(data);
                    expect(res.status).toBe(400);
                } catch (err) {
                    expect(err).toBeFalsy();
                }
            });
        });

        describe("given that the token and verification_key was valid", () => {
            let userId: string = "Some user id";

            afterEach((done) => {
                usersService.remove(userId, () => {
                    done();
                });
            });

            it("should return 201", async () => {
                try {
                    const res = await request(server).post(url2).send(mockData);
                    expect(res.body.data).toBeTruthy();
                    if (res.body.data[0]._id) {
                        userId = res.body.data[0]._id.toString();
                    } else throw new Error("not user id found");
                } catch (err) {
                    expect(err).toBeFalsy();
                }
            });
        });
    });
});
