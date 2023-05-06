const mangoose = require("mongoose");
const { Schema } = mangoose;

const UserSchema = new Schema({
  username: String,
  restrictions: String,
});

const UserModel = mangoose.model("Member", UserSchema);

module.exports = UserModel;