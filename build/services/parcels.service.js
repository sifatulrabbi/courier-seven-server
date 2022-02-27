"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parcelsService = void 0;
const models_1 = require("../models");
const shops_service_1 = require("./shops.service");
class ParcelsService {
    // create parcel
    async create(data, done) {
        try {
            const shop = await shops_service_1.shopsService.findShop(data.shop_id);
            if (!shop)
                throw new Error('Shop id invalid');
            const parcelData = { ...data };
            parcelData.shop = {
                shop_id: shop._id,
                owner: data.user_name,
                name: shop.name,
                mobile: shop.mobile,
                email: shop.email,
                address: shop.address,
            };
            const parcelDoc = new models_1.parcelsModel(parcelData);
            const parcel = await parcelDoc.save();
            done(null, parcel);
        }
        catch (err) {
            done(err);
        }
    }
    // update parcel
    async update(parcelId, data, done) {
        try {
            const parcel = await models_1.parcelsModel.findByIdAndUpdate(parcelId, data, {
                new: true,
            });
            if (!parcel)
                done(null);
            else
                done(null, parcel);
        }
        catch (err) {
            done(err);
        }
    }
    // remove parcel
    async remove(parcelId, done) {
        try {
            const parcel = await models_1.parcelsModel.findByIdAndRemove(parcelId);
            if (!parcel)
                done(null);
            else
                done(null, parcel);
        }
        catch (err) {
            done(err);
        }
    }
    // find a parcel
    async findOne(parcelId, done) {
        try {
            const parcel = await models_1.parcelsModel.findById(parcelId);
            if (!parcel) {
                if (done)
                    done(null);
                return null;
            }
            if (done)
                done(null, parcel);
            return parcel;
        }
        catch (err) {
            if (done)
                done(err);
            return null;
        }
    }
    async findByShop(shopId, invoiceId, done) {
        try {
            const query = { shop: { shop_id: shopId } };
            if (invoiceId) {
                Object.defineProperty(query, 'invoice_id', {
                    value: invoiceId,
                    writable: false,
                });
            }
            const parcel = await models_1.parcelsModel.find(query);
            if (!parcel)
                return done(null);
            done(null, parcel);
        }
        catch (err) {
            done(err);
        }
    }
    // finds all the parcels
    async all(done) {
        try {
            const parcels = await models_1.parcelsModel.find({});
            if (!parcels) {
                done(null);
                return null;
            }
            done(null, parcels);
            return parcels;
        }
        catch (err) {
            done(err);
            return null;
        }
    }
}
exports.parcelsService = new ParcelsService();
