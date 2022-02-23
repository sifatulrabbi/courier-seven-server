import type { IUser, IUserProfile, IDone } from "../interfaces";
import { usersModel, userProfilesModel } from "../models";

interface ICreateUser {
  mobile: string;
  first_name: string;
  last_name: string;
}

interface ICreateProfile extends Omit<IUserProfile, "_id"> {
  confirm_password: string;
}

interface IFindProps {
  id?: string;
  mobile?: string;
}

interface IFindProfile {
  userId?: string;
  profileId?: string;
}

class UsersService {
  // get all users
  findAll(done: IDone<IUser[]>) {
    try {
      usersModel.find({}, done);
    } catch (err: any) {
      done(err);
    }
  }

  // create primary user with mobile
  createUser(
    { first_name, last_name, mobile }: ICreateUser,
    done: IDone<IUser>
  ) {
    try {
      const userDoc = new usersModel({
        mobile,
        name: { first: first_name, last: last_name },
      });
      userDoc.save(done);
    } catch (err: any) {
      done(err);
    }
  }

  // find primary user doc with userId or mobile number
  findUser({ id, mobile }: IFindProps, done: IDone<IUser>) {
    try {
      if (id) return usersModel.findById(id, done);
      if (mobile) return usersModel.findOne({ mobile: mobile }, done);
      done(new Error("mobile or email is required"));
    } catch (err: any) {
      done(err);
    }
  }

  // update user mobile number
  updateUser(userId: string, mobile: string, done: IDone<IUser>) {
    try {
      this.findUser({ id: userId }, (err: any, user?: IUser) => {
        if (err) return done(err);
        if (!user) return done(new Error("User not found"));

        usersModel.findByIdAndUpdate(userId, { mobile }, done);
      });
    } catch (err: any) {
      done(err);
    }
  }

  // remove user and call removeProfile function
  removeUser(userId: string, done: IDone<IUser>) {
    try {
      this.findUser({ id: userId }, (err: any, user?: IUser) => {
        if (err) return done(err);
        if (!user) return done(new Error("User not found"));

        usersModel.findByIdAndRemove(userId, (err: any) => {
          if (err) return done(err);

          this.removeProfile(userId, (err: any, profile?: IUserProfile) => {
            if (err) return done(err);
            if (!profile) {
              return done(new Error("User not found"));
            }

            done(null, user);
          });
        });
      });
    } catch (err) {
      done(err);
    }
  }

  // create profile for a primary user
  createProfile(data: ICreateProfile, done: IDone<IUserProfile>) {
    if (data.password !== data.confirm_password) {
      return done(new Error("Passwords don't match"));
    }

    try {
      const userDoc = new userProfilesModel(data);
      userDoc.save(done);
    } catch (err: any) {
      done(err);
    }
  }

  // find user profile with userId or profileId
  findProfile(prop: IFindProfile, done: IDone<IUserProfile>) {
    try {
      switch (prop) {
        case prop.profileId:
          userProfilesModel.findById(prop.profileId, done);
          break;
        case prop.userId:
          userProfilesModel.findOne({ user_id: prop.userId }, done);
        default:
          done(new Error("userId or profileId not found"));
      }
    } catch (err: any) {
      done(err);
    }
  }

  // update user profile
  updateProfile(
    userId: string,
    data: Partial<ICreateProfile>,
    done: IDone<IUserProfile>
  ) {
    if (data.password && data.password !== data.confirm_password) {
      return done(new Error("Passwords don't match"));
    }

    try {
      this.findUser({ id: userId }, (err: any, user?: IUser) => {
        if (err) return done(err);
        if (!user) return done(new Error("User not found"));

        this.findProfile({ userId }, (err: any, profile?: IUserProfile) => {
          if (err) return done(err);

          userProfilesModel.findOneAndUpdate({ user_id: userId }, data, done);
        });
      });
    } catch (err: any) {
      done(err);
    }
  }

  // remove user profile
  removeProfile(userId: string, done: IDone<IUserProfile>) {
    try {
      this.findProfile({ userId }, (err: any, profile?: IUserProfile) => {
        if (err) return done(err);
        if (!profile) {
          return done(new Error("User profile does not exist"));
        }

        userProfilesModel.findOneAndRemove({ user_id: userId }, done);
      });
    } catch (err: any) {
      done(err);
    }
  }
}

export const usersService = new UsersService();
