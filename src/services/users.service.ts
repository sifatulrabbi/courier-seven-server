import type {
  IUser,
  IDone,
  ICreateUserDto,
  IUpdateUserDto,
  IUserDoc,
} from '../interfaces';
import { usersModel } from '../models';

class UsersService {
  // create user
  async create(data: ICreateUserDto, done: IDone<IUser>) {
    if (data.password !== data.confirm_password) {
      done(new Error('Password: password and confirm_password did not match'));
      return;
    }

    try {
      // @ts-ignore
      const userDoc: IUserDoc = new usersModel(data);
      const user: IUserDoc = await userDoc.save();
      done(null, user);
    } catch (err: any) {
      done(err);
    }
  }

  // update user
  async update(userId: string, data: IUpdateUserDto, done: IDone<IUser>) {
    if (data.password && data.password !== data.confirm_password) {
      done(new Error('Password: password and confirm_password did not match'));
      return;
    }

    try {
      const updatedUser = await usersModel.findByIdAndUpdate(userId, data, {
        new: true,
      });
      if (!updatedUser) return done(null);
      done(null, updatedUser);
    } catch (err: any) {
      done(err);
    }
  }

  // remove user
  async remove(userId: string, done: IDone<string>) {
    const removedUser = await usersModel.findByIdAndRemove(userId);
    if (!removedUser) return done(new Error('Unable to remove user'));
    done(null, 'User removed');
  }

  // find user with id and mobile
  async findOne(
    { id, mobile }: { id?: string; mobile?: string },
    done?: IDone<IUser>,
  ) {
    try {
      // @ts-ignore
      const user: IUserDoc | null = id
        ? await usersModel.findById(id)
        : mobile
        ? await usersModel.findOne({ mobile: mobile })
        : null;

      if (!user) {
        if (done) done(null);
        return null;
      }
      if (done) done(null, user);
      return user;
    } catch (err: any) {
      if (done) done(err);
      return null;
    }
  }

  // find all the user
  async all(done: IDone<IUser[]>) {
    const users = await usersModel.find({});
    done(null, users);
  }
}

export const usersService = new UsersService();
