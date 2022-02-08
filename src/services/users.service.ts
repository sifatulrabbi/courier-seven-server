import { IUser, IUserDoc } from "../interfaces";
import { usersModel } from "../models";

interface ICreateUser extends Omit<IUser, "_id"> {}

class UsersService {
  async getAll() {
    try {
      const users = await usersModel.find({}, "_id email name mobile");
      return users;
    } catch (err) {
      throw new Error(String(err));
    }
  }

  async find({ id, mobile }: { id?: string; mobile?: string }) {
    try {
      const user = id
        ? await usersModel.findById(id)
        : mobile
        ? await usersModel.findOne({ mobile })
        : null;
      return user;
    } catch (err) {}
  }

  async create(createUserDto: ICreateUser) {
    try {
      const userDoc: IUserDoc = new usersModel({
        ...createUserDto,
        mobile: String(createUserDto.mobile),
      });
      const user = await userDoc.save();
      return user;
    } catch (err) {
      throw new Error(String(err));
    }
  }

  async update(id: string, updateUserDto: Partial<ICreateUser>) {
    try {
      const user = await this.find({ id });

      if (!user) {
        return null;
      }

      const data = updateUserDto;
      const updatedUser = await user.updateOne({ ...data });
      return updatedUser;
    } catch (err) {
      throw new Error(String(err));
    }
  }

  async remove(id: string) {
    try {
      const user = await this.find({ id });

      if (!user) {
        return null;
      }

      await user.remove();
      return user.email;
    } catch (err) {
      throw new Error(String(err));
    }
  }
}

export const usersService = new UsersService();
