import { HydratedDocument, Model } from "mongoose";
import { IAddress } from "./interfaces";
import { IProductTypes } from "./interfaces";

export interface IParcel {
    _id: string;
    invoice_id: string;
    shop: {
        shop_id: string;
        name: string;
        owner: string;
        email?: string;
        mobile: string;
        address: IAddress;
    };
    customer: {
        name: string;
        mobile: string;
        email?: string;
        address: IAddress;
    };
    product: {
        price: number;
        weight: number;
        type: IProductTypes;
    };
    collection_amount: number;
    notes?: string;
}

export type IParcelDoc = HydratedDocument<IParcel>;

export type IParcelsModel = Model<IParcel>;

export interface ICreateParcelDto {
    invoice_id: string;
    collection_amount: number;
    shop_id: string;
    user_name: string;
    customer: {
        name: string;
        mobile: string;
        email?: string;
        address: IAddress;
    };
    product: {
        price: number;
        weight: number;
        type: IProductTypes;
    };
    notes?: string;
}

export type IUpdateParcelDto = Partial<ICreateParcelDto>;
