const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usersSchema = new mongoose.Schema(
  {
    name: {
      first: { type: String, require: true },
      last: { type: String, require: true },
    },
    email: { type: String, require: true, unique: true },
    mobile: { type: String, require: true, unique: true },
    accountType: { type: String, require: true },
    permanentAddress: {
      district: { type: String, require: true },
      area: { type: String, require: true },
      street: { type: String, require: true },
      house: { type: String, require: true },
    },
    presentAddress: {
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

usersSchema.pre("save", async (next) => {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

usersSchema.methods.comparePassword = async (password) => {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;
