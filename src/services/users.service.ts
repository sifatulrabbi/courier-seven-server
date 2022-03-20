import type {
    IUser,
    IDone,
    ICreateUserDto,
    IUpdateUserDto,
    IUserDoc,
} from '../interfaces';
import { usersModel } from '../models';
import { omitUserData } from '../lib';

class UsersService {
    // create user
    async create(data: ICreateUserDto, done: IDone<Omit<IUser, 'password'>>) {
        if (data.password !== data.confirm_password) {
            done(
                new Error(
                    'Password: password and confirm_password did not match',
                ),
            );
            return;
        }

        try {
            // @ts-ignore
            const userDoc: IUserDoc = new usersModel(data);
            const user: IUserDoc = await userDoc.save();
            done(null, omitUserData(user));
        } catch (err: any) {
            done(err);
        }
    }

    // update user
    async update(userId: string, data: IUpdateUserDto, done: IDone<IUser>) {
        try {
            if (data.password) data.password = undefined;
            if (data.confirm_password) data.confirm_password = undefined;

            const user = await this.findOne({ id: userId });
            if (!user) return done(null);
            // update queue
            if (data.account_type) user.account_type = data.account_type;
            if (data.address) user.address = data.address;
            if (data.email) user.email = data.email;
            if (data.mobile) user.mobile = data.mobile;
            if (data.name) {
                if (data.name.first) user.name.first = data.name.first;
                if (data.name.last) user.name.last = data.name.last;
            }
            const updatedUser = await user.save();
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
        { id, mobile, email }: { id?: string; mobile?: string; email?: string },
        done?: IDone<IUser>,
    ) {
        try {
            // @ts-ignore
            const user: IUserDoc | null = id
                ? await usersModel.findById(id)
                : mobile
                ? await usersModel.findOne({ mobile })
                : email
                ? usersModel.findOne({ email })
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
