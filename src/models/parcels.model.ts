import type { IParcel } from '../interfaces';
import mongoose from 'mongoose';

const parcelsSchema = new mongoose.Schema<IParcel>(
    {
        invoice_id: { type: String, required: true },
        shop: {
            shop_id: { type: String, required: true },
            name: { type: String, required: true },
            mobile: { type: String, required: true },
            owner: { type: String, required: true },
            email: { type: String },
            address: {
                district: { type: String, required: true },
                sub_district: { type: String, required: true },
                area: { type: String, required: true },
                street: { type: String, required: true },
                house: { type: String, required: true },
            },
        },
        customer: {
            name: { type: String, required: true },
            mobile: { type: String, required: true },
            email: { type: String },
            address: {
                district: { type: String, required: true },
                sub_district: { type: String, required: true },
                area: { type: String, required: true },
                street: { type: String, required: true },
                house: { type: String, required: true },
            },
        },
        product: {
            price: { type: Number, required: true },
            weight: { type: Number, required: true },
            type: { type: String, required: true },
        },
        collection_amount: { type: Number, required: true },
        notes: { type: String, required: true },
    },
    {
        timestamps: true,
        autoCreate: false,
    },
);

export const parcelsModel = mongoose.model<IParcel>('parcels', parcelsSchema);
