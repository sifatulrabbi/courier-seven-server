import { HydratedDocument, Model } from "mongoose";
import { IAddress } from "./interfaces";

export interface IParcel {
    _id?: string;
    customer: {
        name: string;
        mobile: string;
        address: IAddress;
    };
    product: {
        price: number;
        weight: number;
        type: string;
    };
    pickup_address: IAddress;
    collection_amount: number;
    description?: string;
    notes?: string;
    created_at: string;
}

export type IParcelDoc = HydratedDocument<IParcel>;

export type IParcelsModel = Model<IParcel>;
