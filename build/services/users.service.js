"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersService = void 0;
const models_1 = require("../models");
class UsersService {
    // create user
    async create(data, done) {
        if (data.password !== data.confirm_password) {
            done(new Error('Password: password and confirm_password did not match'));
            return;
        }
        try {
            // @ts-ignore
            const userDoc = new models_1.usersModel(data);
            const user = await userDoc.save();
            done(null, user);
        }
        catch (err) {
            done(err);
        }
    }
    // update user
    async update(userId, data, done) {
        if (data.password && data.password !== data.confirm_password) {
            done(new Error('Password: password and confirm_password did not match'));
            return;
        }
        try {
            const updatedUser = await models_1.usersModel.findByIdAndUpdate(userId, data, {
                new: true,
            });
            if (!updatedUser)
                return done(null);
            done(null, updatedUser);
        }
        catch (err) {
            done(err);
        }
    }
    // remove user
    async remove(userId, done) {
        const removedUser = await models_1.usersModel.findByIdAndRemove(userId);
        if (!removedUser)
            return done(new Error('Unable to remove user'));
        done(null, 'User removed');
    }
    // find user with id and mobile
    async findOne({ id, mobile }) {
        // @ts-ignore
        const user = id
            ? await models_1.usersModel.findById(id)
            : mobile
                ? await models_1.usersModel.findOne({ mobile: mobile })
                : null;
        return user;
    }
    // find all the user
    async findAll(done) {
        const users = await models_1.usersModel.find({});
        done(null, users);
    }
}
exports.usersService = new UsersService();
