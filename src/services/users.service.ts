import type {
  IUser,
  IDone,
  ICreateUserDto,
  IUpdateUserDto,
} from "../interfaces";
import { usersModel } from "../models";

class UsersService {
  // create user
  async create(data: ICreateUserDto, done: IDone<IUser>) {
    if (data.password !== data.confirm_password) {
      done(new Error("Password: password and confirm_password did not match"));
      return;
    }

    const userDoc = new usersModel(data);
    const user = await userDoc.save();
    done(null, user);
  }

  // update user
  async update(userId: string, data: IUpdateUserDto, done: IDone<IUser>) {
    if (data.password && data.password !== data.confirm_password) {
      done(new Error("Password: password and confirm_password did not match"));
      return;
    }

    const updatedUser = await usersModel.findByIdAndUpdate(userId, data, {
      new: true,
    });
    if (!updatedUser) return done(new Error("User not found please register"));
    done(null, updatedUser);
  }

  // remove user
  async remove(userId: string, done: IDone<string>) {
    const removedUser = await usersModel.findByIdAndRemove(userId);
    if (!removedUser) return done(new Error("Unable to remove user"));
    done(null, "User removed");
  }
  // find user with id and mobile
  async findOne(
    { id, mobile }: { id?: string; mobile?: string },
    done: IDone<IUser>
  ) {
    if (id) {
      const user = await usersModel.findById(id);
      if (!user) return done(new Error("User not found"));
      done(null, user);
    }

    if (mobile) {
      const user = await usersModel.findOne({ mobile: mobile });
      if (!user) return done(new Error("User not found"));
      done(null, user);
    }
  }

  // find all the user
  async findAll(done: IDone<IUser[]>) {
    const users = await usersModel.find({});
    done(null, users);
  }
}

export const usersService = new UsersService();
