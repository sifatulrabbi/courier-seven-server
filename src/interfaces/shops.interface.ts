import { HydratedDocument } from "mongoose";
import { IAddress } from "./interfaces";

export interface IShop {
    _id?: string;
    owner_id: string;
    name: string;
    address: IAddress;
    mobile: string;
}

export type IShopDoc = HydratedDocument<IShop>;
