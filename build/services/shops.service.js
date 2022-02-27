"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopsService = void 0;
const shops_model_1 = require("../models/shops.model");
const users_service_1 = require("./users.service");
class ShopsService {
    constructor() {
        users_service_1.usersService.subscribe('remove', (user) => {
            this.removeByUser(user._id);
        });
    }
    // finds all the shops
    async allShops(done) {
        try {
            const shops = await shops_model_1.shopsModel.find({});
            done(null, shops);
        }
        catch (err) {
            done(err);
        }
    }
    // find all the shops of a single user
    async findUsersShop({ userId }, done) {
        try {
            const shops = await shops_model_1.shopsModel.find({ owner_id: userId });
            done(null, shops);
        }
        catch (err) {
            done(err);
        }
    }
    // finds a single shop
    async findShop(shopId, done) {
        try {
            const shop = await shops_model_1.shopsModel.findById(shopId);
            if (!shop) {
                if (done)
                    done(null);
                return null;
            }
            if (done)
                done(null, shop);
            return shop;
        }
        catch (err) {
            if (done)
                done(err);
            return null;
        }
    }
    // creates a shop
    async create(data, done) {
        try {
            // look for duplicate shop name
            const duplicate = await shops_model_1.shopsModel.findOne({
                owner_id: data.owner_id,
                name: data.name,
            });
            if (duplicate) {
                throw new Error("Can't have multiple shops with the same name");
            }
            // create the shop
            const shopDoc = new shops_model_1.shopsModel(data);
            const shop = await shopDoc.save();
            done(null, shop);
        }
        catch (err) {
            done(err);
        }
    }
    // updates a shop
    async update(shopId, data, done) {
        try {
            // look for duplicate shop name
            const duplicate = await shops_model_1.shopsModel.findOne({
                owner_id: data.owner_id,
                name: data.name,
            });
            if (duplicate) {
                throw new Error('Shop name has been taken please use another name');
            }
            // find the shop with owner id, shop id and update
            const shop = await shops_model_1.shopsModel.findOne({
                owner_id: data.owner_id,
                _id: shopId,
            });
            if (!shop)
                return done(null);
            const updatedShop = await shops_model_1.shopsModel.findByIdAndUpdate(shopId, data, {
                new: true,
            });
            if (!updatedShop)
                return done(null);
            done(null, updatedShop);
        }
        catch (err) {
            done(err);
        }
    }
    // remove shop
    async remove(shopId, ownerId, done) {
        try {
            // find shop with owner id, shop id and remove
            const shop = await shops_model_1.shopsModel.findOne({
                owner_id: ownerId,
                _id: shopId,
            });
            if (!shop) {
                return done(null);
            }
            await shop.remove(done);
        }
        catch (err) {
            done(err);
        }
    }
    async removeByUser(userId) {
        try {
            await shops_model_1.shopsModel.remove({ owner_id: userId.toString() });
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.shopsService = new ShopsService();
