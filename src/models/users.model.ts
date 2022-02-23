import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, IUsersModel } from "../interfaces";

const usersSchema = new Schema<IUser, IUsersModel>(
  {
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    account_type: { type: String, require: true },
    addresses: {
      permanent: {
        district: { type: String, required: true },
        sub_district: { type: String, required: true },
        area: { type: String, required: true },
        street: { type: String, require: true },
        house: { type: String, required: true },
      },
      present: {
        district: { type: String, required: true },
        sub_district: { type: String, required: true },
        area: { type: String, required: true },
        street: { type: String, require: true },
        house: { type: String, required: true },
      },
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

export const usersModel = model<IUser>("users", usersSchema);

export const userProfilesModel = model<IUser, IUsersModel>(
  "users",
  usersSchema
);
