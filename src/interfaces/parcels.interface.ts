import { HydratedDocument, Model } from "mongoose";
import { IAddress } from "./interfaces";
import { IProductTypes } from "./interfaces";

export interface IParcel {
  _id?: string;
  invoice_id: string;
  customer: {
    name: string;
    mobile: string;
    address: IAddress;
  };
  product: {
    price: number;
    weight: number;
    type: IProductTypes;
  };
  shop: {
    shop_id: string;
    name: string;
    address: IAddress;
  };
  collection_amount: number;
  notes?: string;
  created_at: string;
  delivery: {
    hubs: [];
    riders: [];
  };
}

export type IParcelDoc = HydratedDocument<IParcel>;

export type IParcelsModel = Model<IParcel>;
