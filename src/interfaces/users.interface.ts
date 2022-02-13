import { HydratedDocument, Model } from "mongoose";
import { AccountTypes } from "./account-types.interface";

export interface IUser {
  _id?: string;
  mobile: string;
  email: string;
}

export interface IUserProfile {
  _id?: string;
  user_id: string;
  name: {
    first: string;
    last: string;
  };
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

export type IUsersDoc = HydratedDocument<IUser>;

export type IUsersProfileModel = Model<IUserProfile, {}, IUserMethods>;

export type IUsersProfileDoc = HydratedDocument<IUserProfile, IUserMethods>;
