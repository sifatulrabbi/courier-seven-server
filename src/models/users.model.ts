import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUserModel, IUser, IRegUser } from "../interfaces";

const registeredUsersSchema = new Schema<IRegUser>({
  email: { type: String, required: true },
  mobile: { type: String, require: true },
});

const usersSchema = new Schema<IUser, IUserModel>(
  {
    user_id: { type: String, required: true },
    name: {
      first: { type: String, require: true },
      last: { type: String, require: true },
    },
    password: { type: String, required: true },
    account_type: { type: String, require: true },
    permanent_address: {
      district: { type: String, require: true },
      area: { type: String, require: true },
      street: { type: String, require: true },
      house: { type: String, require: true },
    },
    present_address: {
      district: { type: String, require: true },
      area: { type: String, require: true },
      street: { type: String, require: true },
      house: { type: String, require: true },
    },
  },
  {
    timestamps: true,
    autoCreate: false,
  }
);

usersSchema.pre("save", async function (this: IUser, next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

usersSchema.methods.comparePassword = async function (
  this: IUser,
  password: string
) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

export const registeredUsersModel = model<IRegUser>(
  "registered-users",
  registeredUsersSchema
);

export const usersModel = model<IUser, IUserModel>("users", usersSchema);
