import type { IShop } from "../interfaces";
import mongoose from "mongoose";

const shopsSchema = new mongoose.Schema<IShop>({
    owner_id: { type: String, required: true },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String },
    address: {
        district: { type: String, required: true },
        upazila: { type: String, required: true },
        area: { type: String, required: true },
        street: { type: String, required: true },
        house: { type: String, required: true },
    },
});

export const shopsModel = mongoose.model<IShop>("user-shops", shopsSchema);
