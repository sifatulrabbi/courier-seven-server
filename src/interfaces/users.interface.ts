import { HydratedDocument, Model } from "mongoose";
import { AccountTypes } from "./account-types.interface";

export interface IUser {
  _id?: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  mobile: string;
  password: string;
  present_address: {
    district: string;
    area: string;
    street: string;
    houser: string;
  };
  permanent_address: {
    district: string;
    area: string;
    street: string;
    houser: string;
  };
  account_type: AccountTypes;
}

export interface IUserMethods {
  comparePassword: (password: string) => Promise<boolean>;
}

export type IUserModel = Model<IUser, {}, IUserMethods>;

export type IUserDoc = HydratedDocument<IUser, IUserMethods>;

export type IUserSession = Omit<IUser, "password">;
