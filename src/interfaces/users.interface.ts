import { HydratedDocument, Model } from "mongoose";
import { IAccountTypes } from "./interfaces";

export interface IUser {
    _id?: string;
    mobile: string;
}

export interface IUserProfile {
    _id?: string;
    user_id: string;
    email: string;
    name: {
        first: string;
        last: string;
    };
    password: string;
    addresses: {
        present: {
            district: string;
            area: string;
            street: string;
            houser: string;
        };
        permanent: {
            district: string;
            area: string;
            street: string;
            houser: string;
        };
    };
    account_type: IAccountTypes;
}

export interface IUserMethods {
    comparePassword: (password: string) => Promise<boolean>;
}

export type IUsersDoc = HydratedDocument<IUser>;

export type IUsersProfileModel = Model<IUserProfile, {}, IUserMethods>;

export type IUsersProfileDoc = HydratedDocument<IUserProfile, IUserMethods>;
