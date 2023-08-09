import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Account = new Schema({
  email: String,
  mssv: String,
  username: String,
  password: String,
  class: String,
  type: String,
});

export default mongoose.model("Account", Account);
