import type {
  IUser,
  IUserProfile,
  IUsersProfileDoc,
  IDone,
} from "../interfaces";
import { usersModel, registeredUsersModel } from "../models";

interface ICreateProfile extends Omit<IUserProfile, "_id"> {}

interface IRegProps {
  mobile: string;
  email: string;
}

interface IFindProps {
  id?: string;
  mobile?: string;
}

class UsersService {
  register({ mobile, email }: IRegProps, done: IDone<IUser>) {
    const userDoc = new registeredUsersModel({ mobile, email });
    userDoc.save(done);
  }

  find({ id, mobile }: IFindProps, done: IDone<IUser>) {
    if (id) {
      usersModel.findById(id, done);
    } else if (mobile) {
      usersModel.findOne({ mobile }, done);
    } else done(new Error("User not found"));
  }
}

export const usersService = new UsersService();
