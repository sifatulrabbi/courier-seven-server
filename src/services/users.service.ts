import type { IUser, IUserProfile, IDone } from "../interfaces";
import { usersModel, usersProfileModel } from "../models";

interface ICreateProfile extends Omit<IUserProfile, "_id" | "user_id"> {}

interface IRegProps {
    mobile: string;
    email: string;
}

interface IFindProps {
    id?: string;
    mobile?: string;
}

class UsersService {
    createUser({ mobile, email }: IRegProps, done: IDone<IUser>) {
        try {
            const userDoc = new usersModel({ mobile, email });
            userDoc.save(done);
        } catch (err: any) {
            done(new Error(err.message));
        }
    }

    find({ id, mobile }: IFindProps, done: IDone<IUser>) {
        try {
            if (id) return usersModel.findById(id, done);
            if (mobile) return usersModel.findOne({ mobile: mobile }, done);
            done(new Error("mobile or email is required"));
        } catch (err: any) {
            done(new Error(err.message));
        }
    }

    findProfile(user_id: string, done: IDone<IUserProfile>) {
        try {
            usersProfileModel.findById(user_id, done);
        } catch (err: any) {
            done(new Error(err.message));
        }
    }

    async createProfile(
        userId: string,
        { name, addresses, account_type }: ICreateProfile,
        done: IDone<IUserProfile>
    ) {
        try {
            this.find({ id: userId }, (err, user) => {
                if (err) return done(err);
                if (!user) return done(new Error("User not found"));
                const userProfileDoc = new usersProfileModel({
                    user_id: user?._id,
                    name,
                    addresses,
                    account_type,
                });
                userProfileDoc.save(done);
            });
        } catch (err: any) {
            done(new Error(err.message));
        }
    }

    async updateProfile(
        userId: string,
        { name, addresses, account_type }: Partial<ICreateProfile>,
        done: IDone<IUserProfile>
    ) {
        try {
            this.find({ id: userId }, (err, user) => {
                if (err) return done(err);
                if (!user) return done(new Error("User not found"));

                this.findProfile(userId, (err, userProfile) => {
                    if (err) return done(err);
                    if (!userProfile) return done(new Error("User not found"));

                    if (userProfile._id !== user._id) {
                        return done(new Error("User not authorized"));
                    }

                    const data = Object.assign(userProfile, {
                        name,
                        addresses,
                        account_type,
                    });

                    usersProfileModel.updateMany(data, done);
                });
            });
        } catch (err: any) {
            done(new Error(err.message));
        }
    }

    async removeUser(userId: string, done: IDone<string>) {
        try {
            this.find({ id: userId }, (err, user) => {
                if (err) return done(err);
                if (!user) return done(new Error("User not found"));

                usersModel.findByIdAndRemove(userId, (err: any) => {
                    if (err) return done(new Error(String(err)));

                    usersProfileModel.findOneAndRemove(
                        { user_id: userId },
                        (err: any) => {
                            if (err) return done(new Error(String(err)));
                            done(null, "User removed");
                        }
                    );
                });
            });
        } catch (err) {
            done(new Error("Unable to remove user please try again later"));
        }
    }
}

export const usersService = new UsersService();
