import { usersService } from "../../src/services/users.service";
import { connectDb } from "../../src/lib/connect-db";
import { ICreateUserDto } from "../../src/interfaces/users.interface";

let mockData: ICreateUserDto = {
    name: { first: "first", last: "last" },
    account_type: "diamond",
    email: "test@test.com",
    password: "password",
    confirm_password: "password",
    mobile: "01234567890",
    address: {
        district: "district",
        area: "area",
        upazila: "upazila",
        street: "street",
        house: "house",
    },
    verification_key: "key",
    token: "123456",
};

let mockUserId: string;

beforeAll(async () => {
    await connectDb();
});

function createMockUser(done: jest.DoneCallback) {
    usersService.create(mockData, (err, result) => {
        expect(err).toBeFalsy();
        // @ts-ignore
        mockUserId = result._id.toString();
        return done();
    });
}

function cleanup(done: jest.DoneCallback) {
    usersService.remove(mockUserId, (err, result) => {
        if (err) return done(err);
        return done();
    });
}

describe("Create user tests", () => {
    describe("given user passwords didn't match", () => {
        it('should fail with "password" and "passwords"', (done) => {
            const data = {
                ...mockData,
                confirm_password: "passwords",
            };
            usersService.create(data, (err, result) => {
                expect(err).toBeTruthy();
                expect(result).toBeFalsy();
                done();
            });
        });
    });

    describe("given right data", () => {
        it("should pass and return an user doc", (done) => {
            usersService.create(mockData, (err, result) => {
                expect(err).toBeFalsy();
                expect(result).toBeTruthy();
                // @ts-ignore
                mockUserId = result._id.toString();
                cleanup(done);
            });
        });
    });
});

describe("finding user", () => {
    beforeAll((done) => {
        createMockUser(done);
    });

    afterAll((done) => {
        cleanup(done);
    });

    describe("given user does not exists", () => {
        it("should throw error for unknown user id", (done) => {
            usersService.findOne({ id: "invalid_user_id" }, (err, result) => {
                expect(err).toBeTruthy();
                expect(result).toBeFalsy();
                done();
            });
        });
    });

    describe("given user exists", () => {
        it("should find user with user id", (done) => {
            usersService.findOne({ id: mockUserId }, (err, result) => {
                expect(err).toBeFalsy();
                expect(result).toBeTruthy();
                done();
            });
        });

        it("should find user with user email", (done) => {
            usersService.findOne({ email: mockData.email }, (err, result) => {
                expect(err).toBeFalsy();
                expect(result).toBeTruthy();
                done();
            });
        });

        it("should find user with mobile", (done) => {
            usersService.findOne({ mobile: mockData.mobile }, (err, result) => {
                expect(err).toBeFalsy();
                expect(result).toBeTruthy();
                done();
            });
        });
    });
});

describe("updating user", () => {
    beforeAll((done) => {
        createMockUser(done);
    });

    afterAll((done) => {
        cleanup(done);
    });

    describe("given user does not exists", () => {
        it("should throw error with some_invalid_id", (done) => {
            usersService.update("invalid_id", {}, (err, result) => {
                expect(err).toBeTruthy();
                expect(result).toBeFalsy();
                done();
            });
        });
    });

    describe("given user exists", () => {
        it("should update name", (done) => {
            const data: Partial<ICreateUserDto> = {
                name: { first: "Updated", last: "updated" },
            };
            usersService.update(mockUserId, data, (err, result) => {
                expect(err).toBeFalsy();
                if (!result) done(new Error("No user found"));
                else {
                    expect(result.name.last).toBe("updated");
                    expect(result.name.first).toBe("Updated");
                }
                done();
            });
        });

        it("should only update the first name", (done) => {
            const data = { name: { first: "Again", last: "" } };
            usersService.update(mockUserId, data, (err, result) => {
                expect(err).toBeFalsy();
                if (!result) return done(new Error("Unable to find user"));
                expect(result.name.first).toBe("Again");
                expect(result.name.last).toBe("updated");
                done();
            });
        });
    });
});
