import { HydratedDocument, Model } from 'mongoose';
import { IAccountTypes, IAddress } from './interfaces';

export interface IUser {
  _id: string;
  mobile: string;
  email: string;
  name: {
    first: string;
    last: string;
  };
  account_type: IAccountTypes;
  password: string;
  addresses: {
    present: IAddress;
    permanent: IAddress;
  };
}

export interface IUserMethods {
  comparePassword: (password: string) => Promise<boolean>;
}

export type IUserDoc = HydratedDocument<IUser, IUserMethods>;

export type IUsersModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export interface ICreateUserDto extends Omit<IUser, '_id'> {
  confirm_password: string;
  token: string;
  verification_key: string;
}

export type IUpdateUserDto = Partial<ICreateUserDto>;

export type IUserEvent = 'save' | 'update' | 'remove';
