import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, IUserProfile, IUsersProfileModel } from "../interfaces";

const usersSchema = new Schema<IUser>({
    email: { type: String, required: true },
    mobile: { type: String, require: true },
});

const usersProfileSchema = new Schema<IUserProfile, IUsersProfileModel>(
    {
        user_id: { type: String, required: true },
        name: {
            first: { type: String, require: true },
            last: { type: String, require: true },
        },
        account_type: { type: String, require: true },
        addresses: {
            permanent: {
                district: { type: String, require: true },
                area: { type: String, require: true },
                street: { type: String, require: true },
                house: { type: String, require: true },
            },
            present: {
                district: { type: String, require: true },
                area: { type: String, require: true },
                street: { type: String, require: true },
                house: { type: String, require: true },
            },
        },
    },
    {
        timestamps: true,
        autoCreate: false,
    }
);

// usersSchema.pre("save", async function (this: IUserProfile, next) {
//   const hash = await bcrypt.hash(this.password, 10);
//   this.password = hash;
//   next();
// });

// usersSchema.methods.comparePassword = async function (
//   this: IUserProfile,
//   password: string
// ) {
//   const compare = await bcrypt.compare(password, this.password);
//   return compare;
// };

export const usersModel = model<IUser>("registered-users", usersSchema);

export const usersProfileModel = model<IUserProfile, IUsersProfileModel>(
    "users",
    usersProfileSchema
);
