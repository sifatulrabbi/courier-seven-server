import { IUser, IUserDoc } from "../interfaces";
import { usersModel } from "../models";

interface ICreateUser extends Omit<IUser, "_id"> {}

class UsersService {
  async create(createUserDto: ICreateUser) {
    try {
      const userDoc: IUserDoc = new usersModel(createUserDto);
    } catch (err) {}
  }
}

export const usersService = new UsersService();
