import { HydratedDocument } from "mongoose";
import { IAddress } from "./interfaces";

export interface IShop {
    _id: string;
    owner_id: string;
    name: string;
    mobile: string;
    email?: string;
    address: IAddress;
}

export type IShopDoc = HydratedDocument<IShop>;

export type ICreateShopDto = Omit<IShop, "_id">;

export type IUpdateShopDto = Partial<ICreateShopDto>;
