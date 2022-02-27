import { IUser } from '../interfaces';

export function omitUserData(data: IUser) {
  const newData: Omit<IUser, 'password'> = {
    _id: data._id,
    mobile: data.mobile,
    name: data.name,
    email: data.email,
    account_type: data.account_type,
    addresses: data.addresses,
  };
  return newData;
}
